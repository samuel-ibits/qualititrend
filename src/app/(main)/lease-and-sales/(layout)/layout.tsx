"use client";

import Button from "@/components/global/Button";
import Input from "@/components/global/Input";
import Stats from "@/components/global/Stats";
import Tab from "@/components/global/Tab";
import Icons from "@/components/icons";
import { formatAmount } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const pathname = usePathname();
  const [showCreateInvoiceModal, setShowCreateInvoiceModal] = useState(false);
  const [showCreateSalesInvoiceModal, setShowCreateSalesInvoiceModal] =
    useState(false);
  const [showCreateLeaseInvoiceModal, setShowCreateLeaseInvoiceModal] =
    useState(false);

  const routes = [
    {
      name: "Sales",
      path: "/lease-and-sales/sales",
    },
    {
      name: "Invoice",
      path: "/lease-and-sales/invoice",
    },
    {
      name: "Offer Letter",
      path: "/lease-and-sales/offer",
    },
    {
      name: "Asset Lease",
      path: "/lease-and-sales/lease",
    },
  ];

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
      title: "Total Invoice Created",
      value: "8,000",
    },
    {
      title: "Total Invoice Value",
      value: formatAmount(+1500000000, "NGN"),
    },
    {
      title: "Total Customers",
      value: "100",
    },
    {
      title: "Total Oustanding",
      value: formatAmount(+10000, "NGN"),
    },
  ];

  const handleCreateInvoice = () => {
    console.log("create");
  };

  return (
    <div>
      <div className="lg:flex lg:space-x-5 justify-between">
        <div>
          <h1 className="lg:text-2xl font-semibold">Leases & Sales</h1>
          <div className="text-sm lg:text-sm text-black-500 font-Roboto flex items-center space-x-3 mt-1">
            <Link href="/dashboard">Dashboard</Link>

            <span>
              <Icons.CaretIcon className="fill-black-900 transform -rotate-90" />
            </span>
            <span className="capitalize text-primary">Leases</span>
          </div>
          <div className="mt-6">
            <div className="col-span-2 space-y-6">
              <Stats stats={stats} leaseStats showMobileTitle={false} />
            </div>
          </div>
        </div>
        <div className="space-y-4 lg:space-y-6 max-lg:mt-4">
          <div className="flex items-center space-x-5 lg:space-x-6">
            <FormProvider {...methods}>
              <form className="lg:!ml-0 flex-1">
                <div className="lg:w-[300px]">
                  <Input
                    name="search"
                    placeholder="Search"
                    paddingLeft="pl-11"
                    type="search"
                    left={
                      <div className="w-9 pl-3">
                        <Icons.SearchIcon />
                      </div>
                    }
                  />
                </div>
              </form>
            </FormProvider>
            <Button
              theme="plain"
              className="border text-black-500 max-lg:px-2.5 h-[42px] border-[#5A5A5A33] rounded"
            >
              <div className="flex items-center lg:space-x-2.5">
                <Icons.FilterIcon />
                <div className="max-lg:hidden">Filter</div>
                <Icons.CaretIcon className="fill-black-500 max-lg:hidden" />
              </div>
            </Button>
          </div>
          <div className="flex justify-between items-center lg:space-x-10 lg:justify-end">
            <Button
              className="w-[200px] max-lg:h-9"
              onClick={handleCreateInvoice}
            >
              <div className="flex items-center space-x-3">
                <Icons.PlusIcon className="fill-white size-3.5" />
                <div>Create Invoice</div>
              </div>
            </Button>
            <Button theme="outline" className="w-[200px] max-lg:h-9">
              <div className="flex items-center space-x-3">
                <Icons.PlusIcon className="fill-primary size-3.5" />
                <div>Create letter</div>
              </div>
            </Button>
          </div>
        </div>
      </div>
      <div className="my-10">
        <Tab
          routes={routes}
          initialRoute={{
            name: pathname?.split("/")[2]?.replace("-", " "),
            value: `/lease-and-sales/${pathname?.split("/")[2]}`,
          }}
        />
      </div>
      <div>{children}</div>
    </div>
  );
};

export default Layout;
