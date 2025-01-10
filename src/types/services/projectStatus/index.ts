export interface ProjectStatus {
  id: number;
  name: string;
  description: string;
  type: string;
  percentage: string;
  created_by: string;
  updated_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateProjectStatusRequest {
  name: string;
  description: string;
  type: string;
  percentage: string;
}

export interface CreateProjectStatusResponse {
  data: ProjectStatus;
}

export interface FetchProjectStatussRequest {
  type?: string; // Optional filter parameter
}

export interface FetchProjectStatussResponse {
  data: ProjectStatus[];
}

export interface UpdateProjectStatusRequest {
  id: number;
  name?: string;
  description?: string;
  type?: string;
  percentage?: string;
}

export interface UpdateProjectStatusResponse {
  data: ProjectStatus;
}

export interface DeleteProjectStatusRequest {
  id: number;
}

export interface DeleteProjectStatusResponse {
  message: string;
}
