// @ts-nocheck

"use client";

import Button from "@/components/global/Button";
import Input from "@/components/global/Input";
import Modal from "@/components/global/Modal";
import { _Select } from "@/components/global/MultipleSelectInput";
import Icons from "@/components/icons";
import { WAREHOUSE_ITEM_STATUSES, WAREHOUSE_ITEM_TYPES } from "@/lib/constants";
import { formatAmount } from "@/lib/utils";
import { useFetchCategoriesQuery } from "@/services/categories";
import { useCreateWarehouseItemMutation } from "@/services/warehouse";
import { useEffect, useState } from "react";

import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

type CreateProductModalProps = {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
};

const CreateProductModal = ({
  showModal,
  setShowModal,
}: CreateProductModalProps) => {
  const [step, setStep] = useState<"create" | "success">("create");
  const [totalValue, setTotalValue] = useState<number>(0);
  const [submit_error, setSubmitError] = useState("");

  const [createWarehouseItem, { isLoading }] = useCreateWarehouseItemMutation();

  const methods = useForm({
    defaultValues: {
      stockQuantity: null as unknown as number,

      itemType: null as unknown as number,
      unit_of_measurement: null as unknown as string,
      leaseAvailability: "",
      valuePerUnit: null as unknown as number,
      status: null as unknown as number,

      name: "",
      item_code: "",
      category_id: null,
      /* inventory_id: null, */
    },
  });

  const {
    formState: { errors, isValid },
    reset,
    watch,
  } = methods;

  const { data: units_of_measurement } = useFetchCategoriesQuery({
    type: "unit_measurement",
  });

  const watchStockQuantity = watch("stockQuantity");
  const watchValuePerUnit = watch("valuePerUnit");

  useEffect(() => {
    if (watchStockQuantity && watchValuePerUnit) {
      const stockQuantity = parseInt(watchStockQuantity as unknown as string);
      const valuePerUnit = parseInt(watchValuePerUnit as unknown as string);
      const calculatedTotalValue = stockQuantity * valuePerUnit;
      setTotalValue(calculatedTotalValue);
    }
  }, [watchStockQuantity, watchValuePerUnit]);

  const onSubmit: SubmitHandler<any> = async (payload) => {
    setSubmitError("");
    const {
      name,
      item_code,
      itemType: item_type,
      unit_of_measurement,
      valuePerUnit: cost,
      category_id,
      status,
      stockQuantity: quantity,
    } = watch();
    try {
      console.log({ unit_of_measurement });
      await createWarehouseItem({
        //@ts-ignore
        name,
        item_code,
        item_type: item_type.value,
        unit_of_measurement: unit_of_measurement.id,
        cost: Number(cost),
        status: status.value,
        quantity: Number(quantity),
        category_id: 1,
        inventory_id: 1,
      })
        .unwrap()
        .then((res) => {
          setStep("success");
        })
        .catch((error) => {
          setSubmitError(error?.data?.message || "Error creating project");
        });
    } catch (error) {}
  };

  const stepProps = {
    create: {
      title: "Create Warehouse Item",
    },
    success: {
      title: "",
      width: "!w-[400px]",
      closeButtonStyle: "fill-primary",
      showHeaderBorder: false,
    },
  } as {
    [key: string]: {
      title: string;
      width?: string;
      closeButtonStyle?: string;
      showHeaderBorder?: boolean;
    };
  };

  return (
    <Modal
      title={stepProps[step].title}
      show={showModal}
      width={stepProps[step].width}
      closeButtonStyle={stepProps[step].closeButtonStyle}
      showHeaderBorder={stepProps[step].showHeaderBorder}
      onRequestClose={() => {
        setShowModal(false);
        setTimeout(() => {
          reset();
          setStep("create");
        }, 1000);
      }}
    >
      {step === "create" && (
        <section className="w-full">
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="max-lg:space-y-6 lg:grid lg:grid-cols-2 lg:gap-x-9 gap-y-6"
            >
              <Input
                name="item_code"
                label="Item Code"
                defaultValue="68_89GYN"
                required
                placeholder="Enter a Product Code"
              />
              <Input
                name="name"
                label="Name"
                rules={["required"]}
                placeholder="Enter Product Name"
              />
              <Input
                name="stockQuantity"
                label="Stock Quantity"
                type="number"
                rules={["required"]}
                placeholder="Stock Quantity"
              />

              <_Select
                label="Item Type"
                name="itemType"
                required
                options={WAREHOUSE_ITEM_TYPES}
                name_key="name"
                value_key="value"
                placeholder="Select item type "
              />

              <_Select
                label="Status"
                name="status"
                required
                options={WAREHOUSE_ITEM_STATUSES}
                name_key="name"
                value_key="value"
                placeholder="Select Status "
              />

              <_Select
                label="Unit"
                name="unit_of_measurement"
                required
                options={
                  units_of_measurement?.data?.categories?.map((status) => {
                    return {
                      name: status?.name,
                      id: status?.id,
                    };
                  }) || []
                }
                name_key="name"
                value_key="value"
                placeholder=" Select Unit of Measurement"
              />

              <Input
                name="valuePerUnit"
                label="Value Per Unit"
                type="number"
                rules={["required"]}
                placeholder="Value Per Unit"
              />

              <Input
                name="totalValue"
                label="Total Value"
                disabled
                value={formatAmount(totalValue, "NGN", false)}
              />
              <div className="lg:col-span-2 flex justify-center py-4">
                <Button
                  loading={isLoading}
                  type="submit"
                  disabled={!isValid}
                  className="w-full lg:w-[240px]"
                >
                  Create
                </Button>
              </div>
            </form>
          </FormProvider>
        </section>
      )}

      {step === "success" && (
        <section className="flex flex-col h-full justify-center items-center space-y-4">
          <Icons.SuccessIcon />
          <p className="pb-10 text-center">Product created successfully</p>
        </section>
      )}

      {submit_error && (
        <p className="text-red-500 p-2 text-center">{submit_error}</p>
      )}
    </Modal>
  );
};

export default CreateProductModal;
