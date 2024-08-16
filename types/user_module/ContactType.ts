// export type ContactType = {
// 	id: string;
// 	full_name_en: string;
// 	full_name_am: string;
// 	address: string;
// 	email?: string | null;
// 	phone_number?: string | null;
// };

export type ContactType = {
	id: string;
	full_name_en: string;
	full_name_am: string;
	email: string;
	phone_number: number;
	address: {
		city_en: string;
		city_am: string;
	};
};
export type NewContactType = {
	full_name_en: string;
	full_name_am: string;
	email: string;
	phone_number: number;
	address: {
		city_en: string;
		city_am: string;
	};
};

// Updated contact type with image file
export type ContactTypeWithImage = {
	id: string;
	fullName: string;
	fullNameAmharic: string;
	address: string;
	addressAmharic: string;
	phone: string;
	email: string;
	photo?: File | string | null; // File, string URL, or null
};
