import {
  CreateProjectRequest,
  CreateProjectsResponse,
  FetchProjectDetailsRequest,
  FetchProjectDetailsResponse,
  FetchProjectsRequest,
  FetchProjectsResponse,
  FetchProjectsStatsResponse,
  UpdateProjectRequest,
  UpdateProjectResponse,
  UpdateProjectAttributeRequest,
  UpdateProjectAttributeResponse,
} from "@/types/services/projects";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

const getRequest = <T>(url: string, params?: T) => {
  const paramsReducer = (acc: any, [key, value]: any) => {
    if (value) {
      acc[key] = value;
    }
    return acc;
  };
  const cleanedParams = Object.entries(params || {}).reduce(paramsReducer, {});

  const queryString = (_params: any) => {
    return Object.keys(_params)
      .map((key) => key + "=" + _params[key])
      .join("&");
  };

  return {
    url: !params ? url : url + `?${queryString({ ...cleanedParams })}`,
    method: "GET",
  };
};

const postRequest = (url: string, details?: unknown) => ({
  url,
  method: "POST",
  body: details,
});

const putRequest = (url: string, details?: unknown) => ({
  url,
  method: "PUT",
  body: details,
});

export const projects = createApi({
  reducerPath: "projects",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_APP_BASE_URL,
    prepareHeaders: async (headers) => {
      const session = await getSession();
      const token = session?.user.token;

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Projects", "Project Details"],
  endpoints: (builder) => ({
    CreateProject: builder.mutation<
      CreateProjectsResponse,
      CreateProjectRequest
    >({
      query: (credentials) => postRequest("/create-project", credentials),
      invalidatesTags: ["Projects"],
    }),

    // Fetch single project by ID
    fetchProjectById: builder.query<
      FetchProjectDetailsResponse,
      { id: string }
    >({
      query: (credentials) => getRequest(`/fetch-project/${credentials.id}`),
      providesTags: ["Projects", "Project Details"],
    }),

    // Fetch project types
    fetchProjectTypes: builder.query<any, void>({
      query: () => getRequest("/fetch-project-types"),
      providesTags: ["Projects"],
    }),

    // Fetch all projects
    fetchProjects: builder.query<FetchProjectsResponse, FetchProjectsRequest>({
      query: (credentials) =>
        getRequest("/fetch-projects", {
          ...credentials,
          status_type: credentials.type || "ongoing", // Default to "ongoing" if no type provided
        }),
      providesTags: ["Projects"],
    }),

    // Fetch project stats
    fetchProjectsStats: builder.query<
      FetchProjectsStatsResponse,
      FetchProjectsRequest
    >({
      query: (credentials) => getRequest("/get-projects-stats", credentials),
      providesTags: ["Projects"],
    }),

    // Update a project
    updateProject: builder.mutation<
      UpdateProjectResponse,
      UpdateProjectRequest
    >({
      query: (details) => putRequest(`/update-project/${details.id}`, details),
      invalidatesTags: ["Projects", "Project Details"],
    }),

    // Update project attributes
    updateProjectAttributes: builder.mutation<
      UpdateProjectAttributeResponse,
      UpdateProjectAttributeRequest
    >({
      query: (details) =>
        putRequest(`/update-project-attribute/${details.id}`, details),
      invalidatesTags: ["Projects", "Project Details"],
    }),
  }),
});

export const {
  useCreateProjectMutation,
  useFetchProjectByIdQuery,
  useFetchProjectTypesQuery,
  useFetchProjectsQuery,
  useFetchProjectsStatsQuery,
  useUpdateProjectMutation,
  useUpdateProjectAttributesMutation,
} = projects;
