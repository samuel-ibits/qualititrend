"use client";

import Button from "@/components/global/Button";
import Input from "@/components/global/Input";
import Stats from "@/components/global/Stats";
import Icons from "@/components/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const pathname = usePathname();

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
            <Link href="/lease-and-sales/">Leases</Link>
            <span>
              <Icons.CaretIcon className="fill-black-900 transform -rotate-90" />
            </span>
            <span className="capitalize text-primary">
              {pathname?.split("/")[2]?.replace("-", " ")}
            </span>
          </div>
        </div>
      </div>
      <div className="pt-[102px] pb-10">{children}</div>
    </div>
  );
};

export default Layout;
