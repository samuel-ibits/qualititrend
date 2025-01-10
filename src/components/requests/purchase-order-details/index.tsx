import Button from "@/components/global/Button";
import Input from "@/components/global/Input";
import Status, { StatusType } from "@/components/global/Status";
import Table from "@/components/global/Table";
import { cn, formatAmount } from "@/lib/utils";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

const PurchaseOrderDetails = () => {
  const data = [
    {
      label: "Purchase Order ID",
      value: "PURO_0001",
    },
    {
      label: "Project Code",
      value: "Wuse_1391",
    },
    {
      label: "Total Amount",
      value: formatAmount(+56000000, "NGN"),
    },
    {
      label: "Status",
      value: "pending",
      isStatus: true,
    },
    {
      label: "Supplier",
      value: "Aliu Akinlabi",
    },
    {
      label: "Date Created",
      value: "12 July 2023",
    },
  ];

  const tableData = [
    {
      materialName: "Cement",
      category: "Building",
      quantity: "5",
      unitPrice: formatAmount(635000, "NGN"),
      total: formatAmount(63505000, "NGN"),
    },
    {
      materialName: "Cement",
      category: "Building",
      quantity: "5",
      unitPrice: formatAmount(635000, "NGN"),
      total: formatAmount(63505000, "NGN"),
    },
    {
      materialName: "Cement",
      category: "Building",
      quantity: "5",
      unitPrice: formatAmount(635000, "NGN"),
      total: formatAmount(63505000, "NGN"),
    },
  ];

  const tableHeadData = [
    {
      title: "Material Name",
      key: "materialName",
    },
    {
      title: "Category",
      key: "category",
    },
    {
      title: "Quantity",
      key: "quantity",
    },
    {
      title: "Unit Price",
      key: "unitPrice",
    },
    {
      title: "Total",
      key: "total",
    },
  ];

  const methods = useForm({
    defaultValues: {
      notes: "",
    },
  });

  const {
    formState: { errors, isValid },
  } = methods;

  const onSubmit: SubmitHandler<any> = async (payload) => {
    try {
    } catch (err) {}
  };

  return (
    <div className="">
      <section className="mb-10">
        <h3 className="bg-[#FFF0E5] max-lg:mb-4 p-2.5 lg:py-4 lg:px-5 lg:text-xl font-semibold">
          Purchase Order Detail
        </h3>
        <ul className="grid grid-cols-1 max-lg:rounded bg-white max-lg:drop-shadow-md lg:grid-cols-2 max-lg:py-4 lg:mt-10 gap-y-5 lg:gap-6 px-5">
          {data.map((item, index) => {
            return (
              <li
                key={index}
                className="max-lg:text-sm max-lg:space-y-2 lg:flex items-center"
              >
                <div className="w-52 text-black-500">{item.label}:</div>
                <div
                  className={cn("font-semibold lg:w-[calc(100%-230px)]", {
                    "text-primary": index === 0,
                  })}
                >
                  {item.isStatus ? (
                    <Status status={item.value as StatusType} />
                  ) : (
                    item.value
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </section>
      <section className="mb-10">
        <h3 className="max-lg:mb-4 py-2.5 lg:py-4 lg:text-xl font-semibold">
          Items Ordered
        </h3>
        <Table
          data={tableData!}
          loaderLength={10}
          tableHeadData={tableHeadData}
          rowComponent={(transaction, index, length) => {
            const { materialName, category, quantity, unitPrice, total } =
              transaction;
            return (
              <tr
                className={cn("text-sm border-[#5A5A5A99]", {
                  "border-b": index !== length - 1,
                })}
              >
                <td className="p-4 text-black-500 whitespace-nowrap">
                  {materialName}
                </td>
                <td className="p-4 text-black-500 whitespace-nowrap">
                  {category}
                </td>
                <td className="p-4 text-black-500 whitespace-nowrap">
                  {quantity}
                </td>
                <td className="p-4 text-black-500 whitespace-nowrap">
                  {unitPrice}
                </td>
                <td className="p-4 text-black-500 whitespace-nowrap">
                  {total}
                </td>
              </tr>
            );
          }}
        />
      </section>
      <section className="mb-14">
        <h3 className="max-lg:mb-4 py-2.5 lg:py-4 lg:text-xl font-semibold">
          Payment Details
        </h3>
        <div className="lg:flex items-center lg:space-x-52 max-sm:shadow max-sm:space-y-5 max-sm:p-7">
          <div className="flex items-center max-sm:justify-between space-x-20">
            <h4 className="text-black-500">Total Disbursed:</h4>
            <h4 className="font-semibold">{formatAmount(635000, "NGN")}</h4>
          </div>
          <div className="flex items-center max-sm:justify-between space-x-20">
            <h4 className="text-black-500">Total Unpaid:</h4>
            <h4 className="font-semibold">{formatAmount(635000, "NGN")}</h4>
          </div>
        </div>
      </section>
      <section className="mb-14">
        <h3 className="bg-[#FFF0E5] max-lg:mb-4 p-2.5 lg:py-4 lg:px-5 lg:text-xl font-semibold">
          Supporting Documents
        </h3>
        <div className="grid grid-cols-1 max-lg:rounded bg-white max-lg:drop-shadow-md lg:grid-cols-2 max-lg:py-4 lg:mt-10 gap-y-5 lg:gap-x-10 lg:gap-y-14 px-5">
          <div className="flex items-center max-sm:justify-between space-x-20">
            <h4 className="text-primary cursor-pointer underline font-semibold">
              Avalon_CAC.pdf
            </h4>
            <Button>View</Button>
          </div>
          <div className="flex items-center max-sm:justify-between space-x-20">
            <h4 className="text-primary cursor-pointer underline font-semibold">
              Avalon_CAC.pdf
            </h4>
            <Button>View</Button>
          </div>
          <div className="flex items-center max-sm:justify-between space-x-20">
            <h4 className="text-primary cursor-pointer underline font-semibold">
              Avalon_CAC.pdf
            </h4>
            <Button>View</Button>
          </div>
        </div>
      </section>
      <section className="mb-10">
        <h3 className="bg-[#FFF0E5] max-lg:mb-4 p-2.5 lg:py-4 lg:px-5 lg:text-xl font-semibold">
          History
        </h3>
      </section>
      <section className="mb-10">
        <h3 className="max-lg:mb-4 p-2.5 lg:py-4 lg:px-5 lg:text-xl font-semibold">
          Notes
        </h3>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="w-full">
            <Input
              name="notes"
              placeholder="Additional Note or Comments"
              tag="textarea"
            />
            <div className="flex items-center justify-center mt-10">
              <div className="lg:flex items-center lg:space-x-5 max-sm:space-y-5 max-sm:flex-row-reverse">
                <Button type="submit" className="w-[250px]" theme="outline">
                  Decline
                </Button>
                <Button type="submit" className="w-[250px]">
                  Approve
                </Button>
              </div>
            </div>
          </form>
        </FormProvider>
      </section>
    </div>
  );
};

export default PurchaseOrderDetails;
