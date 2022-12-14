// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCxtBjoDpe9pL_vv73EDC9CrtCe9rFL6cg",
  authDomain: "clone-72d82.firebaseapp.com",
  projectId: "clone-72d82",
  storageBucket: "clone-72d82.appspot.com",
  messagingSenderId: "871620486722",
  appId: "1:871620486722:web:76b850aa400e986bcf6fdb",
  measurementId: "G-32FVQQSNRK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export default app;