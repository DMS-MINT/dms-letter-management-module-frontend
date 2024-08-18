import type { AddressType } from "./AddressType";

export type ContactType = {
	id: string;
	full_name_en: string;
	full_name_am: string;
	address: AddressType;
	email: string | null;
	phone_number: number | null;
};

export type NewContactType = {
	full_name_en: string;
	full_name_am: string;
	email?: string | null;
	phone_number?: number | null;
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
