"use client";

import Button from "@/components/global/Button";
import Input from "@/components/global/Input";
import Stats from "@/components/global/Stats";
import Tab from "@/components/global/Tab";
import Icons from "@/components/icons";
import { cn, formatAmount } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const pathname = usePathname();

  const routes = [
    {
      name: "Sales",
      path: "/lease-and-sales/sales",
    },
    {
      name: "Invoice",
      path: "/lease-and-sales/invoices",
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
      value: formatAmount(+100, "NGN"),
    },
    {
      title: "Total Oustanding",
      value: formatAmount(+10000, "NGN"),
    },
  ];

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
            <span className="capitalize text-black-900">Leases</span>
            <span>
              <Icons.CaretIcon className="fill-black-900 transform -rotate-90" />
            </span>
            <span className="capitalize text-black-900">Invoice</span>
            <span>
              <Icons.CaretIcon className="fill-black-900 transform -rotate-90" />
            </span>
            <span className="capitalize text-primary">Invoice Details</span>
          </div>
        </div>
      </div>
      <div className="flex justify-between gap-6 items-center mb-10 lg:justify-end">
        <button>
          <Icons.EditFillBorderIcon />
        </button>
        <button>
          <Icons.DownloadIcon />
        </button>
        <button>
          <Icons.MailBoxIcon />
        </button>
        <button>
          <Icons.PDFIcon />
        </button>
        <button>
          <Icons.PrinterIcon />
        </button>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default Layout;
