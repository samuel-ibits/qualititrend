"use client";

import Button from "@/components/global/Button";
import Input from "@/components/global/Input";
import Table from "@/components/global/Table";
import Icons from "@/components/icons";
import { cn, formatAmount } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import CreateCustomerModal from "@/components/people/CreateCustomerModal";
import CustomerFilterModal from "@/components/people/CustomerFilterModal";
import Dropdown from "@/components/global/Dropdown";
import EditCustomerModal from "@/components/people/EditCustomerModal";
import ReceiveCustomerPaymentModal from "@/components/people/ReceiveCustomerPaymentModal";
import CreateCustomerOfferLetterModal from "@/components/people/CreateCustomerOfferLetterModal";

const Customers = () => {
  const router = useRouter();
  const [showCustomerFilterModal, setShowCustomerFilterModal] = useState(false);
  const [showCreateCustomerModal, setShowCreateCustomerModal] = useState(false);
  const [showEditCustomerModal, setShowEditCustomerModal] = useState(false);
  const [showReceiveCustomerPaymentModal, setShowReceiveCustomerPaymentModal] =
    useState(false);
  const [showOfferLetterModal, setShowOfferLetterModal] = useState(false);

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

  const data = [
    {
      id: "CUS_001",
      customerName: "Jane Doe",
      customer: "Individual Customer",
      projects: 5,
      balance: 1000000,
      actions: "",
    },
    {
      id: "CUS_001",
      customerName: "Jane Doe",
      customer: "Individual Customer",
      projects: 5,
      balance: 1000000,
      actions: "",
    },
    {
      id: "CUS_001",
      customerName: "Jane Doe",
      customer: "Individual Customer",
      projects: 5,
      balance: 1000000,
      actions: "",
    },
    {
      id: "CUS_001",
      customerName: "Jane Doe",
      customer: "Individual Customer",
      projects: 5,
      balance: 1000000,
      actions: "",
    },
    {
      id: "CUS_001",
      customerName: "Jane Doe",
      customer: "Individual Customer",
      projects: 5,
      balance: 1000000,
      actions: "",
    },
    {
      id: "CUS_001",
      customerName: "Jane Doe",
      customer: "Individual Customer",
      projects: 5,
      balance: 1000000,
      actions: "",
    },
    {
      id: "CUS_001",
      customerName: "Jane Doe",
      customer: "Individual Customer",
      projects: 5,
      balance: 1000000,
      actions: "",
    },
    {
      id: "CUS_001",
      customerName: "Jane Doe",
      customer: "Individual Customer",
      projects: 5,
      balance: 1000000,
      actions: "",
    },
    {
      id: "CUS_001",
      customerName: "Jane Doe",
      customer: "Individual Customer",
      projects: 5,
      balance: 1000000,
      actions: "",
    },
    {
      id: "CUS_001",
      customerName: "Jane Doe",
      customer: "Individual Customer",
      projects: 5,
      balance: 1000000,
      actions: "",
    },
    {
      id: "CUS_001",
      customerName: "Jane Doe",
      customer: "Individual Customer",
      projects: 5,
      balance: 1000000,
      actions: "",
    },
    {
      id: "CUS_001",
      customerName: "Jane Doe",
      customer: "Individual Customer",
      projects: 5,
      balance: 1000000,
      actions: "",
    },
  ];

  const tableHeadData = [
    {
      title: "ID",
      key: "id",
    },
    {
      title: "Customer Name",
      key: "customerName",
    },
    {
      title: "Customer",
      key: "customer",
    },
    {
      title: "Projects",
      key: "projects",
    },
    {
      title: "Balance",
      key: "balance",
    },
    {
      title: "Actions",
      key: "action",
    },
  ];

  const dropdownButtons = [
    {
      label: "Edit",
      onClick: () => setShowEditCustomerModal(true),
    },
    {
      label: "Archive",
      onClick: () => {},
    },
    {
      label: "Create Offer Letter",
      onClick: () => setShowOfferLetterModal(true),
    },
    {
      label: "Receive Payment",
      onClick: () => setShowReceiveCustomerPaymentModal(true),
    },
  ];

  return (
    <div>
      <div className="lg:flex lg:space-x-5 justify-between mb-8">
        <div>
          <h1 className="lg:text-2xl font-semibold">Warehouse</h1>
          <div className="text-sm lg:text-sm text-black-500 font-Roboto flex items-center space-x-3 mt-1">
            <Link href="/dashboard">
              <span className="hidden lg:block">Dashboard</span>
              <Icons.DashboardIcon className="fill-black-500 lg:hidden" />
            </Link>
            <span>
              <Icons.CaretIcon className="fill-black-900 transform -rotate-90" />
            </span>
            <span className="text-primary">Customers</span>
          </div>
          <div className="mt-6">
            <h2 className="text-sm lg:text-base">
              Total Customers:{" "}
              <span className="text-primary font-semibold">100</span>
            </h2>
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
              onClick={() => setShowCustomerFilterModal(true)}
              theme="plain"
              className="border text-black-500 max-lg:px-2.5 border-[#5A5A5A33] rounded"
            >
              <div className="flex items-center lg:space-x-2.5">
                <Icons.FilterIcon />
                <div className="max-lg:hidden">Filter</div>
                <Icons.CaretIcon className="fill-black-500 max-lg:hidden" />
              </div>
            </Button>
          </div>
          <div className="flex justify-between items-center lg:space-x-6 lg:justify-end">
            <Button
              className="w-[200px] max-lg:h-9"
              onClick={() => setShowCreateCustomerModal(true)}
            >
              <div className="flex items-center space-x-3">
                <Icons.PlusIcon className="fill-white size-3.5" />
                <div>Add Customer</div>
              </div>
            </Button>
            <button>
              <Icons.ProjectDocumentIcon />
            </button>
            <button>
              <Icons.ProjectDocumentIcon />
            </button>
          </div>
        </div>
      </div>
      <Table
        data={data!}
        loaderLength={10}
        tableHeadData={tableHeadData}
        rowComponent={(transaction, index, length) => {
          const { id, customerName, customer, projects, balance } = transaction;
          return (
            <tr
              className={cn("text-sm border-[#5A5A5A99]", {
                "border-b": index !== length - 1,
              })}
            >
              <td className="p-4 text-black-500 whitespace-nowrap">{id}</td>
              <td className="p-4 text-black-500 whitespace-nowrap">
                {customerName}
              </td>
              <td className="p-4 text-black-500 whitespace-nowrap">
                {customer}
              </td>
              <td className="p-4 text-black-500 whitespace-nowrap">
                {projects}
              </td>
              <td className="py-[18px] w-[100px] px-4 text-black-500 whitespace-nowrap">
                {formatAmount(+balance, "NGN")}
              </td>
              <td className="p-4">
                <Dropdown
                  trigger={() => (
                    <button className="flex justify-center items-center">
                      <Icons.MoreIcon />
                    </button>
                  )}
                  className="-left-24 top-14"
                >
                  <div className="w-[240px] bg-white rounded-md">
                    <button
                      key={index}
                      onClick={() => router.push("/people/" + id + "/customer")}
                      className="flex w-full dropdown-item hover:bg-[#FFE2D2] transition-all text-sm items-center justify-between p-3 border-b last:border-b-0 border-[#CBCFD3]"
                    >
                      View
                    </button>
                    {dropdownButtons.map((button, index) => (
                      <button
                        key={index}
                        onClick={button.onClick}
                        className="flex w-full dropdown-item hover:bg-[#FFE2D2] transition-all text-sm items-center justify-between p-3 border-b last:border-b-0 border-[#CBCFD3]"
                      >
                        {button.label}
                      </button>
                    ))}
                  </div>
                </Dropdown>
              </td>
            </tr>
          );
        }}
      />
      <CustomerFilterModal
        showModal={showCustomerFilterModal}
        setShowModal={setShowCustomerFilterModal}
      />
      <CreateCustomerModal
        showModal={showCreateCustomerModal}
        setShowModal={setShowCreateCustomerModal}
      />
      <EditCustomerModal
        showModal={showEditCustomerModal}
        setShowModal={setShowEditCustomerModal}
      />
      <ReceiveCustomerPaymentModal
        showModal={showReceiveCustomerPaymentModal}
        setShowModal={setShowReceiveCustomerPaymentModal}
      />
      <CreateCustomerOfferLetterModal
        showModal={showOfferLetterModal}
        setShowModal={setShowOfferLetterModal}
      />
    </div>
  );
};

export default Customers;
