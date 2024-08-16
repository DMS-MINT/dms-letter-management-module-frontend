import type { DepartmentType } from "./DepartmentType";

export type UserType = {
	id: string;
	full_name: string;
	job_title: string;
};

export type CurrentUserType = {
	id: string;
	email: string;
	first_name: string;
	last_name: string;
	full_name: string;
	job_title: string;
	department: DepartmentType;
	phone_number: string;
	is_staff: boolean;
	is_2fa_enabled: boolean;
};
