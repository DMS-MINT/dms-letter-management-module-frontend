import type {
	DepartmentType,
	DepartmentAbbrType,
	JobTitleType,
} from "./DepartmentType";

export type UserType = {
	id: string;
	full_name_en: string;
	full_name_am: string;
	job_title: JobTitleType;
	department: DepartmentAbbrType;
};

export type CurrentUserType = {
	id: string;
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
	phone_number: number;
	email: string;
	is_2fa_enabled: boolean;
	is_staff: boolean;
};
