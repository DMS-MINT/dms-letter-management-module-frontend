import type { DepartmentType } from "./DepartmentType";

export type MemberType = {
	id: string;
	full_name: string;
	job_title: string;
	user_type: "member";
};

export type GuestType = {
	id: string;
	name: string;
	user_type: "guest";
};

export type CurrentUserType = {
	id: string;
	email: string;
	username: string;
	first_name: string;
	last_name: string;
	full_name: string;
	job_title: string;
	department: DepartmentType;
	phone_number: string;
	is_staff: boolean;
	is_2fa_enabled: boolean;
};
