import { BaseResponse } from "../common";

export interface Supplier {
  id: number;
  name: string;
  email: string;
  phone_number: string;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export type FetchSuppliersResponse = {
  data: Supplier[];
} & BaseResponse;
