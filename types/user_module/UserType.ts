// import type { DepartmentType } from "./DepartmentType";

export type UserType = {
	id: string;
	full_name: string;
	job_title: string;
};

// export type CurrentUserType = {
// 	id: string;
// 	email: string;
// 	first_name: string;
// 	last_name: string;
// 	full_name: string;
// 	job_title: string;
// 	department: DepartmentType;
// 	phone_number: string;
// 	is_staff: boolean;
// 	is_2fa_enabled: boolean;
// };

export type DepartmentType = {
	id: string;
	department_name_en: string;
	department_name_am: string;
	abbreviation_en: string;
	abbreviation_am: string;
	description: string;
	contact_phone: string | null;
	contact_email: string;
};

export type JobTitleType = {
	id: string;
	title_en: string;
	title_am: string;
};

export type CurrentUserType = {
	id: string;
	email: string;
	first_name_en: string;
	middle_name_en: string;
	last_name_en: string;
	first_name_am: string;
	middle_name_am: string;
	last_name_am: string;
	full_name_en: string;
	full_name_am: string;
	job_title: JobTitleType;
	department: DepartmentType;
	phone_number: string; // Changed to string to handle phone number formats consistently
	is_staff: boolean;
	is_2fa_enabled: boolean;
};
