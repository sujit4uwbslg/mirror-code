import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from "firebase/compat/app";
import 'firebase/database';
const firebaseConfig = {
    apiKey: "AIzaSyD91yUiB1c1otWf-rSo0t7hkbCSbLTnluo",
    authDomain: "student-705ca.firebaseapp.com",
    projectId: "student-705ca",
    storageBucket: "student-705ca.firebasestorage.app",
    messagingSenderId: "127385633904",
    appId: "1:127385633904:web:78b603fafa33d3ebb860b5",
    measurementId: "G-S2M8JE1PG1"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig); 
  const database = firebaseApp.database();
  export default database;