import CompletedProjects from "@/components/projects/CompletedProjects";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Projects | Completed Projects",
};

const CompletedProjectsPage = () => {
	return <CompletedProjects />;
};

export default CompletedProjectsPage;
