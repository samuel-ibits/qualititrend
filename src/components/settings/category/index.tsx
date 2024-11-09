import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';


const Category = () => {
  // Dummy data for the categories
  const categories = [
    { name: 'Material Cost', description: 'Figma ipsum component variant main layer.' },
    { name: 'Labor Expenses', description: 'Figma ipsum component variant main layer.' },
    { name: 'Equipment Cost', description: 'Figma ipsum component variant main layer.' },
  ];

  return (
    <div className="p-4">
      <div className="flex items-center space-x-4">
        <select className="border border-gray-300 rounded-md p-2">
          <option>Expense Category</option>
        </select>
      </div>
      
      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg shadow-md">
          <thead>
            <tr className="bg-orange-100">
              <th className="text-left px-6 py-3 border-b font-semibold text-gray-700">Category Name</th>
              <th className="text-left px-6 py-3 border-b font-semibold text-gray-700">Description</th>
              <th className="text-center px-6 py-3 border-b font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr key={index} className="border-b">
                <td className="px-6 py-4 whitespace-nowrap text-gray-800">{category.name}</td>
                <td className="px-6 py-4 text-gray-600">{category.description}</td>
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

export default Category;
