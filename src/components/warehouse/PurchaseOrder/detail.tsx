"use client";

import Button from "@/components/global/Button";
import Status, { StatusType } from "@/components/global/Status";
import Table from "@/components/global/Table";
import { cn, formatAmount, formatDate } from "@/lib/utils";
import {
  useFetchPurchaseOrderDetailsQuery,
  useFetchPurchaseOrdersQuery,
} from "@/services/warehouse";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";

const PurchaseOrderDetail = () => {
  const { order_id } = useParams();

  const {
    data: _data,
    isLoading,
    isError,
    error,
  } = useFetchPurchaseOrderDetailsQuery({ id: order_id as string });
  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (isError) {
    // @ts-ignore
    if (error.originalStatus === 404) {
      return <div>Item not found</div>;
    }
    return <div>Something went wrong</div>;
  }

  const data = _data!.data;

  const product = [
    {
      label: "ID",
      value: data.purchase_order_id,
    },
    {},
    {
      label: "Supplier",
      value: data.supplier,
    },
    {
      label: "Total Amount",
      value: formatAmount(Number(data.total_amount), "NGN"),
    },
    {
      label: "Status",
      value: data.status,
    },
    {
      label: "Delivery Date",
      value: formatDate(data.date_requested),
    },
  ];

  const items = data.items;

  const tableHeadData = [
    {
      title: "Name",
      key: "name",
    },
    {
      title: "Category",
      key: "category",
    },
    {
      title: "Quantity",
      key: "quantity",
    },
    {
      title: "Cost",
      key: "cost",
    },
    {
      title: "Total",
      key: "total",
    },
  ];

  return (
    <div className="space-y-8">
      <section className="space-y-6">
        <h1 className="bg-[#FFF0E5] max-lg:mb-4 p-2.5 lg:py-4 lg:px-5 lg:text-xl font-semibold">
          Purchase Order Detail
        </h1>
        <ul className="grid grid-cols-1 max-lg:rounded bg-white max-lg:drop-shadow-md lg:grid-cols-2 max-lg:py-4 lg:mt-10 gap-y-5 lg:gap-6 px-5">
          {product.map((item, index) => {
            return (
              <li
                key={index}
                className="max-lg:text-sm max-lg:space-y-2 lg:flex items-center"
              >
                <div className="w-52 text-black-500">{item.label}:</div>
                <div
                  className={cn("font-semibold lg:w-[calc(100%-230px)]", {
                    "text-primary": index === 0,
                  })}
                >
                  {item.value}
                </div>
              </li>
            );
          })}
        </ul>
        <div className="px-6">
          <h2 className="font-semibold opacity-80">Items Ordered</h2>
          <div className="">
            <Table
              data={items!}
              loaderLength={10}
              tableHeadData={tableHeadData}
              rowComponent={(transaction, index, length) => {
                const {
                  name,
                  category,
                  quantity,
                  cost,
                  /* dateDelivered, */
                } = transaction;
                return (
                  <tr
                    onClick={() => {}}
                    className={cn("text-sm border-[#5A5A5A99]", {
                      "border-b": index !== length - 1,
                    })}
                  >
                    <td className="p-4 text-black-500 whitespace-nowrap">
                      {name}
                    </td>
                    <td className="p-4 text-black-500 whitespace-nowrap">
                      {category}
                    </td>
                    <td className="p-4 text-black-500 whitespace-nowrap">
                      {quantity}
                    </td>
                    <td className="py-[18px] w-[100px] px-4 text-black-500 whitespace-nowrap">
                      {formatAmount(+cost, "NGN")}
                    </td>
                    <td className="p-4 text-black-500 whitespace-nowrap">
                      {formatAmount(+cost * quantity || 0, "NGN")}
                    </td>
                  </tr>
                );
              }}
            />
          </div>
        </div>
        <div className="px-6">
          <h2 className="font-semibold opacity-80"> Payment Details </h2>
          <div className="flex gap-2 justify-between items-center">
            <p>
              {" "}
              Total value: {formatAmount(Number(data.total_amount), "NGN")}{" "}
            </p>
            <p> Total Paid: {formatAmount(Number(0), "NGN")} </p>
          </div>
        </div>
      </section>
      <section>
        <h2 className="bg-[#FFF0E5] max-lg:mb-4 p-2.5 lg:py-4 lg:px-5 lg:text-xl font-semibold">
          Supporting Documents
        </h2>
      </section>
      <section>
        <h2 className="bg-[#FFF0E5] max-lg:mb-4 p-2.5 lg:py-4 lg:px-5 lg:text-xl font-semibold">
          History
        </h2>
      </section>
    </div>
  );
};

export default PurchaseOrderDetail;
