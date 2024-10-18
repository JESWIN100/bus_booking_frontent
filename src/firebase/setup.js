
import { initializeApp } from "firebase/app";
import {getAuth}   from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAKBX62MMGpc8-ghGzOSRZ_KekR2qSKsVg",
  authDomain: "bus-ticket-4e9bc.firebaseapp.com",
  projectId: "bus-ticket-4e9bc",
  storageBucket: "bus-ticket-4e9bc.appspot.com",
  messagingSenderId: "505175380538",
  appId: "1:505175380538:web:6c88473b8a27a262f29b03"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);