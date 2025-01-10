import { BaseResponse } from "../common";

export type CreateItemRequest = {
  name: string;
  item_code: string;
  unit_of_measurement: string;

  status: number;
  item_type: number;

  quantity: number;
  cost: number;
};

export type CreateItemResponse = {
  data: CreateItemRequest;
} & BaseResponse;

export type FetchProductsRequest = {
  perPage?: number;
  /* type?: "ongoing" | "completed"; */
};

export interface Product {
  id: string;
  name: string;
  item_code: string;
  item_type: string;
  unit_of_measurement: string;
  cost: string;
  category_id: string;
  inventory_id: string;
  item_status: string;
  created_by: string;
  updated_by: any;
  created_at: string;
  updated_at: string;

  item_category: string;
  defualt_inventory: string;
}

export type FetchProductsResponse = {
  data: {
    data: Product[];
    pagination: Pagination;
  };
} & BaseResponse;

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

export type FetchWarehouseProductRequest = {
  id: string;
};

export type FetchWareHouseProductData = Omit<
  Product,
  | "id"
  | "category_id"
  | "inventory_id"
  | "created_by"
  | "updated_by"
  | "created_at"
  | "updated_at"
>;

export type FetchWarehouseProductResponse = {
  data: FetchWareHouseProductData;
} & BaseResponse;
