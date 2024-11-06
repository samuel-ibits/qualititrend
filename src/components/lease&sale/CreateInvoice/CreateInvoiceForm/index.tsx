"use client";
import Button from "@/components/global/Button";
import Input from "@/components/global/Input";
import SelectInput from "@/components/global/SelectInput";
import Icons from "@/components/icons";
import { cn } from "@/lib/utils";
import React from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import InvoiceTable from "../InvoiceTable";

const CreateInvoiceForm = () => {
  const methods = useForm({
    defaultValues: {
      date: "",
      customer: "",
      subTotal: "",
      total: '',
      amount: "",
      dueAmount: '',
    },
  });

  const {
    formState: { errors, isValid },
    reset,
  } = methods;

  const onSubmit: SubmitHandler<any> = async (payload) => {
    try {
    } catch (err) {}
  };

  return (
    <section className="w-full">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="max-lg:space-y-6 lg:grid lg:grid-cols-2 lg:gap-x-[107px] gap-y-6">
            <div className="flex">
              <div className="col-span-2 flex items-center space-x-9">
                <div className="text-base font-normal text-black-900 font-OpenSans">
                  Offer Letter ID
                </div>
                <div className="font-semibold font-OpenSans text-base text-black-900">
                  100
                </div>
              </div>
            </div>
            <div className="ml-[30.33px] w-[195px]">
              <Input
                name="date"
                label="Date"
                rules={["required"]}
                type="date"
                className="w-full"
              />
            </div>
            <SelectInput
              label="Customer"
              name="customer"
              required
              options={[
                {
                  name: "Sam",
                  value: "sam",
                },
                {
                  name: "Gid",
                  value: "gid",
                },
                {
                  name: "Rui",
                  value: "rui",
                },
              ]}
              optionComponent={(option, selectedOption) => {
                return (
                  <div
                    className={cn(
                      "py-2 w-full border-b px-4 flex items-center space-x-5 text-tc-main hover:bg-[#FF69001A]",
                      {
                        "bg-[#FF69001A]":
                          option?.value === selectedOption?.value,
                      }
                    )}
                  >
                    <div className="w-full text-sm flex items-center space-x-2">
                      <div>{option?.name}</div>
                    </div>

                    {option?.name === selectedOption?.name && (
                      <div>
                        <Icons.SelectedIcon />
                      </div>
                    )}
                  </div>
                );
              }}
              trigger={(selected) => {
                return (
                  <div className="flex h-min bg-transparent items-center space-x-1">
                    {selected ? (
                      <div className="text-tc-main flex space-x-2 items-center text-sm">
                        <span>{selected.name}</span>
                      </div>
                    ) : (
                      <div className="text-sm mt-[2px] text-black-500">
                        Customer
                      </div>
                    )}
                  </div>
                );
              }}
            />
          </div>
          <InvoiceTable />
          <div className="max-lg:space-y-6 lg:grid lg:grid-cols-2 lg:gap-x-[107px] gap-y-6 mt-[80px]">
            <Input
              name="subTotal"
              label="Sub Total"
              rules={["required"]}
              placeholder="16"
            />
            <Input
              name="total"
              label="Total"
              rules={["required"]}
              placeholder="16"
            />
            <Input
              name="amount"
              label="Amount Paid"
              rules={["required"]}
              placeholder="16"
            />
            <Input
              name="dueAmount"
              label="Amount Due"
              rules={["required"]}
              placeholder="16"
            />
          </div>
        </form>
        <div className="lg:col-span-2 flex justify-center pt-20 pb-7">
          <Button
            type="submit"
            disabled={!isValid}
            className="w-full lg:w-[240px]"
          >
            Save
          </Button>
        </div>
      </FormProvider>
    </section>
  );
};
export default CreateInvoiceForm;
