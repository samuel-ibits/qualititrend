// @ts-nocheck

"use client";

import Button from "@/components/global/Button";
import Input from "@/components/global/Input";
import Loader from "@/components/global/Loader";
import SelectInput from "@/components/global/SelectInput";
import Tab from "@/components/global/Tab";
import Icons from "@/components/icons";
import ChangeStatusModal from "@/components/projects/ChangeStatusModal";
import CreateRequestModal from "@/components/projects/CreateRequestModal";
import ProjectDetails from "@/components/projects/ProjectDetails";
import ProjectDetailsStats from "@/components/projects/ProjectDetailsStats";
import { cn, formatAmount } from "@/lib/utils";
import { useFetchProjectByIdQuery } from "@/services/projects";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

type ProjectDetailsLayoutProps = {
  children: React.ReactNode;
};

const ProjectDetailsLayout = ({ children }: ProjectDetailsLayoutProps) => {
  const [showChangeStatusModal, setShowChangeStatusModal] = useState(false);
  const [showCreateRequestModal, setShowCreateRequestModal] = useState(false);

  const pathname = usePathname();
  const params = useParams();

  const routes = [
    {
      name: "Inventory",
      path: `/projects/${params.id}/inventory`,
    },
    {
      name: "Incoming Inventory",
      path: `/projects/${params.id}/incoming-inventory`,
    },
    {
      name: "Outgoing Inventory",
      path: `/projects/${params.id}/outgoing-inventory`,
    },
    {
      name: "Purchase Order",
      path: `/projects/${params.id}/purchase-order`,
    },
    {
      name: "Expense Requests",
      path: `/projects/${params.id}/expense-requests`,
    },
    {
      name: "Warehouse Supply Requests",
      path: `/projects/${params.id}/warehouse-supply-requests`,
      isWider: true,
    },
    {
      name: "Transactions",
      path: `/projects/${params.id}/transactions`,
    },
  ];

  const methods = useForm({
    mode: "onChange",
    defaultValues: {
      search: "",
      project: "",
    },
  });

  const {
    formState: { errors },
    watch,
  } = methods;

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

  const projectDetailsStatsData = project
    ? [
        {
          label: "Initiation Date",
          value: project.data.initiation_date,
        },
        {
          label: "Completion Date",
          value: project.data.proposed_completed_date?project.data.proposed_completed_date:'Not Specified' ,
        },
        {
          label: "Total Expenses",
          value: formatAmount(project.data.total_expenses, "NGN"),
        },
        {
          label: "Budget",
          value: formatAmount(Number(project.data.budget), "NGN"),
        },
        {
          label: "Total Income",
          value: formatAmount(project.data.total_income, "NGN"),
        },
        {
          label: "Cash Balance",
          value: formatAmount(Number(project.data.balance), "NGN"),
        },
        {
          label: "Total Units",
          value: String(project.data.total_units.length),
        },
      ]
    : [];

  return (
    <div>
      <div className="lg:flex lg:space-x-5 justify-between">
        <div>
          <h1 className="lg:text-2xl font-semibold">Projects</h1>
          <div className="text-sm lg:text-sm text-black-500 font-Roboto flex items-center space-x-3 mt-1">
            <Link href="/dashboard">Dashboard</Link>
            <span>
              <Icons.CaretIcon className="fill-black-900 transform -rotate-90" />
            </span>
            <Link href="/projects">Projects</Link>
            <span>
              <Icons.CaretIcon className="fill-black-900 transform -rotate-90" />
            </span>
            <span className="capitalize text-primary">Project Details</span>
          </div>
          <div className="flex items-center space-x-2 mt-2 max-lg:mt-4">
            <div className="text-xs">Showing data for:</div>
            <div className="w-[205px]">
              <FormProvider {...methods}>
                <SelectInput
                  name="project"
                  options={[
                    {
                      name: "Project 1",
                      value: "/projects/CPD1",
                    },
                    {
                      name: "Project 2",
                      value: "/projects/CPD2",
                    },
                    {
                      name: "Project 3",
                      value: "/projects/CPD3",
                    },
                  ]}
                  optionComponent={(option, selectedOption) => {
                    return (
                      <div
                        className={cn(
                          "py-2 w-full border-b px-4 flex items-center space-x-5 text-tc-main hover:bg-[#FF69001A]",
                          {
                            "bg-[#FF69001A]":
                              option?.value === selectedOption?.value,
                          },
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
                    );
                  }}
                  trigger={(selected) => {
                    return (
                      <div className="flex h-min bg-transparent items-center space-x-1">
                        {selected ? (
                          <div className="text-tc-main flex space-x-2 items-center text-sm">
                            <span>{selected.name}</span>
                          </div>
                        ) : (
                          <div className="text-sm mt-[2px] text-tc-secondary">
                            Select Project
                          </div>
                        )}
                      </div>
                    );
                  }}
                />
              </FormProvider>
            </div>
          </div>
        </div>
        <div className="space-y-4 lg:space-y-6 max-lg:mt-4">
          <div className="flex justify-between space-x-6 items-center">
            <Button
              onClick={() => setShowCreateRequestModal(true)}
              className="w-1/2 lg:w-[200px] max-lg:h-9 max-lg:!px-0"
            >
              <div className="flex items-center space-x-3">
                <Icons.PlusIcon className="fill-white size-3.5" />
                <div>Create Request</div>
              </div>
            </Button>
            <Button
              onClick={() => setShowChangeStatusModal(true)}
              theme="outline"
              className="w-1/2 lg:w-[200px] max-lg:h-9 max-lg:!px-0"
            >
              Change Status
            </Button>
          </div>
        </div>
        <div className="lg:hidden flex items-center space-x-4 mt-4">
          <button className="lg:hidden">
            <Icons.ProjectEmailIcon />
          </button>
          <button className="lg:hidden">
            <Icons.ProjectPrinterIcon />
          </button>
          <button className="lg:hidden">
            <Icons.ProjectDocumentIcon />
          </button>
        </div>
      </div>
      <div className="mt-6">
        <ProjectDetailsStats data={projectDetailsStatsData} />
      </div>
      <div className="mt-6 pb-5">
        <ProjectDetails project={project!.data} />
      </div>
      <Tab
        routes={routes}
        initialRoute={{
          name: pathname?.split("/")[3]?.replace("-", " "),
          value: `/projects/${params.id}/${pathname?.split("/")[3]}`,
        }}
      />
      <div className="mb-6">
        <FormProvider {...methods}>
          <form className="lg:!ml-0 flex-1">
            <div className="lg:w-[300px]">
              <Input
                name="search"
                placeholder="Search"
                paddingLeft="pl-11"
                type="search"
                left={
                  <div className="w-9 pl-3">
                    <Icons.SearchIcon />
                  </div>
                }
              />
            </div>
          </form>
        </FormProvider>
      </div>
      <div>{children}</div>
      <ChangeStatusModal
        showModal={showChangeStatusModal}
        setShowModal={setShowChangeStatusModal}
      />
      <CreateRequestModal
        showModal={showCreateRequestModal}
        setShowModal={setShowCreateRequestModal}
      />
    </div>
  );
};

export default ProjectDetailsLayout;
