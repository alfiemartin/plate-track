"use client"
import { initializeApp } from "firebase/app";

export const initFirebase = () => {
  // Import the functions you need from the SDKs you need
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCdzv73ECQNq-jpeTMKLIKpTBap5kaAIMo",
    authDomain: "plate-track-30a14.firebaseapp.com",
    projectId: "plate-track-30a14",
    storageBucket: "plate-track-30a14.appspot.com",
    messagingSenderId: "177795949233",
    appId: "1:177795949233:web:aa5a984c4d647c43aab890",
    measurementId: "G-TE8L3ESDM2",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
};