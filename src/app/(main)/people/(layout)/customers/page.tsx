import Customers from '@/components/people/Customers'
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "People | Customers",
};

export default function CustomersPage() {
  return (
	  <Customers />
  )
}
