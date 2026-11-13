import { Capacitor, CapacitorHttp } from "@capacitor/core";

const ENV_API = (process.env.NEXT_PUBLIC_API_BASE_URL || "").replace(/\/$/, "");
const PRODUCTION_API = "https://api.originshms.com";

function isNativeApp() {
  if (typeof window === "undefined") return false;
  try {
    return Capacitor.isNativePlatform();
  } catch {
    return Boolean(window.Capacitor?.isNativePlatform?.());
  }
}

function isLocalHost(value = "") {
  return /localhost|127\.0\.0\.1/i.test(value);
}

function isLiveLinkedNative() {
  if (!isNativeApp() || typeof window === "undefined") return false;
  const { protocol, hostname } = window.location || {};
  if (!hostname || isLocalHost(hostname)) return false;
  // Capacitor live `server.url` loads http(s)://LAN_IP:3002 (or a hosted portal)
  return protocol === "http:" || protocol === "https:";
}

/**
 * Browser → same-origin Next proxy (`/api/portal`).
 * Live-linked APK → Next proxy on the PC/host (`origin/api/portal`).
 * Packaged APK → NEXT_PUBLIC_API_BASE_URL or production API (never phone localhost).
 */
function resolveApiBase() {
  const envIsLocal = isLocalHost(ENV_API);

  if (ENV_API && !envIsLocal) return ENV_API;

  if (typeof window === "undefined") {
    return ENV_API || "http://localhost:3000";
  }

  if (isLiveLinkedNative()) {
    // Empty base → portalUrl uses window.location.origin + /api/portal
    return "";
  }

  if (isNativeApp()) {
    return envIsLocal || !ENV_API ? PRODUCTION_API : ENV_API;
  }

  // Desktop browser: prefer Next.js proxy when env points at localhost
  return envIsLocal ? "" : ENV_API;
}

function portalUrl(path) {
  const clean = path.startsWith("/") ? path : `/${path}`;
  const base = resolveApiBase();
  if (base) return `${base}/portal${clean}`;

  if (isLiveLinkedNative()) {
    return `${window.location.origin}/api/portal${clean}`;
  }

  if (isNativeApp()) {
    return `${PRODUCTION_API}/portal${clean}`;
  }

  return `/api/portal${clean}`;
}

export function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("portal_token");
}

export function getStoredUser() {
  if (typeof window === "undefined") return null;
  try {
    return JSON.parse(localStorage.getItem("portal_user") || "null");
  } catch {
    return null;
  }
}

export function setSession(user, token) {
  localStorage.setItem("portal_token", token);
  localStorage.setItem("portal_user", JSON.stringify(user));
}

export function clearSession() {
  localStorage.removeItem("portal_token");
  localStorage.removeItem("portal_user");
}

async function nativeRequest(url, method, headers, body) {
  const response = await CapacitorHttp.request({
    url,
    method,
    headers,
    data: body,
    connectTimeout: 15000,
    readTimeout: 30000
  });

  const raw = response.data;
  const payload =
    typeof raw === "string"
      ? (() => {
          try {
            return JSON.parse(raw);
          } catch {
            return raw;
          }
        })()
      : raw;

  return {
    ok: response.status >= 200 && response.status < 300,
    status: response.status,
    payload
  };
}

async function webRequest(url, method, headers, body) {
  const res = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined
  });

  let payload = null;
  try {
    payload = await res.json();
  } catch {
    payload = null;
  }

  return { ok: res.ok, status: res.status, payload };
}

export async function portalApi(path, options = {}) {
  const { method = "GET", body, auth = true } = options;
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {})
  };

  if (auth) {
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  const url = portalUrl(path);
  let result;
  try {
    result = isNativeApp()
      ? await nativeRequest(url, method, headers, body)
      : await webRequest(url, method, headers, body);
  } catch (err) {
    throw new Error(
      `Cannot reach API at ${resolveApiBase() || "proxy"}. Check internet connection. (${err?.message || "network error"})`
    );
  }

  if (!result.ok) {
    const payload = result.payload;
    const message =
      payload?.message ||
      payload?.error ||
      (typeof payload === "string" ? payload : null) ||
      `Request failed (${result.status})`;
    const err = new Error(message);
    err.status = result.status;
    err.payload = payload;
    throw err;
  }

  const payload = result.payload;
  return payload?.data !== undefined ? payload.data : payload;
}
