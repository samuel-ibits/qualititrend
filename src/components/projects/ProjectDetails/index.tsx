// @ts-nocheck

import Button from "@/components/global/Button";
import Status, { StatusType } from "@/components/global/Status";
import Icons from "@/components/icons";
import { cn, numberWithCommas } from "@/lib/utils";
import { Project } from "@/types/services/projects";
import { useState } from "react";
import { motion } from "framer-motion";
import { FormProvider, useForm } from "react-hook-form";
import Input from "@/components/global/Input";
import Modal from "@/components/global/Modal";
import SelectInput from "@/components/global/SelectInput";
import { CategoryType } from "@/types/services/categories";
import { useFetchCategoriesQuery } from "@/services/categories";
import { useGetStaffQuery } from "@/services/staff";
import {useUpdateProjectAttributesMutation} from "@/services/projects";

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import BuildingUnitsTable from "../CreateProjectModal/BuildingUnitsTable";


 const validationSchema = Yup.object().shape({
    type: Yup.string().required("Please select type"),
    project_code: Yup.string().required("Please fill this"),
    status: Yup.string().required("Please fill this"),
    status_id: Yup.string().required("Please fill this"),
    budget: Yup.number().required("Please fill this"),
    _budget: Yup.string().required("Please fill this"),
    manager: Yup.string().required("Please fill this"),
    summary: Yup.string().required("Please fill this"),
    supervisor: Yup.string().required("Please fill this"),
    budgetDescription: Yup.string().required("Please fill this"),
    initiation_date: Yup.string().required("Please fill this"),
    completion_date: Yup.string().required("Please fill this"),
    product: Yup.object().shape({
      type: Yup.string().required("Please fill this"),
      building_purpose: Yup.string().required("Please fill this"),
      name: Yup.string().required("Please fill this"),
      description: Yup.string().required("Please fill this"),
      type_id: Yup.string().required("Please fill this"),
      unit_price: Yup.number().required("Please fill this"),
      _unit_price: Yup.string().required("Please fill this"),
      quantity: Yup.number().required("Please fill this"),
      plot_number: Yup.string().required("Please fill this"),
      plot_address: Yup.string().required("Please fill this"),
      /* items: Yup.array().of( */
      /* 	Yup.object().shape({ */
      /* 				name: Yup.string().required("Please fill this"), */
      /* 				number_of_unit: Yup.string().required("Please fill this"), */
      /* 				description: Yup.string().required("Please fill this"), */
      /* 				number_of_rooms: Yup.string().required("Please fill this"), */
      /* 				type_id: Yup.string().required("Please fill this"), */
      /* 				purpose_id: Yup.string().required("Please fill this"), */
      /* 	}) */
      /* ) */
      /* 	.required("You need to add an item").min(1) */
    }),
  });
 const formOptions = { resolver: yupResolver(validationSchema) };
 


 type steps =
 | "create"
 | "success"
 | "building_details"
 | "concrete_details"
 | "furniture_details";


type Props = {
  project: Project;
};

const stepProps = {
  create: {
    title: "Create New Project",
  },
  building_details: {
    title: "Add Building Details",
  },
  concrete_details: {
    title: "Add Concrete Details",
  },
  furniture_details: {
    title: "Add Furniture Details",
  },
  success: {
    title: "",
    width: "!w-[400px]",
    closeButtonStyle: "fill-primary",
    showHeaderBorder: false,
  },
} as Record<
  steps,
  {
    title: string;
    width?: string;
    closeButtonStyle?: string;
    showHeaderBorder?: boolean;
  }
>;


// const onSubmit = async () => {
 
//   try {
//     type_id = type;

//     const _output = {
//       summary: summary,
//       project_code,
//       status_id: status,
//       type: type,
//       manager_id: manager,
//       supervisor_id: supervisor,
//       budget: {
//         amount: budget,
//         description: budgetDescription,
//       },
//       initiation_date: initiation_date,
//       completion_date: completion_date,
//       product: {
//         name: product?.name || undefined,
//         description: product?.description || undefined,
//         type_id: product?.type_id || undefined,
//         quantity: product?.quantity,
//         unit_price: product?.unit_price,

//         building_purpose_id: product?.building_purpose.id,
//         plot_number: product?.plot_number,
//         plot_address: product?.plot_address,
//         // units: building_units.map((building_unit) => {
//         //   return {
//         //     ...building_unit,
//         //     unit_type_id: building_unit.unit_type.id,
//         //     other_rooms: building_unit.other_rooms
//         //       .reduce((acc, curr) => {
//         //         acc.push(curr.value.id);
//         //         return acc;
//         //       }, [] as string[])
//         //       .join(","),
//         //   };
//         // }),
//       },
//     };

//     console.log({ _output, data: watch() });

//     const result = await createProject(_output)
//       .unwrap()
//       .then((res) => {
//         setStep("success");
//       })
//       .catch((error) => {
//         setSubmitError(error?.data?.message || "Error creating project");
//       });
//   } catch (err) {}
// };

const ProjectDetails = ({ project }: Props) => {
  const [updateBuildingAtribute, { isLoading }] = useUpdateProjectAttributesMutation();
  const [submit_error, setSubmitError] = useState("");

   const [building_units, setBuildingUnits] = useState<AddBuildingUnitType[]>(
      [],
    );
  
    const { data: staff } = useGetStaffQuery({
      perPage: 100000,
    });
  
    const { data: project_type } = useFetchCategoriesQuery({
      type: "project_type",
    });
  
    const { data: building_purposes } = useFetchCategoriesQuery({
      type: "building_purpose",
    });
  console.log(building_purposes);
    const { data: concrete_types } = useFetchCategoriesQuery({
      type: "concrete_type",
    });
  
    const { data: furniture_types } = useFetchCategoriesQuery({
      type: "furniture_type",
    });
  
    const { data: project_statuses } = useFetchCategoriesQuery({
      type: "project_status",
    });
  const methods = useForm({
    defaultValues: {
      type: "",
      project_code: "",
      status: "",
      status_id: "",
      budget: 0,
      _budget: "",
      manager: "",
      summary: "",
      supervisor: "",
      budgetDescription: "",
      initiation_date: "",
      completion_date: "",
      product: {
        type: "",
        building_purpose: { id: "" },
        name: "",
        description: "",
        type_id: "",
        unit_price: 0,
        _unit_price: "",
        quantity: 0,
        plot_number: "",
        plot_address: "",
        units: [
          {
            name: "",
            number_of_unit: "",
            description: "",
            number_of_rooms: "",
            type_id: "",
            purpose_id: "",
          },
        ],
      },
    },
    /* ...formOptions */
  });
  
  const onSubmitBuildingAttribute = async (data) => {
    try {
      const _output = {
        id:project.id,
        type: project.project_type,
        quantity: data.quantity,
        lot: data?.lot,
        building_purpose: data.building_purpose.value,
        plot_number: data.plot_number,
        plot_address: data.plot_address,
      };
  
      console.log("Submitting Building Attribute:", _output);
  
      const result = await updateBuildingAtribute(_output).unwrap();
      setStep("success");
    } catch (error) {
      console.error("Error submitting building attribute:", error);
      setSubmitError(error?.data?.message || "Error creating project");
    }
  };
  const onSubmitFunitureAttribute = async (data) => {
     
    try {
      const _output = {
        id:project.id,
        name:data.name,
        type: data.type ,
        quantity: data.quantity,
        description: data.description,
        unit_price: data.unit_price,
      };
  
      console.log("Submitting Furniture Attribute:", _output);
  
      const result = await updateBuildingAtribute(_output).unwrap();
      setStep("success");
    } catch (error) {
      console.error("Error submitting funiture attribute:", error);
      setSubmitError(error?.data?.message || "Error creating project");
    }
  };


  const onSubmitConcreateAttribute = async (data) => {
    try {
      const _output = {
        id:project.id,
        type: project.project_type ,
        quantity: data.quantity,
        lot: data?.lot,
        building_purpose: data.building_purpose.value,
        plot_number: data.plot_number,
        plot_address: data.plot_address,
      };
  
      console.log("Submitting Furniture Attribute:", _output);
  
      const result = await updateBuildingAtribute(_output).unwrap();
      setStep("success");
    } catch (error) {
      console.error("Error submitting building attribute:", error);
      setSubmitError(error?.data?.message || "Error creating project");
    }
  };
  
  const data = [
    {
      label: "Project Code",
      value: project.project_code,
    },
    {
      label: "Project Type",
      value: project?.project_type,
    },
    {
      label: "Project Manager",
      value: project?.project_manager?.first_name,
    },
    {
      label: "Project Summary",
      value: project?.project_summary,
    },
    {
      label: "Project Supervisor",
      value: project?.project_supervisor?.first_name,
    },
    {
      label: "Status",
      value: project.status?.type || "",
      isStatus: true,
    },
  ];

  const building_data =[
    {
      label: "Building Purpose",
      value: project.project_attribute?.building_purpose,
    },
    {
      label: "Plot Address",
      value: project.project_attribute?.plot_address,
    },  {
      label: "Plot Number",
      value: project.project_attribute?.plot_number,
    },  {
      label: "Lot",
      value: project.project_attribute?.lot,
    },  {
      label: "Type",
      value: project.project_attribute?.type,
    },
  ];

  const furniture_data =[

    {
      label: "Name",
      value: project.project_attribute?.name,
    },
    {
      label: "Unit Price",
      value: project.project_attribute?.unit_price,
    },  {
      label: "Type",
      value: project.project_attribute?.type,
    },  {
      label: "Description",
      value: project.project_attribute?.description,
    },  {
      label: "Quantity",
      value: project.project_attribute?.quantity,
    },
  ];

  const concrete_data =[
   
    {
      label: "Unit Of Measurement",
      value: project.project_attribute?.unit_of_measurement,
    }, 
    {
      label: "color",
      value: project.project_attribute?.color,
    },
    {
      label: "Unit Price",
      value: project.project_attribute?.unit_price,
    },  {
      label: "Type",
      value: project.project_attribute?.type,
    },  {
      label: "Description",
      value: project.project_attribute?.description,
    },  {
      label: "Quantity",
      value: project.project_attribute?.quantity,
    },
  ];
const [step, setStep] = useState<staps>("");
console.log('attribute',project.project_attribute);
  return (<>

    <section>
      <h3 className="bg-[#FFF0E5] max-lg:mb-4 p-2.5 lg:py-4 lg:px-5 lg:text-xl font-semibold">
        Project Details
      </h3>
      <ul className="grid grid-cols-1 max-lg:roundedm bg-white max-lg:drop-shadow-md lg:grid-cols-2 max-lg:py-4 lg:mt-10 gap-y-5 lg:gap-6 px-5">
        {data.map((item, index) => {
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
                {item.isStatus ? (
                  <Status status={item.value as StatusType} />
                ) : (
                  item.value
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </section>
    {/* Building  Attributes */}
    {project.project_type === "building" && (
  project.project_attribute?.type ? (
    <>
      <section className="mt-5 mb-5">
        <h3 className="bg-[#FFF0E5] max-lg:mb-4 p-2.5 lg:py-4 lg:px-5 lg:text-xl font-semibold">
          Project Attributes
        </h3>
        <ul className="grid grid-cols-1 max-lg:rounded bg-white max-lg:drop-shadow-md lg:grid-cols-2 max-lg:py-4 lg:mt-10 gap-y-5 lg:gap-6 px-5">
          {building_data.map((item, index) => (
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
                {item.isStatus ? (
                  <Status status={item.value as StatusType} />
                ) : (
                  item.value
                )}
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-5 mb-5">
        <div className="lg:col-span-2">
          <BuildingUnitsTable
            project={project}
            data={building_units}
            setData={setBuildingUnits}
          />
        </div>
      </section>
    </>
  ) : (
    building_data.length > 0 && (
      <div className="flex justify-between space-x-6 items-center mt-5">
        <Button
          onClick={() => setStep("building_details")}
          className="w-1/2 lg:w-[200px] max-lg:h-9 max-lg:!px-0"
        >
          <div className="flex items-center space-x-3">
            <Icons.PlusIcon className="fill-white size-3.5" />
            <span>Create Attributes</span>
          </div>
        </Button>
      </div>
    )
  )
)}

   {/* Funiture Attributes */}
   {project.project_type === "furniture" && (
  project.project_attribute?.type ? (
    <section className="mt-5 mb-5">
      <h3 className="bg-[#FFF0E5] max-lg:mb-4 p-2.5 lg:py-4 lg:px-5 lg:text-xl font-semibold">
        Project Attributes
      </h3>
      <ul className="grid grid-cols-1 max-lg:rounded bg-white max-lg:drop-shadow-md lg:grid-cols-2 max-lg:py-4 lg:mt-10 gap-y-5 lg:gap-6 px-5">
        {furniture_data.map((item, index) => (
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
              {item.isStatus ? (
                <Status status={item.value as StatusType} />
              ) : (
                item.value
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  ) : (
    furniture_data.length > 0 && (
      <div className="flex justify-between space-x-6 items-center mt-5">
        <Button
          onClick={() => setStep("furniture_details")}
          className="w-1/2 lg:w-[200px] max-lg:h-9 max-lg:!px-0"
        >
          <div className="flex items-center space-x-3">
            <Icons.PlusIcon className="fill-white size-3.5" />
            <span>Create Attributes</span>
          </div>
        </Button>
      </div>
    )
  )
)}

   {/* concreate  Attributes */}
   {project.project_type === "concrete" && (
  project.project_attribute?.type ? (
    <section className="mt-5 mb-5">
      <h3 className="bg-[#FFF0E5] max-lg:mb-4 p-2.5 lg:py-4 lg:px-5 lg:text-xl font-semibold">
        Project Attributes
      </h3>
      <ul className="grid grid-cols-1 max-lg:rounded bg-white max-lg:drop-shadow-md lg:grid-cols-2 max-lg:py-4 lg:mt-10 gap-y-5 lg:gap-6 px-5">
        {concrete_data.map((item, index) => (
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
              {item.isStatus ? (
                <Status status={item.value as StatusType} />
              ) : (
                item.value
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  ) : (
    concrete_data.length > 0 && (
      <div className="flex justify-between space-x-6 items-center mt-5">
        <Button
          onClick={() => setStep("concrete_details")}
          className="w-1/2 lg:w-[200px] max-lg:h-9 max-lg:!px-0"
        >
          <div className="flex items-center space-x-3">
            <Icons.PlusIcon className="fill-white size-3.5" />
            <span>Create Attributes</span>
          </div>
        </Button>
      </div>
    )
  )
)}


 {/* <Modal
      title={stepProps[step].title}
      show={showModal}
      width={stepProps[step].width}
      closeButtonStyle={stepProps[step].closeButtonStyle}
      showHeaderBorder={stepProps[step].showHeaderBorder}
      onRequestClose={() => {
        setShowModal(false);
        setTimeout(() => {
          reset();
          setStep("create");
        }, 1000);
      }}
    > */}
{step === "furniture_details" && (
        <motion.div
          key={step.toString()}
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
                onSubmit={methods.handleSubmit(onSubmitFunitureAttribute)}
                className="max-lg:space-y-6 lg:grid lg:grid-cols-2 lg:gap-x-9 gap-y-6"
              >
                <Input
                  name="name"
                  label="Furniture Name"
                  rules={["required"]}
                  placeholder="Enter Name"
                />
                <SelectInput
                  label="Furniture Type"
                  name="type"
                  required
                  options={
                    furniture_types?.data?.map((furniture_type) => {
                      return {
                        name: furniture_type?.name,
                        id: furniture_type?.id,
                      };
                    }) || []
                  }
                  optionComponent={(option, selectedOption) => (
                    <div
                      className={cn(
                        "py-2 w-full border-b px-4 flex items-center space-x-5 text-tc-main hover:bg-[#FF69001A]",
                        {
                          "bg-[#FF69001A]": option?.value === selectedOption?.value,
                        }
                      )}
                    >
                      <div className="w-full text-sm flex items-center space-x-2">
                        <div>{option?.name}</div>
                      </div>
                      {option?.name === selectedOption?.name && (
                        <div>
                          <Icons.SelectedIcon />
                        </div>
                      )}
                    </div>
                  )}
                  trigger={(selected) => (
                    <div className="flex h-min bg-transparent items-center space-x-1">
                      {selected ? (
                        <div className="text-tc-main flex space-x-2 items-center text-sm">
                          <span>{selected.name}</span>
                        </div>
                      ) : (
                        <div className="text-sm mt-[2px] text-black-500">
                          Select Funiture Purpose
                        </div>
                      )}
                    </div>
                  )}
                />

                <div className="lg:col-span-2">
                  <Input
                    name="description"
                    label="Description"
                    rules={["required"]}
                    placeholder="Enter Description"
                    tag="textarea"
                  />
                </div>

                <Input
                  name="unit_price"
                  label="Unit Price"
                  rules={["required"]}
                  placeholder="Enter Unit Price"
                  type="tel"
                  onChange={(e) => {
                    setValue(
                      "unit_price",
                      numberWithCommas(e?.target.value.replace(/[^0-9.]/g, "")),
                    );
                    setValue(
                      "unit_price",
                      Number(e.target.value.replaceAll(",", "")),
                    );
                  }}
                />
                <Input
                  name="quantity"
                  label="Quantity"
                  rules={["required"]}
                  placeholder="Enter Quantity"
                  type="number"
                  
                />
                <p>
                  Total Value :{" "}
                  {/* {numberWithCommas(
                    String(
                      Number(unit_price) * quantity,
                    ).replace(/[^0-9.]/g, ""),
                  )} */}
                </p>

                <div className="lg:col-span-2 flex justify-center py-4 gap-2">
                  
                  <Button
                    loading={isLoading}
                    type="submit"
                    className="w-full lg:w-[240px]"
                  >
                    Create
                  </Button>
                </div>
              </form>
            </FormProvider>
          </section>
        </motion.div>
      )}

      {step === "concrete_details" && (
        <motion.div
          key={step.toString()}
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
                onSubmit={methods.handleSubmit(onSubmitConcreateAttribute)}
                className="max-lg:space-y-6 lg:grid lg:grid-cols-2 lg:gap-x-9 gap-y-6"
              >
                <Input
                  name="name"
                  label="Concrete Name"
                  rules={["required"]}
                  placeholder="Enter Name"
                />
                <SelectInput
                  label="Concrete Type"
                  name="type"
                  required
                  options={
                    concrete_types?.data?.categories?.map((concrete_type) => {
                      return {
                        name: concrete_type?.name,
                        id: concrete_type?.id,
                      };
                    }) || []
                  }
                  optionComponent={(option, selectedOption) => (
                    <div
                      className={cn(
                        "py-2 w-full border-b px-4 flex items-center space-x-5 text-tc-main hover:bg-[#FF69001A]",
                        {
                          "bg-[#FF69001A]": option?.value === selectedOption?.value,
                        }
                      )}
                    >
                      <div className="w-full text-sm flex items-center space-x-2">
                        <div>{option?.name}</div>
                      </div>
                      {option?.name === selectedOption?.name && (
                        <div>
                          <Icons.SelectedIcon />
                        </div>
                      )}
                    </div>
                  )}
                  trigger={(selected) => (
                    <div className="flex h-min bg-transparent items-center space-x-1">
                      {selected ? (
                        <div className="text-tc-main flex space-x-2 items-center text-sm">
                          <span>{selected.name}</span>
                        </div>
                      ) : (
                        <div className="text-sm mt-[2px] text-black-500">
                          Select Concrete Type
                        </div>
                      )}
                    </div>
                  )}
                />
                <Input
                  name="description"
                  label="Concrete Description"
                  rules={["required"]}
                  placeholder="Enter Description"
                  tag="textarea"
                />
                <div className="lg:col-span-2 flex justify-center py-4 gap-2">
                
                  <Button
                    loading={isLoading}
                    type="submit"
                    // disabled={!isValid}
                    className="w-full lg:w-[240px]"
                  >
                    Create
                  </Button>
                </div>
              </form>
            </FormProvider>
          </section>
        </motion.div>
      )}

      {step === "building_details" && ( 
        <>
        <motion.div
          key={step.toString()}
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
      onSubmit={methods.handleSubmit(onSubmitBuildingAttribute)}
      className="max-lg:space-y-6 lg:grid lg:grid-cols-2 lg:gap-x-9 gap-y-6"
    >
      <SelectInput
        label="Building Purpose"
        name="building_purpose"
        required
        options={
          building_purposes?.data?.map((building_purpose) => ({
            name: building_purpose?.name,
            value: building_purpose?.id,
          })) || []
        }
        optionComponent={(option, selectedOption) => (
          <div
            className={cn(
              "py-2 w-full border-b px-4 flex items-center space-x-5 text-tc-main hover:bg-[#FF69001A]",
              {
                "bg-[#FF69001A]": option?.value === selectedOption?.value,
              }
            )}
          >
            <div className="w-full text-sm flex items-center space-x-2">
              <div>{option?.name}</div>
            </div>
            {option?.name === selectedOption?.name && (
              <div>
                <Icons.SelectedIcon />
              </div>
            )}
          </div>
        )}
        trigger={(selected) => (
          <div className="flex h-min bg-transparent items-center space-x-1">
            {selected ? (
              <div className="text-tc-main flex space-x-2 items-center text-sm">
                <span>{selected.name}</span>
              </div>
            ) : (
              <div className="text-sm mt-[2px] text-black-500">
                Select Building Purpose
              </div>
            )}
          </div>
        )}
      />

      <Input
        name="plot_number"
        label="Plot Number"
        rules={["required"]}
        placeholder="1"
      />
      <Input
        name="lot"
        label="Lot Number"
        rules={["required"]}
        placeholder="1"
      />
      <Input
        name="plot_address"
        label="Plot Address"
        rules={["required"]}
        placeholder="No 12 Sokoto Street, Gwarimpa, Abuja."
        tag="textarea"
      />

      <div className="lg:col-span-2 flex justify-center py-4 gap-2">
        <Button
          type="submit"
          className="w-full lg:w-[240px]"
        >
          Create
        </Button>
      </div>
    </form>
  </FormProvider>
</section>

        </motion.div>
     
        </>
      )}

      {/* </Modal> */}


                   
  </>
  );
};

export default ProjectDetails;
