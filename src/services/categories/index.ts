import { GetCategoryRequest, GetCategoryResponse } from "@/types/services/categories";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

const getRequest = <T,>(url: string, params?: T) => {
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

export const category = createApi({
	reducerPath: "categories",
	tagTypes: ["Categories"],
	baseQuery: fetchBaseQuery({
		baseUrl: process.env.NEXT_PUBLIC_APP_BASE_URL + "/get-category-by-type",
		prepareHeaders: async (headers) => {
			const session = await getSession();

			const token = session?.user.token;

			if (token) {
				headers.set("authorization", `Bearer ${token}`);
			}
			return headers;
		},
	}),
	endpoints: (builder) => ({
		getCategory: builder.query<GetCategoryResponse, GetCategoryRequest>({
			query: (credentials) => getRequest("", credentials),
			providesTags: ["Categories"],
		}),
	}),
});

export const { useGetCategoryQuery } = category;
