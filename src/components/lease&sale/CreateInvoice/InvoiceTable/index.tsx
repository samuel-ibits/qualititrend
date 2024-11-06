import Icons from "@/components/icons";
import { formatAmount } from "@/lib/utils";
import React from "react";

const tableHeadData = [
  {
    title: "#",
  },
  {
    title: "Products",
  },
  {
    title: "Quantity",
  },
  {
    title: " Unit Price",
  },
  {
    title: "Total",
  },
  {
    title: "Action",
  },
];

const data = [
  {
    id: "1",
    products:
      "Five ( 5 ) Bedroom Terrace Duplex with One Maid’s Room in 1 QUALITRENDS-GWARINPA RESIDENCE 403, Gwarinpa District, Abuja",
    quality: 1,
    price: 100000000,
    total: "950000000",
    action: "",
  },
];

const InvoiceTable = ({ action }: { action?: boolean }) => {
  return (
    <div className="w-full mt-24">
      <table className="w-full">
        <thead>
          <tr>
            {tableHeadData.map((head, index) =>
              action || index !== tableHeadData.length - 1 ? (
                <th
                  key={index}
                  className={`bg-[#F4F8FD] p-[18px] border-b-black-900 border-b-[1px] border-r-[0.29] border-white  text-left font-OpenSans text-lg text-black-900 font-bold ${
                    index === tableHeadData.length - 2 && "w-[100px]"
                  }`}
                >
                  {head.title}
                </th>
              ) : null
            )}
          </tr>
        </thead>
        <tbody>
          <tr>
            {data.map((item) => (
              <>
                <td className="p-[18px] text-left font-OpenSans text-black-900 text-sm font-bold">
                  {item.id}
                </td>
                <td className="p-[18px] w-[350px] text-left font-OpenSans text-black-900 text-sm font-bold">
                  {item.products}
                </td>
                <td className="p-[18px] text-left font-OpenSans text-black-900 text-sm font-bold">
                  {item.quality}
                </td>
                <td className="p-[18px] text-left font-OpenSans text-black-900 text-sm font-bold">
                  {formatAmount(+item.price, "NGN")}
                  {}
                </td>
                <td className="p-[18px] text-left font-OpenSans text-black-900 text-sm font-bold">
                  {formatAmount(+item.total, "NGN")}
                </td>
                {action ? (
                  <td className="p-[18px] text-center font-OpenSans text-black-900 text-sm font-bold">
                    <Icons.EditFillIcon />
                  </td>
                ) : null}
              </>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceTable;
