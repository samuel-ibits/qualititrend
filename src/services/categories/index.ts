import {
	CreateCategoryRequest,
	CreateCategoryResponse,
	FetchCategoriesRequest,
	FetchCategoriesResponse,
	FetchCategoryTypesResponse,
	UpdateCategoryRequest,
	DeleteCategoryRequest,
} from "@/types/services/categories";
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
	method: "POST",
	body: details,
});

const deleteRequest = (url: string) => ({
	url,
	method: "DELETE",
});

export const categories = createApi({
	reducerPath: "categories",
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
	tagTypes: ["Categories", "CategoryDetails"],
	endpoints: (builder) => ({
		// Create Category Mutation
		createCategory: builder.mutation<CreateCategoryResponse, CreateCategoryRequest>({
			query: (data) => postRequest("/create-category", data),
			invalidatesTags: ["Categories"],
		}),

		// Fetch Categories Query
		fetchCategories: builder.query<FetchCategoriesResponse, FetchCategoriesRequest>({
			query: (params) => getRequest("/fetch-categories", params),
			providesTags: ["Categories"],
		}),

		// Fetch Category Types Query
		fetchCategoryTypes: builder.query<FetchCategoryTypesResponse, void>({
			query: () => getRequest("/fetch-category-types"),
			providesTags: ["Categories"],
		}),

		// Update Category Mutation
		updateCategory: builder.mutation<void, UpdateCategoryRequest>({
			query: ({ id, ...data }) => postRequest(`/update-category/${id}`, data),
			invalidatesTags: ["Categories", "CategoryDetails"],
		}),

		// Delete Category Mutation
		deleteCategory: builder.mutation<void, DeleteCategoryRequest>({
			query: ({ id }) => deleteRequest(`/delete-category/${id}`),
			invalidatesTags: ["Categories"],
		}),
	}),
});

// Export hooks generated by RTK Query for each endpoint
export const {
	useCreateCategoryMutation,
	useFetchCategoriesQuery,
	useFetchCategoryTypesQuery,
	useUpdateCategoryMutation,
	useDeleteCategoryMutation,
} = categories;
