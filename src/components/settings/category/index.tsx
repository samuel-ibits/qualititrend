import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaPlus, FaTimes, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import {
  useFetchCategoriesQuery,
  useFetchCategoryTypesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
	useDeleteCategoryMutation,
} from '@/services/categories';
import { FetchCategoriesRequest, FetchCategoriesResponse, Category,UpdateCategoryRequest } from '@/types/services/categories';

const CategoryComponent: React.FC = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>('project_type');
  const [categoryId, setCategoryId] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  
  const [newCategory, setNewCategory] = useState({ name: '', description: '', type: selectedCategoryId });

  const [status, setStatus] = useState<"success" | "error" | null>(null);

  const [pagination, setPagination] = useState({
    page: 1,
    perPage: 10,
    total: 0,
  });

  // Fetch categories with pagination
  const { data } = useFetchCategoriesQuery({
    type: selectedCategoryId,
    limit: pagination.perPage,
    offset: (pagination.page - 1) * pagination.perPage,
  } as FetchCategoriesRequest);

  useEffect(() => {
    if (data?.success) {
      setPagination((prev) => ({
        ...prev,
        total: data.data?.pagination?.total,
      }));
    }
  }, [data]);

  const [updateCategory, { isLoading: isUpdating }] = useUpdateCategoryMutation();

// Example handlers for Edit and Delete
const handleEdit = (categoryId) => {

  setIsModalOpen(true);
  setNewCategory(categoryId);
  setIsEdit(true);

  // Implement edit functionality here
  console.log("Editing category:", categoryId);
};


const [deleteCategory] = useDeleteCategoryMutation();

const handleDelete = async (category) => {
  // Implement delete functionality here
  try {
    const response = await deleteCategory(category).unwrap();
    if (response.success) {
      console.log("Deleting category:", category);
      setStatus('success');
    } else {
      setStatus('error');
    }
  } catch (error) {
    console.error('Failed to create category:', error);
    setStatus('error');
  }

};

  // Fetch category types for the dropdown
  const { data: categoryTypesData, isLoading: isTypesLoading } = useFetchCategoryTypesQuery();
  
  // Fetch specific category data when selected using the service
  const { data: selectedCategoryData, isLoading: isCategoryLoading, error: categoryError } =
  useFetchCategoriesQuery({ type: selectedCategoryId || '' });

  console.log('test',categoryTypesData?.data);

  const handleCategorySelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategoryId(event.target.value || null);
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleNewCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCategory({ ...newCategory, [e.target.name]: e.target.value });
  };

  // Mutation hook for creating a category
  const [createCategory, { isLoading }] = useCreateCategoryMutation();


  const handleSave = async () => {
    try {
      if(isEdit){
        const { id, type, name, description } = newCategory; 
        console.log("newCategory ",newCategory )
        const response = await updateCategory({id, type, name, description}).unwrap();
        console.log('edit failed');
        if (response?.success) {
          setStatus('success');
        } else {
          setStatus('error');
        }
        setIsEdit(false);

      }else{
      const response = await createCategory(newCategory).unwrap();
      if (response.success) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    }
    } catch (error) {
      console.error('Failed to create category:', error);
      setStatus('error');
    }
    setIsModalOpen(false);
  };

  const handleCloseStatusModal = () => setStatus(null);

  return (
    <div className="p-4">
      <div className="flex items-center space-x-4 mb-4">
        <select
          className="border border-gray-300 rounded-md p-2"
          onChange={handleCategorySelect}
          value={selectedCategoryId || ''}
        >
          <option value="">Select a Category</option>
          {!isTypesLoading &&
            categoryTypesData?.data?.map((categoryType: { name: string , id: string }) => (
              <option key={categoryType.id} value={categoryType.id}>
                {categoryType.name}
              </option>
            ))}
        </select>
        <button
          className="flex items-center bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition"
          onClick={handleOpenModal}
        >
          <FaPlus className="mr-2" /> Create Category
        </button>
      </div>

      {/* Create Category Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full relative">
            <h2 className="text-lg font-semibold mb-4">Create New {selectedCategoryId} Category  </h2>
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
              onClick={handleCloseModal}
            >
              <FaTimes />
            </button>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Category Name</label>
              <input
                type="text"
                name="name"
                value={newCategory.name}
                onChange={handleNewCategoryChange}
                placeholder="Enter category name"
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <input
                type="text"
                name="description"
                value={newCategory.description}
                onChange={handleNewCategoryChange}
                placeholder="Enter description"
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            </div>
            <button
              onClick={handleSave}
              className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition duration-300"
            >
              Save
            </button>
          </div>
        </div>
      )}

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

      {/* Category Table */}
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
            
        {!isLoading && selectedCategoryData ? (
          selectedCategoryData.data.length > 0 ? (
            selectedCategoryData.data.map((category) => (
              <tr key={category.id} className="border-b">
                <td className="px-6 py-4 whitespace-nowrap text-gray-800">{category.name}</td>
                <td className="px-6 py-4 text-gray-600">{category.description}</td>
                <td className="px-4 py-2 text-center space-x-2">
                  <button
                    className="text-gray-600 hover:text-orange-500"
                    aria-label="Edit"
                    onClick={() =>{ handleEdit(category); }}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="text-gray-600 hover:text-red-500"
                    aria-label="Delete"
                    onClick={() => handleDelete(category)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} className="text-center text-gray-500 py-4">
                No categories available. <button className="text-blue-500 hover:underline">Create New Category</button>
              </td>
            </tr>
          )
        ) : (
          <tr>
            <td colSpan={3} className="text-center text-gray-500 py-4">
              {isLoading ? 'Loading...' : 'Select a category to view details'}
            </td>
          </tr>
        )}
          </tbody>
        </table>
      </div>

      {/* Pagination Info */}
      <div className="mt-4">
        <p>Pagination Info:</p>
        <p>Page: {pagination.page}</p>
        <p>Items per page: {pagination.perPage}</p>
        <p>Total items: {pagination.total}</p>
      </div>
    </div>
  );
};

export default CategoryComponent;
