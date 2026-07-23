import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { User } from "firebase/auth";
import { useFirebaseAuth } from "./firebase-auth";
import { auth, db } from "./firebase";
import { doc, onSnapshot, type DocumentData } from "firebase/firestore";

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  profile: {
    displayName: string;
    businessName: string;
  } | null;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  loading: true,
  profile: null,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const { user, loading } = useFirebaseAuth();
  const [profile, setProfile] = useState<AuthContextValue["profile"]>(null);

  useEffect(() => {
    if (!user) {
      setProfile(null);
      return;
    }

    const unsubscribe = onSnapshot(
      doc(db, "users", user.uid),
      (snapshot) => {
        const data = snapshot.data() as DocumentData | undefined;
        setProfile({
          displayName:
            typeof data?.displayName === "string" && data.displayName.trim().length > 0
              ? data.displayName
              : (user.displayName ?? user.email ?? "Workspace user"),
          businessName:
            typeof data?.businessName === "string" && data.businessName.trim().length > 0
              ? data.businessName
              : typeof data?.displayName === "string" && data.displayName.trim().length > 0
                ? data.displayName
                : (user.displayName ?? user.email ?? "Workspace"),
        });
      },
      (error) => {
        console.warn("Firestore profile read failed, using auth fallback profile:", error);
        setProfile({
          displayName: user.displayName ?? user.email ?? "Workspace user",
          businessName: user.displayName ?? user.email ?? "Workspace",
        });
      },
    );

    return unsubscribe;
  }, [user]);

  return <AuthContext.Provider value={{ user, loading, profile }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
