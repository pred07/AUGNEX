import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD9s0nZqKk1eia-tpjnVqKi1M6Jj6mrkQE",
    authDomain: "nytvnt.firebaseapp.com",
    projectId: "nytvnt",
    storageBucket: "nytvnt.firebasestorage.app",
    messagingSenderId: "740646755042",
    appId: "1:740646755042:web:7694c6a5b578044a091cbb"
};

// Force rebuild - localStorage migration



const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
export { signInWithPopup };
