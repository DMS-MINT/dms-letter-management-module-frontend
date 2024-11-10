export type DepartmentType = {
	id: string;
	department_name_en: string;
	department_name_am: string;
	abbreviation_en: string;
	abbreviation_am: string;
};

export type DepartmentAbbrType = {
	id: string;
	abbreviation_en: string;
	abbreviation_am: string;
	department_name_en: string;
	department_name_am: string;
	contact_phone: number;
	contact_email: string;
};

export type JobTitleType = {
	id: string;
	title_en: string;
	title_am: string;
};
