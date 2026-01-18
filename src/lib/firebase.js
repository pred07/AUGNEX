import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAQ3SAwcbHuUkT6K1B1IzZ7Mp20u_DIBKc",
    authDomain: "augnex-8017e.firebaseapp.com",
    projectId: "augnex-8017e",
    storageBucket: "augnex-8017e.firebasestorage.app",
    messagingSenderId: "297906817052",
    appId: "1:297906817052:web:0a42fa1ed50b1f234037d9",
    measurementId: "G-D895QBX6ZQ"
};



const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
export { signInWithPopup };
