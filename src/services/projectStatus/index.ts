// services/projectStatuss.ts
import {
  CreateProjectStatusRequest,
  CreateProjectStatusResponse,
  FetchProjectStatussRequest,
  FetchProjectStatussResponse,
  UpdateProjectStatusRequest,
  UpdateProjectStatusResponse,
  DeleteProjectStatusRequest,
  DeleteProjectStatusResponse,
} from "@/types/services/projectStatus";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

const getRequest = <T>(url: string, params?: T) => {
  const queryString = params
    ? Object.entries(params)
        .filter(([, value]) => value !== undefined && value !== null)
        .map(([key, value]) => `${key}=${encodeURIComponent(value as string)}`)
        .join("&")
    : "";

  return {
    url: queryString ? `${url}?${queryString}` : url,
    method: "GET",
  };
};

const postRequest = (url: string, details?: unknown) => ({
  url,
  method: "POST",
  body: details,
});

const patchRequest = (url: string, details?: unknown) => ({
  url,
  method: "PATCH",
  body: details,
});

const putRequest = (url: string, details?: unknown) => ({
  url,
  method: "PUT",
  body: details,
});
const deleteRequest = (url: string) => ({
  url,
  method: "DELETE",
});

export const projectStatus = createApi({
  reducerPath: "projectStatus",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_APP_BASE_URL,
    prepareHeaders: async (headers) => {
      const session = await getSession();
      const token = session?.user?.token;

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["ProjectStatus", "ProjectStatusDetails"],
  endpoints: (builder) => ({
    createProjectStatus: builder.mutation<
      CreateProjectStatusResponse,
      CreateProjectStatusRequest
    >({
      query: (data) => postRequest("/create-project-status", data),
      invalidatesTags: ["ProjectStatus"],
    }),

    fetchProjectStatuss: builder.query<
      FetchProjectStatussResponse,
      FetchProjectStatussRequest
    >({
      query: (params) => getRequest("/fetch-project-status", params),
      providesTags: ["ProjectStatus"],
    }),

    updateProjectStatus: builder.mutation<
      UpdateProjectStatusResponse,
      UpdateProjectStatusRequest
    >({
      query: ({ id, ...data }) =>
        putRequest(`/update-project-status/${id}`, data),
      invalidatesTags: ["ProjectStatus", "ProjectStatusDetails"],
    }),

    deleteProjectStatus: builder.mutation<
      DeleteProjectStatusResponse,
      DeleteProjectStatusRequest
    >({
      query: ({ id }) => deleteRequest(`/delete-project-status/${id}`),
      invalidatesTags: ["ProjectStatus"],
    }),
  }),
});

export const {
  useCreateProjectStatusMutation,
  useFetchProjectStatussQuery,
  useUpdateProjectStatusMutation,
  useDeleteProjectStatusMutation,
} = projectStatus;
