import { initializeApp } from "firebase/app";

import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBpc2NSIw3BzucyaJPboQUJz9WBiVPOHcw",
  authDomain: "mercurio-finance-tracker.firebaseapp.com",
  projectId: "mercurio-finance-tracker",
  storageBucket: "mercurio-finance-tracker.firebasestorage.app",
  messagingSenderId: "991280424226",
  appId: "1:991280424226:web:a671f9b5b20580a49ab17b",
  measurementId: "G-TM52TH9MG3"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { db, auth, provider, doc, setDoc };
