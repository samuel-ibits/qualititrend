import { cn } from "@/lib/utils";

export type StatusType =
  | "sold"
  | "handed_over"
  | "in_warehouse"
  | "out_on_lease"
  | "pending"
  | "declined"
  | "approved"
  | "fully_delivered"
  | "partial_delivery"
  | "in_transit"
  | "picked_up"
  | "delivered"
  | "paid"
  | "unpaid"
  | "partial"
  | "sold"
  | "handed_over"
  | "in_warehouse"
  | "out_on_lease"
  | "pending"
  | "declined"
  | "approved"
  | "fully_delivered"
  | "partial_delivery"
  | "in_transit"
  | "picked_up"
  | "awaiting_pickup"
  | "ongoing"
  | "completed";

type StatusProps = {
  status: StatusType;
};

type StatusColorMap = {
  [key: string]: StatusType[];
};

const Status = ({ status }: StatusProps) => {
  const statusColorMap: StatusColorMap = {
    "text-primary bg-[#FF00001A]": ["handed_over"],
    "text-status-success-100 bg-status-success-10": [
      "in_warehouse",
      "approved",
      "fully_delivered",
      "partial_delivery",
      "delivered",
      "paid",
      "completed",
    ],
    "text-status-error-100 bg-status-error-10": ["sold", "declined", "unpaid"],
    "text-status-warning-500 bg-status-warning-10": [
      "out_on_lease",
      "pending",
      "ongoing",
    ],
    "text-primary bg-primary/10": ["in_transit", "partial"],
    "text-status-information-100 bg-status-information-100/10": ["picked_up"],
  };

  const statusDotColorMap: StatusColorMap = {
    "bg-primary": ["handed_over", "in_transit"],
    "bg-status-success-100": [
      "in_warehouse",
      "approved",
      "fully_delivered",
      "partial_delivery",
      "delivered",
      "paid",
      "completed",
    ],
    "bg-status-error-100": ["sold", "declined", "unpaid"],
    "bg-status-warning-500": ["out_on_lease", "pending", "partial", "ongoing"],
    "bg-status-information-100": ["picked_up"],
  };

  const getStatusColor = (status: StatusType) => {
    return Object.entries(statusColorMap).reduce((acc, [key, value]) => {
      if (value.includes(status)) {
        return key;
      }
      return acc;
    }, "");
  };

  const getDotColor = (status: StatusType) => {
    return Object.entries(statusDotColorMap).reduce((acc, [key, value]) => {
      if (value.includes(status)) {
        return key;
      }
      return acc;
    }, "");
  };

  return (
    <div
      className={cn(
        "w-fit flex items-center space-x-2.5 capitalize text-sm py-1 px-4 rounded-[100px]",
        getStatusColor(status),
      )}
    >
      <div className={cn("size-2 rounded-full", getDotColor(status))} />
      {/* <div>{status.replace(/_/g, " ")}</div> */}
    </div>
  );
};

export default Status;
