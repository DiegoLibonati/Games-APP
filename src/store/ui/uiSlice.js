import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
