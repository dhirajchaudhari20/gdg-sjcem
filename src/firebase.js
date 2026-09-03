import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeFirestore, memoryLocalCache } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCohKlqNu0I1sXcLW4D_fv-OEw9x0S50q8",
    authDomain: "dc-infotechpvt-1-d1a4b.firebaseapp.com",
    databaseURL: "https://dc-infotechpvt-1-d1a4b-default-rtdb.firebaseio.com",
    projectId: "dc-infotechpvt-1-d1a4b",
    storageBucket: "dc-infotechpvt-1-d1a4b.firebasestorage.app",
    messagingSenderId: "622552457680",
    appId: "1:622552457680:web:4b80e21e14e2b8266f19d5",
    measurementId: "G-ZXPZGMNR44"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Services
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Initialize Firestore with explicit Memory Cache
const db = initializeFirestore(app, {
    localCache: memoryLocalCache()
});

// Initialize Realtime Database
import { getDatabase } from "firebase/database";
const database = getDatabase(app);

console.log("Firebase Services Initialized");

export { db, database };
export default app;
