"use client";

import Button from "@/components/global/Button";
import Checkbox from "@/components/global/Checkbox";
import Modal from "@/components/global/Modal";
import SelectInput from "@/components/global/SelectInput";
import Icons from "@/components/icons";
import { cn } from "@/lib/utils";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

type RequestsFilterModalProps = {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
};

const RequestsFilterModal = ({
  showModal,
  setShowModal,
}: RequestsFilterModalProps) => {
  const methods = useForm({
    defaultValues: {
      projectCode: null,
      source: null,
      destination: null,
      status: null,
    },
  });

  const {
    formState: { errors, isValid },
    reset,
  } = methods;

  const onSubmit: SubmitHandler<any> = async (payload) => {
    try {
      setShowModal(false);
    } catch (err) {}
  };

  return (
    <Modal
      title="Filter Requests"
      show={showModal}
      width="lg:w-[414px]"
      onRequestClose={() => {
        setShowModal(false);
      }}
    >
      <section className="w-full">
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
            <SelectInput
              label="Project Code"
              name="projectCode"
              options={[
                {
                  name: "All",
                  value: "all",
                },
                {
                  name: "Ongoing",
                  value: "ongoing",
                },
                {
                  name: "Completed",
                  value: "completed",
                },
                {
                  name: "Pending",
                  value: "pending",
                },
                {
                  name: "Cancelled",
                  value: "cancelled",
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
            <SelectInput
              label="Source"
              name="source"
              options={[
                {
                  name: "All",
                  value: "all",
                },
                {
                  name: "Ongoing",
                  value: "ongoing",
                },
                {
                  name: "Completed",
                  value: "completed",
                },
                {
                  name: "Pending",
                  value: "pending",
                },
                {
                  name: "Cancelled",
                  value: "cancelled",
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
                        Select Source
                      </div>
                    )}
                  </div>
                );
              }}
            />
            <SelectInput
              label="Destination"
              name="destination"
              position="top"
              options={[
                {
                  name: "All",
                  value: "all",
                },
                {
                  name: "Ongoing",
                  value: "ongoing",
                },
                {
                  name: "Completed",
                  value: "completed",
                },
                {
                  name: "Pending",
                  value: "pending",
                },
                {
                  name: "Cancelled",
                  value: "cancelled",
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
                        Select Destination
                      </div>
                    )}
                  </div>
                );
              }}
            />
            <SelectInput
              label="Status"
              name="status"
              position="top"
              options={[
                {
                  name: "All",
                  value: "all",
                },
                {
                  name: "Ongoing",
                  value: "ongoing",
                },
                {
                  name: "Completed",
                  value: "completed",
                },
                {
                  name: "Pending",
                  value: "pending",
                },
                {
                  name: "Cancelled",
                  value: "cancelled",
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
                        Select Status
                      </div>
                    )}
                  </div>
                );
              }}
            />
            <div className="flex items-center justify-center space-x-6 py-4">
              <Button
                onClick={() => {
                  reset();
                  setShowModal(false);
                }}
                theme="outline"
                className="w-full lg:w-[136px]"
              >
                Reset
              </Button>
              <Button
                type="submit"
                disabled={!isValid}
                className="w-full lg:w-[136px]"
              >
                Apply
              </Button>
            </div>
          </form>
        </FormProvider>
      </section>
    </Modal>
  );
};

export default RequestsFilterModal;
