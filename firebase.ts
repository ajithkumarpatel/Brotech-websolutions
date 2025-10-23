/*
 * =====================================================================================
 * IMPORTANT: Firestore Connection Issues on Deployment (e.g., Vercel)
 * =====================================================================================
 * If your app works locally but shows "Firestore backend didn't respond" or
 * "client is offline" errors after deploying, it's almost always a configuration issue
 * in your Firebase project, not a code issue.
 *
 * Please check the following in your Firebase Console:
 *
 * 1.  **Firestore Database is Created:**
 *     - Go to your Firebase project -> Build -> Firestore Database.
 *     - Click "Create database" if you haven't already.
 *     - Choose "Start in production mode".
 *
 * 2.  **Security Rules are Correct:**
 *     - In the Firestore Database section, go to the "Rules" tab.
 *     - For a public-facing website where you want to allow anyone to read data
 *       (like blog posts, pricing plans, etc.), your rules need to be updated.
 *
 *     - **Example for allowing public reads:**
 *       rules_version = '2';
 *       service cloud.firestore {
 *         match /databases/{database}/documents {
 *           // Allow anyone to read collections like blogPosts, pricingPlans, etc.
 *           match /blogPosts/{postId} {
 *             allow read: if true;
 *             allow write: if false; // Keep writes protected
 *           }
 *           match /pricingPlans/{planId} {
 *             allow read: if true;
 *             allow write: if false;
 *           }
 *           match /settings/global {
 *             allow read: if true;
 *             allow write: if false;
 *           }
 *
 *           // Keep contact form submissions private
 *           match /contacts/{contactId} {
 *             allow read: if false;
 *             allow write: if true; // Allow anyone to submit the form
 *           }
 *
 *           // Default deny all other access
 *           match /{document=**} {
 *             allow read, write: if false;
 *           }
 *         }
 *       }
 *
 *     - **WARNING:** The example above is a starting point. Review your security needs
 *       carefully. Never allow public write access unless intended.
 *
 * 3.  **API Key is Correct in Vercel:**
 *     - Ensure the `REACT_APP_API_KEY` environment variable in your Vercel project settings
 *       matches the `apiKey` from your Firebase project's web app configuration.
 *
 * =====================================================================================
 */
import { initializeApp } from "firebase/app";
import { getFirestore, Firestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY, // Vercel requires this prefix for client-side variables
  authDomain: "brotech-web-solutions.firebaseapp.com",
  projectId: "brotech-web-solutions",
  storageBucket: "brotech-web-solutions.appspot.com",
  messagingSenderId: "288226787153",
  appId: "1:288226787153:web:1be0e4aea819074dbe5d70"
};

let db: Firestore | null = null;

try {
  if (firebaseConfig.apiKey) {
    const app = initializeApp(firebaseConfig);
    db = getFirestore(app);
  } else {
    console.warn("CRITICAL: Firebase API key is missing. Firebase features will be disabled. To fix this, add an environment variable named 'REACT_APP_API_KEY' in your Vercel project settings and redeploy.");
  }
} catch (error) {
  console.error("An error occurred during Firebase initialization:", error);
}

export { db };