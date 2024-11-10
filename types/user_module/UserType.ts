import type { DepartmentType, JobTitleType } from "./DepartmentType";

export type UserType = {
	id: string;
	email: string;
	member_profile: {
		full_name_en: string;
		full_name_am: string;
		job_title: JobTitleType;
		department: DepartmentType;
		phone_number: number | null;
	};
};

export type CurrentUserType = {
	id: string;
	email: string;
	member_profile: {
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
		phone_number: number | null;
	};
	member_permissions: {
		is_admin: boolean;
		is_staff: boolean;
	};
	member_settings: {
		is_2fa_enabled: boolean;
		is_verified: boolean;
	};
	member_preferences: Record<string, unknown>;
};
