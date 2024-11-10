import type { DepartmentType, JobTitleType } from "./DepartmentType";

export type MemberProfileType = {
	full_name_en: string;
	full_name_am: string;
	job_title: JobTitleType;
	department: DepartmentType;
	phone_number: number | null;
};

export type MemberListType = {
	id: string;
	member_profile: MemberProfileType;
};
