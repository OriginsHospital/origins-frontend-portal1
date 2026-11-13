import type { CapacitorConfig } from "@capacitor/cli";

/**
 * Live link: when CAPACITOR_SERVER_URL is set (via `npm run mobile:live`),
 * the APK WebView loads the running Next.js portal so UI changes appear
 * without re-exporting static assets.
 *
 * Packaged release: leave CAPACITOR_SERVER_URL empty and use `npm run mobile:build`.
 */
const liveUrl = (process.env.CAPACITOR_SERVER_URL || "").trim();

const config: CapacitorConfig = {
  appId: "com.origins.ivf.portal",
  appName: "Origins IVF",
  webDir: "out",
  server: {
    androidScheme: "https",
    cleartext: true,
    ...(liveUrl ? { url: liveUrl } : {})
  },
  plugins: {
    // Native HTTP bypasses WebView CORS / mixed-content / private-network blocks
    CapacitorHttp: {
      enabled: true
    },
    SplashScreen: {
      launchShowDuration: 1800,
      launchAutoHide: true,
      backgroundColor: "#e8f8f7",
      showSpinner: false,
      androidSplashResourceName: "splash",
      splashFullScreen: true,
      splashImmersive: true
    },
    StatusBar: {
      style: "DARK",
      backgroundColor: "#0abab5"
    }
  },
  android: {
    allowMixedContent: true,
    backgroundColor: "#e8f8f7"
  }
};

export default config;
