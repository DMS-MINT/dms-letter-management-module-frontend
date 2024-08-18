import type { AddressType } from "./AddressType";

export type EnterpriseType = {
	id: string;
	name_en: string;
	name_am: string;
	address: AddressType;
	email?: string | null;
	phone_number?: number | null;
	postal_code?: number | null;
	logo?: string | null;
};
