"use client";

import Button from "@/components/global/Button";
import Input from "@/components/global/Input";
import Stats from "@/components/global/Stats";
import Icons from "@/components/icons";
import { cn, formatAmount } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";

type RequestsLayoutProps = {
    children: React.ReactNode;
};

const RequestsLayout = ({ children }: RequestsLayoutProps) => {
    const pathname = usePathname();

    const methods = useForm({
        mode: "onChange",
        defaultValues: {
            search: "",
        },
    });

    const {
        formState: { errors },
        watch,
    } = methods;

    const stats = [
        {
            title: "Total Approved",
            value: formatAmount(+350000000, "NGN"),
        },
        {
            title: "Total Denied",
            value: formatAmount(+50000000, "NGN"),
        },
        {
            title: "Total Pending",
            value: formatAmount(+300000000, "NGN"),
        },
    ];

    return (
        <div>
            <div className='lg:flex lg:space-x-5 justify-between'>
                <div>
                    <h1 className='lg:text-2xl font-semibold'>Requests</h1>
                    <div className='text-sm lg:text-sm text-black-500 font-Roboto flex items-center space-x-3 mt-1'>
                        <Link href='/dashboard'>Dashboard</Link>
                        <span>
                            <Icons.CaretIcon className='fill-black-900 transform -rotate-90' />
                        </span>
                        <Link href='/requests'>Requests</Link>
                        <span>
                            <Icons.CaretIcon className='fill-black-900 transform -rotate-90' />
                        </span>
                        <span className='capitalize text-primary'>
                            {pathname?.split("/")[2]?.replace("-", " ")}
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
                    <div className='flex items-center space-x-5 lg:space-x-6'>
                        <FormProvider {...methods}>
                            <form className='lg:!ml-0 flex-1'>
                                <div className='lg:w-[300px]'>
                                    <Input
                                        name='search'
                                        placeholder='Search'
                                        paddingLeft='pl-11'
                                        type='search'
                                        left={
                                            <div className='w-9 pl-3'>
                                                <Icons.SearchIcon />
                                            </div>
                                        }
                                    />
                                </div>
                            </form>
                        </FormProvider>
                        <Button
                            theme='plain'
                            className='border text-black-500 max-lg:px-2.5 h-[42px] border-[#5A5A5A33] rounded'>
                            <div className='flex items-center lg:space-x-2.5'>
                                <Icons.FilterIcon />
                                <div className='max-lg:hidden'>Filter</div>
                                <Icons.CaretIcon className='fill-black-500 max-lg:hidden' />
                            </div>
                        </Button>
                    </div>
                </div>
            </div>
            <div>{children}</div>
        </div>
    );
};

export default RequestsLayout;
