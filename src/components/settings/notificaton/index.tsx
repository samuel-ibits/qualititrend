// "use client";

import React, { useState, useEffect } from "react";
import { useFetchNotificationsQuery, useUpdateNotificationMutation } from "@/services/notifications";
import { toast } from "react-toastify";

const NotificationSettings = () => {
  const { data, error, isLoading } = useFetchNotificationsQuery();
  const [updateNotification] = useUpdateNotificationMutation();
  const [preferences, setPreferences] = useState<{
    email: "";
    sms: "";
    whatsapp: "";
  }>({
    email: data?.data?.email,
    sms: data?.data?.sms,
    whatsapp: data?.data?.whatsapp,
  });
  
  const [notificationSettings, setNotificationSettings] = useState<{
    general: "";
    requestAdmin: "";
    requestUser: "";
    warehouseStock: "";
    materialDelivery:"";
    leaseReminder: "";
    paymentReminder:"";
  }>({
    general: "",
    requestAdmin: "",
    requestUser: "",
    warehouseStock: "",
    materialDelivery: "",
    leaseReminder: "",
    paymentReminder: "",
  });
  

  useEffect(() => {
    if (data) {
      setPreferences({
        email: data.data.email ,
        sms: data?.data?.sms ,
        whatsapp: data?.data?.whatsapp ,
      });
      setNotificationSettings({
        general:  data?.data?.request_recieved === 1 ? "1" : "",
        requestAdmin:   data?.data?.request_approved === 1 ? "1" : "",
        requestUser:  data?.data?.request_recieved === 1 ? "1" : "",
        warehouseStock:  data?.data?.warehouse_low === 1 ? "1" : "",
        materialDelivery:  data?.data?.material_delivered === 1 ? "1" : "" ,
        leaseReminder:  data?.data?.lease_due === 1 ? "1" : "",
        paymentReminder:  data?.data?.payment_due === 1 ? "1" : "",
      });
    }
  }, [data]);

  const togglePreference = async (type: string) => {
    try {
      const updatedPreferences = { ...preferences, [type]: !preferences[type] };
      await updateNotification({ type, value: updatedPreferences[type] ? 1 : 0 }).unwrap();
      setPreferences(updatedPreferences);
      toast.success(`Preference for ${type} updated successfully!`);
    } catch (err) {
      toast.error(`Failed to update preference for ${type}.`);
    }
  };

  const toggleNotification = async (type: string) => {
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

console.log( data?.data)
  return (
    <div className="p-6">
      {/* Notification Settings Header */}
      <div className="bg-orange-100 p-4 rounded-md mb-6">
        <h2 className="font-semibold text-lg">Notification Settings</h2>
      </div>

      {/* General Settings Section */}
      <div className="space-y-4 mb-6">
        <h3 className="font-semibold">General Settings</h3>
        <p className="text-sm text-gray-600">General notifications for system updates and announcements.</p>
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-semibold">Preference</h4>
            <div className="mt-2 space-y-2">
              {["email", "sms", "whatsapp"].map((preference) => (
                <label key={preference} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={preferences[preference]}
                    onChange={() => togglePreference(preference)}
                    className="form-checkbox h-4 w-4 text-orange-500"
                  />
                  <span className="capitalize">{preference}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
        
        
          </div>
        </div>
      </div>

      {/* Request Notification Settings Section */}
      <div className="space-y-2 mb-6 border p-4 rounded-md border-blue-300">
        <h3 className="font-semibold">Request Notification Settings:</h3>
        <div className="flex items-center justify-between">
          <span className="text-sm">Notify super admin or warehouse manager when receiving a request.</span>
          {/* <label className="flex items-center">
            <input
              type="checkbox"
              checked={notificationSettings.requestAdmin}
              onChange={() => toggleNotification("requestAdmin")}
              className="toggle-checkbox appearance-none checked:bg-orange-500 h-6 w-6 rounded-full border-gray-300 cursor-pointer"
            />
          </label> */}
          <label className="relative inline-flex items-center cursor-pointer">
  <input
    type="checkbox"
    checked={notificationSettings.requestAdmin}
    onChange={() => toggleNotification("requestAdmin")}
    className="sr-only peer"
  />
  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-orange-500 peer-focus:ring-2 peer-focus:ring-orange-300"></div>
  <div className="peer-checked:translate-x-6 transform transition-transform w-5 h-5 bg-white rounded-full absolute left-1 top-1"></div>
</label>

        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm">Notify users when their request is approved or declined.</span>
          {/* <label className="flex items-center">
            <input
              type="checkbox"
              checked={notificationSettings.requestUser}
              onChange={() => toggleNotification("requestUser")}
              className="toggle-checkbox appearance-none checked:bg-orange-500 h-6 w-6 rounded-full border-gray-300 cursor-pointer"
            />
          </label> */}
          <label className="relative inline-flex items-center cursor-pointer">
  <input
    type="checkbox"
    checked={notificationSettings.requestUser}
    onChange={() => toggleNotification("requestUser")}
    className="sr-only peer"
  />
  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-orange-500 peer-focus:ring-2 peer-focus:ring-orange-300"></div>
  <div className="peer-checked:translate-x-6 transform transition-transform w-5 h-5 bg-white rounded-full absolute left-1 top-1"></div>
</label>
        </div>
      </div>

      {/* Warehouse Notifications Section */}
      <div className="space-y-2 mb-6">
        <h3 className="font-semibold">Warehouse Notifications</h3>
        <div className="flex items-center justify-between">
          <span className="text-sm">Notify when warehouse stock is low.</span>
          {/* <label className="flex items-center">
            <input
              type="checkbox"
              checked={notificationSettings.warehouseStock}
              onChange={() => toggleNotification("warehouseStock")}
              className="toggle-checkbox appearance-none checked:bg-orange-500 h-6 w-6 rounded-full border-gray-300 cursor-pointer"
            />
          </label> */}

          <label className="relative inline-flex items-center cursor-pointer">
  <input
    type="checkbox"
    checked={notificationSettings.warehouseStock}
    onChange={() => toggleNotification("warehouse_low")}
    className="sr-only peer"
  />
  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-orange-500 peer-focus:ring-2 peer-focus:ring-orange-300"></div>
  <div className="peer-checked:translate-x-6 transform transition-transform w-5 h-5 bg-white rounded-full absolute left-1 top-1"></div>
</label>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm">Notify when materials have been delivered.</span>
          {/* <label className="flex items-center">
            <input
              type="checkbox"
              checked={notificationSettings.materialDelivery}
              onChange={() => toggleNotification("materialDelivery")}
              className="toggle-checkbox appearance-none checked:bg-orange-500 h-6 w-6 rounded-full border-gray-300 cursor-pointer"
            />
          </label> */}
          <label className="relative inline-flex items-center cursor-pointer">
  <input
    type="checkbox"
    checked={notificationSettings.materialDelivery}
    onChange={() => toggleNotification("material_delivered")}
    className="sr-only peer"
  />
  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-orange-500 peer-focus:ring-2 peer-focus:ring-orange-300"></div>
  <div className="peer-checked:translate-x-6 transform transition-transform w-5 h-5 bg-white rounded-full absolute left-1 top-1"></div>
</label>
        </div>
      </div>

      {/* Reminder Settings Section */}
      <div className="space-y-2">
        <h3 className="font-semibold">Reminder Settings</h3>
        <div className="flex items-center justify-between">
          <span className="text-sm">Set reminder for lease two days before due date.</span>
          {/* <label className="flex items-center">
            <input
              type="checkbox"
              checked={notificationSettings.leaseReminder}
              onChange={() => toggleNotification("leaseReminder")}
              className="toggle-checkbox appearance-none checked:bg-orange-500 h-6 w-6 rounded-full border-gray-300 cursor-pointer"
            />
          </label> */}
          <label className="relative inline-flex items-center cursor-pointer">
  <input
    type="checkbox"
    checked={notificationSettings.leaseReminder}
    onChange={() => toggleNotification("lease_due")}
    className="sr-only peer"
  />
  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-orange-500 peer-focus:ring-2 peer-focus:ring-orange-300"></div>
  <div className="peer-checked:translate-x-6 transform transition-transform w-5 h-5 bg-white rounded-full absolute left-1 top-1"></div>
</label>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm">Set reminder for payment due dates.</span>
          {/* <label className="flex items-center">
            <input
              type="checkbox"
              checked={notificationSettings.paymentReminder}
              onChange={() => toggleNotification("paymentReminder")}
              className="toggle-checkbox appearance-none checked:bg-orange-500 h-6 w-6 rounded-full border-gray-300 cursor-pointer"
            />
          </label> */}
                    {notificationSettings.paymentReminder}testtttt

          <label className="relative inline-flex items-center cursor-pointer">
  <input
    type="checkbox"
    checked={notificationSettings.paymentReminder}
    onChange={() => toggleNotification("payment_due")}
    className="sr-only peer"
  />
  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-orange-500 peer-focus:ring-2 peer-focus:ring-orange-300"></div>
  <div className="peer-checked:translate-x-6 transform transition-transform w-5 h-5 bg-white rounded-full absolute left-1 top-1"></div>
</label>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;
