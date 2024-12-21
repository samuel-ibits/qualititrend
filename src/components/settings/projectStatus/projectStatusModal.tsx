// @ts-nocheck

import React, { useState, useEffect } from "react";
import { useCreateProjectStatusMutation, useUpdateProjectStatusMutation } from "@/services/projectStatus";

interface ProjectStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: {
    id?: string;
    name: string;
    description: string;
    percentage: string;
    type: string;
  };
}

const ProjectStatusModal: React.FC<ProjectStatusModalProps> = ({ isOpen, onClose, initialData }) => {
  // Updated state to reflect the new fields
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    percentage: "",
    type: "ongoing", // Default value set to 'ongoing'
  });

  const [createProjectStatus, { isLoading: isCreating }] = useCreateProjectStatusMutation();
  const [updateProjectStatus, { isLoading: isUpdating }] = useUpdateProjectStatusMutation();

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({ name: "", description: "", percentage: "", type: "ongoing" });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      if (initialData?.id) {
        // Update existing projectStatus - Check that it's using the correct method (PATCH/PUT)
        const result = await updateProjectStatus({ id: initialData.id, ...formData }).unwrap();
        if (result) {
          onClose(); // Close modal after success
        }
      } else {
        // Create new projectStatus - Check that it's using the correct method (POST)
        const result = await createProjectStatus(formData).unwrap();
        if (result) {
          onClose(); // Close modal after success
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      if (error?.data) {
        // Handle API-specific error response
        alert(`Error: ${error.data?.message || "An error occurred."}`);
      } else {
        // Handle other types of errors
        alert("Unexpected error occurred.");
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white rounded-md shadow-lg p-6 w-96">
        <h2 className="text-xl font-semibold mb-4">
          {initialData ? "Edit ProjectStatus" : "Create ProjectStatus"}
        </h2>
        <div className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Project Status Name"
            className="w-full p-2 border rounded"
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full p-2 border rounded"
            rows={3}
          />
          <input
            type="text"
            name="percentage"
            value={formData.percentage}
            onChange={handleChange}
            placeholder="Percentage"
            className="w-full p-2 border rounded"
          />
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
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

export default ProjectStatusModal;
