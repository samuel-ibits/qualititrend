import { configureStore } from "@reduxjs/toolkit";
import { auth } from "../services/auth";
import { projects } from "@/services/projects";
import { rtkQueryErrorLogger } from "./middlewares";
import { staff } from "@/services/staff";
import { categories } from "@/services/categories";
import { generalSettings } from "@/services/generalSettings";

import { warehouse } from "@/services/warehouse";

export const store = configureStore({
	reducer: {
		[auth.reducerPath]: auth.reducer,
		[projects.reducerPath]: projects.reducer,
		[warehouse.reducerPath]: warehouse.reducer,
		[staff.reducerPath]: staff.reducer,
		[categories.reducerPath]: categories.reducer,
		[generalSettings.reducerPath]: generalSettings.reducer,

	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(
			auth.middleware,
			projects.middleware,
			warehouse.middleware,
			staff.middleware,
			categories.middleware,
			generalSettings.middleware,
			rtkQueryErrorLogger
		),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
