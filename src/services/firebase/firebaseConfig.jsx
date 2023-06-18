import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBA8YrvJ4-lvE2ym31zsglVni5eI7yk0z0",
  authDomain: "appreact-d4789.firebaseapp.com",
  projectId: "appreact-d4789",
  storageBucket: "appreact-d4789.appspot.com",
  messagingSenderId: "105575991704",
  appId: "1:105575991704:web:2ed91e57b5617c9e65c3ed",
  measurementId: "G-9Q9MR5NQZ3"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);


