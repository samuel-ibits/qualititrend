import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const WarehouseSettings = () => {
  const warehouses = [
    {
      name: 'Warehouse 1',
      address: 'Figma ipsum component variant main layer.',
      phone: '+2349000000000',
      email: 'warehouse1@company.info',
    },
    {
      name: 'Warehouse 2',
      address: 'Figma ipsum component variant main layer.',
      phone: '+2349000000000',
      email: 'warehouse2@company.info',
    },
    {
      name: 'Warehouse 3',
      address: 'Figma ipsum component variant main layer.',
      phone: '+2349000000000',
      email: 'warehouse3@company.info',
    },
    {
      name: 'Warehouse 4',
      address: 'Figma ipsum component variant main layer.',
      phone: '+2349000000000',
      email: 'warehouse4@company.info',
    },
  ];

  return (
    <div className="p-6">
      <div className="overflow-x-auto">
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
            {warehouses.map((warehouse, index) => (
              <tr key={index} className="border-t border-gray-200">
                <td className="px-4 py-2 text-gray-800">{warehouse.name}</td>
                <td className="px-4 py-2 text-gray-600">{warehouse.address}</td>
                <td className="px-4 py-2 text-gray-600">{warehouse.phone}</td>
                <td className="px-4 py-2 text-gray-600">{warehouse.email}</td>
                <td className="px-4 py-2 text-center space-x-2">
                  <button
                    className="text-gray-600 hover:text-orange-500"
                    aria-label="Edit"
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="text-gray-600 hover:text-red-500"
                    aria-label="Delete"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WarehouseSettings;
