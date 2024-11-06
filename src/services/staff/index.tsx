import { GetStaffRequest, GetStaffResponse } from "@/types/services/staff";
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

const deleteRequest = (url: string) => ({
	url,
	method: "DELETE",
});

const putRequest = (url: string, details: unknown) => ({
	url,
	method: "PUT",
	body: details,
});

const postRequest = (url: string, details: unknown) => ({
	url,
	method: "POST",
	body: details,
});

export const staff = createApi({
	reducerPath: "staff",
	tagTypes: ["Staff"],
	baseQuery: fetchBaseQuery({
		baseUrl: process.env.NEXT_PUBLIC_APP_BASE_URL + "/staff",
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
		getStaff: builder.query<GetStaffResponse, GetStaffRequest>({
			query: (credentials) => getRequest("", credentials),
			providesTags: ["Staff"],
		}),
	}),
});

export const { useGetStaffQuery } = staff;
