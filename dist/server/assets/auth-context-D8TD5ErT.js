import { a as useFirebaseAuth, o as db } from "./firebase-auth-4nYWua_o.js";
import { createContext, useContext, useEffect, useState } from "react";
import { jsx } from "react/jsx-runtime";
import { doc, onSnapshot } from "firebase/firestore";
//#region src/lib/auth-context.tsx
var AuthContext = createContext({
	user: null,
	loading: true,
	profile: null
});
function AuthProvider({ children }) {
	const { user, loading } = useFirebaseAuth();
	const [profile, setProfile] = useState(null);
	useEffect(() => {
		if (!user) {
			setProfile(null);
			return;
		}
		return onSnapshot(doc(db, "users", user.uid), (snapshot) => {
			const data = snapshot.data();
			setProfile({
				displayName: typeof data?.displayName === "string" && data.displayName.trim().length > 0 ? data.displayName : user.displayName ?? user.email ?? "Workspace user",
				businessName: typeof data?.businessName === "string" && data.businessName.trim().length > 0 ? data.businessName : typeof data?.displayName === "string" && data.displayName.trim().length > 0 ? data.displayName : user.displayName ?? user.email ?? "Workspace"
			});
		}, (error) => {
			console.warn("Firestore profile read failed, using auth fallback profile:", error);
			setProfile({
				displayName: user.displayName ?? user.email ?? "Workspace user",
				businessName: user.displayName ?? user.email ?? "Workspace"
			});
		});
	}, [user]);
	return /* @__PURE__ */ jsx(AuthContext.Provider, {
		value: {
			user,
			loading,
			profile
		},
		children
	});
}
function useAuth() {
	return useContext(AuthContext);
}
//#endregion
export { useAuth as n, AuthProvider as t };
