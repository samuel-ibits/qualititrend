"use client";

import Icons from "@/components/icons";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import NavigationLink from "../NavigationLink";
import Dropdown from "@/components/global/Dropdown";
import { signOut } from "next-auth/react";
import { useContext } from "react";
import { SidebarContext } from "@/store/Provider/SidebarProvider";

const Navigation = () => {
  const pathname = usePathname();

  const router = useRouter();

  const links = [
    {
      name: "Dashboard",
      to: "/dashboard",
      icon: <Icons.DashboardIcon className="fill-inherit" />,
    },
    {
      name: "Projects",
      to: "/projects",
      icon: <Icons.ProjectsIcon className="fill-inherit" />,
      children: [
        {
          name: "Projects",
          to: "/projects",
        },
        {
          name: "Ongoing Projects",
          to: "/projects/ongoing-projects",
        },
        {
          name: "Completed Projects",
          to: "/projects/completed-projects",
        },
      ],
    },
    {
      name: "Warehouse",
      to: "/warehouse/purchase-order",
      icon: <Icons.WarehouseIcon className="fill-inherit" />,
      children: [
        {
          name: "Warehouse",
          to: "/warehouse/purchase-order",
          absoluteRoute: "/warehouse",
        },
        {
          name: "Product List",
          to: "/warehouse/product-list/warehouse-inventory",
        },
        {
          name: "Warehouse Activities",
          to: "/warehouse/warehouse-activities",
        },
      ],
    },
    {
      name: "Requests",
      to: "/requests",
      icon: <Icons.RequestsIcon className="fill-inherit" />,
    },
    {
      name: "People",
      to: "/people",
      icon: <Icons.PeopleIcon className="fill-inherit" />,
      children: [
        {
          name: "Customers",
          to: "/people/customers",
        },
        {
          name: "Suppliers",
          to: "/people/suppliers",
        },
        {
          name: "Staff",
          to: "/people/staff",
        },
      ],
    },
    {
      name: "Finances",
      to: "/finances/income",
      absoluteRoute: "/finances",
      icon: <Icons.FinancesIcon className="fill-inherit" />,
    },
    {
      name: "Lease & Sales",
      to: "/lease-and-sales/sales",
      icon: <Icons.LeaseIcon className="fill-inherit" />,
    },
    {
      name: "Reports",
      to: "/reports",
      icon: <Icons.ReportsIcon className="fill-inherit" />,
    },
    {
      name: "Settings",
      to: "/settings",
      icon: <Icons.SettingsIcon className="fill-inherit" />,
    },
  ];

  const mobileLinks = [
    {
      name: "Dashboard",
      to: "/dashboard",
      icon: <Icons.DashboardIcon className="fill-inherit" />,
    },
    {
      name: "Projects",
      to: "/projects",
      icon: <Icons.ProjectsIcon className="fill-inherit" />,
    },
    {
      name: "Finances",
      to: "/finances/income",
      icon: <Icons.FinancesIcon className="fill-inherit" />,
    },
    {
      name: "Settings",
      to: "/settings",
      icon: <Icons.SettingsIcon className="fill-inherit" />,
    },
  ];

  const dropdownButtons = [
    {
      label: "Create New Project",
      onClick: () => {},
    },
    {
      label: "Create Offer Letter",
      onClick: () => {},
    },
    {
      label: "Create Expenses",
      onClick: () => {},
    },
    {
      label: "Create Invoice",
      onClick: () => {},
    },
    {
      label: "Approve Requests",
      onClick: () => {},
    },
    {
      label: "Create Purchase Order",
      onClick: () => {},
    },
    {
      label: "Create Material Transfer",
      onClick: () => {},
    },
    {
      label: "Item Lease",
      onClick: () => {},
    },
    {
      label: "Item Sales",
      onClick: () => {},
    },
  ];

  const sidebar_context = useContext(SidebarContext);

  return (
    <>
      {sidebar_context.is_sidebar_open && (
        <div
          className="fixed inset-0 bg-black-900/20 backdrop-blur-sm z-[60]"
          onClick={() => {
            sidebar_context.setIsSidebarOpen(false);
          }}
        />
      )}
      <nav
        className={cn(
          "max-md:z-[60] transition-default flex gap-2 flex-col justify-between w-[278px] h-screen fixed bg-[#173E62] py-5 overflow-y-auto",
          { "max-lg:-translate-x-[278px]": !sidebar_context.is_sidebar_open },
        )}
      >
        <Link
          href="/dashboard"
          className="flex justify-center items-center pb-6"
        >
          <Icons.Logo className="w- h-[74px]" />
        </Link>
        <div className="flex flex-col justify-between">
          <ul className="px-2.5 space-y-2 mt-8">
            {links.map((link) => {
              return <NavigationLink key={link.name} link={link} />;
            })}
          </ul>
        </div>

        <div className="px-2.5">
          <button
            onClick={async () => {
              await signOut({
                redirect: false,
              });
              router.push("/auth/login");
            }}
            className={cn(
              "block transition-all rounded-lg w-full text-white px-4 py-3",
            )}
          >
            <div className="flex items-center space-x-6">
              <div className={cn("fill-white transition-all", {})}>
                <Icons.LogoutIcon className="fill-inherit" />
              </div>
              <div className="">Logout</div>
            </div>
            <div></div>
          </button>
        </div>
      </nav>
      <div className="relative">
        <nav className="lg:hidden bg-[#173E62] w-screen fixed z-50 bottom-0 left-0 right-0">
          <div className="flex items-center space-x-8 justify-between py-2">
            <ul className="flex items-center">
              {mobileLinks.slice(0, 2).map((link) => {
                return (
                  <NavigationLink is_bottom_nav key={link.name} link={link} />
                );
              })}
            </ul>
            <ul className="flex items-center">
              {mobileLinks.slice(2, 4).map((link) => {
                return (
                  <NavigationLink is_bottom_nav key={link.name} link={link} />
                );
              })}
            </ul>
          </div>
          <div className="flex justify-center items-center absolute -top-1/2 left-1/2 transform -translate-x-1/2 size-16 rounded-full bg-white">
            <Dropdown
              trigger={(open) => (
                <button className="flex justify-center fixed z-[500] left-1/2 -translate-x-1/2 bg-white top-1/2 -translate-y-1/2 items-center drop-shadow-2xl border-2 border-gray-100 size-14 rounded-full">
                  <Icons.PlusIcon
                    className={cn("fill-primary transition-all size-4", {
                      "rotate-[135deg]": open,
                    })}
                  />
                </button>
              )}
              position="top"
              className="-left-[90px] bottom-3 rounded-md"
            >
              <div className="w-[180px] bg-white rounded-md">
                {dropdownButtons.map((button, index) => (
                  <button
                    key={index}
                    onClick={button.onClick}
                    className="flex text-[#2B2B29] w-full dropdown-item hover:bg-[#FFE2D2] transition-all text-xs items-center justify-between p-3 border-b last:border-b-0 border-[#CBCFD3]"
                  >
                    {button.label}
                  </button>
                ))}
              </div>
            </Dropdown>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navigation;
