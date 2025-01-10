import Button from "@/components/global/Button";
import Input from "@/components/global/Input";
import Loader from "@/components/global/Loader";
import Status, { StatusType } from "@/components/global/Status";
import { cn, formatAmount, formatDate } from "@/lib/utils";
import { useFetchMaterialTransferDetailsQuery } from "@/services/warehouse";
import { useParams } from "next/navigation";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

const MaterialTransferDetails = () => {
  const params = useParams();

  const {
    data: __data,
    isLoading,
    isError,
    error,
  } = useFetchMaterialTransferDetailsQuery({ id: params.id as string });

  const methods = useForm({
    defaultValues: {
      notes: "",
    },
  });

  const {
    formState: { errors, isValid },
  } = methods;

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <div>Error loading material transfers</div>;
  }

  let _data = __data!;

  const data = [
    {
      label: "Material Transfer ID",
      value: "id",
    },
    {
      label: "Material",
      value: "Cement",
    },
    {
      label: "Source",
      value: _data.data.source,
    },
    {
      label: "Status",
      value: _data.data.status,
      isStatus: true,
    },
    {
      label: "Destination",
      value: _data.data.destination,
    },
    {
      label: "Quantity",
      value: "12",
    },
    {
      label: "Date Created",
      value: formatDate(_data.data.pickup_date),
    },
  ];

  const onSubmit: SubmitHandler<any> = async (payload) => {
    try {
    } catch (err) {}
  };

  return (
    <div className="">
      <section className="mb-10">
        <h3 className="bg-[#FFF0E5] max-lg:mb-4 p-2.5 lg:py-4 lg:px-5 lg:text-xl font-semibold">
          Expense Requests Detail
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

export default MaterialTransferDetails;
