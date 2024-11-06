import WarehouseSupplyRequests from '@/components/requests/warehouse-supply';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Requests | Warehouse Supply",
};

const WarehouseSupplyRequestsPage = () => {
    return (
        <WarehouseSupplyRequests />
    )
}

export default WarehouseSupplyRequestsPage