import {
  Status,
  User,
  UserLogin,
  UserLoginWithoutUsername,
} from "../entities/entities";

import {
  startCreatingUserWithEmail,
  startGettingImagesToLoginAndRegisterPage,
  startGoogleSignIn,
  startLoginWithEmailPassword,
  startLogOutWithButton,
} from "../store/auth/thunks";
import { login } from "../store/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../constants/redux";

type UseAuthStore = {
  images: string[];
  isLoadingImages: boolean;
  isChecking: boolean;
  status: Status;
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  errorMessage: string;
  handleLogOut: () => void;
  handleLogin: (user: User) => void;
  handleLoginWithEmailAndPassword: (user: UserLoginWithoutUsername) => void;
  handleLoginWithGoogle: () => void;
  handleCreateNewUserWithEmailAndPassword: (user: UserLogin) => void;
  handleGetImages: () => void;
};

export const useAuthStore = (): UseAuthStore => {
  const { user, auth, images } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleLogOut = (): void => {
    dispatch(startLogOutWithButton());
  };

  const handleLogin = (user: User): void => {
    dispatch(login(user));
  };

  const handleLoginWithEmailAndPassword = (
    user: UserLoginWithoutUsername
  ): void => {
    dispatch(startLoginWithEmailPassword(user));
  };

  const handleLoginWithGoogle = (): void => {
    dispatch(startGoogleSignIn());
  };

  const handleCreateNewUserWithEmailAndPassword = (user: UserLogin): void => {
    dispatch(startCreatingUserWithEmail(user));
  };

  const handleGetImages = () => {
    dispatch(startGettingImagesToLoginAndRegisterPage());
  };

  return {
    images: images.images,
    isLoadingImages: images.isLoadingImages,
    isChecking: auth.isChecking,
    status: auth.status,
    errorMessage: auth.errorMessage,
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    handleLogOut: handleLogOut,
    handleLogin: handleLogin,
    handleLoginWithEmailAndPassword: handleLoginWithEmailAndPassword,
    handleLoginWithGoogle: handleLoginWithGoogle,
    handleCreateNewUserWithEmailAndPassword:
      handleCreateNewUserWithEmailAndPassword,
    handleGetImages: handleGetImages,
  };
};
