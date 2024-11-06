import SiteSupplyRequests from '@/components/warehouse/SiteSupplyRequests';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Warehouse | Site Supply Requests",
};

const SiteSupplyRequestsPage = () => {
  return (
    <SiteSupplyRequests />
  )
}

export default SiteSupplyRequestsPage