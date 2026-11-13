import { Capacitor } from "@capacitor/core";
import { StatusBar, Style } from "@capacitor/status-bar";
import { SplashScreen } from "@capacitor/splash-screen";
import { App } from "@capacitor/app";

export async function initNativeShell() {
  if (typeof window === "undefined" || !Capacitor.isNativePlatform()) return;

  document.documentElement.classList.add("native-app");

  try {
    await StatusBar.setStyle({ style: Style.Dark });
    await StatusBar.setBackgroundColor({ color: "#0abab5" });
  } catch {
    /* web / unsupported */
  }

  try {
    await SplashScreen.hide();
  } catch {
    /* ignore */
  }

  App.addListener("backButton", ({ canGoBack }) => {
    if (canGoBack) {
      window.history.back();
    } else {
      App.exitApp();
    }
  });
}
