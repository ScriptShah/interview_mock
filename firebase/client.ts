import { initializeApp, getApp , getApps } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from "firebase/firestore";

// old
// const firebaseConfig = {
//   apiKey: "AIzaSyBrRUCToXPzY9XAZ7vmcAIokXkHBcAnDD8",
//   authDomain: "prepsmart-84212.firebaseapp.com",
//   projectId: "prepsmart-84212",
//   storageBucket: "prepsmart-84212.firebasestorage.app",
//   messagingSenderId: "1077383138831",
//   appId: "1:1077383138831:web:129fff7c65dc268e429d7a",
//   measurementId: "G-0RHC902DQR"
// };

//new
const firebaseConfig = {
  apiKey: "AIzaSyAEISex3dGkgbvc5OOx7407cnFMm8aDZtw",
  authDomain: "prepsmart-87652.firebaseapp.com",
  projectId: "prepsmart-87652",
  storageBucket: "prepsmart-87652.firebasestorage.app",
  messagingSenderId: "233395405561",
  appId: "1:233395405561:web:47e596f00ab5c1cff7d828",
  measurementId: "G-QDQK8714K7"
};


const app = !getApps.length ?  initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);



