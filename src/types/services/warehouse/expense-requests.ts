import { BaseResponse } from "../common";

export type ExpenseRequest = {
  category_name: string;
  id: number;
  reference: string;
  description: string;
  amount: string;
  category_id: string;
  project_id: string;
  created_by: string;
  updated_by: any;
  created_at: string;
  updated_at: string;
};

export interface FullExpenseResponse {
  expense_request: ExpenseRequest;
  project: Project2;
  category: Category2;
  created_by: CreatedBy;
}

export interface FullExpenseRequest {
  id: number;
  reference: string;
  description: string;
  amount: string;
  category_id: string;
  project_id: string;
  created_by: string;
  updated_by: any;
  created_at: string;
  updated_at: string;
  project: Project;
  category: Category;
  owner_by: OwnerBy;
}

export interface Project {
  id: number;
  project_code: string;
  summary: string;
  balance: string;
  type: string;
  current_budget_id: string;
  manager_id: string;
  supervisor_id: string;
  inventory_id: string;
  created_by: string;
  status: string;
  status_description: string;
  initiation_date: string;
  completion_date: string;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: number;
  name: string;
  description: string;
  color_id: any;
  created_by: string;
  updated_by: string;
  created_at: string;
  updated_at: string;
  type: string;
}

export interface OwnerBy {
  id: number;
  staff_code: string;
  first_name: string;
  last_name: string;
  other_names: any;
  address: string;
  email: string;
  email_verified_at: any;
  title: string;
  status: string;
  created_at: string;
  updated_at: string;
  role: any;
  current_employment_duration_id: any;
  bank_account_id: any;
  profile_picture_id: any;
  created_by: any;
  role_id: string;
  phone: string;
}

export interface Project2 {
  id: number;
  project_code: string;
  summary: string;
  balance: string;
  type: string;
  current_budget_id: string;
  manager_id: string;
  supervisor_id: string;
  inventory_id: string;
  created_by: string;
  status: string;
  status_description: string;
  initiation_date: string;
  completion_date: string;
  created_at: string;
  updated_at: string;
}

export interface Category2 {
  id: number;
  name: string;
  description: string;
  color_id: any;
  created_by: string;
  updated_by: string;
  created_at: string;
  updated_at: string;
  type: string;
}

export interface CreatedBy {
  id: number;
  staff_code: string;
  first_name: string;
  last_name: string;
  other_names: any;
  address: string;
  email: string;
  email_verified_at: any;
  title: string;
  status: string;
  created_at: string;
  updated_at: string;
  role: any;
  current_employment_duration_id: any;
  bank_account_id: any;
  profile_picture_id: any;
  created_by: any;
  role_id: string;
  phone: string;
}

export interface Item {
  name: string;
  category: string;
  quantity: string;
  cost: string;
}

export type CreateExpenseRequest = {
  category_id: string | number;
  description: string;
  amount: number;
  project_id: string;
};

export type FetchExpenseRequestResponse = {
  data: ExpenseRequest[];
} & BaseResponse;

export type FetchExpenseRequestDetailResponse = {
  data: FullExpenseResponse;
} & BaseResponse;

export type CreateExpenseRequestResponse = {
  data: FullExpenseResponse;
} & BaseResponse;
