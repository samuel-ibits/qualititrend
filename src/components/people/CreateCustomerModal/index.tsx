"use client";

import Button from "@/components/global/Button";
import Input from "@/components/global/Input";
import Modal from "@/components/global/Modal";
import SelectInput from "@/components/global/SelectInput";
import Icons from "@/components/icons";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

type CreateCustomerModalProps = {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
};

const CreateCustomerModal = ({
  showModal,
  setShowModal,
}: CreateCustomerModalProps) => {
  const [step, setStep] = useState<"create" | "success">("create");

  const methods = useForm({
    defaultValues: {
      customersFullName: "",
      emailAddress: "",
      phoneNumber: null,
      address: "",
      nin: "",
      projectCode: null,
    },
  });

  const {
    formState: { errors, isValid },
    reset,
  } = methods;

  const onSubmit: SubmitHandler<any> = async (payload) => {
    try {
      setStep("success");
    } catch (err) {}
  };

  const stepProps = {
    create: {
      title: "Individual Customer ",
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
              className="space-y-6"
            >
              <Input name="id" label="Customer ID" disabled value="In_001" />
              <Input
                name="customersFullName"
                label="Customer’s Full name"
                type="text"
                rules={["required"]}
                placeholder="Full name"
              />
              <Input
                name="emailAddress"
                label="Email Address"
                type="email"
                rules={["required"]}
                placeholder="Enter Email Address"
              />
              <Input
                name="phoneNumber"
                label="Phone Number"
                rules={["required", "phone"]}
                placeholder="Enter Phone Number"
              />
              <Input
                name="address"
                label="Address"
                rules={["required"]}
                placeholder="Enter Address"
                tag="textarea"
              />
              <Input
                name="nin"
                label="NIN"
                type="number"
                rules={["required", "noSpaces"]}
                placeholder="National Identity Number"
              />
              <SelectInput
                label="Project Code"
                name="projectCode"
                options={[
                  {
                    name: "Wuse_1365",
                    value: "Wuse_1365",
                  },
                  {
                    name: "Wuse_136522",
                    value: "Wuse_136522",
                  },
                  {
                    name: "Wuse_13",
                    value: "Wuse_13",
                  },
                ]}
                optionComponent={(option, selectedOption) => {
                  return (
                    <div
                      className={cn(
                        "py-2 w-full border-b px-4 flex items-center space-x-5 text-tc-main hover:bg-[#FF69001A]",
                        {
                          "bg-[#FF69001A]":
                            option?.value === selectedOption?.value,
                        },
                      )}
                    >
                      <div className="w-full text-sm flex items-center space-x-2">
                        <div>{option?.name}</div>
                      </div>

                      {option?.name === selectedOption?.name && (
                        <div>
                          <Icons.SelectedIcon />
                        </div>
                      )}
                    </div>
                  );
                }}
                trigger={(selected) => {
                  return (
                    <div className="flex h-min bg-transparent items-center space-x-1">
                      {selected ? (
                        <div className="text-tc-main flex space-x-2 items-center text-sm">
                          <span>{selected.name}</span>
                        </div>
                      ) : (
                        <div className="text-sm mt-[2px] text-black-500">
                          Select Project
                        </div>
                      )}
                    </div>
                  );
                }}
              />
              <div className="lg:col-span-2 flex justify-center py-4">
                <Button
                  type="submit"
                  disabled={!isValid}
                  className="w-full lg:w-[240px]"
                >
                  Add Customer
                </Button>
              </div>
            </form>
          </FormProvider>
        </section>
      )}

      {step === "success" && (
        <section className="flex flex-col h-full justify-center items-center space-y-4">
          <Icons.SuccessIcon />
          <p className="pb-10 text-center">Customer added successfully</p>
        </section>
      )}
    </Modal>
  );
};

export default CreateCustomerModal;
