import Income from "@/components/Finances/income";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Finances | Income",
};

const income = () => {
	return <Income />;
};

export default income;

