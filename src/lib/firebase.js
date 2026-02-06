import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCzV8c3txAD7fEj4xEgyw4yZgqn1o-iF28",
    authDomain: "hacktheplanet-25eb1.firebaseapp.com",
    projectId: "hacktheplanet-25eb1",
    storageBucket: "hacktheplanet-25eb1.firebasestorage.app",
    messagingSenderId: "272938315726",
    appId: "1:272938315726:web:03dd14b2a7686d2c6bc59f"
};

// Force rebuild - localStorage migration



const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
export { signInWithPopup, signInWithRedirect };
