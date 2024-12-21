import type {
	DepartmentType,
	DepartmentAbbrType,
	JobTitleType,
} from "./DepartmentType";

// export type UserType = {
// 	id: string;
// 	full_name_en: string;
// 	full_name_am: string;
// 	job_title: JobTitleType;
// 	department: DepartmentAbbrType;
// };

export type CurrentUserType = {
	id: string;
	email: string;
	user_profile: {
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
	users_permissions: users_permissions;
	user_settings: user_settings;
	user_preferences: user_preference;
};

export type UserType = {
	id: string;
	email: string;
	user_profile: user_profile;
	users_permissions: users_permissions;
};
export type user_settings = {
	is_2fa_enabled: boolean;
	is_verified: boolean;
};
export type userDetailType = {
	id: string;
	email: string;
	user_profile: user_profile;
	users_permissions: users_permissions;
	user_settings: user_settings;
};
export type user_profile = {
	full_name_en: string;
	full_name_am: string;
	phone_number: string;
	job_title: JobTitleType;
	department: DepartmentAbbrType;
};

export type users_permissions = {
	is_admin: boolean;
	is_staff: boolean;
};
export type user_preference = {
	use_email: boolean;
	use_sms: boolean;
};
