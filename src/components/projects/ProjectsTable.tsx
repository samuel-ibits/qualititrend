// @ts-nocheck

"use client";

import Table from "@/components/global/Table";
import Icons from "@/components/icons";
import Modal from "@/components/global/Modal"; // Import your modal component
import { cn, formatAmount } from "@/lib/utils";
import {
  FetchProjectsResponse,
  UpdateProjectRequest,
} from "@/types/services/projects";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useUpdateProjectMutation } from "@/services/projects";

type Props = {
  title?: string;
  data: FetchProjectsResponse;
};

export default function ProjectTable({ title, data: _data }: Props) {
  const data = _data.data;
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<any | null>(null);

  const [updateProject] = useUpdateProjectMutation();

  const tableHeadData = [
    { title: "Project Code", key: "project_code" },
    { title: "Initiation Date", key: "initiation_date" },
    { title: "Proposed Completion Date", key: "proposed_completed_date" },
    { title: "Budget", key: "budget" },
    { title: "Invoice Value", key: "invoice_value" },
    { title: "Account Balance", key: "balance" },
    { title: "Total Expenses", key: "total_expenses" },
    { title: "Actions", key: "actions" },
  ];

  const handleUpdateProject = async (updateData: UpdateProjectRequest) => {
    try {
      setLoading(true);
      setUpdateError(null);
      setSuccessMessage(null);

      const response = await updateProject(updateData).unwrap();

      setSuccessMessage(response.message);
      setLoading(false);
      setModalOpen(false); // Close the modal after successful update
    } catch (error: any) {
      setUpdateError(error?.message || "Failed to update project.");
      setLoading(false);
    }
  };

  const handleOpenModal = (project: any) => {
    setCurrentProject(project);
    setModalOpen(true);
    console.log("Project data", project);
  };

  return (
    <section>
      <Table
        title={title}
        data={data!}
        loaderLength={10}
        tableHeadData={tableHeadData}
        rowComponent={(transaction, index, length) => {
          const {
            project_code,
            id,
            initiation_date,
            proposed_completed_date,
            budget,
            balance,
            invoice_value,
            total_expenses,
          } = transaction;

          return (
            <tr
              onClick={() => {
                router.push("/projects/" + id + "/inventory");
              }}
              className={cn("text-sm cursor-pointer border-[#5A5A5A99]", {
                "border-b": index !== length - 1,
              })}
            >
              <td className="p-4 text-black-500 whitespace-nowrap">
                {project_code}
              </td>
              <td className="p-4 text-black-500 whitespace-nowrap">
                {new Date(initiation_date).toLocaleDateString()}
              </td>
              <td className="py-[18px] w-[100px] px-4 text-black-500 whitespace-nowrap">
                {proposed_completed_date
                  ? new Date(proposed_completed_date).toLocaleDateString()
                  : "N/A"}
              </td>
              <td className="p-4 text-black-500 whitespace-nowrap">
                {formatAmount(+budget, "NGN")}
              </td>
              <td className="p-4 text-black-500 whitespace-nowrap">
                {invoice_value ? formatAmount(+invoice_value, "NGN") : "N/A"}
              </td>
              <td className="p-4 text-black-500 whitespace-nowrap">
                {formatAmount(+balance, "NGN")}
              </td>
              <td className="p-4 text-black-500 whitespace-nowrap">
                {total_expenses ? formatAmount(+total_expenses, "NGN") : "N/A"}
              </td>
              <td className="p-4">
                <button
                  onClick={(e) => {
                    // e.stopPropagation(); // Prevent row click
                    handleOpenModal(transaction); // Open modal for the project
                  }}
                >
                  <Icons.MoreIcon />
                </button>
              </td>
            </tr>
          );
        }}
      />
      {modalOpen && currentProject && (
        <Modal
          title="Update Project"
          onClose={() => setModalOpen(false)}
          onSubmit={() => {
            // Create update data object from the form inputs
            const updateData: UpdateProjectRequest = {
              id: currentProject.id,
              summary: currentProject.summary, // Updated from input
              manager_id: currentProject.manager_id, // Updated from input
              supervisor_id: currentProject.supervisor_id, // Updated from input
              budget: currentProject.budget, // Updated from input
              initiation_date: currentProject.initiation_date, // Updated from input
              completion_date: currentProject.completion_date, // Updated from input
            };
            handleUpdateProject(updateData);
          }}
        >
          <form>
            {/* Summary */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Summary
              </label>
              <input
                type="text"
                value={currentProject.summary}
                onChange={(e) =>
                  setCurrentProject({
                    ...currentProject,
                    summary: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            {/* Manager ID */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Manager ID
              </label>
              <input
                type="text"
                value={currentProject.manager_id}
                onChange={(e) =>
                  setCurrentProject({
                    ...currentProject,
                    manager_id: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            {/* Supervisor ID */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Supervisor ID
              </label>
              <input
                type="text"
                value={currentProject.supervisor_id}
                onChange={(e) =>
                  setCurrentProject({
                    ...currentProject,
                    supervisor_id: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            {/* Budget */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Budget
              </label>
              <input
                type="number"
                value={currentProject.budget}
                onChange={(e) =>
                  setCurrentProject({
                    ...currentProject,
                    budget: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            {/* Initiation Date */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Initiation Date
              </label>
              <input
                type="date"
                value={currentProject.initiation_date}
                onChange={(e) =>
                  setCurrentProject({
                    ...currentProject,
                    initiation_date: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            {/* Completion Date */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Completion Date
              </label>
              <input
                type="date"
                value={currentProject.completion_date}
                onChange={(e) =>
                  setCurrentProject({
                    ...currentProject,
                    completion_date: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </form>

          {loading && <span>Updating...</span>}
          {updateError && <span className="text-red-500">{updateError}</span>}
          {successMessage && (
            <span className="text-green-500">{successMessage}</span>
          )}
        </Modal>
      )}
    </section>
  );
}
