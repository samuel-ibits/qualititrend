
"use client";

import Table from "@/components/global/Table";
import Icons from "@/components/icons";
import { cn, formatAmount } from "@/lib/utils";
import { FetchProjectsResponse } from "@/types/services/projects";
import { useRouter } from "next/navigation";

type Props = {
	title? : string;
	data : FetchProjectsResponse;
}

export default function ProjectTable({title, data:_data}:Props) {

	const data = _data.data.data
	const router = useRouter();

	const tableHeadData = [
		{
			title: "Project Code",
			key: "code",
		},
		{
			title: "Initiation Date",
			key: "initiationDate",
		},
		{
			title: "Proposed Completion Date",
			key: "proposedCompletionDate",
		},
		{
			title: "Budget",
			key: "budget",
		},
		{
			title: "Invoice Value",
			key: "invoiceValue",
		},
		{
			title: "Account Balance",
			key: "accountBalance",
		},
		{
			title: "Total Expenses",
			key: "totalExpenses",
		},
		{
			title: "Actions",
			key: "actions",
		},
	];

	return (
		<section>
			<Table
				title={title}
				data={data!}
				loaderLength={10}
				tableHeadData={tableHeadData}
				rowComponent={(transaction, index, length) => {
					const {
					project_code,
						id,
						initiation_date,
						completion_date,
						current_budget,
						/* invoiceValue, */
						balance,
						/* totalExpenses, */
					} = transaction;
					return (
						<tr
							onClick={() => {
								router.push("/projects/" + id + "/inventory");
							}}
							className={cn("text-sm cursor-pointer border-[#5A5A5A99]", {
								"border-b": index !== length - 1,
							})}>
							<td className='p-4 text-black-500 whitespace-nowrap'>{project_code}</td>
							<td className='p-4 text-black-500 whitespace-nowrap'>
								{new Date(initiation_date).toLocaleDateString()}
							</td>
							<td className='py-[18px] w-[100px] px-4 text-black-500 whitespace-nowrap'>
								{new Date(completion_date).toLocaleDateString()}
							</td>
							<td className='p-4 text-black-500 whitespace-nowrap'>
								{formatAmount(+current_budget.amount, "NGN")}
							</td>
							<td className='p-4 text-black-500 whitespace-nowrap'>
								{/* {formatAmount(+invoiceValue, "NGN")} */}
							</td>
							<td className='p-4 text-black-500 whitespace-nowrap'>
								{formatAmount(+balance, "NGN")}
							</td>
							<td className='p-4 text-black-500 whitespace-nowrap'>
								{/* {formatAmount(+totalExpenses, "NGN")} */}
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

