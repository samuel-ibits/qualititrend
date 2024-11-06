import Button from "@/components/global/Button";
import Input from "@/components/global/Input";
import Loader from "@/components/global/Loader";
import Status, { StatusType } from "@/components/global/Status";
import Table from "@/components/global/Table";
import { cn, formatAmount, formatDate } from "@/lib/utils";
import { useFetchSupplyRequestDetailsQuery } from "@/services/warehouse";
import { useParams } from "next/navigation";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

const WarehouseSupplyDetails = () => {

    const params = useParams()
    const { data: __data, isLoading, isError, error } = useFetchSupplyRequestDetailsQuery({ id: params.id as string })

    const methods = useForm({
        defaultValues: {
            notes: "",
        },
    });

    const {
        formState: { errors, isValid },
    } = methods;

    if (isLoading) {
        return (
            <Loader />
        )
    }


    const _data = __data?.data


    if (!_data) {
        return (
            <p>
                Error loading Expense
            </p>
        )
    }

    const data = [
        /* { */
        /*     label: "Warehouse Supply Request ID", */
        /*     value: _data.supply_request.id */
        /* }, */
        {
            label: "Warehouse Supply Request Reference",
            value: _data.supply_request.reference
        },
        {
            label: "Project ID",
            value: _data.supply_request.project_id
        },
        {
            label: "Requester",
            value:
                _data.supply_request.requester
        },
        {
            label: "Status",
            value: _data.supply_request.status,
            isStatus: true,
        },
        {
            label: "Date Created",
            value: formatDate(_data.supply_request.created_at)
        },
    ];

    const tableData = __data.data.items

    const tableHeadData = [
        {
            title: "Item Name",
            key: "materialName",
        },
        {
            title: "Category",
            key: "category",
        },
        {
            title: "Quantity",
            key: "quantity",
        },
    ];


    const onSubmit: SubmitHandler<any> = async (payload) => {
        try {
        } catch (err) { }
    };

    return (
        <div className="">
            <section className="mb-10">
                <h3 className='bg-[#FFF0E5] max-lg:mb-4 p-2.5 lg:py-4 lg:px-5 lg:text-xl font-semibold'>
                    Warehouse Supply Detail
                </h3>
                <ul className='grid grid-cols-1 max-lg:rounded bg-white max-lg:drop-shadow-md lg:grid-cols-2 max-lg:py-4 lg:mt-10 gap-y-5 lg:gap-6 px-5'>
                    {data.map((item, index) => {
                        return (
                            <li
                                key={index}
                                className='max-lg:text-sm max-lg:space-y-2 lg:flex items-center'>
                                <div className='w-52 text-black-500'>{item.label}:</div>
                                <div
                                    className={cn("font-semibold lg:w-[calc(100%-230px)]", {
                                        "text-primary": index === 0,
                                    })}>
                                    {item.isStatus ? (
                                        <Status status={item.value as StatusType} />
                                    ) : (
                                        item.value
                                    )}
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </section>
            <section className="mb-10">
                <h3 className='max-lg:mb-4 py-2.5 lg:py-4 lg:text-xl font-semibold'>
                    Items Requested
                </h3>
                <Table
                    data={tableData!}
                    loaderLength={10}
                    tableHeadData={tableHeadData}
                    rowComponent={(transaction, index, length) => {
                        const {
                            item_name,
                            category,
                            quantity,
                        } = transaction;
                        return (
                            <tr
                                className={cn("text-sm border-[#5A5A5A99]", {
                                    "border-b": index !== length - 1,
                                })}>
                                <td className='p-4 text-black-500 whitespace-nowrap'>{item_name}</td>
                                <td className='p-4 text-black-500 whitespace-nowrap'>
                                    {category}
                                </td>
                                <td className='p-4 text-black-500 whitespace-nowrap'>
                                    {quantity}
                                </td>
                            </tr>
                        );
                    }}
                />
            </section>
            <section className="mb-14">
                <h3 className='max-lg:mb-4 py-2.5 lg:py-4 lg:text-xl font-semibold'>
                    Payment Details
                </h3>
                <div className="lg:flex items-center lg:space-x-52 max-sm:shadow max-sm:space-y-5 max-sm:p-7">
                    <div className="flex items-center max-sm:justify-between space-x-20">
                        <h4 className="text-black-500">Total Disbursed:</h4>
                        <h4 className="font-semibold">{formatAmount(635000, "NGN")}</h4>
                    </div>
                    <div className="flex items-center max-sm:justify-between space-x-20">
                        <h4 className="text-black-500">Total Unpaid:</h4>
                        <h4 className="font-semibold">{formatAmount(635000, "NGN")}</h4>
                    </div>
                </div>
            </section>
            <section className="mb-14">
                <h3 className='bg-[#FFF0E5] max-lg:mb-4 p-2.5 lg:py-4 lg:px-5 lg:text-xl font-semibold'>
                    Supporting Documents
                </h3>
                <div className="grid grid-cols-1 max-lg:rounded bg-white max-lg:drop-shadow-md lg:grid-cols-2 max-lg:py-4 lg:mt-10 gap-y-5 lg:gap-x-10 lg:gap-y-14 px-5">
                    <div className="flex items-center max-sm:justify-between space-x-20">
                        <h4 className="text-primary cursor-pointer underline font-semibold">Avalon_CAC.pdf</h4>
                        <Button>View</Button>
                    </div>
                    <div className="flex items-center max-sm:justify-between space-x-20">
                        <h4 className="text-primary cursor-pointer underline font-semibold">Avalon_CAC.pdf</h4>
                        <Button>View</Button>
                    </div>
                </div>
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

                {/* <FormProvider {...methods}> */}
                {/*     <form onSubmit={methods.handleSubmit(onSubmit)} className='w-full'> */}
                {/*         <Input */}
                {/*             name='notes' */}
                {/*             placeholder='Additional Note or Comments' */}
                {/*             tag='textarea' */}
                {/*         /> */}
                {/*         <div className="flex items-center justify-center mt-10"> */}
                {/*             <div className="lg:flex items-center lg:space-x-5 max-sm:space-y-5 max-sm:flex-row-reverse"> */}
                {/*                 <Button type="submit" className="w-[250px]" theme="outline">Decline</Button> */}
                {/*                 <Button type="submit" className="w-[250px]">Approve</Button> */}
                {/*             </div> */}
                {/*         </div> */}
                {/*     </form> */}
                {/* </FormProvider> */}
            </section>
        </div>
    )
}

export default WarehouseSupplyDetails
