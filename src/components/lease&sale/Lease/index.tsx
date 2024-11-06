"use client";

import Button from "@/components/global/Button";
import Status, { StatusType } from "@/components/global/Status";
import Table from "@/components/global/Table";
import Icons from "@/components/icons";
import { cn, formatAmount } from "@/lib/utils";
import { useForm } from "react-hook-form";

const Lease = () => {
  const methods = useForm();
  const data = [
    {
      id: "100AD",
      lease: "Jamima Smith",
      leaseItem: "Dining Table",
      invoiceId: "INV20230805001",
      amount: 100000000,
      pickUpDate: "12 Jul 2023",
      expectedDate: "15 August 2023",
      action: "",
    },
    {
      id: "100AD",
      lease: "Jamima Smith",
      leaseItem: "Dining Table",
      invoiceId: "INV20230805001",
      amount: 100000000,
      pickUpDate: "12 Jul 2023",
      expectedDate: "15 August 2023",
      action: "",
    },
    {
      id: "100AD",
      lease: "Jamima Smith",
      leaseItem: "Dining Table",
      invoiceId: "INV20230805001",
      amount: 100000000,
      pickUpDate: "12 Jul 2023",
      expectedDate: "15 August 2023",
      action: "",
    },
    {
      id: "100AD",
      lease: "Jamima Smith",
      leaseItem: "Dining Table",
      invoiceId: "INV20230805001",
      amount: 100000000,
      pickUpDate: "12 Jul 2023",
      expectedDate: "15 August 2023",
      action: "",
    },
    {
      id: "100AD",
      lease: "Jamima Smith",
      leaseItem: "Dining Table",
      invoiceId: "INV20230805001",
      amount: 100000000,
      pickUpDate: "12 Jul 2023",
      expectedDate: "15 August 2023",
      action: "",
    },
    {
      id: "100AD",
      lease: "Jamima Smith",
      leaseItem: "Dining Table",
      invoiceId: "INV20230805001",
      amount: 100000000,
      pickUpDate: "12 Jul 2023",
      expectedDate: "15 August 2023",
      action: "",
    },
    {
      id: "100AD",
      lease: "Jamima Smith",
      leaseItem: "Dining Table",
      invoiceId: "INV20230805001",
      amount: 100000000,
      pickUpDate: "12 Jul 2023",
      expectedDate: "15 August 2023",
      action: "",
    },
    {
      id: "100AD",
      lease: "Jamima Smith",
      leaseItem: "Dining Table",
      invoiceId: "INV20230805001",
      amount: 100000000,
      pickUpDate: "12 Jul 2023",
      expectedDate: "15 August 2023",
      action: "",
    },
  ];

  const tableHeadData = [
    {
      title: "ID",
      key: "id",
    },
    {
      title: "Lease",
      key: "lease",
    },
    {
      title: "Lease Item",
      key: "leaseItem",
    },
    {
      title: "Invoice ID",
      key: "invoiceId",
    },
    {
      title: "Amount",
      key: "amount",
    },
    {
      title: "Pick-Up Date",
      key: "pickUpDate",
    },
    {
      title: "Expected Return Date",
      key: "expectedDate",
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
            lease,
            leaseItem,
            invoiceId,
            amount,
            expectedDate,
            pickUpDate,
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
              <td className="p-4 text-black-500 whitespace-nowrap">{lease}</td>
              <td className="py-[18px] w-[100px] px-4 text-black-500 whitespace-nowrap">
                {leaseItem}
              </td>
              <td className="p-4 text-black-500 whitespace-nowrap">
                {invoiceId}
              </td>
              <td className="p-4 text-black-500 whitespace-nowrap">
                {formatAmount(+amount, "NGN")}
              </td>

              <td className="p-4 text-black-500 whitespace-nowrap">
                {pickUpDate}
              </td>
              <td className="p-4 text-black-500 whitespace-nowrap">
                {expectedDate}
              </td>
              <td className="p-4 px-8">
                <Icons.MoreIcon />
              </td>
            </tr>
          );
        }}
      />
    </section>
  );
};

export default Lease;
