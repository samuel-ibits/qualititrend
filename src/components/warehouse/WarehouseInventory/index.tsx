// @ts-nocheck

"use client";

import SwitchInput from "@/components/global/SwitchInput";
import Table from "@/components/global/Table";
import Icons from "@/components/icons";
import { cn, formatAmount } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { Product } from "@/types/services/warehouse";
import {useFetchProductsQuery} from "@/services/warehouse/index";

type Props = {
  data: Product[];
};

const WarehouseInventory = ({ data }: Props) => {
  const methods = useForm();
  const router = useRouter();

  

  const { data: warehouse } = useFetchProductsQuery({
    type: "material", 
  });
  console.log("warehouse", warehouse?.data);
  //  const tableHeadData = [
  //   {
  //     title: "ID",
  //     key: "id",
  //   },
  //   {
  //     title: "Asset Name",
  //     key: "assetName",
  //   },
  //   {
  //     title: "Asset Category",
  //     key: "assetCategory",
  //   },
  //   {
  //     title: "Asset Quantity",
  //     key: "assetQuantity",
  //   },
  //   {
  //     title: "Unit Price",
  //     key: "unitPrice",
  //   },
  //   {
  //     title: "Total Value",
  //     key: "totalValue",
  //   },
  //   {
  //     title: "Status",
  //     key: "status",
  //   },
  //   {
  //     title: "Actions",
  //     key: "actions",
  //   },
  // ];
  const tableHeadData: {
    title: string;
    key: keyof Product | "actions" | "total_value" | "quantity";
  }[] = [
    {
      title: "ID",
      key: "id",
    },
    {
      title: "Item Name",
      key: "name",
    },
    {
      title: "Item Category",
      key: "category_id",
    },
    {
      title: "Stock Quantity",
      key: "quantity",
    },
    {
      title: "Unit Price",
      key: "cost",
    },
    {
      title: "Total Value",
      key: "total_value",
    },
    {
      title: "Status",
      key: "item_status",
    },
    {
      title: "Actions",
      key: "actions",
    },
  ];
console.log("material",warehouse?.data);
  return (
    <section>
      <Table
        data={warehouse?.data}
        loaderLength={10}
        tableHeadData={tableHeadData}
        rowComponent={(transaction, index, length) => {
          const {
            id,
            name,
            category_id,
            quantity,
            cost,
            totalValue,
          } = transaction;
         
          // let total_value = Number(cost) * quantity;

          return (
            <tr
              onClick={() => {
                router.push("/warehouse/" + id + "/warehouse-inventory");
              }}
              className={cn("text-sm border-[#5A5A5A99] cursor-pointer", {
                "border-b": index !== length - 1,
              })}
            >
               <td className="p-4 text-black-500 whitespace-nowrap">{id}</td>
              <td className="p-4 text-black-500 whitespace-nowrap">
                {name}
              </td>
              <td className="py-[18px] w-[100px] px-4 text-black-500 whitespace-nowrap">
                {category_id.name}
              </td>
              <td className="p-4 text-black-500 whitespace-nowrap">
                {quantity}
              </td>
              <td className="p-4 text-black-500 whitespace-nowrap">
                {formatAmount(+cost, "NGN")}
              </td>
              <td className="p-4 text-black-500 whitespace-nowrap">
                {formatAmount(+totalValue, "NGN")}
              </td>
              <td className="p-4 flex items-center justify-center">
                <FormProvider {...methods}>
                  <form>
                    <SwitchInput name="Name" />
                  </form>
                </FormProvider>
              </td>
              <td className="p-4">
                <button>
                  <Icons.MoreIcon />
                </button>
              </td>
            </tr>
          );
        }}
      />
    </section>
  );
};

export default WarehouseInventory;
