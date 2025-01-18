// @ts-nocheck

"use client";

import React, { useState, useEffect } from "react";
import {
  useFetchSettingsQuery,
  useUploadLogoMutation,
  useUpdateSettingsMutation,
  useUpdateTermsConditionMutation,
} from "@/services/generalSettings";
import {
  FaEdit,
  FaTrash,
  FaPlus,
  FaTimes,
  FaCheckCircle,
  FaTimesCircle,
  FaUpload,
} from "react-icons/fa";
import { UpdateSettingsRequest } from "@/types/services/generalSettings";

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
      setOrganizationName(settingsData.data.organisation_name);
      setEmail(settingsData.data.email);
      setPhoneNumber(settingsData.data.phone_number);
      setAddress(settingsData.data.address);
      setRcNumber(settingsData.data.rc_number);
      setTaxId(settingsData.data.tax_number);
      setBankName(settingsData.data.bank_name);
      setAccountNumber(settingsData.data.account_number);
      setAccountName(settingsData.data.account_name);
      setTermsCondition(settingsData.data.terms_condition);
    }
  }, [settingsData]);

  // Handlers
  const handleUploadLogo = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      await uploadLogo(formData);
    }
  };

  const [logoPreview, setLogoPreview] = useState(null); // Local preview of the uploaded logo
  const [fileName, setFileName] = useState("No chosen file"); // Display name of the uploaded file
  // const [uploadLogo, { isLoading }] = useUploadLogoMutation(); // Hook from RTK Query

  // Handle file upload
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Generate a preview for local display
      setLogoPreview(URL.createObjectURL(file));
      setFileName(file.name);

      // Create FormData and append the file
      const formData = new FormData();
      formData.append("image", file);

      try {
        // Call the mutation to upload the logo
        await uploadLogo(formData).unwrap();
        alert("Logo uploaded successfully!");
      } catch (error) {
        console.error("Failed to upload logo:", error);
        alert("Error uploading logo. Please try again.");
      }
    }
  };

  // Handle file removal
  const handleRemove = () => {
    setLogoPreview(null); // Remove preview
    setFileName("No chosen file"); // Reset file name
  };

  const handleSaveChanges = async () => {
    try {
      const response = await updateSettings({
        organisation_name: organizationName,
        email,
        phone_number: phoneNumber,
        address,
        rc_number: rcNumber,
        tax_number: taxId,
        bank_name: bankName,
        account_number: accountNumber,
        account_name: accountName,
      });
      if (response?.data?.success) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  const handleSaveTerms = async () => {
    try {
      const response = await updateTermsCondition({
        terms_condition: termsCondition,
      });
      if (response?.data?.success) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };
  const handleCloseStatusModal = () => setStatus(null);

  // Render component
  if (isLoading) return <div>Loading settings...</div>;
  if (isError) return <div>Error loading settings.</div>;

  return (
    <>
      {/* Success/Error Status Modal */}
      {status && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm text-center relative">
            <button
              className="absolute top-3 right-3 text-orange-500 hover:text-orange-700"
              onClick={handleCloseStatusModal}
            >
              <FaTimes />
            </button>
            {status === "success" ? (
              <>
                <FaCheckCircle
                  className="text-green-500 mx-auto mb-4"
                  size={50}
                />
                <p className="text-lg font-medium">Success</p>
              </>
            ) : (
              <>
                <FaTimesCircle
                  className="text-red-500 mx-auto mb-4"
                  size={50}
                />
                <p className="text-lg font-medium">Failed</p>
              </>
            )}
          </div>
        </div>
      )}

      <div className="space-y-6 mt-4 max-w-6xl mx-auto px-4 md:px-0">
        {/* Company Details Section */}
        <div className="p-6 rounded-md border border-gray-300 shadow-sm">
          <h2 className="font-semibold text-lg mb-4 bg-orange-100 p-4 rounded-md">
            Company Details
          </h2>

          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-x-4">
            {/* Logo Section */}
            <div className="flex items-center md:w-1/5">
              <span className="block text-gray-700 font-medium">Logo</span>
            </div>

            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 overflow-hidden">
              {logoPreview ? (
                <img
                  src={logoPreview}
                  alt="Logo preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src={organizationLogo}
                  alt="Logo preview"
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            <div className="flex flex-col items-center space-y-2">
              <input
                type="file"
                className="hidden"
                id="logo-upload"
                onChange={handleFileChange}
                accept="image/*"
              />
              <label
                htmlFor="logo-upload"
                className="text-blue-500 hover:underline cursor-pointer flex items-center"
              >
                <FaUpload className="mr-1" />{" "}
                {isLoading ? "Uploading..." : "Upload"}
              </label>
              <p className="text-gray-500 text-sm">{fileName}</p>
              {logoPreview && (
                <button
                  className="text-red-500 hover:underline"
                  onClick={handleRemove}
                >
                  Remove
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            {/* Form Inputs */}
            {[
              {
                label: "Organization Name",
                value: organizationName,
                setValue: setOrganizationName,
              },
              { label: "Email Address", value: email, setValue: setEmail },
              {
                label: "Phone Number",
                value: phoneNumber,
                setValue: setPhoneNumber,
              },
              { label: "Address", value: address, setValue: setAddress },
              { label: "RC Number", value: rcNumber, setValue: setRcNumber },
              { label: "Tax ID", value: taxId, setValue: setTaxId },
              // { label: "Bank Name", value: bankName, setValue: setBankName },
              // {
              //   label: "Account Number",
              //   value: accountNumber,
              //   setValue: setAccountNumber,
              // },
              // {
              //   label: "Account Name",
              //   value: accountName,
              //   setValue: setAccountName,
              // },
            ].map((input, index) => (
              <div className="flex flex-col space-y-2" key={index}>
                <label className="block text-sm font-medium text-gray-700">
                  {input.label}
                </label>
                <input
                  type="text"
                  className="p-2 w-full border border-gray-300 rounded-md"
                  value={input.value}
                  onChange={(e) => input.setValue(e.target.value)}
                />
              </div>
            ))}
          </div>

          {/* Add New Account */}
          {/* <div className="flex justify-start mt-4">
            <button className="text-orange-500 hover:underline flex items-center">
              <FaPlus className="mr-1" /> Add New Account
            </button>
          </div> */}
        </div>

        {/* Save Changes Button */}
        <div className="flex justify-center">
          <button
            onClick={handleSaveChanges}
            className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 w-full sm:w-auto"
          >
            Save Changes
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            {/* Form Inputs */}
            {[
              
              { label: "Bank Name", value: bankName, setValue: setBankName },
              {
                label: "Account Number",
                value: accountNumber,
                setValue: setAccountNumber,
              },
              {
                label: "Account Name",
                value: accountName,
                setValue: setAccountName,
              },
            ].map((input, index) => (
              <div className="flex flex-col space-y-2" key={index}>
                <label className="block text-sm font-medium text-gray-700">
                  {input.label}
                </label>
                <input
                  type="text"
                  className="p-2 w-full border border-gray-300 rounded-md"
                  value={input.value}
                  onChange={(e) => input.setValue(e.target.value)}
                />
              </div>
            ))}
          </div>

          {/* Add New Account */}
          <div className="flex justify-start mt-4">
            <button className="text-orange-500 hover:underline flex items-center">
              <FaPlus className="mr-1" /> Add New Account
            </button>
          </div>
        </div>

        {/* Terms & Conditions Section */}
        <div className="p-6 rounded-md border border-gray-300 shadow-sm">
          <h2 className="font-semibold text-lg mb-4 bg-orange-100 p-4 rounded-md">
            Terms & Conditions
          </h2>
          <textarea
            className="w-full sm:w-2/3 border border-gray-300 rounded-md p-2"
            value={termsCondition}
            onChange={(e) => setTermsCondition(e.target.value)}
            rows="5"
          />
        </div>

        {/* Save Changes Button for Terms & Conditions */}
        <div className="flex justify-center mt-4">
          <button
            onClick={handleSaveTerms}
            className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 w-full sm:w-auto"
          >
            Save Changes
          </button>
        </div>
      </div>
    </>
  );
};

export default GeneralSettings;
