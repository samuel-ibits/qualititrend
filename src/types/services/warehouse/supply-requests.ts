import { BaseResponse } from "../common"

export type SupplyRequest = {
  project_id: number
  created_by: number
  updated_at: string
  created_at: string
  id: number
  reference: string
  total_amount: number
  status: string
}

export interface FullSupplyRequest {
  requester: string
  project_code: string
  id: number
  reference: string
  project_id: string
  status: string
  total_amount: string
  created_by: string
  updated_by: any
  created_at: string
  updated_at: string
}



export type CreateSupplyRequest = {
  project_id: string | number;
  items: {
    item_id: number,
    quantity: number,
  }[]
}

export type FetchSupplyRequestResponse = {
  data: FullSupplyRequest[]
} & BaseResponse

export interface SupplyRequestItem {
  id: number
  supply_request_id: string
  item_id: string
  quantity: string
  cost: string
  created_at: string
  updated_at: string
  category: string
  item_name: string
}

export type FetchSupplyRequestDetailResponse = {
  data: {
    supply_request: FullSupplyRequest,
    items: SupplyRequestItem[]
  }
} & BaseResponse;

export type CreateSupplyRequestResponse = {
  data: SupplyRequest
} & BaseResponse
