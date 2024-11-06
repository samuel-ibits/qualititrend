"use client";

import Button from "@/components/global/Button";
import Input from "@/components/global/Input";
import Modal from "@/components/global/Modal";
import { _Select } from "@/components/global/MultipleSelectInput";
import SelectInput from "@/components/global/SelectInput";
import Icons from "@/components/icons";
import { cn, numberWithCommas } from "@/lib/utils";
import { useGetCategoryQuery } from "@/services/categories";
import { useCreateExpenseRequestMutation } from "@/services/warehouse";
import { useParams } from "next/navigation";
import { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

type CreateRequestModalProps = {
	showModal: boolean;
	setShowModal: (value: boolean) => void;
};

const CreateRequestModal = ({
	showModal,
	setShowModal,
}: CreateRequestModalProps) => {
	const [step, setStep] = useState<"create" | "success">("create");
	const [submit_error, setSubmitError] = useState("")
	const params = useParams();

	const methods = useForm({
		defaultValues: {
			project_id: params.id as string,
			amount: 0,
			_amount: "0",
			category: 0,
			description: "",
		},
	});

	const { data: expense_categories } = useGetCategoryQuery({
		type: "expense_request"
	})



	const {
		formState: { errors, isValid },
		reset,
		watch,
		setValue,
	} = methods;

	const data = watch()

	const [createExpenseRequest, { isLoading }] = useCreateExpenseRequestMutation();

	const onSubmit: SubmitHandler<any> = async (payload) => {
		setSubmitError("")

		const _output = {
			...data,
			category_id: data.category,
			project_id: params.id as string,
		}

		const result = await createExpenseRequest(_output).unwrap().then(res => {
			setStep("success");
		}).catch(error => {
			setSubmitError(error?.data?.message || "Error creating expense request")
		});
	};

	const stepProps = {
		create: {
			title: "Create New Expense Request",
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
							className='max-lg:space-y-6 lg:grid lg:grid-cols-2 lg:gap-x-9 gap-y-6'>
							{/* <Input */}
							{/* 	name='documents' */}
							{/* 	label='Supporting Documents' */}
							{/* 	rules={["required"]} */}
							{/* /> */}

							<_Select
								label='Expense Category'
								name='category'
								required
								options={
									expense_categories?.data?.categories?.map((item) => {
										return {
											name: item?.name,
											value: item?.id,
										};
									}) || []
								}
								name_key="name"
								value_key="value"
								placeholder=" Select Category "
							/>
							<Input
								name='_amount'
								label='Amount'
								rules={["required"]}
								placeholder='Enter Amount'
								type='tel'
								onChange={(e) => {
									setValue(
										"_amount",
										numberWithCommas(e?.target.value.replace(/[^0-9.]/g, ""))
									);
									setValue("amount", Number(e.target.value.replaceAll(",", "")))
								}}
							/>
							<div className='lg:col-span-2'>
								<Input
									name='description'
									label='Description'
									rules={["required"]}
									placeholder='Enter Description'
									tag='textarea'
								/>
							</div>
							<div className='lg:col-span-2 flex justify-center py-4'>
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
					<p className='pb-10 text-center'>
						Expense request submitted successfully
					</p>
				</section>
			)}

			{submit_error && (
				<p className="text-red-500 p-2 text-center">
					{submit_error}
				</p>
			)}
		</Modal>
	);
};

export default CreateRequestModal;
