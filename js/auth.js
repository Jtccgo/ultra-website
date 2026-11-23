
        
// Import the functions you need from the SDKs you new
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
    messagingSenderId: "81801348384",
    appId: "1:818013483584:web:db130b8fb907c34e4d65a5",
    measurementId: "G-KXJBQPPCM8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app); 

const form = document.getElementById("auth-form");
const email = document.getElementById("username-email");
const password = document.getElementById("password");
const contin = document.getElementById("auth-continue");
const signUp = document.getElementById("switch").querySelector("a");
const userSwitch = document.getElementById("switch");
const vfCode = document.getElementById("vf-code");

let userTypeLogin = true;
let authUsePassword = true;

 form.addEventListener('submit', e => {
    e.preventDefault();
    if(userTypeLogin) {

    } else {
        if(password.classList.contains("hidden") || vfCode.classList.contains("hidden")) {
            if(email)
        }
    }
});
signUp.addEventListener("click", () => {
    userTypeLogin = !userTypeLogin;
    if(userTypeLogin) {
        userSwitch.innerHTML = `New user? <a href = "">Sign up<a>`;
        //change the html yada yada
    }
    else {
        userSwitch.innerHTML = `Already a user? <a href = "">Log In<a>`;
        //change the html yada yada
    }
    password.value = "";
    vfCode.value = "";
    email.value = "";
});
const validUsername = /^[a-zA-Z0-9_-@.]{8,20}$/;
function checkUsername(user) {
    return validUsername.test(user.trim());

}