import { createAppSlice } from "@/lib/createAppSlice";

export interface IUIManagerSliceState {
  isDrawerOpen: boolean;
}

const initialState: IUIManagerSliceState = {
  isDrawerOpen: false,
};

export const uiManagerSlice = createAppSlice({
  name: "ui",
  initialState,

  reducers: (create) => ({
    toggleDrawerVisibility: create.reducer((state, _) => {
      state.isDrawerOpen = !state.isDrawerOpen;
    }),
  }),
  selectors: {
    selectIsDrawerOpen: (ui) => ui.isDrawerOpen,
  },
});

export const { toggleDrawerVisibility } = uiManagerSlice.actions;
export const { selectIsDrawerOpen } = uiManagerSlice.selectors;
