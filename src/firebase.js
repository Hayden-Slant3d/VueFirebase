import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAV7mO58IrdBUfJfV6Lall2mww1u6vO2P0",
    authDomain: "barcode-dd952.firebaseapp.com",
    projectId: "barcode-dd952",
    storageBucket: "barcode-dd952.appspot.com",
    messagingSenderId: "981273260032",
    appId: "1:981273260032:web:33dfe1875dc8253670e8e5",
    measurementId: "G-BJ7JWM2MEF"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);