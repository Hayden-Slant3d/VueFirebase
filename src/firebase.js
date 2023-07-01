import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { Firestore, getFirestore } from "firebase/firestore";

/**
 * @tutorial : To find this information:
 * @tutorial 1: Goto your firebase project
 * @tutorial 2: Top-Left Gear Icon => Project Settings
 * @tutorial 3: Scroll down till you see 'SDK setup and configuration'
 * @tutorial 4: Copy your firebaseConfig Object
 * @tutorial 5- Paste
 */
const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
};

/**
 * Initialize Firebase with the given configuration
 * @type {FirebaseApp}
 */
const app = initializeApp(firebaseConfig);


/**
 * Exporting an instance of Firebase Auth
 * @type {FirebaseAuth}
 */
export const auth = getAuth(app);

/**
 * Exporting an instance of Firestore (database service)
 * @type {Firestore}
 */
export const db = getFirestore(app);
