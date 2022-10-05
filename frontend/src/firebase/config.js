import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/analytics";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCakOG7TwlG95t4pl-WY4BeuuEPqj1S8pc",
  authDomain: "librarybook-90bba.firebaseapp.com",
  projectId: "librarybook-90bba",
  storageBucket: "librarybook-90bba.appspot.com",
  messagingSenderId: "38654622114",
  appId: "1:38654622114:web:b04ec5077df4dc7f519afb",
  measurementId: "G-QS7SV5CFQ7",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();
const db = firebase.firestore();

export { auth, db };
export default firebase;
