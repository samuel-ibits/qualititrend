import Sales from "@/components/lease&sale/Sales";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lease and Sales | Sales",
};

const page = () => {
  return <Sales />;
};

export default page;
