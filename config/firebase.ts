// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import AsyncStorage from "@react-native-async-storage/async-storage";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDbdC7tZ2nGv3T526xdpcN1Bls2MJj4lp4",
  authDomain: "expense-tracker-8e257.firebaseapp.com",
  projectId: "expense-tracker-8e257",
  storageBucket: "expense-tracker-8e257.firebasestorage.app",
  messagingSenderId: "303976728397",
  appId: "1:303976728397:web:89099235a1175616cb9904",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const firebase = getFirestore(app);
