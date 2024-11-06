"use client";

import WarehouseAssetsDetails from "@/components/warehouse/WarehouseAssetsDetails";
import { useParams } from "next/navigation";

const WarehouseAssetsDetailsPage = () => {

    const params = useParams();

    return (
        <WarehouseAssetsDetails />
    );
};

export default WarehouseAssetsDetailsPage;
