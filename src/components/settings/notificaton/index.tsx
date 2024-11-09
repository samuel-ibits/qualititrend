import React, { useState } from 'react';

const NotificationSettings = () => {
  const [preferences, setPreferences] = useState({
    email: true,
    sms: false,
    whatsapp: true,
  });

  const [notificationSettings, setNotificationSettings] = useState({
    general: true,
    requestAdmin: true,
    requestUser: false,
    warehouseStock: true,
    materialDelivery: false,
    leaseReminder: false,
    paymentReminder: true,
  });

  const togglePreference = (type) => {
    setPreferences((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  const toggleNotification = (type) => {
    setNotificationSettings((prev) => ({ ...prev, [type]: !prev[type] }));
  };

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
              {['email', 'sms', 'whatsapp'].map((preference) => (
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
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={notificationSettings.general}
                onChange={() => toggleNotification('general')}
                className="toggle-checkbox appearance-none checked:bg-orange-500 h-6 w-6 rounded-full border-gray-300 cursor-pointer"
              />
            </label>
          </div>
        </div>
      </div>

      {/* Request Notification Settings Section */}
      <div className="space-y-2 mb-6 border p-4 rounded-md border-blue-300">
        <h3 className="font-semibold">Request Notification Settings:</h3>
        <p className="text-sm text-gray-600">Notify super admin or warehouse manager when receiving a request.</p>
        <div className="flex items-center justify-between">
          <span className="text-sm">Notify users when their request is approved or declined.</span>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={notificationSettings.requestAdmin}
              onChange={() => toggleNotification('requestAdmin')}
              className="toggle-checkbox appearance-none checked:bg-orange-500 h-6 w-6 rounded-full border-gray-300 cursor-pointer"
            />
          </label>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm">Notify users when their request is approved or declined.</span>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={notificationSettings.requestUser}
              onChange={() => toggleNotification('requestUser')}
              className="toggle-checkbox appearance-none checked:bg-orange-500 h-6 w-6 rounded-full border-gray-300 cursor-pointer"
            />
          </label>
        </div>
      </div>

      {/* Warehouse Notifications Section */}
      <div className="space-y-2 mb-6">
        <h3 className="font-semibold">Warehouse Notifications</h3>
        <div className="flex items-center justify-between">
          <span className="text-sm">Notify when warehouse stock is low.</span>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={notificationSettings.warehouseStock}
              onChange={() => toggleNotification('warehouseStock')}
              className="toggle-checkbox appearance-none checked:bg-orange-500 h-6 w-6 rounded-full border-gray-300 cursor-pointer"
            />
          </label>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm">Notify when materials have been delivered.</span>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={notificationSettings.materialDelivery}
              onChange={() => toggleNotification('materialDelivery')}
              className="toggle-checkbox appearance-none checked:bg-orange-500 h-6 w-6 rounded-full border-gray-300 cursor-pointer"
            />
          </label>
        </div>
      </div>

      {/* Reminder Settings Section */}
      <div className="space-y-2">
        <h3 className="font-semibold">Reminder Settings</h3>
        <div className="flex items-center justify-between">
          <span className="text-sm">Set reminder for lease two days before due date.</span>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={notificationSettings.leaseReminder}
              onChange={() => toggleNotification('leaseReminder')}
              className="toggle-checkbox appearance-none checked:bg-orange-500 h-6 w-6 rounded-full border-gray-300 cursor-pointer"
            />
          </label>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm">Set reminder for payment due dates.</span>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={notificationSettings.paymentReminder}
              onChange={() => toggleNotification('paymentReminder')}
              className="toggle-checkbox appearance-none checked:bg-orange-500 h-6 w-6 rounded-full border-gray-300 cursor-pointer"
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;
