import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { FirebaseAuth } from "./config";
import { FormDataAuth, LoginWithEmailPassword, RegisterUserWithEmail, SignInWithGoogle } from "../entities/entities";

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async (): Promise<SignInWithGoogle> => {
  try {
    const result = await signInWithPopup(FirebaseAuth, googleProvider);

    const { displayName, email, photoURL, uid } = result.user;

    return {
      ok: true,
      displayName,
      email,
      photoURL,
      uid,
    };
  } catch (error) {
    let errorMessage: string;

    if (error instanceof Error) {
      errorMessage = error.message;
    } else {
      errorMessage = String(error);
    }

    return {
      ok: false,
      displayName: null,
      email: null,
      photoURL: null,
      uid: null,
      errorMessage,
    };
  }
};

export const registerUserWithEmail = async ({ email, password, username }: FormDataAuth): Promise<RegisterUserWithEmail> => {
  try {
    const result = await createUserWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    );

    await updateProfile(FirebaseAuth.currentUser!, { displayName: username });

    const { uid, photoURL } = result.user;

    return {
      ok: true,
      displayName: username!,
      email,
      photoURL,
      uid,
    };
  } catch (error) {
    let errorMessage: string;

    if (error instanceof Error) {
      errorMessage = error.message;
    } else {
      errorMessage = String(error);
    }

    return {
      ok: false,
      displayName: null,
      email: null,
      photoURL: null,
      uid: null,
      errorMessage,
    };
  }
};

export const loginWithEmailPassword = async ({ email, password }: FormDataAuth): Promise<LoginWithEmailPassword> => {
  try {
    const result = await signInWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    );
    const { uid, photoURL, displayName } = result.user;
    return {
      ok: true,
      displayName,
      email,
      photoURL,
      uid,
    };
  } catch (error) {
    let errorMessage: string;

    if (error instanceof Error) {
      errorMessage = error.message;
    } else {
      errorMessage = String(error);
    }

    return {
      ok: false,
      displayName: null,
      email: null,
      photoURL: null,
      uid: null,
      errorMessage,
    };
  }
};

export const logoutFirebase = async (): Promise<void> => {
  return await FirebaseAuth.signOut();
};
