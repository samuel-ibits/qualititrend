import WarehouseAssets from "@/components/warehouse/WarehouseAssets"
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Warehouse | Assets",
};

const WarehouseAssetsPage = () => {
    return (
        <WarehouseAssets />
    )
}

export default WarehouseAssetsPage