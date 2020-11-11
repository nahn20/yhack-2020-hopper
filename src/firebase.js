import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAmgx9oBP1xBqN0lv2sk5jOGhG2GNRtFV0",
    authDomain: "yhack-7fd15.firebaseapp.com",
    databaseURL: "https://yhack-7fd15.firebaseio.com",
    projectId: "yhack-7fd15",
    storageBucket: "yhack-7fd15.appspot.com",
    messagingSenderId: "78643312201",
    appId: "1:78643312201:web:93a4d99761fcc9c0f73198",
    measurementId: "G-8FT5FPHJRK"
};


firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();
