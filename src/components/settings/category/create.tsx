// @ts-nocheck

import React, { useState } from "react";
import { FaTimes, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { useCreateCategoryMutation } from "@/services/categories"; // Import the mutation hook

const CreateCategoryModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [status, setStatus] = useState<"success" | "error" | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    type_id: "expense_request", // Adjust type_id as needed
  });

  // Initialize the mutation hook
  const [createCategory, { isLoading }] = useCreateCategoryMutation();

  const handleSave = async () => {
    try {
      const response = await createCategory(formData).unwrap(); // Call the Redux mutation

      if (response.success) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Failed to create category:", error);
      setStatus("error");
    }

    setIsModalOpen(false);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setStatus(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      {isModalOpen && (
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full relative">
          <h2 className="text-lg font-semibold mb-4">
            Create Inventory Category
          </h2>
          <button
            className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
            onClick={handleClose}
          >
            <FaTimes />
          </button>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Inventory Category<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter Category Name"
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">
              Description<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter Description"
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
          </div>
          <button
            onClick={handleSave}
            className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition duration-300"
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </div>
      )}

      {status === "success" && (
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center relative">
          <button
            className="absolute top-3 right-3 text-orange-500 hover:text-orange-700"
            onClick={handleClose}
          >
            <FaTimes />
          </button>
          <FaCheckCircle className="text-green-500 mx-auto mb-4" size={50} />
          <p className="text-lg font-medium">
            Inventory Category created successfully
          </p>
        </div>
      )}

      {status === "error" && (
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center relative">
          <button
            className="absolute top-3 right-3 text-orange-500 hover:text-orange-700"
            onClick={handleClose}
          >
            <FaTimes />
          </button>
          <FaTimesCircle className="text-red-500 mx-auto mb-4" size={50} />
          <p className="text-lg font-medium">
            Failed to create Inventory Category
          </p>
        </div>
      )}
    </div>
  );
};

export default CreateCategoryModal;
