
        
// // Import the functions you need from the SDKs you new
// import { initializeApp } from "https://www.gstatic.com/firebasejs/13.4.0/firebase-app.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/13.4.0/firebase-analytics.js";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries
// import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, GithubAuthProvider, GoogleAuthProvider} from "https://www.gstatic.com/firebasejs/13.4.0/firebase-auth.js";
// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//     apiKey: "AIzaSyD2uaUmbo7nejLUwztX2fmRvMvkVCkIihc",
//     authDomain: "ultra-website-84a1b.firebaseapp.com",
//     projectId: "ultra-website-84a1b",
//     storageBucket: "ultra-website-84a1b.firebasestorage.app",
//     messagingSenderId: "81801348384",
//     appId: "1:818013483584:web:db130b8fb907c34e4d65a5",
//     measurementId: "G-KXJBQPPCM8"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// export const auth = getAuth(app); 

// const glgPrv = new GoogleAuthProvider();
// const gitPrv = new GithubAuthProvider();

// const form = document.getElementById("auth-form");
// const email = document.getElementById("username-email");
// const password = document.getElementById("password");
// const contin = document.getElementById("auth-continue");
// const signUp = document.getElementById("switch").querySelector("a");
// const userSwitch = document.getElementById("switch");
// const vfCode = document.getElementById("vf-code");
// const errorTxt = document.getElementById("err-txt");
// const passwordContainer = document.getElementById("password-container");
// const vfContainer = document.getElementById("vf-code-container");


// let userTypeLogin = true;
// let authUsePassword = true;

// form.addEventListener('submit', async (e) => {
//     e.preventDefault();
//     if(userTypeLogin) {
//         //if alt method works just go
//         if(checkUsername(email.value) && (checkPassword(password.value) || checkValue(vfCode.value))) {
//             try{
//                 await signInWithEmailAndPassword(auth, email.value.trim(), password.value);
//                 goHome();
//                 //check with firebase
//                 //and if succesfull redirect user to home
//             } catch(error) {
//                 console.log("Login unsuccesful: ",error.message);
//                 errorTxt.textContent = error.message;
//             }
//         }
//     } else {
//         if(password.classList.contains("hidden") /*|| vfCode.classList.contains("hidden")*/) {
//             if(checkUsername(email.value)) {
//                 if(errorTxt.textContent != "") {
//                     errorTxt.textContent = "";
//                 }
//                 passwordContainer.classList.remove("hidden");
//             } else {
//                 errorTxt.textContent = "Please re-enter your username";
//             }
//         } else {
//             if(checkUsername(email.value)) {
//                 if(checkPassword(password.value) /*|| checkValue(vfCode.value)*/) {
//                     //create new profile and have global.js have it appear over the top right corner
//                     try {
//                         await createUserWithEmailAndPassword(auth, email.value.trim(), password.value);
//                         goHome();
//                     } catch(error) {
//                         console.log("Sign up unsuccessful: ", error.message);
//                         errorTxt.textContent = error.message;
//                     }
//                 }
//             } else {
//                 passwordContainer.classList.add("hidden");
//                 vfCode.classList.add("hidden");
//             }
//         }
//     }
// });

// signUp.addEventListener("click", (e) => {
//     e.preventDefault();
//     userTypeLogin = !userTypeLogin;
//     if(userTypeLogin) {
//         userSwitch.innerHTML = `New user? <a href = "">Sign up<a>`;
//         //change the html yada yada
//     }
//     else {
//         userSwitch.innerHTML = `Already a user? <a href = "">Log In<a>`;//have to do e.preventdaulft for the whole thing
//         //change the html yada yada
//     }
//     password.value = "";
//     vfCode.value = "";
//     email.value = "";
//     passwordContainer.classList.add('hidden');
//     vfContainer.classList.add('hidden');
//     errorTxt.textContent = "";
// });
// const validUsername = /^[a-zA-Z0-9_@.-]{3,20}$/;
// function checkUsername(user) {
//     return validUsername.test(user.trim());

// }
// const validPassword = /^[a-zA-Z0-9_@.!#$%^&*()+=<>?-|]{8,20}$/;//think I have to escape these characters
// function checkPassword(pass) {
//     return validPassword.test(pass.trim());
// }
// function checkValue(value) {
//     //use firebase to check the sent message and if it matches return true
//     return false;//just for now
// }
// function goHome() {
//     const home = document.createElement('a');
//     home.href = "../index.html";
//     home.click();
// }
// Import the functions you need from the SDKs you new
import { initializeApp } from "https://www.gstatic.com/firebasejs/13.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/13.4.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/13.4.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyD2uaUmbo7nejLUwztX2fmRvMvkVCkIihc",
    authDomain: "ultra-website-84a1b.firebaseapp.com",
    projectId: "ultra-website-84a1b",
    storageBucket: "ultra-website-84a1b.firebasestorage.app",
    messagingSenderId: "81801348384",
    appId: "1:818013483584:web:db130b8fb907c34e4d65a5",
    measurementId: "G-KXJBQPPCM8"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);

const glgPrv = new GoogleAuthProvider();
const gitPrv = new GithubAuthProvider();

const form = document.getElementById("auth-form");
const email = document.getElementById("username-email");
const password = document.getElementById("password");
const contin = document.getElementById("auth-continue");
const signUp = document.getElementById("switch").querySelector("a");
const userSwitch = document.getElementById("switch");
const vfCode = document.getElementById("vf-code");
const errorTxt = document.getElementById("err-txt");
const passwordContainer = document.getElementById("password-container");
const vfContainer = document.getElementById("vf-code-container");

let userTypeLogin = true;
let authUsePassword = true;

email.addEventListener("input", () => {
    if (!passwordContainer.classList.contains("hidden")) {
        passwordContainer.classList.add("hidden");
        vfContainer.classList.add("hidden");
        password.value = "";
        vfCode.value = "";
        errorTxt.textContent = "";
    }
});

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (userTypeLogin) {
        if (passwordContainer.classList.contains("hidden")) {
            if (checkUsername(email.value)) {
                if (errorTxt.textContent != "") {
                    errorTxt.textContent = "";
                }
                passwordContainer.classList.remove("hidden");
                password.focus();
            } else {
                errorTxt.textContent = "Please re-enter your username";
            }
        } else if (checkUsername(email.value) && (checkPassword(password.value) || checkValue(vfCode.value))) {
            try {
                await signInWithEmailAndPassword(auth, email.value.trim(), password.value);
                goHome();
            } catch (error) {
                console.log("Login unsuccesful: ", error.message);
                errorTxt.textContent = error.message;
            }
        } else {
            passwordContainer.classList.add("hidden");
            vfContainer.classList.add("hidden");
            errorTxt.textContent = "Please re-enter your username";
        }
    } else {
        if (passwordContainer.classList.contains("hidden")) {
            if (checkUsername(email.value)) {
                if (errorTxt.textContent != "") {
                    errorTxt.textContent = "";
                }
                passwordContainer.classList.remove("hidden");
                password.focus();
            } else {
                errorTxt.textContent = "Please re-enter your username";
            }
        } else {
            if (checkUsername(email.value)) {
                if (checkPassword(password.value) || checkValue(vfCode.value)) {
                    try {
                        await createUserWithEmailAndPassword(auth, email.value.trim(), password.value);
                        goHome();
                    } catch (error) {
                        console.log("Sign up unsuccessful: ", error.message);
                        errorTxt.textContent = error.message;
                    }
                }
            } else {
                passwordContainer.classList.add("hidden");
                vfContainer.classList.add("hidden");
            }
        }
    }
});

signUp.addEventListener("click", (e) => {
    e.preventDefault();
    userTypeLogin = !userTypeLogin;
    if (userTypeLogin) {
        userSwitch.innerHTML = `New user? <a href = "">Sign up<a>`;
    } else {
        userSwitch.innerHTML = `Already a user? <a href = "">Log In<a>`;
    }
    password.value = "";
    vfCode.value = "";
    email.value = "";
    passwordContainer.classList.add('hidden');
    vfContainer.classList.add('hidden');
    errorTxt.textContent = "";
});

const validUsername = /^[a-zA-Z0-9_@.-]{3,40}$/;
function checkUsername(user) {
    return validUsername.test(user.trim());
}

const validPassword = /^[a-zA-Z0-9_@.!#$%^&*()+=<>?|-]{8,20}$/;
function checkPassword(pass) {
    return validPassword.test(pass.trim());
}

function checkValue(value) {
    return false;
}

function goHome() {
    const home = document.createElement('a');
    home.href = "../index.html";
    home.click();
}
//logic for signing in through an alternative method
const glgButton = document.querySelector(".gsi-material-button");
const gitButton = document.querySelector(".github-material-button");
glgButton.addEventListener("click", async () => {
    try {
        await signInWithPopup(auth, glgPrv);
        goHome();
    } catch(error) {
        console.log("Google alternative method unsuccessful: ", error.message);
        errorTxt.textContent = error.message;
    }
});
gitButton.addEventListener("click", async () => {
    try {
        await signInWithPopup(auth, gitPrv);
        goHome();
    } catch(error) {
        console.log("Github alternative method unsuccessful: ", error.message);
        errorTxt.textContent = error.message;
    }
});