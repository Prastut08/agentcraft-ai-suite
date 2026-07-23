import { useEffect, useState } from "react";
import type { User } from "firebase/auth";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInAnonymously,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

import { auth, db } from "./firebase";

export type AuthMode = "sign-in" | "sign-up";

export function useFirebaseAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(
    () =>
      onAuthStateChanged(
        auth,
        (nextUser) => {
          setUser(nextUser);
          setLoading(false);
        },
        (error) => {
          console.warn("Firebase Auth state change error:", error);
          setUser(null);
          setLoading(false);
        },
      ),
    [],
  );

  return { user, loading };
}

export async function signInWithEmail(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}

export async function signUpWithEmail(
  email: string,
  password: string,
  displayName: string,
  businessName?: string,
) {
  const credential = await createUserWithEmailAndPassword(auth, email, password);
  const name = displayName.trim() || email.split("@")[0] || "New user";
  const workspaceName = businessName?.trim() || name;

  await updateProfile(credential.user, { displayName: name });
  await setDoc(
    doc(db, "users", credential.user.uid),
    {
      uid: credential.user.uid,
      email,
      displayName: name,
      businessName: workspaceName,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    },
    { merge: true },
  );

  return credential;
}

export async function signInAsGuest() {
  const credential = await signInAnonymously(auth);
  await updateProfile(credential.user, { displayName: "Demo User" });
  await setDoc(
    doc(db, "users", credential.user.uid),
    {
      uid: credential.user.uid,
      email: "demo@voiceforge.ai",
      displayName: "Demo User",
      businessName: "Demo Workspace",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    },
    { merge: true },
  ).catch((err) => console.warn("Firestore guest profile write warning:", err));

  return credential;
}

export async function signOutUser() {
  return signOut(auth);
}
