"use client";

import { useFetchProjectsQuery } from "@/services/projects";
import ProjectsTable from "../ProjectsTable";

const OngoingProjects = () => {
	const { data: projects } = useFetchProjectsQuery({
		type: "ongoing"
	})

	return (
		<section>
				{ projects && ( <ProjectsTable title="Ongoing Projects" data={projects!} />) }
		</section>
	);
};

export default OngoingProjects;
