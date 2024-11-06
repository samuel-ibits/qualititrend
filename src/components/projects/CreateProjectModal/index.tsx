"use client";

import Button from "@/components/global/Button";
import Input from "@/components/global/Input";
import Modal from "@/components/global/Modal";
import SelectInput from "@/components/global/SelectInput";
import Icons from "@/components/icons";
import { cn, numberWithCommas } from "@/lib/utils";
import { useCreateProjectMutation } from "@/services/projects";
import { useGetStaffQuery } from "@/services/staff";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { motion } from "framer-motion";
import BuildingUnitsTable from "./BuildingUnitsTable";
import { AddBuildingUnitType } from "@/types/services/projects/buildings";
import { useGetCategoryQuery } from "@/services/categories";
import { _Select } from "@/components/global/MultipleSelectInput";
import { CategoryTypes } from "@/types/services/categories";
import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"

type CreateProjectModalProps = {
	showModal: boolean;
	setShowModal: (value: boolean) => void;
};

type projectType = "building" | "concrete" | "furniture";

type steps =
	| "create"
	| "success"
	| "building_details"
	| "concrete_details"
	| "furniture_details";

const CreateProjectModal = ({
	showModal,
	setShowModal,
}: CreateProjectModalProps) => {
	const [step, setStep] = useState<steps>("create");
	const [building_units, setBuildingUnits] = useState<AddBuildingUnitType[]>([]);

	const { data: staff } = useGetStaffQuery({
		perPage: 100000,
	});

	const { data: building_purposes } = useGetCategoryQuery({
		type: "building_purpose"
	})

	const { data: concrete_types } = useGetCategoryQuery({
		type: "concrete_type"
	})

	const { data: furniture_types } = useGetCategoryQuery({
		type: "furniture_type"
	})


	const { data: project_statuses } = useGetCategoryQuery({
		type: "project_status"
	})

	const validationSchema = Yup.object().shape({

		type: Yup.string().required("Please select type"),
		project_code: Yup.string().required("Please fill this"),
		status: Yup.string().required("Please fill this"),
		status_id: Yup.string().required("Please fill this"),
		budget: Yup.number().required("Please fill this"),
		_budget: Yup.string().required("Please fill this"),
		manager: Yup.string().required("Please fill this"),
		summary: Yup.string().required("Please fill this"),
		supervisor: Yup.string().required("Please fill this"),
		budgetDescription: Yup.string().required("Please fill this"),
		initiation_date: Yup.string().required("Please fill this"),
		completion_date: Yup.string().required("Please fill this"),
		product: Yup.object().shape({
			type: Yup.string().required("Please fill this"),
			building_purpose: Yup.string().required("Please fill this"),
			name: Yup.string().required("Please fill this"),
			description: Yup.string().required("Please fill this"),
			type_id: Yup.string().required("Please fill this"),
			unit_price: Yup.number().required("Please fill this"),
			_unit_price: Yup.string().required("Please fill this"),
			quantity: Yup.number().required("Please fill this"),
			plot_number: Yup.string().required("Please fill this"),
			plot_address: Yup.string().required("Please fill this"),
			/* items: Yup.array().of( */
			/* 	Yup.object().shape({ */
			/* 				name: Yup.string().required("Please fill this"), */
			/* 				number_of_unit: Yup.string().required("Please fill this"), */
			/* 				description: Yup.string().required("Please fill this"), */
			/* 				number_of_rooms: Yup.string().required("Please fill this"), */
			/* 				type_id: Yup.string().required("Please fill this"), */
			/* 				purpose_id: Yup.string().required("Please fill this"), */
			/* 	}) */
			/* ) */
			/* 	.required("You need to add an item").min(1) */
		}),
	});

	const formOptions = { resolver: yupResolver(validationSchema) };
	const methods = useForm({
		defaultValues: {
			type: "",
			project_code: "",
			status: "",
			status_id: "",
			budget: 0,
			_budget: "",
			manager: "",
			summary: "",
			supervisor: "",
			budgetDescription: "",
			initiation_date: "",
			completion_date: "",
			product: {
				type: "",
				building_purpose: { id: "" },
				name: "",
				description: "",
				type_id: "",
				unit_price: 0,
				_unit_price: "",
				quantity: 0,
				plot_number: "",
				plot_address: "",
				units: [
					{
						name: "",
						number_of_unit: "",
						description: "",
						number_of_rooms: "",
						type_id: "",
						purpose_id: "",
					},
				],
			},
		},
		/* ...formOptions */
	});

	const {
		formState: { errors, isValid },
		reset,
		watch,
		setValue,
	} = methods;

	const type = watch("type") as string

	const status = watch("status") as string


	const manager = watch("manager") as string

	const supervisor = watch("supervisor") as string

	const [submit_error, setSubmitError] = useState("")

	const {
		budget,
		project_code,
		budgetDescription,
		summary,
		initiation_date,
		completion_date,
		product,
	} = watch();

	const [createProject, { isLoading }] = useCreateProjectMutation();

	function goBack() {
		setStep("create")
	}

	const onSubmit = async () => {
		console.log("here")
		if (step === "create") {
			if (type === "building") setStep("building_details");
			if (type === "concrete") setStep("concrete_details");
			if (type === "furniture") setStep("furniture_details");
			return;
		}
		try {
			product.type_id = product.type

			const _output = {
				summary: summary,
				project_code,
				status_id: status,
				type: type,
				manager_id: manager,
				supervisor_id: supervisor,
				budget: {
					amount: budget,
					description: budgetDescription,
				},
				initiation_date: initiation_date,
				completion_date: completion_date,
				product: {
					name: product?.name || undefined,
					description: product?.description || undefined,
					type_id: product?.type_id || undefined,
					quantity: product?.quantity,
					unit_price: product?.unit_price,

					building_purpose_id: product?.building_purpose.id,
					plot_number: product?.plot_number,
					plot_address: product?.plot_address,
					units: building_units.map(building_unit => {
						return {
							...building_unit,
							unit_type_id: building_unit.unit_type.id,
							other_rooms: building_unit.other_rooms.reduce((acc, curr) => { acc.push(curr.value.id); return acc }, [] as string[]).join(",")
						}
					}),
				},
			}

			console.log({ _output, data: watch() })

			// @ts-ignore
			const result = await createProject(_output).unwrap().then(res => {
				setStep("success");
			}).catch(error => {
				setSubmitError(error?.data?.message || "Error creating project")
			});

		} catch (err) { }
	};

	const stepProps = {
		create: {
			title: "Create New Project",
		},
		building_details: {
			title: "Add Building Details",
		},
		concrete_details: {
			title: "Add Concrete Details",
		},
		furniture_details: {
			title: "Add Furniture Details",
		},
		success: {
			title: "",
			width: "!w-[400px]",
			closeButtonStyle: "fill-primary",
			showHeaderBorder: false,
		},
	} as Record<
		steps,
		{
			title: string;
			width?: string;
			closeButtonStyle?: string;
			showHeaderBorder?: boolean;
		}
	>;

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
				<motion.div
					key={step.toString()}
					initial={{
						x: 300,
						opacity: 0,
					}}
					animate={{ x: 0, opacity: 1, transition: { delay: 0.2 } }}
					exit={{ x: -300, opacity: 0 }}
					className='w-full'>
					<section className='w-full'>
						<FormProvider {...methods}>
							<form
								onSubmit={methods.handleSubmit(onSubmit)}
								className='max-lg:space-y-6 lg:grid lg:grid-cols-2 lg:gap-x-9 gap-y-6'>

								<Input
									name='project_code'
									label='Project Code'
									rules={["required"]}
									placeholder='68_89GYN'
									left={<div className='font-medium text-sm px-3'>QGS - </div>}
									paddingLeft='pl-14'
								/>

								<_Select
									label='Project Type'
									name='type'
									required
									options={[
										{
											name: "Furniture",
											value: "furniture",
										},
										{
											name: "Concrete",
											value: "concrete",
										},
										{
											name: "Building",
											value: "building",
										},
									]}
									name_key="name"
									value_key="value"
									placeholder=" Select Project Type "
								/>

								<_Select
									label='Project Status'
									name='status'
									required
									options={
										project_statuses?.data?.categories?.map((status) => {
											return {
												name: status?.name,
												id: status?.id,
											};
										}) || []
									}
									name_key="name"
									value_key="id"
									placeholder=" Select Project status"
								/>

								<Input
									name='_budget'
									label='Project Budget'
									rules={["required"]}
									placeholder='Enter Budget'
									type='tel'
									onChange={(e) => {
										setValue(
											"_budget",
											numberWithCommas(e?.target.value.replace(/[^0-9.]/g, ""))
										);
										setValue("budget", Number(e.target.value.replaceAll(",", "")))
									}}
								/>
								<Input
									name='budgetDescription'
									label='Budget Description'
									rules={["required"]}
									placeholder='Enter Budget Description'
									tag='textarea'
								/>
								<Input
									name='summary'
									label='Project Summary'
									rules={["required"]}
									placeholder='Enter Project Summary'
									tag='textarea'
								/>

								<_Select
									label='Project Manager'
									name='manager'
									required
									options={
										staff?.data?.data?.map((staff) => {
											return {
												title: staff?.staff_name,
												value: staff?.id,
											};
										}) || []
									}
								/>
								<_Select
									label='Project Supervisor'
									name='supervisor'
									required
									options={
										staff?.data?.data?.map((staff) => {
											return {
												title: staff?.staff_name,
												value: staff?.id,
											};
										}) || []
									}
								/>
								<Input
									name='initiation_date'
									label='Initiation Date'
									rules={["required"]}
									placeholder='Enter Initiation Date'
									type='date'
								/>
								<Input
									name='completion_date'
									label='Completion Date'
									rules={["required"]}
									placeholder='Enter Completion Date'
									type='date'
								/>
								<div className='lg:col-span-2 flex justify-center py-4'>

									{methods.formState.errors.root && (
										<p className="text-red-500 p-2 text-center">
											{methods.formState.errors.root?.message}
										</p>
									)}
									<button
										type="button"
										onClick={() => {
											console.log(methods.formState)
										}}>
										output
									</button>

									<Button
										type='submit'
										disabled={!isValid}
										className='w-full lg:w-[240px]'>
										Next
									</Button>
								</div>
							</form>
						</FormProvider>
					</section>
				</motion.div>
			)}

			{step === "furniture_details" && (
				<motion.div
					key={step.toString()}
					initial={{
						x: 300,
						opacity: 0,
					}}
					animate={{ x: 0, opacity: 1, transition: { delay: 0.2 } }}
					exit={{ x: -300, opacity: 0 }}
					className='w-full'>
					<section className='w-full'>
						<FormProvider {...methods}>
							<form
								onSubmit={methods.handleSubmit(onSubmit)}
								className='max-lg:space-y-6 lg:grid lg:grid-cols-2 lg:gap-x-9 gap-y-6'>
								<Input
									name='product.name'
									label='Furniture Name'
									rules={["required"]}
									placeholder='Enter Name'
								/>
								<_Select
									label='Furniture Type'
									name='product.type'
									required
									options={
										furniture_types?.data?.categories?.map((furniture_type) => {
											return {
												name: furniture_type?.name,
												id: furniture_type?.id,
											};
										}) || []
									}
									name_key="name"
									value_key="id"
									placeholder=" Select Furniture Type "
								/>

								<div className="lg:col-span-2">

									<Input
										name='product.description'
										label='Description'
										rules={["required"]}
										placeholder='Enter Description'
										tag='textarea'
									/>
								</div>

								<Input
									name='product._unit_price'
									label='Unit Price'
									rules={["required"]}
									placeholder='Enter Unit Price'
									type='tel'
									onChange={(e) => {
										setValue(
											"product._unit_price",
											numberWithCommas(e?.target.value.replace(/[^0-9.]/g, ""))
										);
										setValue("product.unit_price", Number(e.target.value.replaceAll(",", "")))
									}}
								/>

								<p>
									Total Value : {
										numberWithCommas(
											String(Number(product.unit_price) * product.quantity)
												.replace(/[^0-9.]/g, ""))
									}
								</p>


								<div className='lg:col-span-2 flex justify-center py-4 gap-2'>
									<Button
										theme="outline"
										onClick={goBack}
										type='button'
										className='w-full lg:w-[240px]'>
										Back
									</Button>
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
				</motion.div>
			)}

			{step === "concrete_details" && (
				<motion.div
					key={step.toString()}
					initial={{
						x: 300,
						opacity: 0,
					}}
					animate={{ x: 0, opacity: 1, transition: { delay: 0.2 } }}
					exit={{ x: -300, opacity: 0 }}
					className='w-full'>
					<section className='w-full'>
						<FormProvider {...methods}>
							<form
								onSubmit={methods.handleSubmit(onSubmit)}
								className='max-lg:space-y-6 lg:grid lg:grid-cols-2 lg:gap-x-9 gap-y-6'>
								<Input
									name='product.name'
									label='Concrete Name'
									rules={["required"]}
									placeholder='Enter Name'
								/>
								<_Select
									label='Concrete Type'
									name='product.type'
									required
									options={
										concrete_types?.data?.categories?.map((concrete_type) => {
											return {
												name: concrete_type?.name,
												id: concrete_type?.id,
											};
										}) || []
									}
									name_key="name"
									value_key="id"
									placeholder=" Select Concrete Type "
								/>
								<Input
									name='product.description'
									label='Concrete Description'
									rules={["required"]}
									placeholder='Enter Description'
									tag='textarea'
								/>
								<div className='lg:col-span-2 flex justify-center py-4 gap-2'>
									<Button
										theme="outline"
										onClick={goBack}
										type='button'
										className='w-full lg:w-[240px]'>
										Back
									</Button>
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
				</motion.div>
			)}

			{step === "building_details" && (
				<motion.div
					key={step.toString()}
					initial={{
						x: 300,
						opacity: 0,
					}}
					animate={{ x: 0, opacity: 1, transition: { delay: 0.2 } }}
					exit={{ x: -300, opacity: 0 }}
					className='w-full'>
					<section className='w-full'>
						<FormProvider {...methods}>
							<form
								onSubmit={methods.handleSubmit(onSubmit)}
								className='max-lg:space-y-6 lg:grid lg:grid-cols-2 lg:gap-x-9 gap-y-6'>
								<SelectInput
									label='Building Purpose'
									name='product.building_purpose'
									required
									options={
										building_purposes?.data?.categories?.map((building_purpose) => {
											return {
												name: building_purpose?.name,
												value: building_purpose?.id,
											};
										}) || []
									}
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
														Select Building Purpose
													</div>
												)}
											</div>
										);
									}}
								/>

								<Input
									name='product.plot_number'
									label='Plot Number'
									rules={["required"]}
									placeholder='1'
								/>

								<Input
									name='product.plot_address'
									label='Plot Address'
									rules={["required"]}
									placeholder='No 12 Sokoto Street, Gwarimpa, Abuja.'
									tag='textarea'
								/>

								<div className='lg:col-span-2'>
									<BuildingUnitsTable data={building_units} setData={setBuildingUnits} />
								</div>

								<div className='lg:col-span-2 flex justify-center py-4 gap-2'>
									<Button
										theme="outline"
										onClick={goBack}
										type='button'
										className='w-full lg:w-[240px]'>
										Back
									</Button>
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
				</motion.div>
			)}

			{step === "success" && (
				<motion.div
					key={step.toString()}
					initial={{
						x: 300,
						opacity: 0,
					}}
					animate={{ x: 0, opacity: 1, transition: { delay: 0.2 } }}
					exit={{ x: -300, opacity: 0 }}
					className='w-full'>
					<section className='flex flex-col h-full justify-center items-center space-y-4'>
						<Icons.SuccessIcon />
						<p className='pb-10 text-center'>Project created successfully</p>
					</section>
				</motion.div>
			)}

			{submit_error && (
				<p className="text-red-500 p-2 text-center">
					{submit_error}
				</p>
			)}
			{/* <motion.div */}
			{/* 	key={step.toString()} */}
			{/* 	initial={{ */}
			{/* 		x: 300, */}
			{/* 		opacity: 0, */}
			{/* 	}} */}
			{/* 	animate={{ x: 0, opacity: 1, transition: { delay: 0.2 } }} */}
			{/* 	exit={{ x: -300, opacity: 0 }} */}
			{/* 	className='w-full'> */}
			{/**/}
			{/**/}
			{/**/}
			{/* </motion.div> */}

		</Modal>
	);
};

export default CreateProjectModal;
