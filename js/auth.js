import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassowrd, signOut, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/13.4.0/firebase-auth.js";

        
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/13.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/13.4.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassowrd, signOut, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/13.4.0/firebase-auth.js";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD2uaUmbo7nejLUwztX2fmRvMvkVCkIihc",
    authDomain: "ultra-website-84a1b.firebaseapp.com",
    projectId: "ultra-website-84a1b",
    storageBucket: "ultra-website-84a1b.firebasestorage.app",
    messagingSenderId: "818013483 84",
    appId: "1:818013483584:web:db130b8fb907c34e4d65a5",
    measurementId: "G-KXJBQPPCM8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
