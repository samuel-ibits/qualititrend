// Request and Response Types for Creating a Warehouse
export type CreateWarehouseRequest = {
    name: string;
    address?: string;
    phone_number?: string;
    email?: string;
};

export type CreateWarehouseResponse = {
    success: boolean;
    code: number;
    message: string;
    data: Warehouse;
    errors: string | null;
};

// Warehouse Interface
export interface Warehouse {
    id: number;
    name: string;
    address: string | null;
    phone_number: string | null;
    email: string | null;
    created_at: string;
    updated_at: string;
}

// Request and Response Types for Fetching Warehouses
export interface FetchWarehousesRequest {
    offset?: number | null;
    limit?: number | null;
}

export interface FetchWarehousesResponse {
    success: boolean;
    code: number;
    data: {
        warehouses: Warehouse[];
        pagination: Pagination;
    };
    message: string;
    errors: string | null;
}

// Request and Response Types for Updating a Warehouse
export interface UpdateWarehouseRequest {
    id: number;
    name?: string;
    address?: string;
    phone_number?: string;
    email?: string;
}

export type UpdateWarehouseResponse = {
    success: boolean;
    code: number;
    message: string;
    data: Warehouse | null;
    errors: string | null;
};

// Request Type for Deleting a Warehouse
export interface DeleteWarehouseRequest {
    id: number;
}

export type DeleteWarehouseResponse = {
    success: boolean;
    code: number;
    message: string;
    errors: string | null;
};

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
