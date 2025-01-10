import Invoice from "@/components/lease&sale/Invoices";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Lease and Sales | Invoice",
};

const Invoices = () => {
  return <Invoice />;
};

export default Invoices;
