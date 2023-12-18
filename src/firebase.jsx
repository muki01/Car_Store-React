import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDAD7_X7gBOsEp2SIrkjEkfrX3BpZOSAco",
    authDomain: "react-spa-232c7.firebaseapp.com",
    projectId: "react-spa-232c7",
    storageBucket: "react-spa-232c7.appspot.com",
    messagingSenderId: "827852189499",
    appId: "1:827852189499:web:e049f22d064ba470f7111e",
    measurementId: "G-Q9Z5F1TC3C"
}

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);