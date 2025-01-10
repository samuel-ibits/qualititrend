"use client";

import Button from "@/components/global/Button";
import Status, { StatusType } from "@/components/global/Status";
import Table from "@/components/global/Table";
import Icons from "@/components/icons";
import { cn, formatAmount } from "@/lib/utils";
import { useForm } from "react-hook-form";

const data = [
  {
    id: "INV_23_1",
    customer: "Jamima Smith",
    projectCode: 638292,
    amount: 100000000,
    dateCreated: "12 Jul 2023",
    totalPaid: 900000,
    totalOutstanding: 100000,
    leasedItemReturnDate: "20 Oct 2023",
    dateofLastPayment: "20 Oct 2023",
    action: "",
  },
  {
    id: "INV_23_1",
    customer: "Jamima Smith",
    projectCode: 638292,
    amount: 100000000,
    dateCreated: "12 Jul 2023",
    totalPaid: 900000,
    totalOutstanding: 100000,
    leasedItemReturnDate: "20 Oct 2023",
    dateofLastPayment: "20 Oct 2023",
    action: "",
  },
  {
    id: "INV_23_1",
    customer: "Jamima Smith",
    projectCode: 638292,
    amount: 100000000,
    dateCreated: "12 Jul 2023",
    totalPaid: 900000,
    totalOutstanding: 100000,
    leasedItemReturnDate: "20 Oct 2023",
    dateofLastPayment: "20 Oct 2023",
    action: "",
  },
  {
    id: "INV_23_1",
    customer: "Jamima Smith",
    projectCode: 638292,
    amount: 100000000,
    dateCreated: "12 Jul 2023",
    totalPaid: 900000,
    totalOutstanding: 100000,
    leasedItemReturnDate: "20 Oct 2023",
    dateofLastPayment: "20 Oct 2023",
    action: "",
  },
  {
    id: "INV_23_1",
    customer: "Jamima Smith",
    projectCode: 638292,
    amount: 100000000,
    dateCreated: "12 Jul 2023",
    totalPaid: 900000,
    totalOutstanding: 100000,
    leasedItemReturnDate: "20 Oct 2023",
    dateofLastPayment: "20 Oct 2023",
    action: "",
  },
  {
    id: "INV_23_1",
    customer: "Jamima Smith",
    projectCode: 638292,
    amount: 100000000,
    dateCreated: "12 Jul 2023",
    totalPaid: 900000,
    totalOutstanding: 100000,
    leasedItemReturnDate: "20 Oct 2023",
    dateofLastPayment: "20 Oct 2023",
    action: "",
  },
  {
    id: "INV_23_1",
    customer: "Jamima Smith",
    projectCode: 638292,
    amount: 100000000,
    dateCreated: "12 Jul 2023",
    totalPaid: 900000,
    totalOutstanding: 100000,
    leasedItemReturnDate: "20 Oct 2023",
    dateofLastPayment: "20 Oct 2023",
    action: "",
  },
  {
    id: "INV_23_1",
    customer: "Jamima Smith",
    projectCode: 638292,
    amount: 100000000,
    dateCreated: "12 Jul 2023",
    totalPaid: 900000,
    totalOutstanding: 100000,
    leasedItemReturnDate: "20 Oct 2023",
    dateofLastPayment: "20 Oct 2023",
    action: "",
  },
  {
    id: "INV_23_1",
    customer: "Jamima Smith",
    projectCode: 638292,
    amount: 100000000,
    dateCreated: "12 Jul 2023",
    totalPaid: 900000,
    totalOutstanding: 100000,
    leasedItemReturnDate: "20 Oct 2023",
    dateofLastPayment: "20 Oct 2023",
    action: "",
  },
];

const tableHeadData = [
  {
    title: "ID",
    key: "id",
  },
  {
    title: "Customer",
    key: "customer",
  },
  {
    title: "Project Code",
    key: "projectCode",
  },
  {
    title: "Amount",
    key: "amount",
  },
  {
    title: "Date Created",
    key: "dateCreated",
  },
  {
    title: "Total Paid",
    key: "totalPaid",
  },
  {
    title: "Total Outstanding",
    key: "totalOutstanding",
  },
  {
    title: "Leased Item Return Date",
    key: "leasedItemReturnDate",
  },
  {
    title: "Date of Last Payment",
    key: "dateofLastPayment",
  },
  {
    title: "Actions",
    key: "action",
  },
];

const Invoices = () => {
  const methods = useForm();

  return (
    <section>
      <Table
        data={data!}
        loaderLength={10}
        tableHeadData={tableHeadData}
        rowComponent={(transaction, index, length) => {
          const {
            id,
            customer,
            projectCode,
            amount,
            dateCreated,
            totalOutstanding,
            totalPaid,
            leasedItemReturnDate,
            dateofLastPayment,
            action,
          } = transaction;
          return (
            <tr
              onClick={() => {}}
              className={cn("text-sm border-[#5A5A5A99] cursor-pointer", {
                "border-b": index !== length - 1,
                "border-t": index === 0,
              })}
            >
              <td className="p-4 text-black-500 whitespace-nowrap">{id}</td>
              <td className="p-4 text-black-500 whitespace-nowrap">
                {customer}
              </td>
              <td className="py-[18px] w-[100px] px-4 text-black-500 whitespace-nowrap">
                {projectCode}
              </td>
              <td className="p-4 text-black-500 whitespace-nowrap">
                {formatAmount(+amount, "NGN")}
              </td>
              <td className="p-4 text-black-500 whitespace-nowrap">
                {dateCreated}
              </td>
              <td className="p-4 text-black-500 whitespace-nowrap">
                {formatAmount(+totalPaid, "NGN")}
              </td>
              <td className="p-4 text-black-500 whitespace-nowrap">
                {formatAmount(+totalOutstanding, "NGN")}
              </td>
              <td className="p-4 text-black-500 whitespace-nowrap">
                {leasedItemReturnDate}
              </td>
              <td className="p-4 text-black-500 whitespace-nowrap">
                {dateofLastPayment}
              </td>
              <td className="p-4">
                <Icons.MoreIcon />
              </td>
            </tr>
          );
        }}
      />
    </section>
  );
};

export default Invoices;
