"use client";

import Button from "@/components/global/Button";
import SelectInput from "@/components/global/SelectInput";
import Icons from "@/components/icons";
import Link from "next/link";
import { FormProvider, useForm } from "react-hook-form";
import SideStats from "@/components/global/SideStats";
import { cn, formatAmount, numberWithCommas } from "@/lib/utils";
import Stats from "@/components/global/Stats";
import IncomeAndExpensesChart from "@/components/dashboard/IncomeAndExpensesChart";
import ProjectsTable from "../ProjectsTable";
import RecentProjectsProgressChart from "../RecentProjectsProgressChart";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CreateProjectModal from "../CreateProjectModal";
import Dropdown from "@/components/global/Dropdown";
import {
  useFetchProjectsQuery,
  useFetchProjectsStatsQuery,
} from "@/services/projects";

const Projects = () => {
  const [showCreateProjectModal, setShowCreateProjectModal] = useState(false);

  const router = useRouter();

  const methods = useForm({
    mode: "onChange",
    defaultValues: {
      route: {
        name: "Projects",
        value: "/projects",
      },
    },
  });

  const {
    formState: { errors },
    watch,
  } = methods;

  const route = watch("route");

  useEffect(() => {
    router.push(route.value);
  }, [route]);

  const stats = [
    {
      title: "Total Income",
      value: formatAmount(0, "NGN"),
      icon: <Icons.IncomeIcon />,
    },
    {
      title: "Total Expenses",
      value: formatAmount(0, "NGN"),
      icon: <Icons.ExpensesIcon />,
    },
    {
      title: "Total Budget",
      value: 0,
      icon: <Icons.ProjectStatsIcon />,
    },
    {
      title: "Projects",
      value: 0,
      icon: <Icons.ProjectStatsIcon />,
    },
  ];

  const sideStats = [
    {
      title: "Total Ongoing Projects",
      value: numberWithCommas(0),
    },
    {
      title: "Total Completed Projects",
      value: numberWithCommas(0),
    },
  ];

  const dropdownButtons = [
    {
      label: "Create New Project",
      onClick: () => setShowCreateProjectModal(true),
    },
    // {
    //   label: "Create Building Purpose",
    //   onClick: () => {},
    // },
    // {
    //   label: "Create Furniture Type",
    //   onClick: () => {},
    // },
    // {
    //   label: "Create Concrete Type",
    //   onClick: () => {},
    // },
    // {
    //   label: "Create Building Unit Type",
    //   onClick: () => {},
    // },
  ];

  const { data: recent_projects, isSuccess } = useFetchProjectsQuery({});
  const { data: projects_stats, isSuccess: is_fetch_project_stats_success } =
    useFetchProjectsStatsQuery({});

  function generateStats() {
    const data = is_fetch_project_stats_success
      ? [
          {
            title: "Total Income",
            value: formatAmount(projects_stats.data.total_income, "NGN"),
            icon: <Icons.IncomeIcon />,
          },
          {
            title: "Total Expenses",
            value: formatAmount(projects_stats.data.total_expenses, "NGN"),
            icon: <Icons.ExpensesIcon />,
          },
          {
            title: "Total Budget",
            value: formatAmount(projects_stats.data.total_budget, "NGN"),
            icon: <Icons.ProjectStatsIcon />,
          },
          {
            title: "Projects",
            value: projects_stats.data.total_project,
            icon: <Icons.ProjectStatsIcon />,
          },
        ]
      : stats;
    return data;
  }

  function generateSideStats() {
    const data = is_fetch_project_stats_success
      ? [
          {
            title: "Total Ongoing Projects",
            value: numberWithCommas(projects_stats.data.ongoing_projects),
          },
          {
            title: "Total Completed Projects",
            value: numberWithCommas(projects_stats.data.completed_projects),
          },
        ]
      : sideStats;
    return data;
  }

  return (
    <div>
      <div className="lg:flex lg:space-x-5 lg:items-center justify-between">
        <div>
          <h1 className="lg:text-2xl font-semibold">Projects</h1>
          <div className="text-sm lg:text-sm text-black-500 font-Roboto flex items-center space-x-3 mt-1">
            <Link href="/dashboard">
              <span className="hidden lg:block">Dashboard</span>
              <Icons.DashboardIcon className="fill-black-500 lg:hidden" />
            </Link>
            <span>
              <Icons.CaretIcon className="fill-black-900 transform -rotate-90" />
            </span>
            <span className="text-primary ">Projects</span>
          </div>
        </div>
        <div className="space-y-4 lg:space-y-6 max-lg:mt-4">
          <div className="flex justify-between items-center lg:justify-end">
            <Dropdown
              trigger={() => (
                <Button className="w-[200px] max-lg:h-9">
                  <div className="flex items-center space-x-3">
                    <Icons.PlusIcon className="fill-white size-3.5 " />
                    <div>Create Project</div>
                  </div>
                </Button>
              )}
              className="-left-10 top-14"
            >
              <div className="w-[240px] bg-white rounded-md">
                {dropdownButtons.map((button, index) => (
                  <button
                    key={index}
                    onClick={button.onClick}
                    className="flex w-full dropdown-item hover:bg-[#FFE2D2] transition-all text-sm items-center justify-between p-3 border-b last:border-b-0 border-[#CBCFD3]"
                  >
                    {button.label}
                  </button>
                ))}
              </div>
            </Dropdown>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-2 mt-2 max-lg:mt-4">
        <div className="text-xs">Showing data for:</div>
        <div className="w-[205px]">
          <FormProvider {...methods}>
            <SelectInput
              name="route"
              options={[
                {
                  name: "Projects",
                  value: "/projects",
                },
                {
                  name: "Ongoing Projects",
                  value: "/projects/ongoing-projects",
                },
                {
                  name: "Completed Projects",
                  value: "/projects/completed-projects",
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
                        Select Route
                      </div>
                    )}
                  </div>
                );
              }}
            />
          </FormProvider>
        </div>
      </div>
      <div className="mt-6">
        <section className="lg:grid lg:grid-cols-3 lg:gap-8 max-lg:space-y-4">
          <div className="col-span-2 space-y-6">
            <Stats
              stats={is_fetch_project_stats_success ? generateStats() : stats}
              showMobileTitle={false}
            />
          </div>
          <div className="col-span-1 space-y-6">
            <SideStats
              stats={
                is_fetch_project_stats_success ? generateSideStats() : sideStats
              }
            />
          </div>
        </section>
      </div>
      <div className="mt-6">
        <section className="lg:grid lg:grid-cols-2 lg:gap-8 max-lg:space-y-4">
          <div className="col-span-1 space-y-6">
            <IncomeAndExpensesChart />
          </div>
          <div className="col-span-1 space-y-6">
            <RecentProjectsProgressChart />
          </div>
        </section>
      </div>
      <div className="mt-6">
        {recent_projects && (
          <ProjectsTable title="Recent Projects" data={recent_projects!} />
        )}
      </div>
      <CreateProjectModal
        showModal={showCreateProjectModal}
        setShowModal={setShowCreateProjectModal}
        currentData={null}

      />
    </div>
  );
};

export default Projects;
