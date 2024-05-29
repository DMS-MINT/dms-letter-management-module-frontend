import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserOptions, UserApiInputSerializer } from "@/typing";
import axios from "axios";

interface InputSerializer {
  userOptions: IUserOptions[];
}

const initialState: InputSerializer = {} as InputSerializer;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserOptions: (state, action: PayloadAction<IUserOptions[]>) => {
      state.userOptions = action.payload;
    },
  },
});

export const { setUserOptions } = userSlice.actions;
export default userSlice.reducer;
