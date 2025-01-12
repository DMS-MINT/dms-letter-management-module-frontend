import type { DepartmentAbbrType, JobTitleType } from "./DepartmentType";

export type CurrentUserType = {
	id: string;
	email: string;
	user_profile: UserProfile;
	users_permissions: UserPermissions;
	user_settings: UserSettings;
	user_preferences: UserPreference;
};

export type UserType = {
	id: string;
	user_profile: UserProfile;
};

export type UserSettings = {
	is_2fa_enabled: boolean;
	is_verified: boolean;
};

export type userDetailType = {
	id: string;
	email: string;
	user_profile: UserProfile;
	users_permissions: UserPermissions;
	user_settings: UserSettings;
};

export type UserProfile = {
	first_name_en: string;
	middle_name_en: string;
	last_name_en: string;
	first_name_am: string;
	middle_name_am: string;
	last_name_am: string;
	full_name_en: string;
	full_name_am: string;
	job_title: JobTitleType;
	department: DepartmentAbbrType;
	phone_number: number | null;
};

export type UserPermissions = {
	is_admin: boolean;
	is_staff: boolean;
};

export type UserPreference = {
	use_email: boolean;
	use_sms: boolean;
};
