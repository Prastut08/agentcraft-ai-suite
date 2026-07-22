import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const getEnv = (key: string, fallback: string = ""): string => {
  try {
    if (typeof import.meta !== "undefined" && import.meta.env && import.meta.env[key]) {
      return import.meta.env[key] as string;
    }
  } catch {}
  try {
    if (typeof process !== "undefined" && process.env && process.env[key]) {
      return process.env[key] as string;
    }
  } catch {}
  return fallback;
};

// Dynamically load Firebase config with fallback to .env defaults
const config = {
  apiKey: getEnv("VITE_FIREBASE_API_KEY", "AIzaSyAc4jUGDd2MS93BfogiuntBht01JcGs5RA"),
  authDomain: getEnv("VITE_FIREBASE_AUTH_DOMAIN", "voice-ops-agent.firebaseapp.com"),
  projectId: getEnv("VITE_FIREBASE_PROJECT_ID", "voice-ops-agent"),
  storageBucket: getEnv("VITE_FIREBASE_STORAGE_BUCKET", "voice-ops-agent.firebasestorage.app"),
  messagingSenderId: getEnv("VITE_FIREBASE_MESSAGING_SENDER_ID", "299259163667"),
  appId: getEnv("VITE_FIREBASE_APP_ID", "1:299259163667:web:3dba6ecc7b3fa9a08ffbe6"),
  measurementId: getEnv("VITE_FIREBASE_MEASUREMENT_ID", "G-879LTVWRBS"),
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(config);

export const auth = getAuth(app);
export const db = getFirestore(app);