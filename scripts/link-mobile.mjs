import { spawnSync } from "child_process";
import fs from "fs";
import os from "os";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const outDir = path.join(root, "out");
const statePath = path.join(root, ".mobile-live.json");

function run(cmd, args, env = {}) {
  const result = spawnSync(cmd, args, {
    cwd: root,
    stdio: "inherit",
    shell: true,
    env: { ...process.env, ...env }
  });
  if (result.status !== 0) {
    throw new Error(`${cmd} ${args.join(" ")} failed with code ${result.status}`);
  }
}

function loadEnvFile(fileName) {
  const envPath = path.join(root, fileName);
  if (!fs.existsSync(envPath)) return {};
  const out = {};
  for (const line of fs.readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const i = trimmed.indexOf("=");
    if (i === -1) continue;
    out[trimmed.slice(0, i)] = trimmed.slice(i + 1);
  }
  return out;
}

function lanIpv4() {
  const nets = os.networkInterfaces();
  for (const entries of Object.values(nets)) {
    for (const net of entries || []) {
      if (net.family !== "IPv4" || net.internal) continue;
      if (net.address.startsWith("169.254.")) continue;
      return net.address;
    }
  }
  return null;
}

function ensureWebDir() {
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  const index = path.join(outDir, "index.html");
  if (!fs.existsSync(index)) {
    fs.writeFileSync(
      index,
      "<!doctype html><html><body><p>Origins portal live link placeholder. Open the app while npm run dev is running.</p></body></html>"
    );
  }
}

const mode = process.argv[2] || "on";
const mobileEnv = loadEnvFile(".env.mobile");
const explicitUrl = process.env.CAPACITOR_SERVER_URL || mobileEnv.CAPACITOR_SERVER_URL || "";

if (mode === "off" || mode === "unlink") {
  if (fs.existsSync(statePath)) fs.unlinkSync(statePath);
  ensureWebDir();
  console.log("→ Unlinking APK from live portal (bundled assets mode)…");
  run("npx", ["cap", "sync", "android"], {
    CAPACITOR_SERVER_URL: "",
    MOBILE_LIVE: "0"
  });
  console.log("✓ APK will use packaged /out assets. Rebuild with: npm run mobile:build");
  process.exit(0);
}

const ip = lanIpv4();
const liveUrl =
  explicitUrl ||
  (ip ? `http://${ip}:3002` : "") ||
  "http://10.0.2.2:3002";

if (!explicitUrl && !ip) {
  console.warn("⚠ No LAN IP found — using emulator host URL http://10.0.2.2:3002");
}

fs.writeFileSync(
  statePath,
  JSON.stringify({ url: liveUrl, linkedAt: new Date().toISOString() }, null, 2)
);

ensureWebDir();
console.log(`→ Linking APK WebView to live portal: ${liveUrl}`);
console.log("  Keep `npm run dev` running on this PC (port 3002).");
console.log("  Phone/emulator must reach that URL (same Wi‑Fi, or USB with adb reverse).");

run("npx", ["cap", "sync", "android"], {
  CAPACITOR_SERVER_URL: liveUrl,
  MOBILE_LIVE: "1"
});

console.log("✓ Capacitor synced with live URL.");
console.log("  Next: npm run mobile:apk   (or npm run mobile:live:apk)");
console.log("  Optional USB tunnel: adb reverse tcp:3002 tcp:3002");
console.log(`  Then open the app — portal UI changes appear after refresh/reopen.`);
