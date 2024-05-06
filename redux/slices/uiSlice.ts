import { IUIState } from "@/typing";
import { createSlice } from "@reduxjs/toolkit";

const initialState: IUIState = {
  drawer: true,
  currentRoute: "",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleDrawer: (state) => {
      state.drawer = !state.drawer;
    },
    changeCurrentRoute: (state, action) => {
      state.currentRoute = action.payload;
    },
  },
});

export const { toggleDrawer, changeCurrentRoute } = uiSlice.actions;
export default uiSlice.reducer;
