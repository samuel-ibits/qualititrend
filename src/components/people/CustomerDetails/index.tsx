"use client"

import Button from "@/components/global/Button";
import Input from "@/components/global/Input";
import Stats from "@/components/global/Stats";
import Status, { StatusType } from "@/components/global/Status";
import Table from "@/components/global/Table";
import Icons from "@/components/icons";
import { cn, formatAmount } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import EditCustomerModal from "../EditCustomerModal";

const CustomerDetails = () => {
    const [showEditCustomerModal, setShowEditCustomerModal] = useState(false)

    const pathname = usePathname()
    const data = [
        {
            label: "Customer ID",
            value: "PURO_0001",
        },
        {
            label: "Full Name",
            value: "Jane Doe",
        },
        {
            label: "Customer Type",
            value: "Individual Customer"
        },
        {
            label: "Email Address",
            value: "janedoe@info.com",
        },
        {
            label: "NIN",
            value: "A9938972839933",
        },
        {
            label: "Phone Number",
            value: "+234900000000",
        },
        {
            label: "Project Code",
            value: "Proj/Wuse_001",
        },
        {
            label: "Address",
            value: "No 12 Sokoto Street, Gwarimpa, Abuja",
        },
    ];

    const tableData = [
        {
            projectCode: "PRO_001",
            projectManager: "Jane Doe",
            budget: formatAmount(63505000, "NGN"),
            startDate: "09 April 2023",
            endDate: "25 November 2023",
            status: "ongoing"
        },
        {
            projectCode: "PRO_001",
            projectManager: "Jane Doe",
            budget: formatAmount(63505000, "NGN"),
            startDate: "09 April 2023",
            endDate: "25 November 2023",
            status: "completed"
        },
        {
            projectCode: "PRO_001",
            projectManager: "Jane Doe",
            budget: formatAmount(63505000, "NGN"),
            startDate: "09 April 2023",
            endDate: "25 November 2023",
            status: "completed"
        },
        {
            projectCode: "PRO_001",
            projectManager: "Jane Doe",
            budget: formatAmount(63505000, "NGN"),
            startDate: "09 April 2023",
            endDate: "25 November 2023",
            status: "ongoing"
        },
        {
            projectCode: "PRO_001",
            projectManager: "Jane Doe",
            budget: formatAmount(63505000, "NGN"),
            startDate: "09 April 2023",
            endDate: "25 November 2023",
            status: "ongoing"
        },
    ];

    const tableHeadData = [
        {
            title: "Project Code",
            key: "projectCode",
        },
        {
            title: "Project Manager",
            key: "projectManager",
        },
        {
            title: "Budget",
            key: "budget",
        },
        {
            title: "Start Date",
            key: "startDate",
        },
        {
            title: "End Date",
            key: "endDate",
        },
        {
            title: "Status",
            key: "status",
        },
    ];

    const transactionTableData = [
        {
            transactionId: "INV_001",
            transaction: "Income",
            sourceDestination: "General Account",
            amount: formatAmount(63505000, "NGN"),
            date: "25 November 2023",
        },
        {
            transactionId: "INV_001",
            transaction: "Income",
            sourceDestination: "General Account",
            amount: formatAmount(63505000, "NGN"),
            date: "25 November 2023",
        },
        {
            transactionId: "INV_001",
            transaction: "Income",
            sourceDestination: "General Account",
            amount: formatAmount(63505000, "NGN"),
            date: "25 November 2023",
        },
        {
            transactionId: "INV_001",
            transaction: "Income",
            sourceDestination: "General Account",
            amount: formatAmount(63505000, "NGN"),
            date: "25 November 2023",
        },
        {
            transactionId: "INV_001",
            transaction: "Income",
            sourceDestination: "General Account",
            amount: formatAmount(63505000, "NGN"),
            date: "25 November 2023",
        },

    ];

    const transactionTableHeadData = [
        {
            title: "Transaction ID",
            key: "transactionId",
        },
        {
            title: "Transaction",
            key: "transaction",
        },
        {
            title: "Source/Destination",
            key: "sourceDestination",
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

    const stats = [
        {
            title: "Total Paid",
            value: formatAmount(+350000000, "NGN"),
        },
        {
            title: "Total Owing",
            value: formatAmount(+50000000, "NGN"),
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
            <div className='lg:flex lg:space-x-5 justify-between items-center'>
                <div className="">
                    <h1 className='lg:text-2xl font-semibold'>Customers</h1>
                    <div className='text-sm lg:text-sm text-black-500 font-Roboto flex items-center space-x-3 mt-1'>
                        <Link href='/dashboard'>Dashboard</Link>
                        <span>
                            <Icons.CaretIcon className='fill-black-900 transform -rotate-90' />
                        </span>
                        <Link href='/people/customers'>Customers</Link>
                        <span>
                            <Icons.CaretIcon className='fill-black-900 transform -rotate-90' />
                        </span>
                        <span className='capitalize text-primary'>
                            {pathname?.split("/")[3]?.replace("-", " ")} Detail
                        </span>
                    </div>
                    <div className='mt-6'>
                        <section className='lg:grid lg:grid-cols-1 lg:gap-8 max-lg:space-y-4'>
                            <div className='col-span-2 space-y-6'>
                                <Stats altStats stats={stats} showMobileTitle={false} />
                            </div>
                        </section>
                    </div>
                </div>
                <div className='space-y-4 lg:space-y-6 max-lg:mt-4'>
                    <div className='flex justify-between items-center lg:space-x-10 lg:justify-end'>
                        <button>
                            <Icons.ProjectDocumentIcon />
                        </button>
                        <button>
                            <Icons.ProjectDocumentIcon />
                        </button>
                        <button>
                            <Icons.ProjectDocumentIcon />
                        </button>
                    </div>
                </div>
            </div>
            <section className="my-10">
                <h3 className='bg-[#FFF0E5] max-lg:mb-4 p-2.5 lg:py-4 lg:px-5 lg:text-xl font-semibold'>
                    Customer's Information
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
                                        "text-primary": index === 0 || index === 2,
                                    })}>
                                    {item.value}
                                </div>
                            </li>
                        );
                    })}
                </ul>
                <div className="flex items-center justify-center w-full mt-14">
                    <Button className="w-[250px]" onClick={() => setShowEditCustomerModal(true)}>Edit</Button>
                </div>
            </section>
            <section className="mb-10">
                <h3 className='max-lg:mb-4 py-2.5 lg:py-4 lg:text-xl font-semibold'>
                    Project List
                </h3>
                <Table
                    data={tableData!}
                    loaderLength={10}
                    tableHeadData={tableHeadData}
                    rowComponent={(project, index, length) => {
                        const {
                            projectCode,
                            projectManager,
                            budget,
                            startDate,
                            endDate,
                            status
                        } = project;
                        return (
                            <tr
                                className={cn("text-sm border-[#5A5A5A99]", {
                                    "border-b": index !== length - 1,
                                })}>
                                <td className='p-4 text-black-500 whitespace-nowrap'>{projectCode}</td>
                                <td className='p-4 text-black-500 whitespace-nowrap'>
                                    {projectManager}
                                </td>
                                <td className='p-4 text-black-500 whitespace-nowrap'>
                                    {budget}
                                </td>
                                <td className='p-4 text-black-500 whitespace-nowrap'>
                                    {startDate}
                                </td>
                                <td className='p-4 text-black-500 whitespace-nowrap'>
                                    {endDate}
                                </td>
                                <td className='p-4 text-black-500 whitespace-nowrap'>
                                    <Status status={status as StatusType} />
                                </td>
                            </tr>
                        );
                    }}
                />
            </section>
            <section className="mb-10">
                <div className='max-lg:mb-4 py-2.5 lg:py-4 flex items-center justify-between'>
                    <h3 className="lg:text-xl font-semibold">Recent Transaction History</h3>
                    <Link href="" className="text-sm font-semibold underline text-primary">View All</Link>
                </div>
                <Table
                    data={transactionTableData!}
                    loaderLength={10}
                    tableHeadData={transactionTableHeadData}
                    rowComponent={(transactionHistory, index, length) => {
                        const {
                            transactionId,
                            transaction,
                            sourceDestination,
                            amount,
                            date,
                        } = transactionHistory;
                        return (
                            <tr
                                className={cn("text-sm border-[#5A5A5A99]", {
                                    "border-b": index !== length - 1,
                                })}>
                                <td className='p-4 text-black-500 whitespace-nowrap'>{transactionId}</td>
                                <td className='p-4 text-black-500 whitespace-nowrap'>
                                    {transaction}
                                </td>
                                <td className='p-4 text-black-500 whitespace-nowrap'>
                                    {sourceDestination}
                                </td>
                                <td className='p-4 text-black-500 whitespace-nowrap'>
                                    {amount}
                                </td>
                                <td className='p-4 text-black-500 whitespace-nowrap'>
                                    {date}
                                </td>

                            </tr>
                        );
                    }}
                />
            </section>
            <EditCustomerModal
                showModal={showEditCustomerModal}
                setShowModal={setShowEditCustomerModal}
            />
        </div>
    )
}

export default CustomerDetails