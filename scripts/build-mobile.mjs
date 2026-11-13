import { spawnSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const apiDir = path.join(root, "src", "pages", "api");
const apiBackup = path.join(root, ".mobile-api-backup");
const outDir = path.join(root, "out");

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

function loadEnvMobile() {
  const envPath = path.join(root, ".env.mobile");
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

function sleep(ms) {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
}

function moveDir(src, dest) {
  if (fs.existsSync(dest)) fs.rmSync(dest, { recursive: true, force: true });
  let lastErr;
  for (let i = 0; i < 8; i++) {
    try {
      fs.renameSync(src, dest);
      return;
    } catch (err) {
      lastErr = err;
      // Windows often locks folders while Next/Cursor watch files — copy then delete
      try {
        fs.cpSync(src, dest, { recursive: true, force: true });
        fs.rmSync(src, { recursive: true, force: true });
        return;
      } catch (err2) {
        lastErr = err2;
        sleep(400 * (i + 1));
      }
    }
  }
  throw lastErr;
}

let movedApi = false;

try {
  const mobileEnv = loadEnvMobile();
  console.log("→ Preparing mobile static export…");

  // Clean any leftover in-pages backup from earlier attempts
  const badBackup = path.join(root, "src", "pages", "_api_mobile_backup");
  if (fs.existsSync(badBackup)) {
    if (!fs.existsSync(apiDir)) moveDir(badBackup, apiDir);
    else fs.rmSync(badBackup, { recursive: true, force: true });
  }

  if (fs.existsSync(apiDir)) {
    moveDir(apiDir, apiBackup);
    movedApi = true;
  }

  if (fs.existsSync(outDir)) fs.rmSync(outDir, { recursive: true, force: true });
  if (fs.existsSync(path.join(root, ".next"))) {
    fs.rmSync(path.join(root, ".next"), { recursive: true, force: true });
  }

  run("npx", ["next", "build"], {
    MOBILE_BUILD: "1",
    ...mobileEnv
  });

  if (!fs.existsSync(path.join(outDir, "index.html"))) {
    throw new Error("Static export missing out/index.html — check Next.js export");
  }

  // Packaged APK must not keep a live server.url from a previous mobile:live run
  const liveState = path.join(root, ".mobile-live.json");
  if (fs.existsSync(liveState)) fs.unlinkSync(liveState);

  console.log("→ Syncing Capacitor Android (packaged assets, no live URL)…");
  run("npx", ["cap", "sync", "android"], {
    CAPACITOR_SERVER_URL: "",
    MOBILE_LIVE: "0"
  });

  console.log("✓ Mobile web assets ready in /out and synced to Android");
} finally {
  if (movedApi && fs.existsSync(apiBackup)) {
    if (fs.existsSync(apiDir)) fs.rmSync(apiDir, { recursive: true, force: true });
    moveDir(apiBackup, apiDir);
  }
}
