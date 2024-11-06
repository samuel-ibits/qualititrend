import Projects from "@/components/projects/Projects";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Projects",
};

const ProjectsPage = () => {
	return <Projects />;
};

export default ProjectsPage;
