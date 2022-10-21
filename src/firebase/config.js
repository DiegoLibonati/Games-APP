// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCbd9PgnBYQffR0qzq_S_AbIIwKv5t58NY",
  authDomain: "games-app-5adae.firebaseapp.com",
  projectId: "games-app-5adae",
  storageBucket: "games-app-5adae.appspot.com",
  messagingSenderId: "886724506680",
  appId: "1:886724506680:web:d117646d682826089b62cd",
};

// Initialize Firebase
const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);
