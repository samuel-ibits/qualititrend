// @ts-nocheck

export type CreateProjectRequest = {
  summary: string;
  type: string;
  manager_id: string;
  supervisor_id: string;
  budget: {
    amount: string;
    description: string;
  };
  initiation_date: string;
  completion_date: string;
  product: {
    name?: string;
    description?: string;
    type_id?: string;
    plot_number?: string;
    plot_address?: string;
    units?: {
      name: string;
      number_of_unit: string;
      description: string;
      number_of_rooms: string;
      type_id: string;
      purpose_id: string;
    }[];
  };
};

export type CreateProjectsResponse = {
  success: boolean;
  code: number;
  errors: string;
  message: string;
  data: {};
};

export interface Project {
  id: number;
  project_code: string;
  summary: string;
  balance: string;
  type: string;
  status: string;
  current_budget: CurrentBudget;
  manager: User;
  supervisor: User;
  inventory: Inventory;
  created_by: User;
  initiation_date: string;
  completion_date: string;
  created_at: string;
  updated_at: string;
  status_description: string;

  invoice_value: number;
  total_expenses: number;
  attributes: Attributes;
  units: Unit[];
}

export interface Attributes {
  plot_number: string;
  plot_address: string;
  building_purpose_id: string;
}

export interface Unit {
  id: number;
  unit_name: string;
  number_of_units: string;
  unit_description: string;
  number_of_rooms: string;
  unit_type_id: string;
  other_rooms: string;
  project_id: string;
  created_at: string;
  updated_at: string;
}

/* export interface Status { */
/*   id: number */
/*   name: string */
/*   description: string */
/*   color: any */
/* } */

export interface CurrentBudget {
  id: number;
  amount: string;
  description: string;
}

export interface User {
  id: number;
  first_name: string;
  last_name: string;
}

export interface Inventory {
  id: number;
  is_main: string;
  total_price: string;
}

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

export interface FetchProjectDetailsRequest {
  id: string;
}

export interface FetchProjectDetailsResponse {
  success: boolean;
  code: number;
  data: Project;
  message: string;
  errors: any;
}

export type FetchProjectsRequest = {
  perPage?: number;
  type?: "ongoing" | "completed";
};

export interface FetchProjectsResponse {
  success: boolean;
  code: number;
  data: {
    data: Project[];
    pagination: Pagination;
  };
  message: string;
  errors: any;
}

export interface FetchProjectsStatsResponse {
  success: boolean;
  code: number;
  data: FetchProjectStatsResponseData;
  message: string;
  errors: any;
}

export interface FetchProjectStatsResponseData {
  total_budget: number;
  total_project: number;
  total_income: number;
  total_expenses: number;
  ongoing_projects: number;
  completed_projects: number;
}

export interface FetchProjectsResponse {
  success: boolean;
  message: string;
  data: {
    projects: Array<{
      id: string;
      summary: string;
      manager_id: string;
      supervisor_id: string;
      budget: string;
      initiation_date: string;
      completion_date: string;
      building_purpose: string;
      plot_address: string;
      plot_number: string;
      lot: string;
      type: string;
    }>;
    total: number;
    page: number;
    per_page: number;
  };
}

export interface FetchProjectDetailsRequest {
  id: string;
}

export interface FetchProjectDetailsResponse {
  success: boolean;
  message: string;
  data?: {
    id: string;
    summary: string;
    manager_id: string;
    supervisor_id: string;
    budget: string;
    initiation_date: string;
    completion_date: string;
    building_purpose: string;
    plot_address: string;
    plot_number: string;
    lot: string;
    type: string;
  };
}

export interface UpdateProjectRequest {
  id: string;
  summary: string;
  manager_id: string;
  supervisor_id: string;
  budget: string;
  initiation_date: string;
  completion_date: string;
}

export interface UpdateProjectResponse {
  success: boolean;
  message: string;
  data?: {
    id: string;
    summary: string;
    manager_id: string;
    supervisor_id: string;
    budget: string;
    initiation_date: string;
    completion_date: string;
  };
}

export interface UpdateProjectAttributeRequest {
  id: string;
  building_purpose: string;
  plot_address: string;
  plot_number: string;
  lot: string;
  type: string;
}

export interface UpdateProjectAttributeResponse {
  success: boolean;
  message: string;
  data?: {
    id: string;
    building_purpose: string;
    plot_address: string;
    plot_number: string;
    lot: string;
    type: string;
  };
}

export interface FetchProjectTypesResponse {
  success: boolean;
  message: string;
  data: Array<{
    id: string;
    name: string;
  }>;
}
