import WarehouseLease from '@/components/warehouse/Lease';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Warehouse | Lease",
};

const WarehouseLeasePage = () => {
  return (
    <WarehouseLease />
  )
}

export default WarehouseLeasePage