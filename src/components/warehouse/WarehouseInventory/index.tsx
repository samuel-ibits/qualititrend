"use client";

import SwitchInput from "@/components/global/SwitchInput";
import Table from "@/components/global/Table";
import Icons from "@/components/icons";
import { cn, formatAmount } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { Product } from "@/types/services/warehouse";

type Props = {
    data: Product[]
}

const WarehouseInventory = ({data}:Props) => {
    const methods = useForm();
    const router = useRouter()

    console.log({data})



    const tableHeadData: ({title:string,key: keyof Product | "actions" | "total_value" | "quantity"})[] = [
        {
            title: "ID",
            key: "id",
        },
        {
            title: "Item Name",
            key: "name",
        },
        {
            title: "Item Category",
            key: "category_id",
        },
        {
            title: "Stock Quantity",
            key: "quantity",
        },
        {
            title: "Unit Price",
            key: "cost",
        },
        {
            title: "Total Value",
            key: "total_value",
        },
        {
            title: "Status",
            key: "item_status",
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
                        name,
                        category_id: category,
                        cost,
                        item_status,
                    } = transaction;

                    let quantity = 0
                    let total_value = Number(cost) * quantity

                    return (
                        <tr
                            onClick={() => {
                                router.push("/warehouse/" + id + "/warehouse-inventory");
                            }}
                            className={cn("text-sm border-[#5A5A5A99] cursor-pointer", {
                                "border-b": index !== length - 1,
                            })}>
                            <td className='p-4 text-black-500 whitespace-nowrap'>{id}</td>
                            <td className='p-4 text-black-500 whitespace-nowrap'>
                                {name}
                            </td>
                            <td className='py-[18px] w-[100px] px-4 text-black-500 whitespace-nowrap'>
                                {category}
                            </td>
                            <td className='p-4 text-black-500 whitespace-nowrap'>
                                {quantity || "0"}
                            </td>
                            <td className='p-4 text-black-500 whitespace-nowrap'>
                                {formatAmount(+cost, "NGN")}
                            </td>
                            <td className='p-4 text-black-500 whitespace-nowrap'>
                                {formatAmount(+total_value, "NGN") || "0"}
                            </td>
                            <td className='p-4'>
                                <FormProvider {...methods}>
                                    <form>
                                         {/* @ts-ignore */}
                                        <SwitchInput name="Name" checked={item_status === "enabled"} />
                                    </form>
                                </FormProvider>
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

export default WarehouseInventory;
