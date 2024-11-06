import { BaseResponse } from "../common"



export interface _MaterialTransfer {
  source: string
  destination: string
  id: string
  reference: string
  source_id: string
  destination_id: string
  total_amount: number
  status: string
  created_by: string
  updated_by: any
  created_at: string
  updated_at: string
}

export type MaterialTransfer = {
  source: string
  destination: string
  status: string
  pickup_date: string
  delivery_date: string
  items: Item[]
}

export interface Item {
  name: string
  category: string
  quantity: string
  cost: string
}

export type FetchMaterialTransfersResponse = {
  data: _MaterialTransfer[]
} & BaseResponse

export type FetchMaterialTransferDetailsResponse = {
  data: MaterialTransfer
} & BaseResponse

export type CreateMaterialTransferResponse = {
  data: _MaterialTransfer
} & BaseResponse
