import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import gamesSlice from "./games/gamesSlice";
import uiSlice from "./ui/uiSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    ui: uiSlice,
    games: gamesSlice,
  },
});
