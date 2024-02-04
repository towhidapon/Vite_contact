// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCOLZeqaHpQ_X_7zlNCX2Ctf_cOCFCFT1w",
  authDomain: "vite-contact-3773a.firebaseapp.com",
  projectId: "vite-contact-3773a",
  storageBucket: "vite-contact-3773a.appspot.com",
  messagingSenderId: "880994448624",
  appId: "1:880994448624:web:3228c47f575e2b41ec3e35"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);