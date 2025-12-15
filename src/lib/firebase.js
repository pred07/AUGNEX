import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyA7Z8xuoghIyliE6tobbmOPtf4YeHFhcaE",
    authDomain: "project11-fddd7.firebaseapp.com",
    projectId: "project11-fddd7",
    storageBucket: "project11-fddd7.firebasestorage.app",
    messagingSenderId: "92957184996",
    appId: "1:92957184996:web:49367a9cc086cc73692df1"
};

console.log("Initializing Firebase with config:", firebaseConfig);

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export { signInWithPopup };
