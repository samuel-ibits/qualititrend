// components/WarehouseSettings.tsx
import React,{ useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { 
    useFetchWarehousesQuery, 
    useDeleteWarehouseMutation 
} from "@/services/warehouse/setting";
import { Warehouse } from "@/types/services/warehouse/setting";
import { toast } from 'react-toastify'; // Optional: For notifications
// import Warehouse from '@/components/warehouse/Warehouse';
import WarehouseModal from './warehouseModal';


const WarehouseSettings: React.FC = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [editingWarehouse, setEditingWarehouse] = useState(null);
  
    // Fetch warehouses using RTK Query
    const { data, error, isLoading, isFetching, refetch } = useFetchWarehousesQuery({
        offset: 0,
        limit: 100, // Adjust as needed
    });
    console.log(data)
    // Delete mutation hook
    const [deleteWarehouse, { isLoading: isDeleting }] = useDeleteWarehouseMutation();

    // Handle delete action
    const handleDelete = async (id: number) => {
        if (confirm("Are you sure you want to delete this warehouse?")) {
            try {
                await deleteWarehouse({ id }).unwrap();
                toast.success("Warehouse deleted successfully!");
                // Optionally refetch data
                refetch();
            } catch (err: any) {
                toast.error(err?.data?.message || "Failed to delete warehouse.");
            }
        }
    };

   
  const handleEdit = (warehouse) => {
    setEditingWarehouse(warehouse);
    setModalOpen(true);
  };

  const handleCreate = () => {
    setEditingWarehouse(null);
    setModalOpen(true);
  };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Warehouse Settings</h2>
            {isLoading || isFetching ? (
                <p>Loading warehouses...</p>
            ) : error ? (
                <p className="text-red-500">Error fetching warehouses.</p>
            ) : data && data.success ? (
                
                <div className="overflow-x-auto">
                          <button
        onClick={handleCreate}
        className="mb-4 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
      >
        Add Warehouse
      </button>
                    <table className="min-w-full border border-gray-200 rounded-md">
                        <thead className="bg-orange-100">
                            <tr>
                                <th className="px-4 py-2 text-left font-semibold text-gray-700">Warehouse Name</th>
                                <th className="px-4 py-2 text-left font-semibold text-gray-700">Address</th>
                                <th className="px-4 py-2 text-left font-semibold text-gray-700">Phone Number</th>
                                <th className="px-4 py-2 text-left font-semibold text-gray-700">Email</th>
                                <th className="px-4 py-2 text-center font-semibold text-gray-700">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.data.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-4 py-2 text-center text-gray-500">
                                        No warehouses found.
                                    </td>
                                </tr>
                            ) : (
                                data.data.map((warehouse) => (
                                    <tr key={warehouse.id} className="border-t border-gray-200">
                                        <td className="px-4 py-2 text-gray-800">{warehouse.name}</td>
                                        <td className="px-4 py-2 text-gray-600">{warehouse.address || 'N/A'}</td>
                                        <td className="px-4 py-2 text-gray-600">{warehouse.phone_number || 'N/A'}</td>
                                        <td className="px-4 py-2 text-gray-600">{warehouse.email || 'N/A'}</td>
                                        <td className="px-4 py-2 text-center space-x-2">
                                            <button
                                                className="text-gray-600 hover:text-orange-500"
                                                aria-label="Edit"
                                                onClick={() => handleEdit(warehouse)}
                                            >
                                                <FaEdit />
                                            </button>
                                            <button
                                                className="text-gray-600 hover:text-red-500"
                                                aria-label="Delete"
                                                onClick={() => handleDelete(warehouse.id)}
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
            ) : (
                <p className="text-red-500">Failed to load warehouses.</p>
            )}
            <WarehouseModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        initialData={editingWarehouse}
      />
        </div>
    );
};

export default WarehouseSettings;
