// @ts-nocheck
"use client";
import React, { useState } from "react";
import GeneralSettings from "./general";
import Category from "./category";
import NotificationSettings from "./notificaton";
import WarehouseSettings from "./warehouse";
import PeopleSettings from "./people";
import ProjectSettings from "./project";
import ProjectStatusSettings from "./projectStatus";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("General Settings");

  const renderTabContent = () => {
    if (activeTab === "General Settings") {
      return <GeneralSettings />;
    }

    if (activeTab === "People") {
      return <PeopleSettings />;
    }

    if (activeTab === "Projects") {
      return <ProjectSettings />;
    }

    if (activeTab === "Warehouse") {
      return <WarehouseSettings />;
    }

    if (activeTab === "Project Status") {
      return <ProjectStatusSettings />;
    }

    if (activeTab === "Category") {
      return <Category />;
    }

    if (activeTab === "Notifications") {
      return <NotificationSettings />;
    }
  };

  return (
    <div className="p-6">
      {/* Header with breadcrumb and create button */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold">Settings</h2>
          <nav className="text-gray-600 text-sm space-x-2">
            <span>Dashboard</span> &gt;
            <span className="text-orange-600 font-semibold">Settings</span>
          </nav>
        </div>
        {/* Uncomment and use the button when needed */}
        {/* <button className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 mt-2 md:mt-0">
            Create Expense
        </button> */}
      </div>

      {/* Navigation Tabs */}
      <nav className="flex flex-wrap md:flex-nowrap space-x-2 md:space-x-16 text-gray-700 mt-4 border-b w-full">
        {[
          "General Settings",
          "People",
          "Warehouse",
          "Project Status",
          "Category",
          "Notifications",
        ].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 ${
              activeTab === tab
                ? "border-b-2 border-orange-500 text-black font-semibold"
                : "text-gray-600"
            }`}
          >
            {tab}
          </button>
        ))}
      </nav>

      {/* Render the content based on the active tab */}
      <div className="mt-4">{renderTabContent()}</div>
    </div>
  );
};

export default Settings;
