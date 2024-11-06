import Offer from '@/components/lease&sale/Offer';
import React from "react";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Lease and Sales | Offer",
};

const page = () => {
  return <Offer />;
};

export default page;
