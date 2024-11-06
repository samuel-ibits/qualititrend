import PurchaseOrderRequests from '@/components/requests/purchase-order';
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "Requests | Purchase Order",
};

const PurchaseOrderRequestsPage = () => {
  return (
    <PurchaseOrderRequests />
  )
}

export default PurchaseOrderRequestsPage