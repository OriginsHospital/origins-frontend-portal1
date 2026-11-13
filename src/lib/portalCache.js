/**
 * Shared portal query cache:
 * - In-memory (instant back-nav / multi-page)
 * - localStorage (long sessions + refresh)
 * - BroadcastChannel / storage events (multi-tab)
 */

const STORAGE_KEY = "portal_query_cache_v1";
const CHANNEL_NAME = "portal_query_cache";
const DEFAULT_STALE_MS = 5 * 60 * 1000; // show cache, skip wait
const DEFAULT_MAX_AGE_MS = 2 * 60 * 60 * 1000; // drop persisted after 2h
const MAX_ENTRIES = 40;

/** @type {Map<string, { data: any, updatedAt: number }>} */
const memory = new Map();
/** @type {Map<string, Promise<any>>} */
const inflight = new Map();
/** @type {Set<(key: string, entry: any) => void>} */
const listeners = new Set();

let hydrated = false;
let channel = null;

function now() {
  return Date.now();
}

function canUseStorage() {
  return typeof window !== "undefined" && typeof localStorage !== "undefined";
}

function notify(key, entry) {
  listeners.forEach(fn => {
    try {
      fn(key, entry);
    } catch {
      /* ignore subscriber errors */
    }
  });
}

function prune(mapLike) {
  const entries = [...mapLike.entries()].sort(
    (a, b) => (b[1]?.updatedAt || 0) - (a[1]?.updatedAt || 0)
  );
  return entries.slice(0, MAX_ENTRIES);
}

function persist() {
  if (!canUseStorage()) return;
  try {
    const payload = {
      savedAt: now(),
      entries: prune(memory).map(([key, value]) => [key, value])
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    /* quota / private mode */
  }
}

function hydrate() {
  if (hydrated || !canUseStorage()) return;
  hydrated = true;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw);
    const entries = Array.isArray(parsed?.entries) ? parsed.entries : [];
    const cutoff = now() - DEFAULT_MAX_AGE_MS;
    for (const [key, value] of entries) {
      if (!key || !value || typeof value.updatedAt !== "number") continue;
      if (value.updatedAt < cutoff) continue;
      if (!memory.has(key)) memory.set(key, value);
    }
  } catch {
    /* corrupt cache */
  }
}

function broadcast(key, entry) {
  if (typeof window === "undefined") return;
  try {
    if (!channel && typeof BroadcastChannel !== "undefined") {
      channel = new BroadcastChannel(CHANNEL_NAME);
      channel.onmessage = event => {
        const { key: k, entry: e } = event.data || {};
        if (!k || !e) return;
        memory.set(k, e);
        notify(k, e);
      };
    }
    channel?.postMessage({ key, entry });
  } catch {
    /* ignore */
  }
}

export function subscribePortalCache(listener) {
  hydrate();
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getCachedQuery(key) {
  hydrate();
  return memory.get(key) || null;
}

export function setCachedQuery(key, data, { broadcastUpdate = true } = {}) {
  hydrate();
  const entry = { data, updatedAt: now() };
  memory.set(key, entry);
  persist();
  notify(key, entry);
  if (broadcastUpdate) broadcast(key, entry);
  return entry;
}

export function invalidatePortalCache(prefixOrKey) {
  hydrate();
  if (!prefixOrKey) {
    memory.clear();
    inflight.clear();
  } else {
    for (const key of [...memory.keys()]) {
      if (key === prefixOrKey || key.startsWith(prefixOrKey)) memory.delete(key);
    }
    for (const key of [...inflight.keys()]) {
      if (key === prefixOrKey || key.startsWith(prefixOrKey)) inflight.delete(key);
    }
  }
  persist();
  notify(prefixOrKey || "*", null);
}

export function clearPortalCache() {
  memory.clear();
  inflight.clear();
  if (canUseStorage()) {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }
  notify("*", null);
}

export function isFresh(entry, staleTime = DEFAULT_STALE_MS) {
  if (!entry?.updatedAt) return false;
  return now() - entry.updatedAt < staleTime;
}

export function isUsable(entry, maxAge = DEFAULT_MAX_AGE_MS) {
  if (!entry?.updatedAt) return false;
  return now() - entry.updatedAt < maxAge;
}

/**
 * Deduped fetch that updates the shared cache.
 */
export async function fetchPortalQuery(key, fetcher, { force = false, staleTime = DEFAULT_STALE_MS } = {}) {
  hydrate();
  const existing = memory.get(key);
  if (!force && existing && isFresh(existing, staleTime)) {
    return existing.data;
  }

  if (inflight.has(key)) return inflight.get(key);

  const promise = Promise.resolve()
    .then(fetcher)
    .then(data => {
      setCachedQuery(key, data);
      return data;
    })
    .finally(() => {
      inflight.delete(key);
    });

  inflight.set(key, promise);
  return promise;
}

export const PORTAL_CACHE_DEFAULTS = {
  staleTime: DEFAULT_STALE_MS,
  maxAge: DEFAULT_MAX_AGE_MS
};

/** Start listening for other-tab localStorage writes (fallback when BC unavailable). */
export function initPortalCacheSync() {
  if (typeof window === "undefined") return () => {};
  hydrate();

  if (typeof BroadcastChannel !== "undefined" && !channel) {
    try {
      channel = new BroadcastChannel(CHANNEL_NAME);
      channel.onmessage = event => {
        const { key: k, entry: e } = event.data || {};
        if (!k || !e) return;
        memory.set(k, e);
        notify(k, e);
      };
    } catch {
      channel = null;
    }
  }

  const onStorage = event => {
    if (event.key !== STORAGE_KEY || !event.newValue) return;
    try {
      const parsed = JSON.parse(event.newValue);
      const entries = Array.isArray(parsed?.entries) ? parsed.entries : [];
      for (const [key, value] of entries) {
        if (!key || !value) continue;
        const current = memory.get(key);
        if (!current || (value.updatedAt || 0) > (current.updatedAt || 0)) {
          memory.set(key, value);
          notify(key, value);
        }
      }
    } catch {
      /* ignore */
    }
  };

  window.addEventListener("storage", onStorage);
  return () => window.removeEventListener("storage", onStorage);
}
