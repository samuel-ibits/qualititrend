import Status, { StatusType } from "@/components/global/Status";
import { cn } from "@/lib/utils";
import { Project } from "@/types/services/projects";

type Props = {
  project: Project;
};

const ProjectDetails = ({ project }: Props) => {
  const data = [
    {
      label: "Project Code",
      value: project.project_code,
    },
    {
      label: "Project Type",
      value: project.project_type,
    },
    {
      label: "Project Manager",
      value: project.project_manager?.first_name,
    },
    {
      label: "Project Summary",
      value: project.project_summary,
    },
    {
      label: "Project Supervisor",
      value: project.project_supervisor?.first_name,
    },
    {
      label: "Status",
      value: project.status?.type || "",
      isStatus: true,
    },
  ];

  return (
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
  );
};

export default ProjectDetails;
