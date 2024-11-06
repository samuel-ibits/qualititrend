"use client";

import Button from "@/components/global/Button";
import Checkbox from "@/components/global/Checkbox";
import Input from "@/components/global/Input";
import Modal from "@/components/global/Modal";
import SelectInput from "@/components/global/SelectInput";
import Icons from "@/components/icons";
import { _Select } from "@/components/global/MultipleSelectInput";
import { cn, formatAmount } from "@/lib/utils";
import { useFetchProductsQuery, useFetchInventoriesQuery, useCreateMaterialTransferMutation, useCreateSupplyRequestMutation } from "@/services/warehouse";
import { useEffect, useState } from "react";
import { FormProvider, SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { Product } from "@/types/services/warehouse";
import { useFetchProjectsQuery } from "@/services/projects";

type CreateSupplyRequestModalProps = {
    showModal: boolean;
    setShowModal: (value: boolean) => void;
};

const CreateSupplyRequestModal = ({
    showModal,
    setShowModal,
}: CreateSupplyRequestModalProps) => {
    const [step, setStep] = useState<"create" | "success">("create");
    const [totalValue, setTotalValue] = useState<number>(0);


    const validationSchema = Yup.object().shape({
        project: Yup.string().required('Project is required'),
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

    const [submit_error, setSubmitError] = useState("")
    const methods = useForm(formOptions);
    const { fields, append, remove, update } = useFieldArray({ name: 'items', control: methods.control })


    function getSelectedItems() {
        return methods.watch(`items`)
    }

    const {
        formState: { errors, isValid },
        reset,
        watch,
    } = methods;

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
    //
    const { data: _products } = useFetchProductsQuery({})
    const { data: projects, isSuccess } = useFetchProjectsQuery({})

    const [products, setProducts] = useState(_products?.data.data || [] as Product[])

    useEffect(() => {
        if (_products) {
            setProducts(_products.data.data)
        }
    }, [_products])

    const selected_items = methods.watch("items")

    function getProduct(index: number) {
        const id = methods.watch(`items`)?.[index].item_id
        const item = products.find(item => item.id === id)
        return item
    }

    const [createSupplyRequest, { isLoading }] = useCreateSupplyRequestMutation();

    const onSubmit: SubmitHandler<any> = async (payload) => {
        try {

            const data = watch()

            const _output = {
                items: data.items,
                project_id: data.project,
            }


            // @ts-ignore
            await createSupplyRequest(_output).unwrap().then(res => {
                setStep("success");
            }).catch((error: any) => {
                setSubmitError(error?.data?.message || "Error creating project")
            });
        } catch (err) { }
    };

    const stepProps = {
        create: {
            title: "Create Site Supply Request",
            width: "!w-[565px]",
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
            }}>
            {step === "create" && (
                <section className='w-full'>
                    <FormProvider {...methods}>
                        <form
                            onSubmit={methods.handleSubmit(onSubmit)}
                            className='space-y-6'>
                            <_Select
                                required
                                options={
                                    projects?.data?.data?.map((item) => {
                                        return {
                                            name: item.project_code,
                                            id: item.id,
                                        };
                                    }) || []
                                }
                                name_key="name"
                                value_key="id"
                                label="Project"
                                placeholder="Select Project"
                                name="project"
                            />
                            <div className='lg:col-span-2 py-4 space-y-4'>
                                <p>Select items to request</p>
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
                                                                    products?.map((item) => {
                                                                        return {
                                                                            name: item?.name,
                                                                            id: item?.id,
                                                                        };
                                                                    }) || []
                                                                }
                                                                name_key="name"
                                                                value_key="value"
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

                            </div>


                            <div className='lg:col-span-2 flex justify-center py-4'>

                                {submit_error && (
                                    <p className="text-red-500 p-2 text-center">
                                        {submit_error}
                                    </p>
                                )}
                                <Button
                                    type='submit'
                                    loading={isLoading}
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
                    <p className='pb-10 text-center'>Supply Request created successfully</p>
                </section>
            )}
        </Modal>
    );
};

export default CreateSupplyRequestModal;
