"use client";

import Button from "@/components/global/Button";
import Status, { StatusType } from "@/components/global/Status";
import Table from "@/components/global/Table";
import { cn, numberWithCommas } from "@/lib/utils";

const OutgoingInventory = () => {
	const data = [
		{
			materialName: "Base Pin",
			quantity: 20,
			destination: "Project Code",
			status: "picked_up",
			date: "04 Feb 2023",
			isConfirmed: true,
		},
		{
			materialName: "Door Rubber",
			quantity: 10,
			destination: "Warehouse",
			status: "awaiting_pickup",
			date: "04 Feb 2023",
			isConfirmed: false,
		},
		{
			materialName: "Glossy Board",
			quantity: 16,
			destination: "Project Code",
			status: "picked_up",
			date: "04 Feb 2023",
			isConfirmed: true,
		},
		{
			materialName: "Base Pin",
			quantity: 20,
			destination: "Project Code",
			status: "picked_up",
			date: "04 Feb 2023",
			isConfirmed: true,
		},
		{
			materialName: "Door Rubber",
			quantity: 10,
			destination: "Warehouse",
			status: "awaiting_pickup",
			date: "04 Feb 2023",
			isConfirmed: false,
		},
		{
			materialName: "Glossy Board",
			quantity: 16,
			destination: "Project Code",
			status: "picked_up",
			date: "04 Feb 2023",
			isConfirmed: true,
		},
		{
			materialName: "Base Pin",
			quantity: 20,
			destination: "Project Code",
			status: "awaiting_pickup",
			date: "04 Feb 2023",
			isConfirmed: true,
		},
		{
			materialName: "Door Rubber",
			quantity: 10,
			destination: "Warehouse",
			status: "picked_up",
			date: "04 Feb 2023",
			isConfirmed: false,
		},
	];

	const tableHeadData = [
		{
			title: "Material Name",
			key: "materialName",
		},
		{
			title: "Quantity",
			key: "quantity",
		},
		{
			title: "Destination",
			key: "destination",
		},
		{
			title: "Status",
			key: "status",
		},
		{
			title: "Delivery Date",
			key: "deliveryDate",
		},
		{
			title: "",
			key: "actions",
		},
	];

	return (
		<section>
			<Table
				data={data!}
				loaderLength={10}
				tableHeadData={tableHeadData}
				rowComponent={(data, index, length) => {
					const {
						materialName,
						quantity,
						destination,
						status,
						date,
						isConfirmed,
					} = data;
					return (
						<tr
							className={cn("text-sm  border-[#5A5A5A99]", {
								"border-b": index !== length - 1,
							})}>
							<td className='p-4  text-black-500 whitespace-nowrap'>
								{materialName}
							</td>
							<td className='p-4 text-black-500 whitespace-nowrap'>
								{numberWithCommas(quantity)}
							</td>
							<td className='p-4 text-black-500 whitespace-nowrap'>
								{destination}
							</td>
							<td className='p-4 text-black-500 whitespace-nowrap'>
								<Status status={status as StatusType} />
							</td>
							<td className='p-4 text-black-500 whitespace-nowrap'>{date}</td>

							<td className='p-4  text-black-500 whitespace-nowrap'>
								{isConfirmed ? (
									<Button
										size='sm'
										className='bg-status-success-100 border-status-success-100'>
										Confirmed
									</Button>
								) : (
									<Button
										size='sm'
										className='bg-[#FFE2D2] border-[#FFE2D2] text-primary'>
										Confirm
									</Button>
								)}
							</td>
						</tr>
					);
				}}
			/>
		</section>
	);
};

export default OutgoingInventory;
