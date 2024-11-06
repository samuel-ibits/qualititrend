'use client'

import WarehouseInventory from '@/components/warehouse/WarehouseInventory'
import { Metadata } from 'next';
import { useFetchProductsQuery } from "@/services/warehouse";
import Loader from '@/components/global/Loader';

/* export const metadata: Metadata = { */
/*   title: "Warehouse | Inventory", */
/* }; */

const WarehouseInventoryPage = () => {

  const { data, isLoading, isError } = useFetchProductsQuery({})

  if (isLoading) {
    <Loader />
  }

  if (isError) {
    <div>
      Error
    </div>
  }

  return (
    <WarehouseInventory data={data?.data?.data || []} />
  )
}

export default WarehouseInventoryPage
