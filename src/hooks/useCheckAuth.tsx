import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { FirebaseAuth } from "../firebase/config";
import { login, logout } from "../store/auth/exports";
import { UseCheckAuth } from "../entities/entities";
import { RootState, useAppDispatch } from "../store/store";

export const useCheckAuth = (): UseCheckAuth => {
  const { status } = useSelector((state: RootState) => state.auth);

  const dispatch = useAppDispatch();

  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, async (user) => {
      if (!user) return dispatch(logout());

      const { uid, email, displayName, photoURL } = user;

      dispatch(login({ uid, email, displayName, photoURL }));
    });
    // eslint-disable-next-line
  }, []);

  return {
    status,
  };
};
