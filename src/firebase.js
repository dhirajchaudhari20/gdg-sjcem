// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAyYRukMtQs2geKV189S2lU33VO0n4Y_tU",
    authDomain: "gdg-codelab-6bcdd.firebaseapp.com",
    projectId: "gdg-codelab-6bcdd",
    storageBucket: "gdg-codelab-6bcdd.firebasestorage.app",
    messagingSenderId: "434460704918",
    appId: "1:434460704918:web:7aec0e5378985a51d402b7",
    measurementId: "G-YFTB7ZDKRV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Services
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);

export default app;
