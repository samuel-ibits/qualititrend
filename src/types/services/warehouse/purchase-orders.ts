import { BaseResponse } from "../common";

export interface PurchaseOrder {
  name: string;
  supplier_name: string;
  id: number;
  code: string;
  inventory_id: string;
  supplier_id: string;
  status: string;
  total_amount: string;
  created_by: string;
  updated_by: any;
  created_at: string;
  updated_at: string;
}

export type FetchPurchaseOrderResponse = {
  data: PurchaseOrder[];
} & BaseResponse;

export type CreatePurchaseOrderRequest = {
  inventory_id: string;
  supplier_id: string;
  items: {
    item_id: string;
    quantity: number;
  }[];
};

export type FetchWarehousePurchaseOrder = {
  data: {
    purchase_order_id: string;
    inventory: string;
    supplier: string;
    total_amount: string;
    status: string;
    date_requested: string;
    items: {
      name: string;
      category: string;
      quantity: number;
      cost: number;
    }[];
  };
} & BaseResponse;
