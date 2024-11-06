"use client";

import MaterialTransferDetails from "@/components/requests/material-transfer-details";
import { useParams } from "next/navigation";

const MaterialTransferRequestsDetailsPage = () => {

    const params = useParams();

    return <MaterialTransferDetails />;
};

export default MaterialTransferRequestsDetailsPage;
