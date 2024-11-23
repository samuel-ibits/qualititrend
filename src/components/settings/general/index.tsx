// @ts-nocheck

"use client"

import React, { useState, useEffect } from 'react';
import { useFetchSettingsQuery, useUploadLogoMutation, useUpdateSettingsMutation, useUpdateTermsConditionMutation } from '@/services/generalSettings';
import { FaEdit, FaTrash, FaPlus, FaTimes, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { UpdateSettingsRequest } from '@/types/services/generalSettings';

const GeneralSettings = () => {
  // Fetch initial settings
  const { data: settingsData, isLoading, isError } = useFetchSettingsQuery();
  const [status, setStatus] = useState<"success" | "error" | null>(null);
  
  // State for each field
  const [organizationLogo, setOrganizationLogo] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [rcNumber, setRcNumber] = useState("");
  const [taxId, setTaxId] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [termsCondition, setTermsCondition] = useState("");

  // Mutations
  const [uploadLogo] = useUploadLogoMutation();
  const [updateSettings] = useUpdateSettingsMutation();
  const [updateTermsCondition] = useUpdateTermsConditionMutation();

  // Populate form with fetched settings
  useEffect(() => {
    if (settingsData?.success) {
      setOrganizationLogo(settingsData.data.organisation_logo);
      setOrganizationName(settingsData.data.organisation_name );
      setEmail(settingsData.data.email);
      setPhoneNumber(settingsData.data.phone_number );
      setAddress(settingsData.data.address);
      setRcNumber(settingsData.data.rc_number);
      setTaxId(settingsData.data.tax_number);
      setBankName(settingsData.data.bank_name);
      setAccountNumber(settingsData.data.account_number);
      setAccountName(settingsData.data.account_name );
      setTermsCondition(settingsData.data.terms_condition );
    }
  }, [settingsData]);

  // Handlers
  const handleUploadLogo = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("logo", file);
      await uploadLogo(formData);
    }
  };

  const handleSaveChanges = async () => {
    try {
      const response = await updateSettings({
      organisation_name:organizationName,
      email,
      phone_number:phoneNumber,
      address,
      rc_number:rcNumber,
      tax_number:taxId,
      bank_name: bankName,
      account_number:accountNumber,
      account_name:accountName,
    });
    if (response?.data?.success) {
      setStatus('success');
    } else {
      setStatus('error');
    }
  } catch (error) {
    setStatus('error');
  }
    
  };

  const handleSaveTerms = async () => {
    try {
      const response = await updateTermsCondition({ terms_condition: termsCondition });
    if (response?.data?.success) {
      setStatus('success');
    } else {
      setStatus('error');
    }
  } catch (error) {
    setStatus('error');
  }
  };
  const handleCloseStatusModal = () => setStatus(null);

  // Render component
  if (isLoading) return <div>Loading settings...</div>;
  if (isError) return <div>Error loading settings.</div>;

  return (
    <div className="space-y-6 mt-4">
       {/* Success/Error Status Modal */}
       {status && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center relative">
            <button
              className="absolute top-3 right-3 text-orange-500 hover:text-orange-700"
              onClick={handleCloseStatusModal}
            >
              <FaTimes />
            </button>
            {status === 'success' ? (
              <>
                <FaCheckCircle className="text-green-500 mx-auto mb-4" size={50} />
                <p className="text-lg font-medium"> Success</p>
              </>
            ) : (
              <>
                <FaTimesCircle className="text-red-500 mx-auto mb-4" size={50} />
                <p className="text-lg font-medium">Failed </p>
              </>
            )}
          </div>
        </div>
      )}

      {/* Company Details Section */}
      <div className="p-4 rounded-md">
        <h2 className="font-semibold text-lg mb-2 bg-orange-100 p-4 ">Company Details</h2>
        <div className="grid grid-rows-7 grid-flow-col grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
              <span>Logo</span>
            </div>
            <div className="ml-4">
              <input type="file" onChange={handleUploadLogo} className="hidden" id="logo-upload" />
              <label htmlFor="logo-upload" className="text-blue-500 hover:underline cursor-pointer">Upload</label>
              <button className="text-red-500 hover:underline ml-2">Remove</button>
              <p className="text-gray-500 text-sm">No chosen file</p>
            </div>
          </div>

          {/* Inputs for Organization Details */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Organization Name</label>
            <input type="text" className="mt-1 p-2 w-full border border-gray-300 rounded-md" value={organizationName} onChange={(e) => setOrganizationName(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <input type="email" className="mt-1 p-2 w-full border border-gray-300 rounded-md" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input type="text" className="mt-1 p-2 w-full border border-gray-300 rounded-md" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <input type="text" className="mt-1 p-2 w-full border border-gray-300 rounded-md" value={address} onChange={(e) => setAddress(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Rc Number</label>
            <input type="text" className="mt-1 p-2 w-full border border-gray-300 rounded-md" value={rcNumber} onChange={(e) => setRcNumber(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Tax ID</label>
            <input type="text" className="mt-1 p-2 w-full border border-gray-300 rounded-md" value={taxId} onChange={(e) => setTaxId(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Bank Name</label>
            <input type="text" className="mt-1 p-2 w-full border border-gray-300 rounded-md" value={bankName} onChange={(e) => setBankName(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Account Number</label>
            <input type="text" className="mt-1 p-2 w-full border border-gray-300 rounded-md" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Account Name</label>
            <input type="text" className="mt-1 p-2 w-full border border-gray-300 rounded-md" value={accountName} onChange={(e) => setAccountName(e.target.value)} />
          </div>
          <div className="flex items-center">
            <button className="text-orange-500 hover:underline">+ Add New Account</button>
          </div>
        </div>
      </div>

      {/* Save Changes Button */}
      <div className="flex justify-center">
        <button onClick={handleSaveChanges} className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600">Save Changes</button>
      </div>

      {/* Terms & Conditions Section */}
      <div className="p-4 rounded-md">
        <h2 className="font-semibold text-lg mb-2 bg-orange-100 p-4 ">Terms & Conditions</h2>
        <textarea
          className="w-full border border-gray-300 rounded-md p-2"
          value={termsCondition}
          onChange={(e) => setTermsCondition(e.target.value)}
        />
      </div>

      {/* Save Changes Button for Terms & Conditions */}
      <div className="flex justify-center mt-4">
        <button onClick={handleSaveTerms} className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600">Save Changes</button>
      </div>
    </div>
  );
};

export default GeneralSettings;
