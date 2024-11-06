import Table from "@/components/global/Table";
import Icons from "@/components/icons";
import { formatAmount } from "@/lib/utils";

const RecentTransactions = () => {
	const data = [
		{
			id: "100",
			type: "Income",
			source: "General Account",
			amount: 0,
			date: "12 Jul 2023",
		},
		{
			id: "100",
			type: "Expenses",
			source: "Project Balance",
			amount: 0,
			date: "12 Jul 2023",
		},
		{
			id: "100",
			type: "Income",
			source: "General Account",
			amount: 0,
			date: "12 Jul 2023",
		},
		{
			id: "100",
			type: "Expenses",
			source: "Project Balance",
			amount: 0,
			date: "12 Jul 2023",
		},
		{
			id: "100",
			type: "Income",
			source: "General Account",
			amount: 0,
			date: "12 Jul 2023",
		},
		{
			id: "100",
			type: "Expenses",
			source: "Project Balance",
			amount: 0,
			date: "12 Jul 2023",
		},
		{
			id: "100",
			type: "Income",
			source: "General Account",
			amount: 0,
			date: "12 Jul 2023",
		},
		{
			id: "100",
			type: "Expenses",
			source: "Project Balance",
			amount: 0,
			date: "12 Jul 2023",
		},
	];

	const tableHeadData = [
		{
			title: "ID",
			key: "id",
		},
		{
			title: "Transaction Type",
			key: "transactionType",
		},
		{
			title: "Source/ Destination",
			key: "source",
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
				title='Recent Transactions'
				tableHeaderLeftComponent={() => (
					<div className='px-4'>
						<button className='trasform -rotate-90'>
							<Icons.MoreIcon />
						</button>
					</div>
				)}
				data={data!}
				useShadow
				loaderLength={10}
				tableHeadData={tableHeadData}
				rowComponent={(transaction) => {
					const { id, type, source, amount, date } = transaction;
					return (
						<tr
							onClick={() => {}}
							className='border-b text-sm border-[#5A5A5A99]'>
							<td className='py-[18px] px-4 text-black-500 whitespace-nowrap'>
								{id}
							</td>
							<td className='py-[18px] px-4 text-black-500 whitespace-nowrap'>
								{type}
							</td>
							<td className='py-[18px] px-4 text-black-500 whitespace-nowrap'>
								{source}
							</td>
							<td className='py-[18px] px-4 text-black-500 whitespace-nowrap'>
								{formatAmount(+amount, "NGN")}
							</td>
							<td className='py-[18px] px-4 text-black-500 whitespace-nowrap'>
								{date}
							</td>
						</tr>
					);
				}}
			/>
		</section>
	);
};

export default RecentTransactions;
