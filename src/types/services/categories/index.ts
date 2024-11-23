// Request and Response Types for Creating a Category
export type CreateCategoryRequest = {
	name: string;
	description?: string;
	type_id: string;
	id: string
};

export type CreateCategoryResponse = {
	success: boolean;
	code: number;
	message: string;
	data: Category;
	errors: string | null;
};

// Category Interface
export interface Category {
	id: number;
	name: string;
	description: string;
	type: string; // Category type name, e.g., "unit_measurement"
	created_at: string;
	updated_at: string;
}

// Request and Response Types for Fetching Categories
export interface FetchCategoriesRequest {
	type?: string; // e.g., "unit_measurement"
	offset?: number;
	limit?: number;
}

export interface FetchCategoriesResponse {
	success: boolean;
	code: number;
	data: {
		categories: Category[];
		pagination: Pagination;
	};
	message: string;
	errors: string | null;
}

// Response Type for Fetching Category Types
export interface FetchCategoryTypesResponse {
	success: boolean;
	code: number;
	data: CategoryType[];
	message: string;
	errors: string | null;
}

// CategoryType Interface
export interface CategoryType {
	id: string;
	name: string; // e.g., "unit_measurement"
}

// Request and Response Types for Updating and Deleting Categories
export interface UpdateCategoryRequest {
	id: string;
	name?: string;
	description?: string;
	type?: string;
}

export interface DeleteCategoryRequest {
	id: string;
}

// Pagination Interface
export interface Pagination {
	total: number;
	total_pages: number;
	perPage: number;
	page: number;
	current_page_total: number;
	from: number;
	to: number;
	count: number;
}
