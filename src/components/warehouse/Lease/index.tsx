"use client";

import Button from "@/components/global/Button";
import Status, { StatusType } from "@/components/global/Status";
import Table from "@/components/global/Table";
import { cn, formatAmount } from "@/lib/utils";
import { useForm } from "react-hook-form";

const WarehouseLease = () => {
    const methods = useForm();
    const data = [
        {
            id: "PO_23_1",
            itemName: "Sofa",
            quantityLeased: 100,
            pickUpDate: "01 Jun 2023",
            expectedReturnDate: "12 Jul 2023",
            actualReturnDate: "22 Jul 2023",
            confirm: "Confirm"
        },
        {
            id: "PO_23_1",
            itemName: "Sofa",
            quantityLeased: 100,
            pickUpDate: "01 Jun 2023",
            expectedReturnDate: "12 Jul 2023",
            actualReturnDate: "22 Jul 2023",
            confirm: "Confirmed"
        },
        {
            id: "PO_23_1",
            itemName: "Sofa",
            quantityLeased: 100,
            pickUpDate: "01 Jun 2023",
            expectedReturnDate: "12 Jul 2023",
            actualReturnDate: "22 Jul 2023",
            confirm: "Confirmed"
        },
        {
            id: "PO_23_1",
            itemName: "Sofa",
            quantityLeased: 100,
            pickUpDate: "01 Jun 2023",
            expectedReturnDate: "12 Jul 2023",
            actualReturnDate: "22 Jul 2023",
            confirm: "Confirm"
        },
        {
            id: "PO_23_1",
            itemName: "Sofa",
            quantityLeased: 100,
            pickUpDate: "01 Jun 2023",
            expectedReturnDate: "12 Jul 2023",
            actualReturnDate: "22 Jul 2023",
            confirm: "Confirm"
        },
        {
            id: "PO_23_1",
            itemName: "Sofa",
            quantityLeased: 100,
            pickUpDate: "01 Jun 2023",
            expectedReturnDate: "12 Jul 2023",
            actualReturnDate: "22 Jul 2023",
            confirm: "Confirm"
        },
        {
            id: "PO_23_1",
            itemName: "Sofa",
            quantityLeased: 100,
            pickUpDate: "01 Jun 2023",
            expectedReturnDate: "12 Jul 2023",
            actualReturnDate: "22 Jul 2023",
            confirm: "Confirm"
        },
        {
            id: "PO_23_1",
            itemName: "Sofa",
            quantityLeased: 100,
            pickUpDate: "01 Jun 2023",
            expectedReturnDate: "12 Jul 2023",
            actualReturnDate: "22 Jul 2023",
            confirm: "Confirmed"
        },
    ];

    const tableHeadData = [
        {
            title: "Invoice ID",
            key: "id",
        },
        {
            title: "Item Name",
            key: "itemName",
        },
        {
            title: "Quantity Leased",
            key: "quantityLeased",
        },
        {
            title: "Pick-up Date",
            key: "pickUpDate",
        },
        {
            title: "Expected Return Date",
            key: "expectedReturnDate",
        },
        {
            title: "Actual Return Date",
            key: "actualReturnDate",
        },
        {
            title: "",
            key: "confirm",
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
                        itemName,
                        quantityLeased,
                        pickUpDate,
                        expectedReturnDate,
                        actualReturnDate,
                        confirm
                    } = transaction;
                    return (
                        <tr
                            onClick={() => { }}
                            className={cn("text-sm border-[#5A5A5A99]", {
                                "border-b": index !== length - 1,
                            })}>
                            <td className='p-4 text-black-500 whitespace-nowrap'>{id}</td>
                            <td className='p-4 text-black-500 whitespace-nowrap'>
                                {itemName}
                            </td>
                            <td className='py-[18px] w-[100px] px-4 text-black-500 whitespace-nowrap'>
                                {quantityLeased}
                            </td>
                            <td className='p-4 text-black-500 whitespace-nowrap'>
                                {pickUpDate}
                            </td>
                            <td className='p-4 text-black-500 whitespace-nowrap'>
                                {expectedReturnDate}
                            </td>
                            <td className='p-4 text-black-500 whitespace-nowrap'>
                                {actualReturnDate}
                            </td>
                            <td className='p-4'>
                                {confirm === "Confirm" ? (
                                    <Button className="bg-[#FFE2D2] text-primary border-none" size="sm">
                                        Confirm
                                    </Button>
                                ) : (
                                    <Button className="bg-[#008000] border-none" size="sm">
                                        Confirmed
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

export default WarehouseLease;
