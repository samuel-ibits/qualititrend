import PurchaseOrder from "@/components/warehouse/PurchaseOrder";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Warehouse | Purchase Order",
};

const PurchaseOrderPage = () => {
  return <PurchaseOrder />;
};

export default PurchaseOrderPage;
