// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA2XSh4TEHq5I11Rz9AHuBO-M5SlFWhfk4",
  authDomain: "mihir-authentication.firebaseapp.com",
  projectId: "mihir-authentication",
  storageBucket: "mihir-authentication.firebasestorage.app",
  messagingSenderId: "719613889160",
  appId: "1:719613889160:web:bcf1340d5ef7bd98ccad3d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export default auth