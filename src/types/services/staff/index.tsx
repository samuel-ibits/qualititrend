import { Pagination } from "@/types/global/pagination";

export type Staff = {
	date_joined: string;
	id: number;
	permission_level: string;
	phone: string;
	staff_code: string;
	staff_name: string;
	staff_position: string;
	staff_type: string;
};

export type GetStaffRequest = {
	perPage?: number;
};

export type GetStaffResponse = {
	success: boolean;
	code: number;
	errors: string;
	message: string;
	data: {
		data: Staff[];
		pagination: Pagination;
	};
};
