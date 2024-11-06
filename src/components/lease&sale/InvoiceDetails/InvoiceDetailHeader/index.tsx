import React from "react";

const companyInfo = [
  {
    title: "Qualitrends Residence 403 ",
  },
  {
    title: "Reg. No",
    value: "RC1015014",
  },
  {
    title: "Tax ID",
    value: "142654410-001",
  },
  {
    title: "Suite D2 ",
  },
  {
    title: "Innovations Plaza ",
  },
  {
    title: "Wuye fct",
  },
  {
    title: "Nigeria",
  },
  {
    title: "Phone",
    value: "+2349099665991",
  },
  {
    title: "Mobile No",
    value: "+2347031942313",
  },
  {
    title: "qualitrendsgs@gmail.com ",
  },
  {
    title: "qualitrendsng.com  ",
  },
];
const invoiceTo = [
  {
    title: "Shehu Ahmed Mustapha  ",
  },
  {
    title: "amsagz@gmail.com  ",
  },
  {
    title: "Mobile No",
    value: "08033043965",
  },
  {
    title: "Home No",
    value: "07012958202",
  },
];
const invoiceInfo = [
  {
    title: "Invoice: QGS/GWARINPA/403/H5 ",
  },
  {
    title: "Date",
    value: "Jun 20,2022",
  },
  {
    title: "Due Date",
    value: "Aug 18, 2022",
  },
  {
    title: "Total",
    value: "₦95,000,000.00",
  },
  {
    title: "Outstanding",
    value: "₦95,000,000.00",
  },
];
const InvoiceDetailHeader = () => {
  return (
    <section className="grid grid-cols-3 ">
      <div className="">
        <h3 className="text-[#000] font-OpenSans font-bold text-xl pb-4">
          Company Info
        </h3>
        <ul>
          {companyInfo.map((info, index) => (
            <li
              key={index}
              className={`font-OpenSans text-sm font-normal text-black-900 ${
                index === 0 ? "text-[18px] text-[#000]" : ""
              }`}
            >
              {info.title}
              {info.value && ":"}
              {info.value && info.value}
            </li>
          ))}
        </ul>
      </div>
      <div className="">
        <h3 className="text-[#000] font-OpenSans font-bold text-xl pb-4">
          Invoice to
        </h3>
        <ul>
          {invoiceTo.map((info, index) => (
            <li
              key={index}
              className={`font-OpenSans text-sm font-normal text-black-900 ${
                index === 0 ? "text-[18px] text-[#000]" : ""
              }`}
            >
              {info.title}
              {info.value && ":"}
              {info.value && info.value}
            </li>
          ))}
        </ul>
      </div>
      <div className="">
        <h3 className="text-[#000] font-OpenSans font-bold text-xl pb-4">
          Invoice Info
        </h3>
        <ul>
          {invoiceInfo.map((info, index) => (
            <li
              key={index}
              className={`font-OpenSans text-sm font-normal text-black-900 ${
                index === 0 ? "text-[18px] text-[#000]" : ""
              }`}
            >
              {info.title}
              {info.value && ":"}
              {info.value && info.value}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
export default InvoiceDetailHeader;
