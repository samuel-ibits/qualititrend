// @ts-nocheck

"use client";

import Modal from "@/components/global/Modal";
import SelectInput from "@/components/global/SelectInput";
import Input from "@/components/global/Input";
import Table from "@/components/global/Table";
import Icons from "@/components/icons";
import { cn, formatAmount, numberWithCommas } from "@/lib/utils";
import { motion } from "framer-motion";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Button from "@/components/global/Button";
import { AddBuildingUnitType } from "@/types/services/projects/buildings";
import { useFetchCategoriesQuery } from "@/services/categories";
import { _Select } from "@/components/global/MultipleSelectInput";
import { useCreateBuildingUnitMutation, useFetchBuildingUnitsQuery } from "@/services/buildingUnits";
import { CreateBuildingUnitRequest } from "@/types/services/buildingUnit";
import { toast, ToastContainer } from "react-toastify";


type TableProps = {
  data: AddBuildingUnitType[];
  setData: Dispatch<SetStateAction<AddBuildingUnitType[]>>;
};

export default function BuildingUnitsTable({project, data = [], setData }: TableProps) {
  const [buildingUnits, setBuildingUnits] = useState([]);

  const [is_add_unit_type_modal_open, setIsAddUnitTypeModalOpen] =
  useState(false);
  const { data: other_room_options } = useFetchCategoriesQuery({
    type: "other_rooms",
  });
  const { data: fetchBuildingUnits } = useFetchBuildingUnitsQuery({
    project_id: project.id,
    id: data.id,
  });
  const { data: building_unit_type_options } = useFetchCategoriesQuery({
    type: "building_unit_type",
  });
  const [
    createBuildingUnitMutation, 
    { isLoading, isSuccess, isError, error },
  ] = useCreateBuildingUnitMutation();

  const methods = useForm<AddBuildingUnitType>({
    defaultValues: {
      unit_type_id: "",
      number_of_units: 1,
      unit_description: "",
      number_of_rooms: 1,
    },
  });

  const {
    formState: { errors, isValid },
    reset,
    watch,
    setValue,
  } = methods;

  const {
    unit_name,
    unit_type,
    number_of_units,
    number_of_rooms,
    other_rooms,
    price,
    unit_description,
    unit_purpose,
  } = watch();

  
  console.log("Building Units", fetchBuildingUnits);


  async function onSubmit(data: any) {
    const newUnit: CreateBuildingUnitRequest = {
      project_id: project.id, // Replace with the actual project ID
      name: data.unit_name,
      type: data.unit_type?.id,
      quantity: data.number_of_units,
      number_of_rooms: data.number_of_rooms,
      other_rooms: data.other_rooms?.map((room: any) => Number(room.value)),
      unit_price: parseFloat(data.price.replace(/,/g, "")), // Convert formatted price to a float
      description: data.unit_description,
    };
    try {
      const response = await createBuildingUnitMutation(newUnit).unwrap();
      if (response.success) {
        setIsAddUnitTypeModalOpen(false);
        toast.success("Building unit created successfully!");
      } else {
        toast.error(`Error: ${response.message}`);
      }
    } catch (error) {
      console.error("Failed to create building unit:", error);
      toast.error("An error occurred while creating the building unit.");
    }
  }
  
  const tableHeadData = [
    {
      title: "unit name",
      key: "unit_name",
    },
    {
      title: "unit type",
      key: "unit_type_id",
    },
    {
      title: "Number of units",
      key: "number_of_units",
    },
    {
      title: "number of rooms",
      key: "number_of_rooms",
    },
    {
      title: "other rooms",
      key: "other_rooms",
    },
    {
      title: "price",
      key: "price",
    },
    {
      title: "unit description",
      key: "unit_description",
    },
  
  ];



  function openAddUnitTypeModal() {
    setIsAddUnitTypeModalOpen(true);
  }

  function closeAddUnitTypeModal() {
    setIsAddUnitTypeModalOpen(false);
  }

  return (
    <section>
      <Table
        title="Unit types"
        data={fetchBuildingUnits?.data!}
        loaderLength={10}
        tableHeadData={tableHeadData}
        rowComponent={(unit) => {
          const {
            name,
            type,
            quantity,
            number_of_rooms,
            other_rooms,
            price,
            description,
          } = unit;
          return (
            <tr
              onClick={() => {}}
              className="border-b text-sm border-[#5A5A5A99]"
            >
              <td className="py-[18px] px-4 text-black-500 whitespace-nowrap">
                {name}
              </td>
              <td className="py-[18px] px-4 text-black-500 whitespace-nowrap">
                {type}
              </td>
              <td className="py-[18px] px-4 text-black-500 whitespace-nowrap">
                {quantity}
              </td>
              <td className="py-[18px] px-4 text-black-500 whitespace-nowrap">
                {number_of_rooms}
              </td>
              <td className="py-[18px] px-4 text-black-500 whitespace-nowrap">
                <ul>
                  {other_rooms?.map((room, index: number) => (
                    <li key={room}>
                      {" "}
                      {index > 0 && ", "}
                      {room}
                    </li>
                  ))}
                </ul>
              </td>
              <td className="py-[18px] px-4 text-black-500 whitespace-nowrap">
                {formatAmount(+Number(price.replaceAll(",", "")), "NGN")}
              </td>
              <td className="py-[18px] px-4 text-black-500 whitespace-nowrap">
                {description}
              </td>
            
            </tr>
          );
        }}
      />

      <Modal
        show={is_add_unit_type_modal_open}
        onRequestClose={closeAddUnitTypeModal}
        title="Add Unit Type"
      >
        <motion.div
          key="add unit type modal"
          initial={{
            x: 300,
            opacity: 0,
          }}
          animate={{ x: 0, opacity: 1, transition: { delay: 0.2 } }}
          exit={{ x: -300, opacity: 0 }}
          className="w-full"
        >
         <section className="w-full">
  <FormProvider {...methods}>
    <form
      onSubmit={methods.handleSubmit(onSubmit)}
      className="max-lg:space-y-6 lg:grid lg:grid-cols-2 lg:gap-x-9 gap-y-6"
    >
      <Input
        name="unit_name"
        label="Unit Name"
        rules={["required"]}
        placeholder="Enter unit name"
      />

      <_Select
        label="Unit Type"
        name="unit_type"
        required
        options={
          building_unit_type_options?.data?.map((option) => ({
            name: option?.name,
            id: option,
          })) || []
        }
        name_key="name"
        value_key="id"
      />

      <_Select
        label="Other Rooms"
        name="other_rooms"
        placeholder="Select other rooms"
        multiple
        required
        options={
          other_room_options?.data?.map((room) => ({
            name: room?.name,
            id: room.id,
          })) || []
        }
        name_key="name"
        value_key="id"
      />

      <Input
        name="number_of_units"
        label="Number of Units"
        rules={["required"]}
        placeholder="1"
        type="number"
      />

      <Input
        name="price"
        label="Unit Price"
        rules={["required"]}
        placeholder="1"
        type="tel"
        onChange={(e) => {
          const value = numberWithCommas(e.target.value.replace(/[^0-9.]/g, ""));
          setValue("price", value);
        }}
      />

      <Input
        name="number_of_rooms"
        label="Number of Rooms Per Unit"
        rules={["required"]}
        placeholder="1"
        type="number"
      />

      <Input
        name="unit_description"
        label="Unit Description"
        rules={["required"]}
        placeholder="Civil Engineering Project: Lokogoma Estate"
        tag="textarea"
      />

      <div className="lg:col-span-2 flex justify-center py-4">
        <Button
          type="submit"
          disabled={!isValid}
          className="w-full lg:w-[240px]"
        >
          Add
        </Button>
      </div>
    </form>
  </FormProvider>
</section>

        </motion.div>
      </Modal>

      <button onClick={openAddUnitTypeModal} type="button" className="">
        + Add unit type
      </button>
    </section>
  );
}
