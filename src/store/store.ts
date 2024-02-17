import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import gamesSlice from "./games/gamesSlice";
import uiSlice from "./ui/uiSlice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    ui: uiSlice,
    games: gamesSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
