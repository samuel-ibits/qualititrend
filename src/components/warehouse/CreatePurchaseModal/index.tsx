"use client";

import Button from "@/components/global/Button";
import Checkbox from "@/components/global/Checkbox";
import Input from "@/components/global/Input";
import Modal from "@/components/global/Modal";
import SelectInput from "@/components/global/SelectInput";
import Icons from "@/components/icons";
import { cn, formatAmount } from "@/lib/utils";
import { useEffect, useState } from "react";
import { FormProvider, SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"
import { _Select } from "@/components/global/MultipleSelectInput";
import { WAREHOUSE_ITEM_TYPES } from "@/lib/constants";
import { useCreatePurchaseOrderMutation, useFetchInventoriesQuery, useFetchProductsQuery, useFetchSuppliersQuery } from "@/services/warehouse";
import { CreatePurchaseOrderRequest } from "@/types/services/warehouse/purchase-orders";

type CreatePurchaseModalProps = {
    showModal: boolean;
    setShowModal: (value: boolean) => void;
};

const CreatePurchaseModal = ({
    showModal,
    setShowModal,
}: CreatePurchaseModalProps) => {
    const [step, setStep] = useState<"create" | "success">("create");

    const validationSchema = Yup.object().shape({
        inventory_id: Yup.string().required('Inventory is required'),
        supplier_id: Yup.string().required('Supplier is required'),
        items: Yup.array().of(
            Yup.object().shape({
                item_id: Yup.string()
                    .required('Item is required'),
                quantity: Yup.number().min(1, "Quantity must be more than 0")
                    .required('Quantity is required')
            })
        )
            .required("You need to add an item").min(1)
    });

    const formOptions = { resolver: yupResolver(validationSchema) };

    const methods = useForm(formOptions);
    const { fields, append, remove, update } = useFieldArray({ name: 'items', control: methods.control })

    const {
        formState: { errors, isValid },
        reset,
        watch,
    } = methods;

    const { data: suppliers } = useFetchSuppliersQuery()
    const { data: products } = useFetchProductsQuery({})
    const { data: inventories } = useFetchInventoriesQuery()


    function getProduct(index: number) {
        const id = methods.watch(`items`)?.[index].item_id
        const item = products?.data.data.find(item => item.id === id)
        return item
    }

    function getSelectedItems() {
        return methods.watch(`items`)
    }

    const total_val = Number(getSelectedItems()?.reduce((acc, curr, index) => {
        const price = Number(getProduct(index)?.cost)
        const value = price * curr.quantity
        acc += value
        return acc;
    }, 0)
    )

    // const watchStockQuantity = watch("stockQuantity");
    // const watchValuePerUnit = watch("valuePerUnit");

    // useEffect(() => {
    //     if (watchStockQuantity && watchValuePerUnit) {
    //         const stockQuantity = parseInt(watchStockQuantity);
    //         const valuePerUnit = parseInt(watchValuePerUnit);
    //         const calculatedTotalValue = stockQuantity * valuePerUnit;
    //         setTotalValue(calculatedTotalValue);
    //     }
    // }, [watchStockQuantity, watchValuePerUnit]);

    const [submit_error, setSubmitError] = useState("")
    const [createPurchaseOrder, { isLoading }] = useCreatePurchaseOrderMutation();

    const onSubmit: SubmitHandler<any> = async (payload) => {
        try {

            const data = watch()

            const _output = {} as CreatePurchaseOrderRequest

            _output.items = data.items

            _output.inventory_id = data.inventory_id
            _output.supplier_id = data.supplier_id


            const result = await createPurchaseOrder(_output).unwrap().then(res => {
                setStep("success");
            }).catch((error: any) => {
                setSubmitError(error?.data?.message || "Error creating project")
            });
        } catch (err) { }
    };

    const stepProps = {
        create: {
            title: "Create Purchase Order",
        },
        success: {
            title: "",
            width: "max-w-[400px]",
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
            is_message={step === "success"}
            width={stepProps[step].width}
            closeButtonStyle={stepProps[step].closeButtonStyle}
            showHeaderBorder={stepProps[step].showHeaderBorder}
            onRequestClose={() => {
                setShowModal(false);
                setTimeout(() => {
                    reset();
                    setStep("create");
                }, 1000);
            }}>
            {step === "create" && (
                <section className='w-full'>
                    <FormProvider {...methods}>
                        <form
                            onSubmit={methods.handleSubmit(onSubmit)}
                            className='max-lg:space-y-6 lg:grid lg:grid-cols-2 lg:gap-x-9 gap-y-6'>

                            <_Select
                                required
                                options={
                                    suppliers?.data?.map((item) => {
                                        return {
                                            name: item.name,
                                            id: item.id,
                                        };
                                    }) || []
                                }
                                name_key="name"
                                value_key="id"
                                label="Supplier"
                                placeholder="Select a supplier"
                                name="supplier_id"
                            />

                            <_Select
                                required
                                options={
                                    inventories?.data?.invetories?.map((item) => {
                                        return {
                                            name: item.name,
                                            id: item.id,
                                        };
                                    }) || []
                                }
                                name_key="name"
                                value_key="id"
                                label="Inventory"
                                placeholder="Select an inventory"
                                name="inventory_id"
                            />

                            <div className='lg:col-span-2 py-4 space-y-4'>
                                <p>Select Available items to transfer</p>
                                {errors.items && (
                                    <p className="text-sm text-red-400">
                                        {errors.items?.message}
                                    </p>
                                )}



                                <table className="w-full text-left min-w-max">
                                    <thead>
                                        <th></th>
                                        <th>Item</th>
                                        <th>Quantity</th>
                                        <th>Unit Price</th>
                                        <th>Total Price</th>
                                        <th></th>
                                    </thead>
                                    <tbody>
                                        {fields.map((item, index) => {
                                            return (
                                                <tr>
                                                    <td className="px-1">{index + 1}.</td>
                                                    <td className="px-1">
                                                        <div className="min-w-[200px]">
                                                            <_Select
                                                                required
                                                                options={
                                                                    products?.data?.data.map((item) => {
                                                                        return {
                                                                            name: item?.name,
                                                                            id: item?.id,
                                                                        };
                                                                    }) || []
                                                                }
                                                                hide_errors
                                                                name_key="name"
                                                                value_key="id"
                                                                placeholder="Select an item"
                                                                {...methods.register(`items.${index}.item_id`)}
                                                                name={`items.[${index}].item_id`}
                                                                //@ts-ignore
                                                                onChange={(h) => { update(index, { ...methods.watch(`items`)?.[index], item_id: h?.id }); methods.register(`items.${index}.item_id`).onChange(h) }}
                                                            />

                                                            {errors.items?.[index]?.item_id && (
                                                                <p className="text-sm text-red-400">
                                                                    {errors.items[index]?.item_id?.message}
                                                                </p>
                                                            )}

                                                        </div>
                                                    </td>
                                                    <td className="px-1">
                                                        <input
                                                            {...methods.register(`items.${index}.quantity`)}
                                                            type="text"
                                                            className={`
                                                                form-control ${errors.items?.[index]?.quantity ? 'is-invalid' : ''} 
                                                                w-full focus:border-primary text-dark  text-sm h-10 overflow-hidden font-normal rounded outline-none border px-2
                                                                `}
                                                        />
                                                        <div className="text-sm text-red-400">{errors.items?.[index]?.quantity?.message}</div>
                                                    </td>
                                                    <td className="px-1">{formatAmount(Number(getProduct(index)?.cost || 0), "NGN")}</td>
                                                    <td className="px-1">{formatAmount(Number(Number(getProduct(index)?.cost || 0) * Number(methods.watch(`items`)?.[index]?.quantity)), "NGN")}</td>
                                                    <td className="px-1">
                                                        <button
                                                            className="text-red-400 text-2xl cursor-pointer hover:bg-red-200 size-8 rounded-full"
                                                            type="button"
                                                            onClick={() => {
                                                                remove(index)
                                                            }}>
                                                            &times;
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                                <Button
                                    type='button'
                                    onClick={() => {
                                        append({ item_id: "", quantity: 0 })
                                    }}
                                    className=''>
                                    Add Item
                                </Button>

                                <p>
                                    Total Value : {formatAmount(total_val || 0, "NGN")}
                                </p>
                                <p>
                                    VAT : {formatAmount(Number((7.5 / 100) * (total_val || 0)), "NGN")} = {formatAmount(Number((7.5 / 100) * (total_val || 0)) + (total_val || 0), "NGN")}
                                </p>

                            </div>

                            <div className='lg:col-span-2 flex justify-center py-4'>

                                {errors.root?.message && (
                                    <p className="text-red-500 p-2 text-center">
                                        {errors.root?.message}
                                    </p>
                                )}

                                {submit_error && (
                                    <p className="text-red-500 p-2 text-center">
                                        {submit_error}
                                    </p>
                                )}
                                <Button
                                    loading={isLoading}
                                    type='submit'
                                    disabled={!isValid}
                                    className='w-full lg:w-[240px]'>
                                    Create
                                </Button>
                            </div>
                        </form>
                    </FormProvider>
                </section>
            )}

            {step === "success" && (
                <section className='flex flex-col h-full justify-center items-center space-y-4'>
                    <Icons.SuccessIcon />
                    <p className='pb-10 text-center'>Product created successfully</p>
                </section>
            )}
        </Modal>
    );
};

export default CreatePurchaseModal;
