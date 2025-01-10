import { SignInRequest, SignInResponse } from "@/types/services/auth";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const postRequest = (url: string, details: unknown) => ({
  url,
  method: "POST",
  body: details,
});

export const auth = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_APP_BASE_URL,
  }),
  endpoints: (builder) => ({
    signin: builder.mutation<SignInResponse, SignInRequest>({
      query: (credentials) => postRequest("/signin", credentials),
    }),
  }),
});

export const { useSigninMutation } = auth;
