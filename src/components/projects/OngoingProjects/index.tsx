"use client";

import { useFetchProjectsQuery } from "@/services/projects";
import ProjectsTable from "../ProjectsTable";

const OngoingProjects = () => {
  // Pass 'ongoing' to the query to fetch ongoing projects
  const { data: projects } = useFetchProjectsQuery({
    type: "ongoing", // This type will be used in the API call
  });

  return (
    <section>
      {projects && <ProjectsTable title="Ongoing Projects" data={projects!} />}
    </section>
  );
};

export default OngoingProjects;
