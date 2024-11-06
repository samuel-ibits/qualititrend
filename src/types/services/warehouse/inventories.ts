
import { BaseResponse } from "../common"

export interface Inventory {
  id: number
  name: string
  created_by: string
  created_at: string
  updated_at: string
}

export type FetchInventoriesResponse = {
  data: {
    invetories : Inventory[],
  }
} & BaseResponse


