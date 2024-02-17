import { useSelector } from "react-redux";
import {
  startCreatingUserWithEmail,
  startGoogleSignIn,
  startLoginWithEmailPassword,
  startLogOutWithButton,
} from "../store/auth/exports";
import { RootState, useAppDispatch } from "../store/store";
import { FormDataAuth, UseAuthStore } from "../entities/entities";

export const useAuthStore = (): UseAuthStore => {
  const dispatch = useAppDispatch();

  const {
    imagesLoginAndRegister,
    isLoading,
    isChecking,
    status,
    uid,
    email,
    displayName,
    photoURL,
    errorMessage,
  } = useSelector((state: RootState) => state.auth);

  const handleLogOut = (): void => {
    dispatch(startLogOutWithButton());
  };

  const handleLoginWithEmailAndPassword = ({
    email,
    password,
  }: FormDataAuth): void => {
    dispatch(startLoginWithEmailPassword({ email, password }));
  };

  const handleLoginWithGoogle = (): void => {
    dispatch(startGoogleSignIn());
  };

  const handleCreateNewUserWithEmailAndPassword = (
    formState: Required<FormDataAuth>
  ): void => {
    dispatch(startCreatingUserWithEmail(formState));
  };

  return {
    imagesLoginAndRegister,
    isLoading,
    isChecking,
    status,
    uid,
    email,
    displayName,
    photoURL,
    errorMessage,
    handleLogOut,
    handleLoginWithEmailAndPassword,
    handleLoginWithGoogle,
    handleCreateNewUserWithEmailAndPassword,
  };
};
