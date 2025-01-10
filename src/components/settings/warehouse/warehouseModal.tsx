// @ts-nocheck

import React, { useState, useEffect } from "react";
import {
  useCreateWarehouseMutation,
  useUpdateWarehouseMutation,
} from "@/services/warehouse/setting";

interface WarehouseModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: {
    id?: string;
    name: string;
    address: string;
    phone_number: string;
    email: string;
  };
}

const WarehouseModal: React.FC<WarehouseModalProps> = ({
  isOpen,
  onClose,
  initialData,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone_number: "",
    email: "",
  });

  const [createWarehouse, { isLoading: isCreating }] =
    useCreateWarehouseMutation();
  const [updateWarehouse, { isLoading: isUpdating }] =
    useUpdateWarehouseMutation();

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({ name: "", address: "", phone_number: "", email: "" });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      if (initialData?.id) {
        // Edit existing warehouse
        await updateWarehouse({ id: initialData.id, ...formData }).unwrap();
      } else {
        // Create new warehouse
        await createWarehouse(formData).unwrap();
      }
      onClose(); // Close modal after success
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white rounded-md shadow-lg p-6 w-96">
        <h2 className="text-xl font-semibold mb-4">
          {initialData ? "Edit Warehouse" : "Create Warehouse"}
        </h2>
        <div className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Warehouse Name"
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            placeholder="phone"
            className="w-full p-2 border rounded"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mt-4 flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className={`px-4 py-2 text-white rounded ${
              isCreating || isUpdating
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-orange-500 hover:bg-orange-600"
            }`}
            disabled={isCreating || isUpdating}
          >
            {isCreating || isUpdating ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WarehouseModal;
