import OngoingProjects from "@/components/projects/OngoingProjects";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Projects | Ongoing Projects",
};

const OngoingProjectsPage = () => {
	return <OngoingProjects />;
};

export default OngoingProjectsPage;
