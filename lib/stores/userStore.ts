import type { CurrentUserType } from "@/types/user_module";
import { create } from "zustand";

export type UserStoreType = {
	currentUser: CurrentUserType;
};

export type UserActions = {
	setCurrentUser: (_data: CurrentUserType) => void;
	clear: () => void; // New action to reset the current user
};

const initialState: CurrentUserType = {
	id: "",
	email: "",
	user_profile: {
		first_name_en: "",
		middle_name_en: "",
		last_name_en: "",
		first_name_am: "",
		middle_name_am: "",
		last_name_am: "",
		full_name_en: "",
		full_name_am: "",
		job_title: {
			id: "",
			title_en: "",
			title_am: "",
		},
		department: {
			id: "",
			department_name_en: "",
			department_name_am: "",
			abbreviation_en: "",
			abbreviation_am: "",
		},
		phone_number: null,
	},
	users_permissions: {
		is_admin: false,
		is_staff: false,
	},
	user_settings: {
		is_2fa_enabled: false,
		is_verified: false,
	},
	user_preferences: {
		use_email: true,
		use_sms: true,
	},
};

export const useUserStore = create<UserStoreType & UserActions>()((set) => ({
	currentUser: initialState,

	setCurrentUser: (data) => set({ currentUser: data }),

	// Reset currentUser to the initial state
	clear: () => set({ currentUser: initialState }),
}));
