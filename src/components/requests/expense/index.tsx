"use client";

import Loader from "@/components/global/Loader";
import Status, { StatusType } from "@/components/global/Status";
import Table from "@/components/global/Table";
import Icons from "@/components/icons";
import { cn, formatAmount, formatDate } from "@/lib/utils";
import { useFetchExpenseRequestsQuery } from "@/services/warehouse";
import { useRouter } from "next/navigation";
import { BarLoader, RingLoader, SyncLoader } from "react-spinners";

const ExpenseRequests = () => {
  const router = useRouter();
  const { data: _data, isLoading } = useFetchExpenseRequestsQuery();
  const data = _data?.data || [];

  const tableHeadData = [
    {
      title: "Requests ID",
      key: "id",
    },
    {
      title: "Expense Category",
      key: "category_name",
    },
    {
      title: "Total Disbursed",
      key: "totalDisbursed",
    },
    {
      title: "Total Value",
      key: "amount",
    },
    {
      title: "Date Requested",
      key: "created_at",
    },
    {
      title: "Date Approved",
      key: "dateApproved",
    },
  ];

  return (
    <section>
      {isLoading ? (
        <Loader />
      ) : (
        <Table
          data={data!}
          loaderLength={10}
          tableHeadData={tableHeadData}
          rowComponent={(data, index, length) => {
            const {
              id,
              category_name,
              /* totalDisbursed, */
              amount,
              created_at,
              /* dateApproved, */
            } = data;
            return (
              <tr
                onClick={() => {
                  router.push("/requests/" + id + "/expense-requests");
                }}
                className={cn(
                  "text-sm  border-[#5A5A5A99] hover:cursor-pointer",
                  {
                    "border-b": index !== length - 1,
                  },
                )}
              >
                <td className="p-4  text-black-500 whitespace-nowrap">{id}</td>
                <td className="p-4 text-black-500 whitespace-nowrap">
                  {category_name}
                </td>
                <td className="p-4 text-black-500 whitespace-nowrap">
                  {/* {totalDisbursed} */}-
                </td>
                <td className="p-4 text-black-500 whitespace-nowrap">
                  {formatAmount(Number(amount))}
                </td>
                <td className="p-4 text-black-500 whitespace-nowrap">
                  {formatDate(created_at)}
                </td>

                <td className="p-4  text-black-500 whitespace-nowrap">
                  {/* {dateApproved} */}-
                </td>
              </tr>
            );
          }}
        />
      )}
    </section>
  );
};

export default ExpenseRequests;
