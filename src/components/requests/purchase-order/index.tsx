"use client";

import Status, { StatusType } from "@/components/global/Status";
import Table from "@/components/global/Table";
import Icons from "@/components/icons";
import { cn, formatAmount } from "@/lib/utils";
import { useRouter } from "next/navigation";

const PurchaseOrderRequests = () => {
	const router = useRouter();

	const data = [
		{
            purchaseOrderId: "100AD",
            projectCode: "CPD1",
            supplier: "Dangote",
            totalAmount: 3000000,
            totalDisbursed: 50000,
            totalUnpaid: 500000,
            dateCreated: "12 Jul 2023",
			status: "pending",
		},
		{
            purchaseOrderId: "100AD",
            projectCode: "CPD1",
            supplier: "Dangote",
            totalAmount: 3000000,
            totalDisbursed: 50000,
            totalUnpaid: 0,
            dateCreated: "12 Jul 2023",
			status: "approved",
		},
		{
            purchaseOrderId: "100AD",
            projectCode: "CPD1",
            supplier: "Dangote",
            totalAmount: 3000000,
            totalDisbursed: 50000,
            totalUnpaid: 500000,
            dateCreated: "12 Jul 2023",
			status: "approved",
		},
		{
            purchaseOrderId: "100AD",
            projectCode: "CPD1",
            supplier: "Dangote",
            totalAmount: 3000000,
            totalDisbursed: 50000,
            totalUnpaid: 0,
            dateCreated: "12 Jul 2023",
			status: "declined",
		},
		{
            purchaseOrderId: "100AD",
            projectCode: "CPD1",
            supplier: "Dangote",
            totalAmount: 3000000,
            totalDisbursed: 50000,
            totalUnpaid: 0,
            dateCreated: "12 Jul 2023",
			status: "pending",
		},
		{
            purchaseOrderId: "100AD",
            projectCode: "CPD1",
            supplier: "Dangote",
            totalAmount: 3000000,
            totalDisbursed: 50000,
            totalUnpaid: 500000,
            dateCreated: "12 Jul 2023",
			status: "declined",
		},
	];

	const tableHeadData = [
		{
			title: "Purchase Order ID",
			key: "purchaseOrderId",
		},
		{
			title: "Project Code",
			key: "projectCode",
		},
		{
			title: "Supplier",
			key: "supplier",
		},
		{
			title: "Total Amount",
			key: "totalAmount",
		},
		{
            title: "Total Disbursed",
            key: "totalDisbursed",
		},
		{
            title: "Total Unpaid",
            key: "totalUnpaid",
		},
		{
            title: "Date Created",
            key: "dateCreated",
		},
		{
            title: "Status",
            key: "status",
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
                        purchaseOrderId,
                        projectCode,
                        supplier,
                        totalAmount,
                        totalDisbursed,
                        totalUnpaid,
                        dateCreated,
						status,
					} = transaction;
					return (
						<tr
							onClick={() => {
								router.push("/requests/" + purchaseOrderId + "/purchase-order");
							}}
							className={cn("text-sm cursor-pointer border-[#5A5A5A99]", {
								"border-b": index !== length - 1,
							})}>
                            <td className='p-4 text-black-500 whitespace-nowrap'>{purchaseOrderId}</td>
                            <td className='p-4 text-black-500 whitespace-nowrap'>{projectCode}</td>
							<td className='p-4 text-black-500 whitespace-nowrap'>
                                {supplier}
							</td>
							<td className='py-[18px] w-[100px] px-4 text-black-500 whitespace-nowrap'>
                                {formatAmount(+totalAmount, "NGN")}
							</td>
							<td className='p-4 text-black-500 whitespace-nowrap'>
                                {formatAmount(+totalDisbursed, "NGN")}
							</td>
							<td className={cn('p-4 text-black-500 whitespace-nowrap', {
                                ' text-status-error-100': totalUnpaid > 0
                            })}>
                                {formatAmount(+totalUnpaid, "NGN")}
							</td>
							<td className='p-4 text-black-500 whitespace-nowrap'>
                                {dateCreated}
							</td>
							<td className='p-4 text-black-500 whitespace-nowrap'>
								<Status status={status as StatusType} />
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

export default PurchaseOrderRequests;
