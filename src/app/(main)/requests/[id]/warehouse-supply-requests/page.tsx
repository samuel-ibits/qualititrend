"use client";

import WarehouseSupplyDetails from "@/components/requests/warehouse-supply-details";
import { useParams } from "next/navigation";

const WarehouseSupplyRequestsDetailsPage = () => {

    const params = useParams();

    return <WarehouseSupplyDetails />;
};

export default WarehouseSupplyRequestsDetailsPage;
