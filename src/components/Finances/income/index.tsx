"use client";

import Table from "@/components/global/Table";
import Status, { StatusType } from "@/components/global/Status";
import Icons from "@/components/icons";
import { cn, formatAmount } from "@/lib/utils";

const income = () => {
	const data = [
		{
			id: "INC_001",
			customer: "Jane Doe",
			incomecategory: "Sales",
			invoiceID: "12J23",
			totalReceived: 5000000,
			outstandingbalance: 5000000,
			lastpaymentdate: "12 Jul 2023",
		},
        {
			id: "INC_001",
			customer: "Jane Doe",
			incomecategory: "Sales",
			invoiceID: "12J23",
			totalReceived: 5000000,
			outstandingbalance: 5000000,
			lastpaymentdate: "12 Jul 2023",
		},
		{
			id: "INC_001",
			customer: "Jane Doe",
			incomecategory: "Sales",
			invoiceID: "12J23",
			totalReceived: 5000000,
			outstandingbalance: 5000000,
			lastpaymentdate: "12 Jul 2023",
		},
		{
			id: "INC_001",
			customer: "Jane Doe",
			incomecategory: "Sales",
			invoiceID: "12J23",
			totalReceived: 5000000,
			outstandingbalance: 5000000,
			lastpaymentdate: "12 Jul 2023",
		},
		{
			id: "INC_001",
			customer: "Jane Doe",
			incomecategory: "Sales",
			invoiceID: "12J23",
			totalReceived: 5000000,
			outstandingbalance: 5000000,
			lastpaymentdate: "12 Jul 2023",
		},
		{
			id: "INC_001",
			customer: "Jane Doe",
			incomecategory: "Sales",
			invoiceID: "12J23",
			totalReceived: 5000000,
			outstandingbalance: 5000000,
			lastpaymentdate: "12 Jul 2023",
		},
		{
			id: "INC_001",
			customer: "Jane Doe",
			incomecategory: "Sales",
			invoiceID: "12J23",
			totalReceived: 5000000,
			outstandingbalance: 500000,
			lastpaymentdate: "12 Jul 2023",
		},
		{
			id: "INC_001",
			customer: "Jane Doe",
			incomecategory: "Sales",
			invoiceID: "12J23",
			totalReceived: 5000000,
			outstandingbalance: 500000,
			lastpaymentdate: "12 Jul 2023",
		},
		{
			id: "INC_001",
			customer: "Jane Doe",
			incomecategory: "Sales",
			invoiceID: "12J23",
			totalReceived: 5000000,
			outstandingbalance: 5000000,
			lastpaymentdate: "12 Jul 2023",
		},
		{
			id: "INC_001",
			customer: "Jane Doe",
			incomecategory: "Sales",
			invoiceID: "12J23",
			totalReceived: 5000000,
			outstandingbalance: 19000000,
			lastpaymentdate: "12 Jul 2023",
		},
	];

	const tableHeadData = [
		{
			title: "Id",
			key: "id",
		},
		{
			title: "Customer",
			key: "customer",
		},
		{
			title: "Income Category",
			key: "incomecategory",
		},
		{
			title: "Invoice ID",
			key: "invoiceID",
		},
		{
			title: "Total Received",
			key: "totalReceived",
		},
		{
			title: "Outstanding Balance",
			key: "outstandingbalance",
		},
		{
			title: "Last Payment Date",
			key: "lastpaymentdate",
		},
		{
			title: "Actions",
			key: "actions",
		},
	];

	return (
		<section>
			<Table
				data={data!}
				loaderLength={10}
				tableHeadData={tableHeadData}
				rowComponent={(transaction, index, length) => {
					const {
						id,
						customer,
						incomecategory,
						invoiceID,
						totalReceived,
						outstandingbalance,
						lastpaymentdate,
					} = transaction;
					return (
						<tr
							onClick={() => {}}
							className={cn("text-sm border-[#5A5A5A99]", {
								"border-b": index !== length - 1,
							})}>
							<td className='p-4 text-black-500 whitespace-nowrap'>{id}</td>
							<td className='p-4 text-black-500 whitespace-nowrap'>
								{customer}
							</td>
							<td className='py-[18px] w-[100px] px-4 text-black-500 whitespace-nowrap'>
								{incomecategory}
							</td>
							<td className='p-4 text-black-500 whitespace-nowrap uppercase'>
								{invoiceID}
							</td>
							<td className='p-4 whitespace-nowrap'>
								{formatAmount(+totalReceived, "NGN")}
							</td>
							<td className='p-4 text-black-500 whitespace-nowrap'>
								{formatAmount(+outstandingbalance, "NGN")}
							</td>
							<td className='p-4 text-black-500 whitespace-nowrap'>
								{lastpaymentdate}
							</td>
							<td className='p-4'>
								<button>
									<Icons.MoreIcon />
								</button>
							</td>
						</tr>
					);
				}}
			/>
		</section>
	);
};

export default income;
