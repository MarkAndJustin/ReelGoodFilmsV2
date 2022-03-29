// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: "AIzaSyAXXxY-y1K8Y7eunVvk9DbCFLu9OJIvIwc",

  authDomain: "reelgoodfilms-5924d.firebaseapp.com",

  databaseURL: "https://reelgoodfilms-5924d-default-rtdb.firebaseio.com",

  projectId: "reelgoodfilms-5924d",

  storageBucket: "reelgoodfilms-5924d.appspot.com",

  messagingSenderId: "292834483300",

  appId: "1:292834483300:web:5c736efc74b48cf5921371"

};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

