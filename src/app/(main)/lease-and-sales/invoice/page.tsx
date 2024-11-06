import CreateInvoice from '@/components/lease&sale/CreateInvoice'
import { Metadata } from 'next';
import React from 'react'


export const metadata: Metadata = {
  title: "Lease and Sales | Invoice",
};

const CreateInvoicePage = () => {
  return (
    <CreateInvoice />
  )
}

export default CreateInvoicePage
