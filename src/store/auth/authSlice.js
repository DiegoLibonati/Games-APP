import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  imagesLoginAndRegister: [],
  isLoading: false,
  isChecking: false,
  status: "checking",
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setImagesLoginAndRegister: (state, action) => {
      state.imagesLoginAndRegister = action.payload;
    },
    setLoadingToTrue: (state) => {
      state.isLoading = true;
    },
    setLoadingToFalse: (state) => {
      state.isLoading = false;
    },
    login: (state, action) => {
      state.status = "authenticated";
      state.uid = action.payload.uid;
      state.email = action.payload.email;
      state.displayName = action.payload.displayName;
      state.photoURL = action.payload.photoURL;
      state.errorMessage = action.payload.errorMessage;
      state.isChecking = false;
    },
    logout: (state, action) => {
      state.status = "not-authenticated";
      state.uid = null;
      state.email = null;
      state.displayName = null;
      state.photoURL = null;
      state.errorMessage = action.payload?.errorMessage;
      state.isChecking = false;
    },
    checkingCredentials: (state) => {
      state.status = "checking";
      state.isChecking = true;
    },
  },
});

export const {
  setImagesLoginAndRegister,
  setLoadingToTrue,
  setLoadingToFalse,
  login,
  logout,
  checkingCredentials,
} = authSlice.actions;

export default authSlice.reducer;
