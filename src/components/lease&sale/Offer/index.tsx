"use client";

import Button from "@/components/global/Button";
import Status, { StatusType } from "@/components/global/Status";
import Table from "@/components/global/Table";
import Icons from "@/components/icons";
import { cn, formatAmount } from "@/lib/utils";
import { useForm } from "react-hook-form";

const Offer = () => {
  const methods = useForm();
  const data = [
    {
      customer: "Jamima Smith",
      projectCode: 638292,
      action: "",
    },
    {
      customer: "Jamima Smith",
      projectCode: 638292,
      action: "",
    },
    {
      customer: "Jamima Smith",
      projectCode: 638292,
      action: "",
    },
    {
      customer: "Jamima Smith",
      projectCode: 638292,
      action: "",
    },
    {
      customer: "Jamima Smith",
      projectCode: 638292,
      action: "",
    },
    {
      customer: "Jamima Smith",
      projectCode: 638292,
      action: "",
    },

  ];

  const tableHeadData = [
    {
      title: "Customer",
      key: "customer",
    },
    {
      title: "Project Code",
      key: "projectCode",
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
            customer,
            projectCode,
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
              <td className="p-4 text-black-500 whitespace-nowrap">
                {customer}
              </td>
              <td className="py-[18px] w-[1000px]  px-6 text-black-500 whitespace-nowrap">
                {projectCode}
              </td>
              <td className="p-4 px-8 w-[180px]">
                <Icons.MoreIcon />
              </td>
            </tr>
          );
        }}
      />
    </section>
  );
};

export default Offer;
