// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDj9wXNOwb8LgZSfEzn930jKQF4GHNRPGc",
  authDomain: "vtireactjsv1.firebaseapp.com",
  projectId: "vtireactjsv1",
  storageBucket: "vtireactjsv1.appspot.com",
  messagingSenderId: "111045747864",
  appId: "1:111045747864:web:332ed415bddfa222e0dced",
  measurementId: "G-Z7KP098MBD"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);