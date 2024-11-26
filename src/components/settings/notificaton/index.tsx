// @ts-nocheck
import React, { useState, useEffect } from "react";
import { useFetchNotificationsQuery, useUpdateNotificationMutation } from "@/services/notifications";
import { toast } from "react-toastify";
// import { FetchNotificationsResponse, Notifications } from "@/types/services/notifications";

interface NotificationSettingsProps {
  email: boolean;
  sms: boolean;
  whatsapp: boolean;
  request_recieved: boolean;
  request_approved: boolean;
  warehouse_low: boolean;
  material_delivered: boolean;
  lease_due: boolean;
  payment_due: boolean;
  // data:;
}

interface FetchNotificationsResponse {
  data: NotificationSettingsProps; // Correctly typed `data`
  isLoading: boolean;
  isSuccess: boolean;
  code: number;
  message: string;
  error: string | null;
}

const NotificationSettings = () => {
  const { data, error, isLoading, isSuccess } = useFetchNotificationsQuery<FetchNotificationsResponse>();
  const [updateNotification] = useUpdateNotificationMutation();

  const [notificationSettings, setNotificationSettings] = useState<NotificationSettingsProps>({
    email: false,
    sms: false,
    whatsapp: false,
    request_recieved: false,
    request_approved: false,
    warehouse_low: false,
    material_delivered: false,
    lease_due: false,
    payment_due: false,
  });
  useEffect(() => {
    if (isSuccess && data) {
      const settings = data.data; 
      setNotificationSettings({
        email: settings.email === "1",
        sms: settings.sms === "1",
        whatsapp: settings.whatsapp === "1",
        request_recieved: settings.request_recieved === "1",
        request_approved: settings.request_approved === "1",
        warehouse_low: settings.warehouse_low === "1",
        material_delivered: settings.material_delivered === "1",
        lease_due: settings.lease_due === "1",
        payment_due: settings.payment_due === "1",
      });
    }
  }, [data, isSuccess]);

  const toggleNotification = async (type: keyof NotificationSettingsProps) => {
    try {
      const updatedSettings = { ...notificationSettings, [type]: !notificationSettings[type] };
      await updateNotification({ type, value: updatedSettings[type] ? 1 : 0 }).unwrap();
      setNotificationSettings(updatedSettings);
      toast.success(`Notification setting for ${type} updated successfully!`);
    } catch (err) {
      toast.error(`Failed to update notification setting for ${type}.`);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading notification settings.</p>;
  return (
    <div className="p-6">
    {/* Notification Settings Header */}
    <div className="bg-orange-100 p-4 rounded-md mb-6">
      <h2 className="font-semibold text-lg md:text-base">Notification Settings</h2>
    </div>
  
    {/* General Settings Section */}
    <div className="space-y-4 mb-6 p-4">
      <h3 className="font-semibold text-base">General Settings</h3>
      <p className="text-sm text-gray-600">General notifications for system updates and announcements.</p>
      <div className="flex items-center justify-between md:flex-col md:items-start md:space-y-4">
        <div>
          <h4 className="font-semibold">Preference</h4>
          <div className="mt-2 space-y-2">
            {["email", "sms", "whatsapp"].map((preference) => (
              <label key={preference} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={notificationSettings[preference as keyof NotificationSettingsProps]}
                  onChange={() => toggleNotification(preference as keyof NotificationSettingsProps)}
                  className="h-4 w-4 accent-orange-500"
                />
                <span className="capitalize text-gray-500">{preference}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
    <hr />
  
    {/* Request Notification Settings Section */}
    <div className="space-y-2 mb-6 p-4">
      <h3 className="font-semibold text-base">Request Notification Settings:</h3>
      {["request_recieved", "request_approved"].map((type) => (
        <div key={type} className="flex items-center justify-between md:flex-col md:items-start md:space-y-4">
          <span className="text-sm">
            {type === "request_recieved"
              ? "Notify super admin or warehouse manager when receiving a request."
              : "Notify users when their request is approved or declined."}
          </span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={notificationSettings[type as keyof NotificationSettingsProps]}
              onChange={() => toggleNotification(type as keyof NotificationSettingsProps)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-orange-500"></div>
            <div className="peer-checked:translate-x-6 transform transition-transform w-5 h-5 bg-white rounded-full absolute left-1 top-1"></div>
          </label>
        </div>
      ))}
    </div>
    <hr />
  
    {/* Warehouse Notifications Section */}
    <div className="space-y-2 mb-6 p-4">
      <h3 className="font-semibold text-base">Warehouse Notifications</h3>
      {[
        { text: "warehouse_low", title: "Stock Level Notification Settings:" },
        { text: "material_delivered", title: "Material Delivery Notification Settings:" },
      ].map((type) => (
        <div key={type.text} className="flex items-center justify-between md:flex-col md:items-start md:space-y-4">
          <ul className="list-disc">
            <span className="text-sm-bold">{type.title}</span>
            <li className="list-inside">
              <span className="text-sm">
                {type.text === "warehouse_low"
                  ? "Notify when warehouse stock is low."
                  : "Notify when materials have been delivered."}
              </span>
            </li>
          </ul>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={notificationSettings[type.text as keyof NotificationSettingsProps]}
              onChange={() => toggleNotification(type.text as keyof NotificationSettingsProps)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-orange-500"></div>
            <div className="peer-checked:translate-x-6 transform transition-transform w-5 h-5 bg-white rounded-full absolute left-1 top-1"></div>
          </label>
        </div>
      ))}
    </div>
    <hr />
  
    {/* Reminder Settings Section */}
    <div className="space-y-2 mb-6 p-4">
      <h3 className="font-semibold text-base">Reminder Settings</h3>
      {[
        { text: "lease_due", title: "Lease Due Date Reminder Settings:" },
        { text: "payment_due", title: "Payment Reminder Settings:" },
      ].map((type) => (
        <div key={type.text} className="flex items-center justify-between md:flex-col md:items-start md:space-y-4">
          <ul className="list-disc">
            <span className="text-sm-bold">{type.title}</span>
            <li className="list-inside">
              <span className="text-sm">
                {type.text === "lease_due"
                  ? "Set reminder for lease two days before due date."
                  : "Set reminder for payment due dates."}
              </span>
            </li>
          </ul>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={notificationSettings[type.text as keyof NotificationSettingsProps]}
              onChange={() => toggleNotification(type.text as keyof NotificationSettingsProps)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-orange-500"></div>
            <div className="peer-checked:translate-x-6 transform transition-transform w-5 h-5 bg-white rounded-full absolute left-1 top-1"></div>
          </label>
        </div>
      ))}
    </div>
  </div>
  
    
  );
};

export default NotificationSettings;
