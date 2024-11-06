import { Metadata } from "next";
import Income from "@/components/Finances/income"

export const metadata: Metadata = {
	title: "Finances",
};

const FinancesPage = () => {
	return <Income />
};

export default FinancesPage;
