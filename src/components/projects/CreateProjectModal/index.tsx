// @ts-nocheck

"use client";

import Button from "@/components/global/Button";
import Input from "@/components/global/Input";
import Modal from "@/components/global/Modal";
import Icons from "@/components/icons";
import { useCreateProjectMutation } from "@/services/projects";
import { useGetStaffQuery } from "@/services/staff";
import { useState, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { useFetchCategoriesQuery } from "@/services/categories";
import { _Select } from "@/components/global/MultipleSelectInput";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useFetchProjectStatussQuery } from "@/services/projectStatus";

// Type definitions
type CreateProjectModalProps = {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
  currentData
};

type steps =
  | "create"
  | "success"
  | "building_details"
  | "concrete_details"
  | "furniture_details";

const CreateProjectModal = ({
  showModal,
  setShowModal,
  currentData
}: CreateProjectModalProps) => {
  const [step, setStep] = useState<steps>("create");

  // Fetching required data from API
  const { data: staff } = useGetStaffQuery({
    perPage: 100000,
  });

  const { data: project_type } = useFetchCategoriesQuery({
    type: "project_type",
  });

  const { data: project_statuses } = useFetchProjectStatussQuery();
  console.log("project_statuses", project_statuses);

  // Validation Schema using Yup
  const validationSchema = Yup.object().shape({
    type: Yup.string().required("Please select type"),
    project_code: Yup.string().required("Please fill this"),
    status: Yup.number().required("Please fill this"),
    budget: Yup.number().required("Please fill this"),
    manager: Yup.string().required("Please fill this"),
    summary: Yup.string().required("Please fill this"),
    supervisor: Yup.string().required("Please fill this"),
    budgetDescription: Yup.string().required("Please fill this"),
    initiation_date: Yup.string().required("Please fill this"),
    completion_date: Yup.string().required("Please fill this"),
  });
  
console.log('curent value',currentData)
  // Hook form setup
  const formOptions = { resolver: yupResolver(validationSchema) };
  const methods = useForm({
    defaultValues: {
      type: "",
      project_code: "",
      status: 0,
      budget: 0,
      manager: "",
      summary: "",
      supervisor: "",
      budgetDescription: "",
      initiation_date: "",
      completion_date: "",
    },
    ...formOptions,
  });

  const {
    formState: { errors, isValid },
    handleSubmit,
    reset,
    trigger,
    watch,
  } = methods;

  const [submit_error, setSubmitError] = useState("");

  const {
    project_code,
    status,
    budget,
    summary,
    manager,
    supervisor,
    initiation_date,
    completion_date,
  } = watch();

  // Mutation to create the project
  const [createProject, { isLoading }] = useCreateProjectMutation();

  // Simplified submit function
  const onSubmit = async (data: any) => {
    // Log the status to see what is being selected
    console.log("Selected Status ID:", status);

    try {
      const projectData = {
        project_code,
        status: Number(status), // Ensure the status is treated as a number
        type: data.type,
        manager_id: manager,
        supervisor_id: supervisor,
        budget,
        initiation_date,
        completion_date,
        summary,
      };

      const result = await createProject(projectData).unwrap();
      setStep("success");
    } catch (error) {
      setSubmitError(error?.data?.message || "Error creating project");
    }
  };

  // Step definitions for the modal
  const stepProps = {
    create: {
      title: "Create New Project",
    },
    success: {
      title: "Success",
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

  useEffect(() => {
    console.log(project_type);
    console.log(errors);
  }, [errors]);

  return (
    <Modal
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
    >
      {step === "create" && (
        <motion.div
          key={step.toString()}
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1, transition: { delay: 0.2 } }}
          exit={{ x: -300, opacity: 0 }}
          className="w-full"
        >
          <section className="w-full">
            <FormProvider {...methods}>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="max-lg:space-y-6 lg:grid lg:grid-cols-2 lg:gap-x-9 gap-y-6"
              >
                {/* Your form fields go here */}
                <Input
                  name="project_code"
                  label="Project Code"
                  rules={["required"]}
                  placeholder="68_89GYN"
                  left={<div className="font-medium text-sm px-3">QGS - </div>}
                  paddingLeft="pl-14"
                />

                <_Select
                  label="Project Type"
                  name="type"
                  required
                  options={
                    project_type?.data?.map((status) => ({
                      name: status?.name,
                      id: status?.id,
                      value: status?.description,
                    })) || []
                  }
                  name_key="name"
                  value_key="value"
                  placeholder="Select Project Type"
                />

                <_Select
                  label="Project Status"
                  name="status"
                  required
                  options={
                    project_statuses?.data?.map((status) => ({
                      name: status?.name,
                      id: status?.id, // Ensure this is the ID
                    })) || []
                  }
                  //   options={[
                  // 						{
                  // 							name: "Furniture",
                  // 							value: "furniture",
                  // 							id:1
                  // 						},
                  // 						{
                  // 							name: "Concrete",
                  // 							value: "concrete",
                  // 							id:2
                  // 						},
                  // 						{
                  // 							name: "Building",
                  // 							value: "building",
                  // 							id:3
                  // 						},
                  // 					]}
                  name_key="name"
                  value_key="id" // Ensure we're selecting by ID
                  placeholder="Select Project Status"
                />

                <Input
                  name="budget"
                  label="Project Budget"
                  rules={["required"]}
                  placeholder="Enter Budget"
                  type="number"
                />

                <Input
                  name="budgetDescription"
                  label="Budget Description"
                  rules={["required"]}
                  placeholder="Enter Budget Description"
                  tag="textarea"
                />

                <Input
                  name="summary"
                  label="Project Summary"
                  rules={["required"]}
                  placeholder="Enter Project Summary"
                  tag="textarea"
                />

                <_Select
                  label="Project Manager"
                  name="manager"
                  required
                  options={
                    staff?.data?.data?.map((staff) => ({
                      title: staff?.staff_name,
                      value: staff?.id,
                    })) || []
                  }
                />
                <_Select
                  label="Project Supervisor"
                  name="supervisor"
                  required
                  options={
                    staff?.data?.data?.map((staff) => ({
                      title: staff?.staff_name,
                      value: staff?.id,
                    })) || []
                  }
                />
                <Input
                  name="initiation_date"
                  label="Initiation Date"
                  rules={["required"]}
                  placeholder="Enter Initiation Date"
                  type="date"
                />
                <Input
                  name="completion_date"
                  label="Completion Date"
                  rules={["required"]}
                  placeholder="Enter Completion Date"
                  type="date"
                />

                <div className="lg:col-span-2 flex justify-center py-4">
                  {errors.root && (
                    <p className="text-red-500 p-2 text-center">
                      {errors.root?.message}
                    </p>
                  )}
                  <Button type="submit" className="w-full lg:w-[240px]">
                    Next
                  </Button>
                </div>
              </form>
            </FormProvider>
          </section>
        </motion.div>
      )}

      {step === "success" && (
        <motion.div
          key={step.toString()}
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1, transition: { delay: 0.2 } }}
          exit={{ x: -300, opacity: 0 }}
          className="w-full"
        >
          <section className="flex flex-col h-full justify-center items-center space-y-4">
            <Icons.SuccessIcon />
            <p className="pb-10 text-center">Project created successfully</p>
          </section>
        </motion.div>
      )}

      {submit_error && (
        <p className="text-red-500 p-2 text-center">{submit_error}</p>
      )}
    </Modal>
  );
};

export default CreateProjectModal;
