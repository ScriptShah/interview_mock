import { initializeApp, getApp , getApps } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBrRUCToXPzY9XAZ7vmcAIokXkHBcAnDD8",
  authDomain: "prepsmart-84212.firebaseapp.com",
  projectId: "prepsmart-84212",
  storageBucket: "prepsmart-84212.firebasestorage.app",
  messagingSenderId: "1077383138831",
  appId: "1:1077383138831:web:129fff7c65dc268e429d7a",
  measurementId: "G-0RHC902DQR"
};

const app = !getApps.length ?  initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);