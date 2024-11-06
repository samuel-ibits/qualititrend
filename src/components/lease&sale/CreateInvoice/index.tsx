import React from "react";
import CreateInvoiceForm from "./CreateInvoiceForm";

const CreateInvoice = () => {
  return (
    <section className="lg:px-11 py-3 lg:py-6 bg-white shadow-[rgba(80,80,80,0.1)_1px_1px_3px_3px] rounded-lg h-full">
      <div className="pb-8">
        <h2 className="text-4xl text-black-900 font-OpenSans font-bold text-center">
          INVOICE
        </h2>
      </div>
      <CreateInvoiceForm />
    </section>
  );
};

export default CreateInvoice;
