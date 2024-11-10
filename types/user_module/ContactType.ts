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
