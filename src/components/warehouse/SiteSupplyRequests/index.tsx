"use client";

import Loader from "@/components/global/Loader";
import Status, { StatusType } from "@/components/global/Status";
import Table from "@/components/global/Table";
import { cn, formatAmount, formatDate } from "@/lib/utils";
import { useFetchSupplyRequestsQuery } from "@/services/warehouse";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

const SiteSupplyRequests = () => {
  const router = useRouter();
  const { data: __data, isLoading, isError } = useFetchSupplyRequestsQuery();

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <p>Error loading supply requests</p>;
  }

  const data = __data?.data;
  console.log({ data });

  const tableHeadData = [
    {
      title: "ID",
      key: "id",
    },
    {
      title: "Reference",
      key: "reference",
    },
    {
      title: "Project Code",
      key: "projectCode",
    },
    {
      title: "Requester",
      key: "requester",
    },
    /* { */
    /*     title: "Quantity Requested", */
    /*     key: "quantityRequested", */
    /* }, */
    /* { */
    /*     title: "Pick-Up Date", */
    /*     key: "pickUpDate", */
    /* }, */
    {
      title: "Delivery Date",
      key: "deliveryDate",
    },
    {
      title: "Status",
      key: "status",
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
            project_code,
            requester,
            reference,
            /* quantityRequested, */
            /* pickUpDate, */
            created_at,
            status,
          } = transaction;
          return (
            <tr
              onClick={() => {
                router.push("/requests/" + id + "/warehouse-supply-requests/");
              }}
              className={cn("text-sm cursor-pointer border-[#5A5A5A99]", {
                "border-b": index !== length - 1,
              })}
            >
              <td className="p-4 text-black-500 whitespace-nowrap">{id}</td>
              <td className="py-[18px] w-[100px] px-4 text-black-500 whitespace-nowrap">
                {reference}
              </td>
              <td className="p-4 text-black-500 whitespace-nowrap">
                {project_code}
              </td>
              <td className="p-4 text-black-500 whitespace-nowrap">
                {requester}
              </td>

              {/* <td className='p-4 text-black-500 whitespace-nowrap'> */}
              {/*     - */}
              {/* </td> */}
              {/* <td className='p-4 text-black-500 whitespace-nowrap'> */}
              {/*     - */}
              {/* </td> */}
              <td className="p-4 text-black-500 whitespace-nowrap">
                {formatDate(created_at)}
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

export default SiteSupplyRequests;
