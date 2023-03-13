// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBfBfL2QZrGnKYDEF1wgGPyfdgwvqAvcw4",
  authDomain: "ecell-hackathon.firebaseapp.com",
  databaseURL: "https://ecell-hackathon-default-rtdb.firebaseio.com",
  projectId: "ecell-hackathon",
  storageBucket: "ecell-hackathon.appspot.com",
  messagingSenderId: "576365648290",
  appId: "1:576365648290:web:53e10f8b86e50e4bb5fafb",
  measurementId: "G-ES1Q59LKD0"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const db = getFirestore()
export default db