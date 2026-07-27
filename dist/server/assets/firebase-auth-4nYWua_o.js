import { useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInAnonymously, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { doc, getFirestore, serverTimestamp, setDoc } from "firebase/firestore";
import { getApp, getApps, initializeApp } from "firebase/app";
//#region src/lib/firebase.ts
var config = {
	apiKey: "AIzaSyAc4jUGDd2MS93BfogiuntBht01JcGs5RA",
	authDomain: "voice-ops-agent.firebaseapp.com",
	projectId: "voice-ops-agent",
	storageBucket: "voice-ops-agent.firebasestorage.app",
	messagingSenderId: "299259163667",
	appId: "1:299259163667:web:3dba6ecc7b3fa9a08ffbe6",
	measurementId: "G-879LTVWRBS"
};
for (const [key, value] of Object.entries(config)) if (!value) throw new Error(`Missing required Firebase config: ${key}`);
var app = getApps().length === 0 ? initializeApp(config) : getApp();
var auth = getAuth(app);
var db = getFirestore(app);
//#endregion
//#region src/lib/firebase-auth.ts
function useFirebaseAuth() {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	useEffect(() => onAuthStateChanged(auth, (nextUser) => {
		setUser(nextUser);
		setLoading(false);
	}, (error) => {
		console.warn("Firebase Auth state change error:", error);
		setUser(null);
		setLoading(false);
	}), []);
	return {
		user,
		loading
	};
}
async function signInWithEmail(email, password) {
	return signInWithEmailAndPassword(auth, email, password);
}
async function signUpWithEmail(email, password, displayName, businessName) {
	const credential = await createUserWithEmailAndPassword(auth, email, password);
	const name = displayName.trim() || email.split("@")[0] || "New user";
	const workspaceName = businessName?.trim() || name;
	await updateProfile(credential.user, { displayName: name });
	await setDoc(doc(db, "users", credential.user.uid), {
		uid: credential.user.uid,
		email,
		displayName: name,
		businessName: workspaceName,
		createdAt: serverTimestamp(),
		updatedAt: serverTimestamp()
	}, { merge: true });
	return credential;
}
async function signInAsGuest() {
	const credential = await signInAnonymously(auth);
	await updateProfile(credential.user, { displayName: "Demo User" });
	await setDoc(doc(db, "users", credential.user.uid), {
		uid: credential.user.uid,
		email: "demo@voiceforge.ai",
		displayName: "Demo User",
		businessName: "Demo Workspace",
		createdAt: serverTimestamp(),
		updatedAt: serverTimestamp()
	}, { merge: true }).catch((err) => console.warn("Firestore guest profile write warning:", err));
	return credential;
}
async function signOutUser() {
	return signOut(auth);
}
//#endregion
export { useFirebaseAuth as a, signUpWithEmail as i, signInWithEmail as n, db as o, signOutUser as r, signInAsGuest as t };
