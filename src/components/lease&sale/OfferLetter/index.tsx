"use client";

import Button from "@/components/global/Button";
import Status, { StatusType } from "@/components/global/Status";
import Table from "@/components/global/Table";
import Icons from "@/components/icons";
import { cn, formatAmount } from "@/lib/utils";
import { useForm } from "react-hook-form";

const OfferLetter = () => {
  const methods = useForm();
  const data = [
    {
      customer: "Jamima Smith",
      projectCode: 638292,
    },
    {
      customer: "Jamima Smith",
      projectCode: 638292,
    },
    {
      customer: "Jamima Smith",
      projectCode: 638292,
    },
    {
      customer: "Jamima Smith",
      projectCode: 638292,
    },
    {
      customer: "Jamima Smith",
      projectCode: 638292,
    },
    {
      customer: "Jamima Smith",
      projectCode: 638292,
    },
    {
      customer: "Jamima Smith",
      projectCode: 638292,
    },
    {
      customer: "Jamima Smith",
      projectCode: 638292,
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
            // action,
          } = transaction;
          return (
            <tr
              onClick={() => {}}
              className={cn("text-sm border-[#5A5A5A99] cursor-pointer", {
                "border-b": index !== length - 1,
              })}
            >
              <td className="p-4 text-black-500 whitespace-nowrap">
                {customer}
              </td>
              <td className="p-4 text-black-500 whitespace-nowrap">
                {projectCode}
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

export default OfferLetter;
