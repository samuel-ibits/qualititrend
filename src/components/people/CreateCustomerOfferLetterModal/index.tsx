"use client";

import Button from "@/components/global/Button";
import Checkbox from "@/components/global/Checkbox";
import Input from "@/components/global/Input";
import Modal from "@/components/global/Modal";
import SelectInput from "@/components/global/SelectInput";
import Icons from "@/components/icons";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

type CreateCustomerOfferLetterModalProps = {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
};

const CreateCustomerOfferLetterModal = ({
  showModal,
  setShowModal,
}: CreateCustomerOfferLetterModalProps) => {
  const [step, setStep] = useState<"create" | "success">("create");
  const [paymentMethod, setPaymentMethod] = useState("");

  const methods = useForm({
    defaultValues: {
      customers: null,
      phoneNumber: null,
      projectCode: null,
    },
  });

  const {
    formState: { errors, isValid },
    reset,
  } = methods;

  const onSubmit: SubmitHandler<any> = async (payload) => {
    try {
      setStep("success");
    } catch (err) {}
  };

  const stepProps = {
    create: {
      title: "Create Offer Letter",
    },
    success: {
      title: "",
      width: "!w-[400px]",
      closeButtonStyle: "fill-primary",
      showHeaderBorder: false,
    },
  } as {
    [key: string]: {
      title: string;
      width?: string;
      closeButtonStyle?: string;
      showHeaderBorder?: boolean;
    };
  };

  const handleCheckboxChange = (selectedMethod: string) => {
    setPaymentMethod(selectedMethod === paymentMethod ? "" : selectedMethod);
  };

  return (
    <Modal
      title={stepProps[step].title}
      show={showModal}
      width={stepProps[step].width}
      closeButtonStyle={stepProps[step].closeButtonStyle}
      showHeaderBorder={stepProps[step].showHeaderBorder}
      onRequestClose={() => {
        setShowModal(false);
        setTimeout(() => {
          reset();
          setStep("create");
        }, 1000);
      }}
    >
      {step === "create" && (
        <section className="w-full">
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="space-y-6"
            >
              <SelectInput
                label="Customers"
                name="customers"
                options={[
                  {
                    name: "Jane Doe",
                    value: "jane",
                  },
                  {
                    name: "John Doe",
                    value: "john",
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
                        },
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
                          Select Customer
                        </div>
                      )}
                    </div>
                  );
                }}
              />
              <SelectInput
                label="Project Code"
                name="projectCode"
                options={[
                  {
                    name: "Wuse_1365",
                    value: "Wuse_1365",
                  },
                  {
                    name: "Wuse_136522",
                    value: "Wuse_136522",
                  },
                  {
                    name: "Wuse_13",
                    value: "Wuse_13",
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
                        },
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
                          Select Project
                        </div>
                      )}
                    </div>
                  );
                }}
              />
              <h3 className="font-semibold">Payment Method</h3>
              <Checkbox
                name="oneTimePayment"
                id="oneTimePayment"
                label="One time Payment"
                labelClassName="text-sm"
                onChange={() => handleCheckboxChange("oneTimePayment")}
                checked={paymentMethod === "oneTimePayment"}
              />
              <Checkbox
                name="installmentalPayment"
                id="installmentalPayment"
                label="Installmental Payment"
                labelClassName="text-sm"
                onChange={() => handleCheckboxChange("installmentalPayment")}
                checked={paymentMethod === "installmentalPayment"}
              />

              {paymentMethod === "installmentalPayment" && (
                <>
                  <Input
                    name="firstInstallment"
                    label="First Installment Paid"
                    type="number"
                    rules={["required"]}
                    placeholder=""
                  />
                  <SelectInput
                    label="Duration of paymenmt"
                    name="durationOfPayment"
                    options={[
                      {
                        name: "1 month",
                        value: "1Month",
                      },
                      {
                        name: "2 months",
                        value: "2Months",
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
                            },
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
                              Select Duration
                            </div>
                          )}
                        </div>
                      );
                    }}
                  />
                </>
              )}
              {paymentMethod === "oneTimePayment" && <h2>One time</h2>}
              <div className="lg:col-span-2 flex justify-center py-4">
                <Button
                  type="submit"
                  disabled={!isValid}
                  className="w-full lg:w-[240px]"
                >
                  Create
                </Button>
              </div>
            </form>
          </FormProvider>
        </section>
      )}

      {step === "success" && (
        <section className="flex flex-col h-full justify-center items-center space-y-4">
          <Icons.SuccessIcon />
          <p className="pb-10 text-center">Offer Letter created successfully</p>
        </section>
      )}
    </Modal>
  );
};

export default CreateCustomerOfferLetterModal;
