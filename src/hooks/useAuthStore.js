import { useDispatch, useSelector } from "react-redux";
import {
  startCreatingUserWithEmail,
  startGoogleSignIn,
  startLoginWithEmailPassword,
  startLogOutWithButton,
} from "../store/auth/exports";

export const useAuthStore = () => {
  const dispatch = useDispatch();

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
  } = useSelector((state) => state.auth);

  const handleLogOut = () => {
    dispatch(startLogOutWithButton());
  };

  const handleLoginWithEmailAndPassword = ({ email, password }) => {
    dispatch(startLoginWithEmailPassword({ email, password }));
  };

  const handleLoginWithGoogle = () => {
    dispatch(startGoogleSignIn());
  };

  const handleCreateNewUserWithEmailAndPassword = (formState) => {
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
