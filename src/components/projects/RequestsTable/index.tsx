"use client";

import Status, { StatusType } from "@/components/global/Status";
import Table from "@/components/global/Table";
import Icons from "@/components/icons";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

const RequestsTable = () => {
	const router = useRouter();

	const data = [
		{
			code: "CPD1",
			requestType: "Expense Request",
			date: "28th Aug, 2023",
			status: "pending",
		},
		{
			code: "CPD1",
			requestType: "Purchase Order",
			date: "28th Aug, 2023",
			status: "approved",
		},
		{
			code: "CPD1",
			requestType: "Expense Request",
			date: "28th Aug, 2023",
			status: "approved",
		},
		{
			code: "CPD1",
			requestType: "Purchase Order",
			date: "28th Aug, 2023",
			status: "declined",
		},
		{
			code: "CPD1",
			requestType: "Expense Request",
			date: "28th Aug, 2023",
			status: "approved",
		},
		{
			code: "CPD1",
			requestType: "Purchase Order",
			date: "28th Aug, 2023",
			status: "approved",
		},
		{
			code: "CPD1",
			requestType: "Expense Request",
			date: "28th Aug, 2023",
			status: "approved",
		},
		{
			code: "CPD1",
			requestType: "Purchase Order",
			date: "28th Aug, 2023",
			status: "declined",
		},
		{
			code: "CPD1",
			requestType: "Expense Request",
			date: "28th Aug, 2023",
			status: "pending",
		},
		{
			code: "CPD1",
			requestType: "Purchase Order",
			date: "28th Aug, 2023",
			status: "declined",
		},
	];

	const tableHeadData = [
		{
			title: "Project Code",
			key: "code",
		},
		{
			title: "Request Type",
			key: "requestType",
		},
		{
			title: "Date",
			key: "date",
		},
		{
			title: "Status",
			key: "Status",
		},
	];

	return (
		<section>
			<Table
				title='All Requests'
				data={data!}
				loaderLength={10}
				tableHeaderLeftComponent={() => (
					<div className='px-4'>
						<button className='trasform -rotate-90'>
							<Icons.MoreIcon />
						</button>
					</div>
				)}
				tableHeadData={tableHeadData}
				rowComponent={(transaction, index, length) => {
					const { code, requestType, date, status } = transaction;
					return (
						<tr
							onClick={() => {
								router.push("/projects/" + code + "/inventory");
							}}
							className={cn("text-sm cursor-pointer border-[#5A5A5A99]", {
								"border-b": index !== length - 1,
							})}>
							<td className='p-4 text-black-500 whitespace-nowrap'>{code}</td>
							<td className='p-4 text-black-500 whitespace-nowrap'>
								{requestType}
							</td>
							<td className='py-[18px] px-4 text-black-500 whitespace-nowrap'>
								{date}
							</td>
							<td className='p-4 text-black-500 whitespace-nowrap'>
								<Status status={status as StatusType} />
							</td>
						</tr>
					);
				}}
			/>
		</section>
	);
};

export default RequestsTable;
