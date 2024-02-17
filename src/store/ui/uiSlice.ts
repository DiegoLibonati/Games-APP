import { createSlice } from "@reduxjs/toolkit";
import { UIState } from "../../entities/entities";

const initialState: UIState = {
  isNavbarOpen: false,
  isCategoryFilterOpen: false,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    manageNavbar: (state) => {
      state.isNavbarOpen = !state.isNavbarOpen;
    },
    manageCategoryFilter: (state) => {
      state.isCategoryFilterOpen = !state.isCategoryFilterOpen;
    },
  },
});

export const { manageNavbar, manageCategoryFilter } = uiSlice.actions;

export default uiSlice.reducer;
