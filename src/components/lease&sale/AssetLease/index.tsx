"use client";

import Button from "@/components/global/Button";
import Status, { StatusType } from "@/components/global/Status";
import Table from "@/components/global/Table";
import Icons from "@/components/icons";
import { cn, formatAmount } from "@/lib/utils";
import { useForm } from "react-hook-form";

const AssetLease = () => {
    const methods = useForm();
    const data = [
        {
            id: "100AD",
            lease: "Consumer",
            leaseItem: "Armchair",
            invoiceID: "INV20230805001",
            amount: 900000,
            pickUpDate: "12 Jul 2023",
            expectedReturnDate: "20 Oct 2023",
            action: ""
        },
        {
            id: "100AD",
            lease: "Operating",
            leaseItem: "Dining Table",
            invoiceID: "INV20230805001",
            amount: 900000,
            pickUpDate: "12 Jul 2023",
            expectedReturnDate: "20 Oct 2023",
            action: ""
        },
        {
            id: "100AD",
            lease: "Consumer",
            leaseItem: "Armchair",
            invoiceID: "INV20230805001",
            amount: 900000,
            pickUpDate: "12 Jul 2023",
            expectedReturnDate: "20 Oct 2023",
            action: ""
        },
        {
            id: "100AD",
            lease: "Consumer",
            leaseItem: "Armchair",
            invoiceID: "INV20230805001",
            amount: 900000,
            pickUpDate: "12 Jul 2023",
            expectedReturnDate: "20 Oct 2023",
            action: ""
        },
        {
            id: "100AD",
            lease: "Consumer",
            leaseItem: "Armchair",
            invoiceID: "INV20230805001",
            amount: 900000,
            pickUpDate: "12 Jul 2023",
            expectedReturnDate: "20 Oct 2023",
            action: ""
        },
        {
            id: "100AD",
            lease: "Consumer",
            leaseItem: "Armchair",
            invoiceID: "INV20230805001",
            amount: 900000,
            pickUpDate: "12 Jul 2023",
            expectedReturnDate: "20 Oct 2023",
            action: ""
        },
        {
            id: "100AD",
            lease: "Consumer",
            leaseItem: "Armchair",
            invoiceID: "INV20230805001",
            amount: 900000,
            pickUpDate: "12 Jul 2023",
            expectedReturnDate: "20 Oct 2023",
            action: ""
        },
        {
            id: "100AD",
            lease: "Consumer",
            leaseItem: "Armchair",
            invoiceID: "INV20230805001",
            amount: 900000,
            pickUpDate: "12 Jul 2023",
            expectedReturnDate: "20 Oct 2023",
            action: ""
        },
        {
            id: "100AD",
            lease: "Consumer",
            leaseItem: "Armchair",
            invoiceID: "INV20230805001",
            amount: 900000,
            pickUpDate: "12 Jul 2023",
            expectedReturnDate: "20 Oct 2023",
            action: ""
        },
        {
            id: "100AD",
            lease: "Consumer",
            leaseItem: "Armchair",
            invoiceID: "INV20230805001",
            amount: 900000,
            pickUpDate: "12 Jul 2023",
            expectedReturnDate: "20 Oct 2023",
            action: ""
        },
        {
            id: "100AD",
            lease: "Consumer",
            leaseItem: "Armchair",
            invoiceID: "INV20230805001",
            amount: 900000,
            pickUpDate: "12 Jul 2023",
            expectedReturnDate: "20 Oct 2023",
            action: ""
        },
        {
            id: "100AD",
            lease: "Consumer",
            leaseItem: "Armchair",
            invoiceID: "INV20230805001",
            amount: 900000,
            pickUpDate: "12 Jul 2023",
            expectedReturnDate: "20 Oct 2023",
            action: ""
        },
        {
            id: "100AD",
            lease: "Consumer",
            leaseItem: "Armchair",
            invoiceID: "INV20230805001",
            amount: 900000,
            pickUpDate: "12 Jul 2023",
            expectedReturnDate: "20 Oct 2023",
            action: ""
        },
      

    ];

    const tableHeadData = [
        {
            title: "ID",
            key: "id",
        },
        {
            title: "Lease",
            key: "lease",
        },
        {
            title: "Lease Item",
            key: "leaseItem",
        },
        {
            title: "Invoice ID",
            key: "invoiceID",
        },
        {
            title: "Amount",
            key: "amount",
        },
        {
            title: "Pick-Up Date",
            key: "pickUpDate",
        },
        {
            title: "Expected Return Date",
            key: "expectedReturnDate",
        },
        {
            title: "Actions",
            key: "action",
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
                        lease,
                        leaseItem,
                        invoiceID,
                        amount,
                        pickUpDate,
                        expectedReturnDate,
                        action,
                    } = transaction;
                    return (
                        <tr
                            onClick={() => { }}
                            className={cn("text-sm border-[#5A5A5A99] cursor-pointer", {
                                "border-b": index !== length - 1,
                            })}
                        >
                            <td className="p-4 text-black-500 whitespace-nowrap">{id}</td>
                            <td className="p-4 text-black-500 whitespace-nowrap">
                                {lease}
                            </td>
                            <td className="py-[18px] w-[100px] px-4 text-black-500 whitespace-nowrap">
                                {leaseItem}
                            </td>
                            <td className="p-4 text-black-500 whitespace-nowrap">
                                {invoiceID}
                            </td>
                            <td className="p-4 text-black-500 whitespace-nowrap">
                                {formatAmount(+amount, "NGN")}
                            </td>
                            <td className="p-4 text-black-500 whitespace-nowrap">
                                {pickUpDate}
                            </td>
                            <td className="p-4 text-black-500 whitespace-nowrap">
                                {expectedReturnDate}
                            </td>
                            <td className="p-4">
                                <Icons.MoreIcon />
                            </td>
                        </tr>
                    );
                }}
            />
        </section>
    );
};

export default AssetLease;
