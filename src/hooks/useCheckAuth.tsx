import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";

import { Status } from "../entities/entities";

import { useAuthStore } from "./useAuthStore";
import { FirebaseAuth } from "../firebase/config";

type UseCheckAuth = {
  status: Status;
};

export const useCheckAuth = (): UseCheckAuth => {
  const { status, handleLogOut, handleLogin } = useAuthStore();

  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, async (user) => {
      if (!user) return handleLogOut();

      handleLogin({
        displayName: user.displayName!,
        email: user.email!,
        photoURL: user.photoURL!,
        uid: user.uid!,
      });
    });
    // eslint-disable-next-line
  }, []);

  return {
    status: status,
  };
};
