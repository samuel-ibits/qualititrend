"use client";

import Loader from "@/components/global/Loader";
import Status, { StatusType } from "@/components/global/Status";
import Table from "@/components/global/Table";
import Icons from "@/components/icons";
import { cn, formatAmount, formatDate } from "@/lib/utils";
import { useFetchMaterialTransfersQuery } from "@/services/warehouse";
import { useRouter } from "next/navigation";

const MaterialTransferRequests = () => {
  const router = useRouter();

  const {
    data: _data,
    isLoading,
    isError,
    error,
  } = useFetchMaterialTransfersQuery();

  const tableHeadData = [
    {
      title: "Material Name",
      key: "materialName",
    },
    {
      title: "Quantity",
      key: "quantity",
    },
    {
      title: "Total Value",
      key: "totalValue",
    },
    {
      title: "Source",
      key: "source",
    },
    {
      title: "Destination",
      key: "destination",
    },
    {
      title: "Pick-Up Date",
      key: "pickUpDate",
    },
    {
      title: "Delivery Date",
      key: "deliveryDate",
    },
    {
      title: "Status",
      key: "status",
    },
  ];

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <div>Error loading material transfers</div>;
  }

  const data = _data?.data!;

  return (
    <section>
      <Table
        data={data!}
        loaderLength={10}
        tableHeadData={tableHeadData}
        rowComponent={(transaction, index, length) => {
          const {
            id,
            reference,
            /* quantity, */
            total_amount,
            source,
            destination,
            created_at,
            /* deliveryDate, */
            status,
          } = transaction;
          return (
            <tr
              onClick={() => {
                router.push(`/requests/${id}/material-transfer`);
              }}
              className={cn("text-sm border-[#5A5A5A99]", {
                "border-b": index !== length - 1,
              })}
            >
              <td className="p-4 text-black-500 whitespace-nowrap">
                {reference}
              </td>
              <td className="p-4 text-black-500 whitespace-nowrap">
                {/* {quantity} */} {" - "}
              </td>
              <td className="py-[18px] w-[100px] px-4 text-black-500 whitespace-nowrap">
                {formatAmount(+total_amount, "NGN")}
              </td>
              <td className="p-4 text-black-500 whitespace-nowrap">{source}</td>
              <td className="p-4 text-black-500 whitespace-nowrap">
                {destination}
              </td>
              <td className="p-4 text-black-500 whitespace-nowrap">
                {formatDate(created_at)}
              </td>
              <td className="p-4 text-black-500 whitespace-nowrap">
                {/* {formatDate(deliveryDate)} */}
              </td>
              <td className="p-4">
                <Status status={status as StatusType} />
              </td>
            </tr>
          );
        }}
      />
    </section>
  );
};

export default MaterialTransferRequests;
