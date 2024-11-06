export interface BaseResponse {
  success: boolean
  code: number
  message: string
  errors: any
}

export interface Pagination {
  total: number
  total_pages: number
  perPage: number
  page: number
  current_page_total: number
  from: number
  to: number
  count: number
}



