"use client";

import Button from "@/components/global/Button";
import Loader from "@/components/global/Loader";
import Status, { StatusType } from "@/components/global/Status";
import Table from "@/components/global/Table";
import { cn, formatAmount } from "@/lib/utils";
import { useFetchPurchaseOrdersQuery } from "@/services/warehouse";
import Link from "next/link";
import { useForm } from "react-hook-form";

const PurchaseOrder = () => {
  const {
    data: purchase_orders,
    isLoading,
    isError,
    error,
  } = useFetchPurchaseOrdersQuery();

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <div>Something went wrong</div>;
  }

  const data = purchase_orders?.data;

  const tableHeadData = [
    {
      title: "ID",
      key: "id",
    },
    {
      title: "Supplier Name",
      key: "supplier_name",
    },
    {
      title: "Total Value",
      key: "total_amount",
    },
    {
      title: "Total Paid",
      key: "totalPaid",
    },
    {
      title: "Date Requested",
      key: "created_at",
    },
    {
      title: "Status",
      key: "status",
    },
    {
      title: "Date Delivered",
      key: "dateDelivered",
    },
    {
      title: "",
      key: "confirm",
    },
  ];

  const totalPaid = 0;
  const dateDelivered = undefined;

  return (
    <section>
      <Table
        data={data!}
        loaderLength={10}
        tableHeadData={tableHeadData}
        rowComponent={(transaction, index, length) => {
          const {
            id,
            supplier_name,
            total_amount,
            /* totalPaid, */
            created_at,
            status,
            /* dateDelivered, */
          } = transaction;
          return (
            <tr
              onClick={() => {}}
              className={cn("text-sm border-[#5A5A5A99]", {
                "border-b": index !== length - 1,
              })}
            >
              <td className="p-4 text-black-500 whitespace-nowrap">{id}</td>
              <td className="p-4 text-black-500 whitespace-nowrap">
                <Link href={`/warehouse/purchase-orders/${id}`}>
                  {supplier_name}
                </Link>
              </td>
              <td className="py-[18px] w-[100px] px-4 text-black-500 whitespace-nowrap">
                {formatAmount(+total_amount, "NGN")}
              </td>
              <td className="p-4 text-black-500 whitespace-nowrap">
                {formatAmount(+totalPaid || 0, "NGN")}
              </td>
              <td className="p-4 text-black-500 whitespace-nowrap">
                {new Date(created_at).toLocaleString() || "-"}
              </td>
              <td className="p-4">
                <Status status={status as StatusType} />
              </td>
              <td className="p-4 text-black-500 whitespace-nowrap">
                {dateDelivered ? new Date(dateDelivered).toLocaleString() : "-"}
              </td>
              <td className="p-4">
                {status !== "pending" ? (
                  <Button
                    className="bg-[#FFE2D2] text-primary border-none"
                    size="sm"
                  >
                    Confirm
                  </Button>
                ) : (
                  <Button className="bg-[#008000] border-none" size="sm">
                    Confirmed
                  </Button>
                )}
              </td>
            </tr>
          );
        }}
      />
    </section>
  );
};

export default PurchaseOrder;
