"use client";

import Button from "@/components/global/Button";
import Status, { StatusType } from "@/components/global/Status";
import Table from "@/components/global/Table";
import Icons from "@/components/icons";
import { cn, formatAmount } from "@/lib/utils";
import { useForm } from "react-hook-form";

const Sales = () => {
  const methods = useForm();
  const data = [
    {
      id: "SL_9776678",
      customer: "Jamima Smith",
      projectCode: 638292,
      amount: 100000000,
      totalOutstanding: "0.00",
      status: "paid",
      action: "",
    },
    {
      id: "SL_9776678",
      customer: "Jamima Smith",
      projectCode: 638292,
      amount: 100000000,
      totalOutstanding: "0.00",
      status: "unpaid",
      action: "",
    },
    {
      id: "SL_9776678",
      customer: "Jamima Smith",
      projectCode: 638292,
      amount: 100000000,
      totalOutstanding: "0.00",
      status: "partial",
      action: "",
    },
    {
      id: "SL_9776678",
      customer: "Jamima Smith",
      projectCode: 638292,
      amount: 100000000,
      totalOutstanding: "0.00",
      status: "unpaid",
      action: "",
    },
    {
      id: "SL_9776678",
      customer: "Jamima Smith",
      projectCode: 638292,
      amount: 100000000,
      totalOutstanding: "0.00",
      status: "paid",
      action: "",
    },
    {
      id: "SL_9776678",
      customer: "Jamima Smith",
      projectCode: 638292,
      amount: 100000000,
      totalOutstanding: "0.00",
      status: "partial",
      action: "",
    },
    {
      id: "SL_9776678",
      customer: "Jamima Smith",
      projectCode: 638292,
      amount: 100000000,
      totalOutstanding: "0.00",
      status: "paid",
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
      title: "Total Outstanding",
      key: "totalOutstanding",
    },
    {
      title: "Status",
      key: "status",
    },
    {
      title: "Actions",
      key: "action",
    },
  ];

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
            totalOutstanding,
            status,
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
                {formatAmount(+totalOutstanding, "NGN")}
              </td>
              <td className="p-4 text-black-500 whitespace-nowrap">
                <Status status={status as StatusType} />
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

export default Sales;
