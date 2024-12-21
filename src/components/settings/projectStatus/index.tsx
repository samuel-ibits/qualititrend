// @ts-nocheck
import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { 
    useFetchProjectStatussQuery, 
    useDeleteProjectStatusMutation 
} from "@/services/projectStatus";
import { toast } from 'react-toastify'; // Optional: For notifications
import ProjectStatusModal from './projectStatusModal';

const ProjectStatusSettings: React.FC = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [editingProjectStatus, setEditingProjectStatus] = useState(null);
  
    // Fetch projectStatuses using RTK Query
    const { data, error, isLoading, isFetching, refetch } = useFetchProjectStatussQuery();
    console.log("data", data, error, isLoading);
  
    // Delete mutation hook
    const [deleteProjectStatus, { isLoading: isDeleting }] = useDeleteProjectStatusMutation();

    // Handle delete action
    const handleDelete = async (id: number) => {
        if (confirm("Are you sure you want to delete this project status?")) {
            try {
                await deleteProjectStatus({ id }).unwrap();
                toast.success("Project status deleted successfully!");
                // Optionally refetch data
                refetch();
            } catch (err: any) {
                toast.error(err?.data?.message || "Failed to delete project status.");
            }
        }
    };

    // Handle editing an existing project status
    const handleEdit = (projectStatus) => {
        setEditingProjectStatus(projectStatus);
        setModalOpen(true);
    };

    // Handle creating a new project status
    const handleCreate = () => {
        setEditingProjectStatus(null);
        setModalOpen(true);
    };

    return (
        <div className="p-6">
            {/* Loading/Fetching/Error States */}
            {isLoading ? (
                <p className="text-center">Loading project statuses...</p>
            ) : error ? (
                <p className="text-red-500 text-center">Error fetching project statuses.</p>
            ) : data && data.success ? (
                <div>
                    {/* Add ProjectStatus Button */}
                    <div className="mb-4 flex justify-center md:justify-start">
                        <button
                            onClick={handleCreate}
                            className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
                        >
                            Add Project Status
                        </button>
                    </div>
          
                    {/* Responsive Table */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full border border-gray-200 rounded-md text-sm md:text-base">
                            <thead className="bg-orange-100">
                                <tr>
                                    <th className="px-2 py-2 md:px-4 text-left font-semibold text-gray-700">
                                        Project Status Name
                                    </th>
                                    <th className="px-2 py-2 md:px-4 text-left font-semibold text-gray-700">
                                        Description
                                    </th>
                                    <th className="px-2 py-2 md:px-4 text-left font-semibold text-gray-700">
                                        Percentage
                                    </th>
                                    <th className="px-2 py-2 md:px-4 text-left font-semibold text-gray-700">
                                        Type
                                    </th>
                                    <th className="px-2 py-2 md:px-4 text-center font-semibold text-gray-700">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.data.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={5}
                                            className="px-2 py-4 text-center text-gray-500"
                                        >
                                            No project statuses found.
                                        </td>
                                    </tr>
                                ) : (
                                    data.data.map((projectStatus) => (
                                        <tr
                                            key={projectStatus.id}
                                            className="border-t border-gray-200 text-sm md:text-base"
                                        >
                                            <td className="px-2 py-2 md:px-4 text-gray-800">
                                                {projectStatus.name}
                                            </td>
                                            <td className="px-2 py-2 md:px-4 text-gray-600">
                                                {projectStatus.description || 'N/A'}
                                            </td>
                                            <td className="px-2 py-2 md:px-4 text-gray-600">
                                                {projectStatus.percentage || 'N/A'}
                                            </td>
                                            <td className="px-2 py-2 md:px-4 text-gray-600">
                                                {projectStatus.type || 'N/A'}
                                            </td>
                                            <td className="px-2 py-2 md:px-4 text-center space-x-2">
                                                <button
                                                    className="text-gray-600 hover:text-orange-500"
                                                    aria-label="Edit"
                                                    onClick={() => handleEdit(projectStatus)}
                                                >
                                                    <FaEdit />
                                                </button>
                                                <button
                                                    className="text-gray-600 hover:text-red-500"
                                                    aria-label="Delete"
                                                    onClick={() => handleDelete(projectStatus.id)}
                                                    disabled={isDeleting}
                                                >
                                                    <FaTrash />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <p className="text-red-500 text-center">Failed to load project statuses.</p>
            )}
          
            {/* Project Status Modal */}
            <ProjectStatusModal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                initialData={editingProjectStatus}
            />
        </div>
    );
};

export default ProjectStatusSettings;
