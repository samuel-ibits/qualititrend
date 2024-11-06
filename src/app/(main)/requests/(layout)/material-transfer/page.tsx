import MaterialTransferRequests from '@/components/requests/material-transfer';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Requests | Material Transfer",
};

const MaterialTransferRequestsPage = () => {
    return (
       <MaterialTransferRequests />
    )
}

export default MaterialTransferRequestsPage