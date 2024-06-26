
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCCCEt5DB7-AjguKdx7gUE-yvLs4BakjzE",
  authDomain: "ecommerce-b4466.firebaseapp.com",
  projectId: "ecommerce-b4466",
  storageBucket: "ecommerce-b4466.appspot.com",
  messagingSenderId: "170035847706",
  appId: "1:170035847706:web:ec8493eb15c3e027bce7a3",
  measurementId: "G-XM9E6FMN1S"
};


const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const googleProvider=new GoogleAuthProvider();
export const db=getFirestore(app);