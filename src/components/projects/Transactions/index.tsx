"use client";

import Table from "@/components/global/Table";
import { cn, formatAmount } from "@/lib/utils";

const Transactions = () => {
	const data = [
		{
			transactionType: "Income",
			transactionID: "Purchase Order ID",
			source: "Project Balance",
			destination: "Project Balance",
			amount: formatAmount(2000000, "NGN"),
			date: "04 Feb 2023",
		},
		{
			transactionType: "Income",
			transactionID: "Purchase Order ID",
			source: "Project Balance",
			destination: "Project Balance",
			amount: formatAmount(2000000, "NGN"),
			date: "04 Feb 2023",
		},
		{
			transactionType: "Income",
			transactionID: "Purchase Order ID",
			source: "Project Balance",
			destination: "Project Balance",
			amount: formatAmount(2000000, "NGN"),
			date: "04 Feb 2023",
		},
		{
			transactionType: "Income",
			transactionID: "Purchase Order ID",
			source: "Project Balance",
			destination: "Project Balance",
			amount: formatAmount(2000000, "NGN"),
			date: "04 Feb 2023",
		},
		{
			transactionType: "Income",
			transactionID: "Purchase Order ID",
			source: "Project Balance",
			destination: "Project Balance",
			amount: formatAmount(2000000, "NGN"),
			date: "04 Feb 2023",
		},
		{
			transactionType: "Income",
			transactionID: "Purchase Order ID",
			source: "Project Balance",
			destination: "Project Balance",
			amount: formatAmount(2000000, "NGN"),
			date: "04 Feb 2023",
		},
		{
			transactionType: "Income",
			transactionID: "Purchase Order ID",
			source: "Project Balance",
			destination: "Project Balance",
			amount: formatAmount(2000000, "NGN"),
			date: "04 Feb 2023",
		},
		{
			transactionType: "Income",
			transactionID: "Purchase Order ID",
			source: "Project Balance",
			destination: "Project Balance",
			amount: formatAmount(2000000, "NGN"),
			date: "04 Feb 2023",
		},
		{
			transactionType: "Income",
			transactionID: "Purchase Order ID",
			source: "Project Balance",
			destination: "Project Balance",
			amount: formatAmount(2000000, "NGN"),
			date: "04 Feb 2023",
		},
	];

	const tableHeadData = [
		{
			title: "Transaction Type",
			key: "transactionType",
		},
		{
			title: "Transaction ID",
			key: "transactionID",
		},
		{
			title: "Source",
			key: "source",
		},
		{
			title: "Destination",
			key: "destination",
		},
		{
			title: "Amount",
			key: "amount",
		},
		{
			title: "Date",
			key: "date",
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
						transactionType,
						transactionID,
						source,
						destination,
						amount,
						date,
					} = data;
					return (
						<tr
							className={cn("text-sm  border-[#5A5A5A99]", {
								"border-b": index !== length - 1,
							})}>
							<td className='p-4 text-black-500 whitespace-nowrap'>
								{transactionType}
							</td>
							<td className='p-4 text-black-500 whitespace-nowrap'>
								{transactionID}
							</td>
							<td className='p-4 text-black-500 whitespace-nowrap'>{source}</td>
							<td className='p-4 text-black-500 whitespace-nowrap'>
								{destination}
							</td>
							<td className='p-4 text-black-500 whitespace-nowrap'>{amount}</td>
							<td className='p-4 text-black-500 whitespace-nowrap'>{date}</td>
						</tr>
					);
				}}
			/>
		</section>
	);
};

export default Transactions;
