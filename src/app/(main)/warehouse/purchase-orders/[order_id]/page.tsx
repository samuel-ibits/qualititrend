import PurchaseOrderDetail from "@/components/warehouse/PurchaseOrder/detail";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Warehouse | Purchase Order",
};

const PurchaseOrderPage = () => {
  return <PurchaseOrderDetail />;
};

export default PurchaseOrderPage;
