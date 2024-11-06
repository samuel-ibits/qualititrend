
import { Pagination } from "@/types/global/pagination";

export type CategoryTypes = "other_rooms" | "building_purpose" | "project_status" | "building_unit_type" | "concrete_type" | "furniture_type" | "unit_measurement" | "expense_request"

export type Category = {
	id: string,
	name: string,
	type: CategoryTypes,
	description: string,
	color: string | null,
	parent_id: string | null,
};


export type GetCategoryRequest = {
	type: CategoryTypes;
};

export type GetCategoryResponse = {
	success: boolean;
	code: number;
	errors: string;
	message: string;
	data: {
		categories: Category[];
		pagination: Pagination;
	};
};
