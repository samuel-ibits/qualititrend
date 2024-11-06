import Lease from '@/components/lease&sale/Lease';
import React from "react";
import { Metadata } from 'next';



export const metadata: Metadata = {
  title: "Lease and Sales | Lease",
};
const page = () => {
  return <Lease />;
};

export default page;
