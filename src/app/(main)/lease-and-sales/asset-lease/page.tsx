import AssetLease from "@/components/lease&sale/AssetLease";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Lease and Sales | Asset Lease",
};

export default function AssetLeasePage() {
    return (
        <AssetLease />
    )
}
