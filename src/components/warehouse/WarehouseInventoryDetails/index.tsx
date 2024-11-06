import Button from "@/components/global/Button";
import Input from "@/components/global/Input";
import Status, { StatusType } from "@/components/global/Status";
import { cn, formatAmount } from "@/lib/utils";
import { FetchWareHouseProductData } from "@/types/services/warehouse";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

type Props = {
    data: FetchWareHouseProductData
}
const WarehouseInventoryDetails = ({data}:Props) => {
    const product = [
        {
            label: "ID",
            value: data.item_code,
        },
        {
            label: "Item Name",
            value: data.name,
        },
        {
            label: "Item Category",
            value: data.item_category,
        },
        {
            label: "Status",
            value: data.item_status,
        },
        {
            label: "Quantity",
            value: 0,
        },
        {
            label: "Item Cost",
            value: formatAmount(+data.cost, "NGN", false)
        },
        {
            label: "Total Value",
            value: formatAmount(+data.cost, "NGN", false)
        },
    ];


    const methods = useForm({
        defaultValues: {
            notes: "",
        },
    });

    const {
        formState: { errors, isValid },
    } = methods;

    const onSubmit: SubmitHandler<any> = async (payload) => {
        try {
        } catch (err) { }
    };

    return (
        <div className="">
            <section className="mb-10">
                <h3 className='bg-[#FFF0E5] max-lg:mb-4 p-2.5 lg:py-4 lg:px-5 lg:text-xl font-semibold'>
                    Warehouse Inventory Detail
                </h3>
                <ul className='grid grid-cols-1 max-lg:rounded bg-white max-lg:drop-shadow-md lg:grid-cols-2 max-lg:py-4 lg:mt-10 gap-y-5 lg:gap-6 px-5'>
                    {product.map((item, index) => {
                        return (
                            <li
                                key={index}
                                className='max-lg:text-sm max-lg:space-y-2 lg:flex items-center'>
                                <div className='w-52 text-black-500'>{item.label}:</div>
                                <div
                                    className={cn("font-semibold lg:w-[calc(100%-230px)]", {
                                        "text-primary": index === 0,
                                    })}>
                                    {
                                        item.value
                                    }
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </section>
            <section className="mb-10">
                <h3 className='bg-[#FFF0E5] max-lg:mb-4 p-2.5 lg:py-4 lg:px-5 lg:text-xl font-semibold'>
                    History
                </h3>
            </section>
            <section className="mb-10">
                <h3 className='max-lg:mb-4 p-2.5 lg:py-4 lg:px-5 lg:text-xl font-semibold'>
                    Notes
                </h3>
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)} className='w-full'>
                        <Input
                            name='notes'
                            placeholder='Additional Note or Comments'
                            tag='textarea'
                        />
                        <div className="flex items-center justify-center mt-10">
                            <Button type="submit" className="w-[250px]">Request</Button>
                        </div>
                    </form>
                </FormProvider>
            </section>
        </div>
    )
}

export default WarehouseInventoryDetails
