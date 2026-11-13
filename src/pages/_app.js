import { useEffect } from "react";
import { AuthProvider } from "@/context/AuthContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { initNativeShell } from "@/lib/native";
import { initPortalCacheSync } from "@/lib/portalCache";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    initNativeShell();
    return initPortalCacheSync();
  }, []);

  return (
    <LanguageProvider>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </LanguageProvider>
  );
}
