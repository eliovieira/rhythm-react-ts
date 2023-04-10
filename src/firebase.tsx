// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBKlHgQeDNl_9yocin-tLp8w5EJ-eN64qY",
  authDomain: "react-ts-auth-b00cc.firebaseapp.com",
  projectId: "react-ts-auth-b00cc",
  storageBucket: "react-ts-auth-b00cc.appspot.com",
  messagingSenderId: "277096440433",
  appId: "1:277096440433:web:74e2cfc68401ef920eb1d0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
