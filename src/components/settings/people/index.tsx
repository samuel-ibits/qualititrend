import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const PeopleSettings = () => {
  const roles = [
    {
      role: 'No Permission',
      description: 'No Permission',
      level: 'No Permission',
    },
    {
      role: 'Super Admin',
      description: 'Super Admin Permission',
      level: 'Level 9',
    },
    {
      role: 'Admin',
      description: 'Admin Permission',
      level: 'Level 8',
    },
    {
      role: 'Sales',
      description: 'Sales Permission',
      level: 'Level 7',
    },
    {
      role: 'Project Manager',
      description: 'Project Manager Permission',
      level: 'Level 6',
    },
    {
      role: 'Project Supervisor',
      description: 'Project Supervisor Permission',
      level: 'Level 5',
    },
  ];

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Group Permissions</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-md">
          <thead className="bg-orange-100">
            <tr>
              <th className="px-4 py-2 text-left font-semibold text-gray-700">Role</th>
              <th className="px-4 py-2 text-left font-semibold text-gray-700">Role Description</th>
              <th className="px-4 py-2 text-left font-semibold text-gray-700">Level</th>
              <th className="px-4 py-2 text-center font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role, index) => (
              <tr key={index} className="border-t border-gray-200">
                <td className="px-4 py-2 text-gray-800">{role.role}</td>
                <td className="px-4 py-2 text-gray-600">{role.description}</td>
                <td className="px-4 py-2 text-gray-600">{role.level}</td>
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

export default PeopleSettings;
