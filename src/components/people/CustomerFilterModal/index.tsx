"use client";

import Button from "@/components/global/Button";
import Modal from "@/components/global/Modal";
import SelectInput from "@/components/global/SelectInput";
import Icons from "@/components/icons";
import { cn } from "@/lib/utils";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

type CustomerFilterModalProps = {
    showModal: boolean;
    setShowModal: (value: boolean) => void;
};

const CustomerFilterModal = ({
    showModal,
    setShowModal,
}: CustomerFilterModalProps) => {
    const methods = useForm({
        defaultValues: {
            customerType: null,
            project: null,
        },
    });

    const {
        formState: { errors, isValid },
        reset,
    } = methods;

    const onSubmit: SubmitHandler<any> = async (payload) => {
        try {
            setShowModal(false);
        } catch (err) { }
    };

    return (
        <Modal
            title='Customer Filter'
            show={showModal}
            width='lg:w-[414px]'
            onRequestClose={() => {
                setShowModal(false);
            }}>
            <section className='w-full'>
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)} className='space-y-6'>
                        <SelectInput
                            label='Customer Type'
                            name='customerType'
                            options={[
                                {
                                    name: "All",
                                    value: "all",
                                },
                                {
                                    name: "Coporate Customer",
                                    value: "coporateCustomer",
                                },
                                {
                                    name: "Individual Customer",
                                    value: "individualCustomer",
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
                                            }
                                        )}>
                                        <div className='w-full text-sm flex items-center space-x-2'>
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
                                    <div className='flex h-min bg-transparent items-center space-x-1'>
                                        {selected ? (
                                            <div className='text-tc-main flex space-x-2 items-center text-sm'>
                                                <span>{selected.name}</span>
                                            </div>
                                        ) : (
                                            <div className='text-sm mt-[2px] text-black-500'>
                                                Select Customer Type
                                            </div>
                                        )}
                                    </div>
                                );
                            }}
                        />
                        <SelectInput
                            label='Project'
                            name='project'
                            options={[
                                {
                                    name: "All",
                                    value: "all",
                                },
                                {
                                    name: "Ongoing",
                                    value: "ongoing",
                                },
                                {
                                    name: "Completed",
                                    value: "completed",
                                },
                                {
                                    name: "Pending",
                                    value: "pending",
                                },
                                {
                                    name: "Cancelled",
                                    value: "cancelled",
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
                                            }
                                        )}>
                                        <div className='w-full text-sm flex items-center space-x-2'>
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
                                    <div className='flex h-min bg-transparent items-center space-x-1'>
                                        {selected ? (
                                            <div className='text-tc-main flex space-x-2 items-center text-sm'>
                                                <span>{selected.name}</span>
                                            </div>
                                        ) : (
                                            <div className='text-sm mt-[2px] text-black-500'>
                                                Select Project
                                            </div>
                                        )}
                                    </div>
                                );
                            }}
                        />
                        <div className='flex items-center justify-center space-x-6 py-4'>
                            <Button
                                onClick={() => {
                                    reset();
                                    setShowModal(false);
                                }}
                                theme='outline'
                                className='w-full lg:w-[136px]'>
                                Reset
                            </Button>
                            <Button
                                type='submit'
                                disabled={!isValid}
                                className='w-full lg:w-[136px]'>
                                Apply
                            </Button>
                        </div>
                    </form>
                </FormProvider>
            </section>
        </Modal>
    );
};

export default CustomerFilterModal;
