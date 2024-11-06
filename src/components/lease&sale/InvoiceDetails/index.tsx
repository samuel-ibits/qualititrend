"use client";
import React from "react";
import InvoiceTable from '../CreateInvoice/InvoiceTable';
import InvoiceDetailHeader from './InvoiceDetailHeader';

const InvoiceDetails = () => {


  return (
    <section className="w-full lg:px-11 py-3 lg:py-6 bg-white shadow-[rgba(80,80,80,0.1)_1px_1px_3px_3px] rounded-lg h-full">
      <div className="pt-14 pb-20">
        <h2 className="text-4xl text-black-900 font-OpenSans font-bold text-center">
          INVOICE
        </h2>
      </div>
      <InvoiceDetailHeader />
      <InvoiceTable action={false} />
    </section>
  );
};
export default InvoiceDetails;
