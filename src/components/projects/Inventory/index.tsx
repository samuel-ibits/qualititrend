"use client";

import Loader from "@/components/global/Loader";
import Table from "@/components/global/Table";
import Icons from "@/components/icons";
import { cn, numberWithCommas } from "@/lib/utils";
import { useFetchProjectByIdQuery } from "@/services/projects";
import { useParams, useRouter } from "next/navigation";

const ProjectInventory = () => {
  const router = useRouter();

  const params = useParams();

  const data = [
    {
      materialName: "Base Pin",
      quantity: 20,
    },
    {
      materialName: "Door Rubber",
      quantity: 10,
    },
    {
      materialName: "Glossy Board",
      quantity: 16,
    },
    {
      materialName: "Door Motising",
      quantity: 6,
    },
    {
      materialName: "Cement",
      quantity: 10,
    },
    {
      materialName: "Curton",
      quantity: 2000,
    },
    {
      materialName: "Stucco",
      quantity: 6,
    },
    {
      materialName: "MCI",
      quantity: 2,
    },
  ];

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
      title: "",
      key: "actions",
    },
  ];

  const {
    data: project,
    isLoading,
    isError,
  } = useFetchProjectByIdQuery({
    id: params.id as string,
  });

  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return <p>Error loading project</p>;
  }
console.log('tttt',data);
  return (
    <section>
      <Table
        data={data!}
        loaderLength={10}
        tableHeadData={tableHeadData}
        rowComponent={(data, index, length) => {
          const { materialName, quantity } = data;
          return (
            <tr
              onClick={() => {
                router.push(
                  "/projects/" + params?.id + "/inventory/material-history",
                );
              }}
              className={cn("text-sm cursor-pointer border-[#5A5A5A99]", {
                "border-b": index !== length - 1,
              })}
            >
              <td className="p-4 w-72 text-black-500 whitespace-nowrap">
                {materialName}
              </td>
              <td className="p-4 text-black-500 whitespace-nowrap">
                {numberWithCommas(quantity)}
              </td>

              <td className="p-4 w-16 text-black-500 whitespace-nowrap">
                <Icons.MoreIcon />
              </td>
            </tr>
          );
        }}
      />
    </section>
  );
};

export default ProjectInventory;
