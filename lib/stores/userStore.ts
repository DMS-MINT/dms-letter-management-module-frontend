import type { CurrentUserType } from "@/types/user_module";
import { create } from "zustand";

export type UserStoreType = {
	currentUser: CurrentUserType;
};

export type UserActions = {
	setCurrentUser: (_data: CurrentUserType) => void;
};

export const useUserStore = create<UserStoreType & UserActions>()((set) => ({
	currentUser: {
		id: "",
		email: "",
		username: "",
		first_name: "",
		last_name: "",
		full_name: "",
		job_title: "",
		department: {
			name_en: "",
			name_am: "",
			abbreviation_en: "",
			abbreviation_am: "",
			description: "",
			contact_phone: "",
			contact_email: "",
		},
		phone_number: "",
		is_staff: false,
		is_2fa_enabled: false,
	},
	setCurrentUser: (data) => set({ currentUser: data }),
}));
