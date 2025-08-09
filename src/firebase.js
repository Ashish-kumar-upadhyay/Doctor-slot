// 🔥 PERFECT FIREBASE CONFIG - SINGLE SOURCE OF TRUTH
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  setDoc,
  deleteDoc,
  query,
  where,
  getDocs,
  enableIndexedDbPersistence,
} from "firebase/firestore";

// 🔥 LATEST FIREBASE CONFIG (Updated by User)
const firebaseConfig = {
  apiKey: "AIzaSyBxSTky7BsWJxy9annIP6tx0iAimweg52E",
  authDomain: "doctor-app-09-08-2025.firebaseapp.com",
  projectId: "doctor-app-09-08-2025",
  storageBucket: "doctor-app-09-08-2025.appspot.com",
  messagingSenderId: "738309558886",
  appId: "1:738309558886:web:3148e18d671cb11e6113a7"
};

// Initialize Firebase
let app;
try {
  app = initializeApp(firebaseConfig);
  console.log("🔥 Firebase initialized successfully!");
  console.log("📋 Project ID:", firebaseConfig.projectId);
  console.log("🌐 Auth Domain:", firebaseConfig.authDomain);
} catch (error) {
  console.error("❌ Firebase initialization error:", error);
  console.error("🔍 Config details:", {
    projectId: firebaseConfig.projectId,
    authDomain: firebaseConfig.authDomain,
    apiKey: firebaseConfig.apiKey ? "✅ Present" : "❌ Missing"
  });
  throw error;
}

// Initialize Auth
const auth = getAuth(app);

// Initialize Firestore
let db;
try {
  db = getFirestore(app);
  console.log("✅ Firestore initialized successfully");
} catch (error) {
  console.error("❌ Firestore initialization error:", error);
  throw error;
}

// Enable offline persistence (optional)
try {
  enableIndexedDbPersistence(db);
  console.log("✅ Firestore offline persistence enabled");
} catch (err) {
  if (err.code === 'failed-precondition') {
    console.warn("⚠️ Multiple tabs open, persistence can only be enabled in one tab at a time.");
  } else if (err.code === 'unimplemented') {
    console.warn("⚠️ The current browser doesn't support offline persistence");
  } else {
    console.warn("⚠️ Firestore persistence error:", err.message);
  }
}

// Configure Google Provider
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

// Test connection function
export const testFirebaseConnection = async () => {
  console.log("🔍 Testing Firebase connection...");
  console.log("Auth instance:", auth);
  console.log("Firestore instance:", db);
  console.log("Project ID:", firebaseConfig.projectId);
  
  try {
    // Test Firestore connection
    const testDoc = doc(db, 'test', 'connection');
    await setDoc(testDoc, { 
      timestamp: new Date(),
      test: 'Firebase connection test'
    });
    console.log("✅ Firestore write test successful");
    
    // Clean up test document
    await deleteDoc(testDoc);
    console.log("✅ Firestore delete test successful");
    
    if (auth && db) {
      console.log("✅ Firebase services initialized successfully");
      return true;
    } else {
      console.error("❌ Firebase services not properly initialized");
      return false;
    }
  } catch (error) {
    console.error("❌ Firebase connection test failed:", error);
    console.error("Error code:", error.code);
    console.error("Error message:", error.message);
    return false;
  }
};

// Export all Firebase services and functions
export {
  auth,
  db,
  googleProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  collection,
  addDoc,
  doc,
  setDoc,
  deleteDoc,
  query,
  where,
  getDocs,
};

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
