import { Metadata } from "next";
import Expenses from "@/components/Finances/Expenses"

export const metadata: Metadata = {
	title: "Finances | Expenses",
};

const expenses = () => {
	return  <Expenses /> ;
};

export default expenses;
