'use client'

import Modal from "@/components/global/Modal";
import SelectInput from "@/components/global/SelectInput";
import Input from "@/components/global/Input";
import Table from "@/components/global/Table";
import Icons from "@/components/icons";
import { cn, formatAmount, numberWithCommas } from "@/lib/utils";
import { motion } from "framer-motion";
import { Dispatch, SetStateAction, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Button from "@/components/global/Button";
import { AddBuildingUnitType } from "@/types/services/projects/buildings";
import { useFetchCategoriesQuery } from "@/services/categories";
import { _Select } from "@/components/global/MultipleSelectInput";


const UNIT_PURPOSES = [
	{
		title: "sale",
		value: "sale",
	},
	{
		title: "lease",
		value: "lease",
	},
]

type TableProps = {
	data: AddBuildingUnitType[],
	setData: Dispatch<SetStateAction<AddBuildingUnitType[]>>
}

export default function BuildingUnitsTable({ data = [], setData }: TableProps) {

	const { data: other_room_options } = useFetchCategoriesQuery({
		type: "other_rooms"
	})

	const { data: building_unit_type_options } = useFetchCategoriesQuery({
		type: "building_unit_type"
	})

	const methods = useForm<AddBuildingUnitType>({
		defaultValues: {
			unit_type_id: "",
			number_of_units: 1,
			unit_description: "",
			number_of_rooms: 1,
		}
	});

	const {
		formState: { errors, isValid },
		reset,
		watch,
		setValue,
	} = methods;

	const {
		unit_name,
		unit_type,
		number_of_units,
		number_of_rooms,
		other_rooms,
		price,
		unit_description,
		unit_purpose,
	} = watch();


	async function onSubmit() {
		const new_unit: AddBuildingUnitType = {
			unit_name,
			unit_type_id: unit_type.id,
			unit_type,
			number_of_units,
			number_of_rooms,
			other_rooms,
			price,
			unit_description,
			unit_purpose: unit_purpose,
		}

		const _data = data || []

		setData([..._data, new_unit])
		reset()
		closeAddUnitTypeModal()
	}


	const tableHeadData = [
		{
			title: "unit name",
			key: "unit_name",
		},
		{
			title: "unit type",
			key: "unit_type_id",
		},
		{
			title: "Number of units",
			key: "number_of_units",
		},
		{
			title: "number of rooms",
			key: "number_of_rooms",
		},
		{
			title: "other rooms",
			key: "other_rooms",
		},
		{
			title: "price",
			key: "price",
		},
		{
			title: "unit description",
			key: "unit_description",
		},
		{
			title: "unit purpose",
			key: "unit_purpose",
		},
	];

	const [is_add_unit_type_modal_open, setIsAddUnitTypeModalOpen] = useState(false)

	function openAddUnitTypeModal() {
		setIsAddUnitTypeModalOpen(true)
	}

	function closeAddUnitTypeModal() {
		setIsAddUnitTypeModalOpen(false)
	}


	return (
		<section>
			<Table
				title='Unit types'
				data={data!}
				loaderLength={10}
				tableHeadData={tableHeadData}
				rowComponent={(unit) => {
					const { unit_name, unit_type, number_of_units, number_of_rooms, other_rooms, price, unit_description, unit_purpose } = unit;
					return (
						<tr
							onClick={() => { }}
							className='border-b text-sm border-[#5A5A5A99]'>
							<td className='py-[18px] px-4 text-black-500 whitespace-nowrap'>
								{unit_name}
							</td>
							<td className='py-[18px] px-4 text-black-500 whitespace-nowrap'>
								{unit_type?.name}
							</td>
							<td className='py-[18px] px-4 text-black-500 whitespace-nowrap'>
								{number_of_units}
							</td>
							<td className='py-[18px] px-4 text-black-500 whitespace-nowrap'>
								{number_of_rooms}
							</td>
							<td className='py-[18px] px-4 text-black-500 whitespace-nowrap'>
								<ul>
									{other_rooms.map((room, index: number) => (
										<li key={room.id}> {index > 0 && ", "}{room.label}</li>
									))}
								</ul>
							</td>
							<td className='py-[18px] px-4 text-black-500 whitespace-nowrap'>
								{formatAmount(+Number(price.replaceAll(",", "")), "NGN")}
							</td>
							<td className='py-[18px] px-4 text-black-500 whitespace-nowrap'>
								{unit_description}
							</td>
							<td className='py-[18px] px-4 text-black-500 whitespace-nowrap'>
								{unit_purpose}
							</td>
						</tr>
					);
				}}
			/>

			<Modal show={is_add_unit_type_modal_open} onRequestClose={closeAddUnitTypeModal} title="Add Unit Type">
				<motion.div
					key="add unit type modal"
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
									name='Unit Name'
									label='unit_name'
									rules={["required"]}
									placeholder='Enter unit name'
									onChange={e => setValue("unit_name", e.target.value)}
								/>


								<_Select
									label='Unit type'
									name='unit_type'
									required
									options={
										building_unit_type_options?.data?.categories?.map((buidling_unit_type_option) => {
											return {
												name: buidling_unit_type_option?.name,
												id: buidling_unit_type_option,
											};
										}) || []
									}
									name_key="name"
									value_key="id"
								/>

								<_Select
									label='Other Rooms'
									name='other_rooms'
									placeholder="Select other rooms"
									multiple
									required
									options={
										other_room_options?.data?.categories?.map((other_room) => {
											return {
												name: other_room?.name,
												id: other_room
											};
										}) || []
									}
									name_key="name"
									value_key="id"
								/>

								<Input
									name='Number of Units'
									label='number of units'
									rules={["required"]}
									placeholder='1'
									type="number"
									onChange={e => setValue("number_of_units", Number(e.target.value))}
								/>

								<Input
									name='Unit Price'
									label='unit price'
									rules={["required"]}
									placeholder='1'
									/* type="number" */
									type='tel'
									onChange={(e) => {
										setValue(
											"price",
											numberWithCommas(e?.target.value.replace(/[^0-9.]/g, ""))
										);
									}}
								/>

								<Input
									name='Number of Rooms Per Unit'
									label='number of rooms'
									rules={["required"]}
									placeholder='1'
									type="number"
									onChange={e => setValue("number_of_rooms", Number(e.target.value))}
								/>

								<_Select
									label='Unit Purpose'
									name='unit_purpose'
									required
									is_string_options
									options={UNIT_PURPOSES}
								/>

								<Input
									name='Unit Description'
									label='unit description'
									rules={["required"]}
									placeholder='Civil Engineering Project: Lokogoma Estate'
									tag='textarea'
									onChange={e => setValue("unit_description", e.target.value)}
								/>

								<div className='lg:col-span-2 flex justify-center py-4'>
									<Button
										type='button'
										disabled={!isValid}
										onClick={methods.handleSubmit(onSubmit)}
										className='w-full lg:w-[240px]'>
										Add
									</Button>
								</div>
							</form>
						</FormProvider>
					</section>
				</motion.div>
			</Modal>

			<button onClick={openAddUnitTypeModal} type="button" className="">+ Add unit type</button>
		</section>
	);
};


