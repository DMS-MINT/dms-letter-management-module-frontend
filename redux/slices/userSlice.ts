import { userOptions } from "@/data";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserOptions, IMe } from "@/typing/interface/IUser";

interface InputSerializer {
  me: IMe;
  userOptions: IUserOptions;
}

const initialState: InputSerializer = {} as InputSerializer;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setMe: (state, action: PayloadAction<IMe>) => {
      state.me = action;
    },
    setUserOptions: (state, action: PayloadAction<IUserOptions[]>) => {
      state.userOptions = action.payload;
    },
  },
});

export const { setMe, setUserOptions } = userSlice.actions;
export default userSlice.reducer;
