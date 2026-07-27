import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const config = {
  apiKey:
    import.meta.env.VITE_FIREBASE_API_KEY ||
    process?.env?.VITE_FIREBASE_API_KEY,
  authDomain:
    import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ||
    process?.env?.VITE_FIREBASE_AUTH_DOMAIN,
  projectId:
    import.meta.env.VITE_FIREBASE_PROJECT_ID ||
    process?.env?.VITE_FIREBASE_PROJECT_ID,
  storageBucket:
    import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ||
    process?.env?.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId:
    import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ||
    process?.env?.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId:
    import.meta.env.VITE_FIREBASE_APP_ID || process?.env?.VITE_FIREBASE_APP_ID,
  measurementId:
    import.meta.env.VITE_FIREBASE_MEASUREMENT_ID ||
    process?.env?.VITE_FIREBASE_MEASUREMENT_ID,
};

const missingKeys = Object.entries(config)
  .filter(([, value]) => !value)
  .map(([key]) => key);

export const isFirebaseConfigured = missingKeys.length === 0;

if (!isFirebaseConfigured) {
  console.warn(
    `Firebase config missing: ${missingKeys.join(", ")}. ` +
      "Set VITE_FIREBASE_* in .env to enable auth.",
  );
}

const app = getApps().length === 0 ? initializeApp(config) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);
