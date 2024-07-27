import { createAppSlice } from "@/lib/createAppSlice";
import { CurrentUserType } from "@/types/user_module";
import type { PayloadAction } from "@reduxjs/toolkit";

interface IUserSlice {
	myProfile: CurrentUserType | null;
}

const initialState: IUserSlice = {
	myProfile: null,
};

export const userSlice = createAppSlice({
	name: "user_management",
	initialState,

	reducers: (create) => ({
		storeMyProfile: create.reducer(
			(state, action: PayloadAction<CurrentUserType>) => {
				state.myProfile = action.payload;
			}
		),
	}),

	selectors: {
		selectMyProfile: (user) => user.myProfile,
	},
});

export const { selectMyProfile } = userSlice.selectors;
export const { storeMyProfile } = userSlice.actions;
