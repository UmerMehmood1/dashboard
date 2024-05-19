// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebase from "firebase/app";
import "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD7W_0nEI3FMmzb_oMrPC-v1-sAeXftwHM",
  authDomain: "ecommerce-app-f743c.firebaseapp.com",
  projectId: "ecommerce-app-f743c",
  storageBucket: "ecommerce-app-f743c.appspot.com",
  messagingSenderId: "344731972605",
  appId: "1:344731972605:web:d3e4ba2c08c0eb11a59f94",
  measurementId: "G-9DF351YQ05",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const analytics = getAnalytics(app);
