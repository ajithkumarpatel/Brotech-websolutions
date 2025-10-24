/*
 * =====================================================================================
 * IMPORTANT: Firestore Connection Issues on Deployment (e.g., Vercel)
 * =====================================================================================
 * If your app works locally but shows "Firestore backend didn't respond" or
 * "client is offline" after deploying, it's almost always a configuration issue
 * — not a code bug.
 * =====================================================================================
 */

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// ✅ Use environment variables (Vercel + local .env)
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY, // Must exist in Vercel
  authDomain: process.env.REACT_APP_AUTH_DOMAIN || "brotech-web-solutions.firebaseapp.com",
  projectId: process.env.REACT_APP_PROJECT_ID || "brotech-web-solutions",
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET || "brotech-web-solutions.appspot.com",
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID || "288226787153",
  appId: process.env.REACT_APP_APP_ID || "1:288226787153:web:1be0e4aea819074dbe5d70",
};

let db = null;

try {
  if (firebaseConfig.apiKey) {
    const app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    console.log("✅ Firebase initialized successfully");
  } else {
    console.warn(
      "⚠️ CRITICAL: Firebase API key is missing. Add REACT_APP_API_KEY in your Vercel environment variables and redeploy."
    );
  }
} catch (error) {
  console.error("❌ Firebase initialization failed:", error);
}

export { db };
