"use client";

import Loader from "@/components/global/Loader";
import WarehouseInventoryDetails from "@/components/warehouse/WarehouseInventoryDetails";
import { useFetchProjectDetailQuery } from "@/services/warehouse";
import { useParams } from "next/navigation";

const WarehouseInventoryDetailsPage = () => {
  const params = useParams<{ id: string }>();

  const { data, isLoading, isError } = useFetchProjectDetailQuery({
    id: params.id,
  });
  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return <div>Error</div>;
  }
  return <WarehouseInventoryDetails data={data?.data!} />;
};

export default WarehouseInventoryDetailsPage;
