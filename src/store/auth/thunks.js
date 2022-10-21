import {
  loginWithEmailPassword,
  logoutFirebase,
  registerUserWithEmail,
  signInWithGoogle,
} from "../../firebase/providers";
import { resetAll } from "../games/exports";
import {
  setImagesLoginAndRegister,
  setLoadingToTrue,
  setLoadingToFalse,
  checkingCredentials,
  logout,
  login,
} from "./exports";
import gamesApi from "../../api/gamesApi";

export const startGettingImagesToLoginAndRegisterPage = () => {
  return async (dispatch) => {
    try {
      dispatch(setLoadingToTrue());
      const images = [];

      const response = await gamesApi.get("/games", {
        method: "GET",
        params: { id: "452" },
        headers: {
          "X-RapidAPI-Key":
            "a878486f85msh13fab38caf89f92p13147cjsnc85e42c2a55c",
          "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
        },
      });

      const data = await response.data;

      const dataSlice = data.slice(0, 3);

      dataSlice.map((item) => images.push(item.thumbnail));

      dispatch(setImagesLoginAndRegister(images));
      dispatch(setLoadingToFalse());
    } catch (error) {
      console.error(error);
    }
  };
};

export const startGoogleSignIn = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    const result = await signInWithGoogle();

    if (!result.ok) {
      dispatch(resetAll());
      return dispatch(logout(result));
    }

    dispatch(login(result));
  };
};

export const startCreatingUserWithEmail = ({ email, password, username }) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
    // TODO: DisplayName -> Tendria que ser un objeto..

    const result = await registerUserWithEmail({
      email,
      password,
      username,
    });

    if (!result.ok) {
      dispatch(resetAll());
      return dispatch(logout(result));
    }

    dispatch(login(result));
  };
};

export const startLoginWithEmailPassword = ({ email, password }) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    const result = await loginWithEmailPassword({ email, password });
    if (!result.ok) {
      dispatch(resetAll());
      return dispatch(logout(result));
    }

    dispatch(login(result));
  };
};

export const startLogOutWithButton = () => {
  return async (dispatch) => {
    const result = await logoutFirebase();

    dispatch(resetAll());
    return dispatch(logout(result));
  };
};
