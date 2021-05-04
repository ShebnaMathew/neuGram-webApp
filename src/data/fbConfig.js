import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDJRNRpAVu7y8DmI5H5RONp1aWkovZeor8",
    authDomain: "cs7580-proje.firebaseapp.com",
    projectId: "cs7580-proje",
    storageBucket: "cs7580-proje.appspot.com",
    messagingSenderId: "628869042332",
    appId: "1:628869042332:web:d90cf2aeb661c1fef6dd59",
    measurementId: "G-771PVZL255"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase;