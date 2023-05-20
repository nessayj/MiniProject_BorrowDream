import firebase from "firebase/compat/app";
import "firebase/compat/storage";



const firebaseConfig = { 
    apiKey: "AIzaSyDWtb5m7stuVYfpny2fbgiq92ZxYqeuFHs",
    authDomain: "borrowdream-ed6fb.firebaseapp.com",
    projectId: "borrowdream-ed6fb",
    storageBucket: "borrowdream-ed6fb.appspot.com",
    messagingSenderId: "196502547637",
    appId: "1:196502547637:web:24f2ad055bf53adda462fc",
    measurementId: "G-6NTM5W45NW"
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    export const storage = firebase.storage();