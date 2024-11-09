"use client"
import React, { useState } from 'react';

const GeneralSettings = () => {

      return (
        <div className="space-y-6 mt-4">
          {/* Company Details Section */}
          <div className=" p-4 rounded-md">
            <h2 className="font-semibold text-lg mb-2 bg-orange-100 p-4 ">Company Details</h2>
            <div className="grid grid-rows-7 grid-flow-col grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                  <span>Logo</span>
                </div>
                <div className="ml-4">
                  <button className="text-blue-500 hover:underline">Upload</button>
                  <button className="text-red-500 hover:underline ml-2">Remove</button>
                  <p className="text-gray-500 text-sm">No chosen file</p>
                </div>
              </div>
         
              <div>
                <label className="block text-sm font-medium text-gray-700">Organization Name</label>
                <input type="text" className="mt-1 p-2 w-full border border-gray-300 rounded-md" placeholder="Qualitrends" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email Address</label>
                <input type="email" className="mt-1 p-2 w-full border border-gray-300 rounded-md" placeholder="admin@qualitrendsng.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input type="text" className="mt-1 p-2 w-full border border-gray-300 rounded-md" placeholder="+2348035876888" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <input type="text" className="mt-1 p-2 w-full border border-gray-300 rounded-md" placeholder="Suite D2 Innovation Plaza, Abuja" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Rc Number</label>
                <input type="text" className="mt-1 p-2 w-full border border-gray-300 rounded-md" placeholder="13355789976" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Tax ID</label>
                <input type="text" className="mt-1 p-2 w-full border border-gray-300 rounded-md" placeholder="TAX24_2023_G11" />
              </div>
              <div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Bank Name</label>
                <input type="text" className="mt-1 p-2 w-full border border-gray-300 rounded-md" placeholder="Access Bank" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Account Number</label>
                <input type="text" className="mt-1 p-2 w-full border border-gray-300 rounded-md" placeholder="1344456678" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Account Name</label>
                <input type="text" className="mt-1 p-2 w-full border border-gray-300 rounded-md" placeholder="Qualitrends Nigeria Limited" />
              </div>
              <div className="flex items-center">
                <button className="text-orange-500 hover:underline">+ Add New Account</button>
              </div>
            </div>
          </div>

          {/* Save Changes Button */}
          <div className="flex justify-center">
            <button className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600">Save Changes</button>
          </div>

          {/* Terms & Conditions Section */}
          <div className="p-4 rounded-md">
            <h2 className="font-semibold text-lg mb-2 bg-orange-100 p-4 ">Terms & Conditions</h2>
            <textarea
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="Conditions of use..."
            >
Conditions of use By using this website, you certify that you have read and reviewed this Agreement and that you agree to comply with its terms. If you do not want to be bound by the terms of this Agreement, you are advised to stop using the website accordingly. Qualitrends only grants use and access of this website, its products, and its services to those who have accepted its terms.
            </textarea>
          </div>

          {/* Save Changes Button for Terms & Conditions */}
          <div className="flex justify-center mt-4">
            <button className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600">Save Changes</button>
          </div>
        </div>
      );
   
  };


export default GeneralSettings;
