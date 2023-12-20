import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// const firebaseConfig = {
//     apiKey: "AIzaSyDAD7_X7gBOsEp2SIrkjEkfrX3BpZOSAco",
//     authDomain: "react-spa-232c7.firebaseapp.com",
//     projectId: "react-spa-232c7",
//     storageBucket: "react-spa-232c7.appspot.com",
//     messagingSenderId: "827852189499",
//     appId: "1:827852189499:web:e049f22d064ba470f7111e",
//     measurementId: "G-Q9Z5F1TC3C"
// }

// Test FireBase
// const firebaseConfig = {
//     apiKey: "AIzaSyB8KvaBdPIssdSM5Pu7q10Pt0jGJI8gz8U",
//     authDomain: "test-ebdc6.firebaseapp.com",
//     projectId: "test-ebdc6",
//     storageBucket: "test-ebdc6.appspot.com",
//     messagingSenderId: "861059533727",
//     appId: "1:861059533727:web:42044d10dce691c8988baa"
// };

// Test FireBase2
const firebaseConfig = {
    apiKey: "AIzaSyBrUbF4s2u6XrRvEX2Bxjspw6uuGM3XAIw",
    authDomain: "test2-4f7e2.firebaseapp.com",
    projectId: "test2-4f7e2",
    storageBucket: "test2-4f7e2.appspot.com",
    messagingSenderId: "968346553270",
    appId: "1:968346553270:web:582823cf41992ddf258f17"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);