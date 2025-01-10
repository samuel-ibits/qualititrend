"use client";

import { useFetchProjectsQuery } from "@/services/projects";
import ProjectsTable from "../ProjectsTable";

const CompletedProjects = () => {
  // Pass 'completed' to the query to fetch completed projects
  const { data: projects } = useFetchProjectsQuery({
    type: "completed", // This type will be used in the API call
  });

  return (
    <section>
      {projects && (
        <ProjectsTable title="Completed Projects" data={projects!} />
      )}
    </section>
  );
};

export default CompletedProjects;
