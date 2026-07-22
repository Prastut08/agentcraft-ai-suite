import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyAc4jUGDd2MS93BfogiuntBht01JcGs5RA",
  authDomain: "voice-ops-agent.firebaseapp.com",
  projectId: "voice-ops-agent",
  storageBucket: "voice-ops-agent.firebasestorage.app",
  messagingSenderId: "299259163667",
  appId: "1:299259163667:web:3dba6ecc7b3fa9a08ffbe6",
  measurementId: "G-879LTVWRBS",
};

export const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);