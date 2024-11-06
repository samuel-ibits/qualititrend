import MaterialTransfer from '@/components/warehouse/MaterialTransfer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Warehouse | Material Transfer",
};

const MaterialTransferPage = () => {
  return (
    <MaterialTransfer />
  )
}

export default MaterialTransferPage