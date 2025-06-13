// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBFuCWUIZP4TRy9vlwe6vxMM794SKIK-Jo",
  authDomain: "pauzi-a69be.firebaseapp.com",
  projectId: "pauzi-a69be",
  storageBucket: "pauzi-a69be.appspot.com",
  messagingSenderId: "288205053019",
  appId: "1:288205053019:web:4623ffb925d53d628db37e",
  measurementId: "G-DPTQH9W13S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth, app, analytics };
