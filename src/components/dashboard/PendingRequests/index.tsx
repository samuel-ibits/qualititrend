import Table from "@/components/global/Table";
import Icons from "@/components/icons";

const PendingRequests = () => {
	const data = [
		{
			id: "100",
			type: "Purchase Order",
		},
		{
			id: "100",
			type: "Material Transfer",
		},
		{
			id: "100",
			type: "Expenses",
		},
	];

	const tableHeadData = [
		{
			title: "Project Code",
			key: "projectCode",
		},
		{
			title: "Request Type",
			key: "type",
		},
		{
			title: "Action",
			key: "action",
		},
	];

	return (
		<section>
			<Table
				title='Pending Requests'
				tableHeaderLeftComponent={() => (
					<div className='px-4'>
						<button className='trasform -rotate-90'>
							<Icons.MoreIcon />
						</button>
					</div>
				)}
				useShadow
				data={data!}
				loaderLength={10}
				tableHeadData={tableHeadData}
				className='xl:min-h-[323px]'
				rowComponent={(transaction) => {
					const { id, type } = transaction;
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
								<Icons.UnhideIcon />
							</td>
						</tr>
					);
				}}
			/>
		</section>
	);
};

export default PendingRequests;
