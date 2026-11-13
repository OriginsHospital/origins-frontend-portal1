import { spawnSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const javaHome = "C:\\Program Files\\Microsoft\\jdk-21.0.12.8-hotspot";
const androidSdk = path.join(process.env.LOCALAPPDATA || "", "Android", "Sdk");
const apkOut = path.join(root, "android", "app", "build", "outputs", "apk", "debug", "app-debug.apk");
const distApk = path.join(root, "Origins-IVF-Portal.apk");

function run(cmd, args, env = {}) {
  const result = spawnSync(cmd, args, {
    cwd: path.join(root, "android"),
    stdio: "inherit",
    shell: true,
    env: {
      ...process.env,
      JAVA_HOME: javaHome,
      ANDROID_HOME: androidSdk,
      ANDROID_SDK_ROOT: androidSdk,
      Path: `${path.join(javaHome, "bin")};${path.join(androidSdk, "platform-tools")};${process.env.Path || process.env.PATH}`,
      ...env
    }
  });
  if (result.status !== 0) {
    throw new Error(`Gradle build failed with code ${result.status}`);
  }
}

if (!fs.existsSync(path.join(root, "android"))) {
  throw new Error("Android project missing. Run: npx cap add android && npm run mobile:sync");
}

console.log("→ Building debug APK with Gradle…");
run(process.platform === "win32" ? "gradlew.bat" : "./gradlew", ["assembleDebug"]);

if (!fs.existsSync(apkOut)) {
  throw new Error(`APK not found at ${apkOut}`);
}

fs.copyFileSync(apkOut, distApk);
console.log(`✓ APK ready: ${distApk}`);
