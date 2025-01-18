// services/buildingUnits.ts
import {
    CreateBuildingUnitRequest,
    CreateBuildingUnitResponse,
    FetchBuildingUnitsRequest,
    FetchBuildingUnitsResponse,
    UpdateBuildingUnitRequest,
    UpdateBuildingUnitResponse,
    DeleteBuildingUnitRequest,
    DeleteBuildingUnitResponse,
} from "@/types/services/buildingUnit/index";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

// Utility functions to handle request creation with optional params
const getRequest = <T>(url: string, params?: T) => {
    const paramsReducer = (acc: any, [key, value]: any) => {
        if (value !== undefined && value !== null) {
            acc[key] = value;
        }
        return acc;
    };

    const cleanedParams = Object.entries(params || {}).reduce(paramsReducer, {});
    const queryString = Object.keys(cleanedParams)
        .map((key) => `${key}=${encodeURIComponent((cleanedParams as any)[key])}`)
        .join("&");

    return {
        url: params ? `${url}?${queryString}` : url,
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

export const buildingUnits = createApi({
    reducerPath: "buildingUnits",
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
    tagTypes: ["BuildingUnits", "BuildingUnitDetails"],
    endpoints: (builder) => ({
        // Create Building Unit Mutation
        createBuildingUnit: builder.mutation<
            CreateBuildingUnitResponse,
            CreateBuildingUnitRequest
        >({
            query: (data) => postRequest("/create-building-unit", data),
            invalidatesTags: ["BuildingUnits"],
        }),

        // Fetch Building Units Query
        fetchBuildingUnits: builder.query<
            FetchBuildingUnitsResponse,
            FetchBuildingUnitsRequest
        >({
            query: (params) => getRequest("/fetch-building-unit", params),
            providesTags: ["BuildingUnits"],
        }),

        // Update Building Unit Mutation
        updateBuildingUnit: builder.mutation<
            UpdateBuildingUnitResponse,
            UpdateBuildingUnitRequest
        >({
            query: ({ id, ...data }) => putRequest(`/update-building-unit/${id}`, data),
            invalidatesTags: ["BuildingUnits", "BuildingUnitDetails"],
        }),

        // Delete Building Unit Mutation
        deleteBuildingUnit: builder.mutation<
            DeleteBuildingUnitResponse,
            DeleteBuildingUnitRequest
        >({
            query: ({ id }) => deleteRequest(`/delete-building-unit/${id}`),
            invalidatesTags: ["BuildingUnits"],
        }),
    }),
});

// Export hooks generated by RTK Query for each endpoint
export const {
    useCreateBuildingUnitMutation,
    useFetchBuildingUnitsQuery,
    useUpdateBuildingUnitMutation,
    useDeleteBuildingUnitMutation,
} = buildingUnits;
