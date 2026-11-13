import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  clearSession,
  getStoredUser,
  getToken,
  portalApi,
  setSession
} from "@/lib/api";
import { clearPortalCache } from "@/lib/portalCache";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    const stored = getStoredUser();
    if (!token || !stored) {
      setLoading(false);
      return;
    }
    setUser(stored);
    portalApi("/auth/me")
      .then(me => setUser(me))
      .catch(() => {
        clearSession();
        clearPortalCache();
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const login = useCallback(async (email, password) => {
    const data = await portalApi("/auth/login", {
      method: "POST",
      body: { email, password },
      auth: false
    });
    setSession(data.userDetails, data.accessToken);
    setUser(data.userDetails);
    return data.userDetails;
  }, []);

  const logout = useCallback(() => {
    clearSession();
    clearPortalCache();
    setUser(null);
    router.push("/login");
  }, [router]);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
