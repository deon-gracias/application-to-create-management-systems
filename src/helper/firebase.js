import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBncmwbHNjKujXJOdPDQ67DSR-Vz_l2lcQ",
  authDomain: "firebasics-2ee31.firebaseapp.com",
  projectId: "firebasics-2ee31",
  storageBucket: "firebasics-2ee31.appspot.com",
  messagingSenderId: "988681236934",
  appId: "1:988681236934:web:196ec5f18bc018445982c7",
};
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = firebase.firestore();
