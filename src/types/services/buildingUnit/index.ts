// types/services/buildingUnit.ts

// Request type for fetch-building-unit endpoint
export interface FetchBuildingUnitsRequest {
    project_id?: number; // Optional to allow fetching by project
    id?: number; // Optional to fetch a specific building unit
    [key: string]: any; // Allow additional filters or parameters
}

// Response type for fetch-building-unit endpoint
export interface FetchBuildingUnitsResponse {
    project_id: number;
    id: number;
    name: string;
    type: number;
    quantity: number;
    number_of_rooms: number;
    other_rooms: number[];
    unit_price: number;
    description: string;
    [key: string]: any; // Add other fields as needed
}

// Request type for create-building-unit endpoint
export interface CreateBuildingUnitRequest {
    project_id: number;
    name: string;
    type: number;
    quantity: number;
    number_of_rooms: number;
    other_rooms: number[];
    unit_price: number;
    description: string;
    [key: string]: any; // Allow additional fields if needed
}

// Response type for create-building-unit endpoint
export interface CreateBuildingUnitResponse {
    success: boolean;
    message: string;
    data?: FetchBuildingUnitsResponse; // Include the created building unit data
}

// Request type for update-building-unit endpoint
export interface UpdateBuildingUnitRequest {
    id: number;
    type: number;
    quantity: number;
    number_of_rooms: number;
    other_rooms: number[];
    unit_price: number;
    description: string;
    [key: string]: any; // Allow additional fields if needed
}

// Response type for update-building-unit endpoint
export interface UpdateBuildingUnitResponse {
    success: boolean;
    message: string;
    data?: FetchBuildingUnitsResponse; // Include the updated building unit data
}

// Request type for delete-building-unit endpoint
export interface DeleteBuildingUnitRequest {
    id: number;
}

// Response type for delete-building-unit endpoint
export interface DeleteBuildingUnitResponse {
    success: boolean;
    message: string;
}
