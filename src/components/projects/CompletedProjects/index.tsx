"use client";

import { useFetchProjectsQuery } from "@/services/projects";
import ProjectsTable from "../ProjectsTable";

const CompletedProjects = () => {
	const { data: projects } = useFetchProjectsQuery({
		type: "completed"
	})

	return (
		<section>
				{ projects && ( <ProjectsTable title="Completed Projects" data={projects!} />) }
		</section>
	);
};

export default CompletedProjects;
