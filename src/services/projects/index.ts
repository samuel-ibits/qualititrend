import {
    CreateProjectRequest,
    CreateProjectsResponse,
    FetchProjectDetailsRequest,
    FetchProjectDetailsResponse,
    FetchProjectsRequest,
    FetchProjectsResponse,
    FetchProjectsStatsResponse,
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
	url: !params
	    ? url
	    : url +
	    `?${queryString({
...cleanedParams,
	})}`,
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
    tagTypes: ["Projects", "project details"],
    endpoints: (builder) => ({
	CreateProject: builder.mutation<
	CreateProjectsResponse,
	CreateProjectRequest
    >({
	    query: (credentials) => postRequest("/create-project", credentials),
	    invalidatesTags: ["Projects"],
	}),
	fetchProjects: builder.query<FetchProjectsResponse, FetchProjectsRequest>({
	    query: (credentials) => getRequest("/projects", credentials),
	    providesTags: ["Projects"],
	}),
	fetchProjectsStats: builder.query<FetchProjectsStatsResponse, FetchProjectsRequest>({
	    query: (credentials) => getRequest("/get-projects-stats", credentials),
	    providesTags: ["Projects"],
	}),
	fetchProjectDetail: builder.query<FetchProjectDetailsResponse, FetchProjectDetailsRequest>({
	    query: (credentials) => getRequest(`/get-project-by-id/${credentials.id}`, credentials),
	    providesTags: ["Projects", "project details"]
	})
    }),
});

export const { useCreateProjectMutation, useFetchProjectsQuery, useFetchProjectsStatsQuery, useFetchProjectDetailQuery } = projects;
