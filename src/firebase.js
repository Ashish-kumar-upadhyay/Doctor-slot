import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB-tp-WggKjzrhaPjHcJ6e2TIxnM6bNzPI",
  authDomain: "doctor-364e2.firebaseapp.com",
  databaseURL: "https://doctor-364e2-default-rtdb.firebaseio.com",
  projectId: "doctor-364e2",
  storageBucket: "doctor-364e2.firebasestorage.app",
  messagingSenderId: "497753418329",
  appId: "1:497753418329:web:c8083d388999f812389f48"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

/* 
IMPORTANT NOTICE FOR FIREBASE AUTHENTICATION:

To fix the domain authorization issue, you need to add your domain 
(doctor-seven-hazel.vercel.app) to the OAuth redirect domains list in the Firebase console:

1. Go to Firebase console: https://console.firebase.google.com/
2. Select your project
3. Navigate to: Authentication -> Settings -> Authorized domains tab
4. Click "Add domain" and add: doctor-seven-hazel.vercel.app

This will allow Firebase authentication to work properly on your deployed site.
*/
