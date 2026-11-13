import { useCallback, useEffect, useRef, useState } from "react";
import { portalApi } from "@/lib/api";
import {
  fetchPortalQuery,
  getCachedQuery,
  isFresh,
  isUsable,
  PORTAL_CACHE_DEFAULTS,
  setCachedQuery,
  subscribePortalCache
} from "@/lib/portalCache";

/**
 * Cached portal GET. Instantly shows last data when navigating back / switching pages / tabs.
 *
 * @param {string|null} path - API path, e.g. "/patient/dashboard". Null skips fetch.
 * @param {{ staleTime?: number, maxAge?: number, enabled?: boolean, initialData?: any }} [options]
 */
export function usePortalQuery(path, options = {}) {
  const {
    staleTime = PORTAL_CACHE_DEFAULTS.staleTime,
    maxAge = PORTAL_CACHE_DEFAULTS.maxAge,
    enabled = true,
    initialData
  } = options;

  const key = path || null;
  const cached = key ? getCachedQuery(key) : null;
  const seed =
    cached && isUsable(cached, maxAge)
      ? cached.data
      : initialData !== undefined
        ? initialData
        : undefined;

  const [data, setData] = useState(seed);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(enabled && key && seed === undefined);
  const [refreshing, setRefreshing] = useState(false);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (!key) return undefined;
    return subscribePortalCache((changedKey, entry) => {
      if (changedKey !== "*" && changedKey !== key) return;
      if (!mounted.current) return;
      if (entry && isUsable(entry, maxAge)) {
        setData(entry.data);
        setError("");
        setLoading(false);
      }
    });
  }, [key, maxAge]);

  const run = useCallback(
    async ({ force = false } = {}) => {
      if (!enabled || !key) return;

      const existing = getCachedQuery(key);
      const hasUsable = existing && isUsable(existing, maxAge);
      const hasFresh = existing && isFresh(existing, staleTime);

      if (hasUsable && !force) {
        if (mounted.current) {
          setData(existing.data);
          setLoading(false);
        }
        if (hasFresh) return existing.data;
      } else if (!hasUsable && mounted.current) {
        setLoading(true);
      }

      if (mounted.current && hasUsable) setRefreshing(true);

      try {
        const next = await fetchPortalQuery(
          key,
          () => portalApi(key),
          { force, staleTime }
        );
        if (!mounted.current) return next;
        setData(next);
        setError("");
        return next;
      } catch (err) {
        if (!mounted.current) return;
        // Keep showing cached data on soft refresh failures
        if (!hasUsable) setError(err.message || "Request failed");
        throw err;
      } finally {
        if (mounted.current) {
          setLoading(false);
          setRefreshing(false);
        }
      }
    },
    [enabled, key, maxAge, staleTime]
  );

  useEffect(() => {
    if (!enabled || !key) {
      setLoading(false);
      return;
    }
    run().catch(() => {});
  }, [enabled, key, run]);

  const refetch = useCallback(() => run({ force: true }), [run]);

  const mutate = useCallback(
    nextData => {
      if (!key) return;
      setCachedQuery(key, nextData);
      setData(nextData);
      setError("");
      setLoading(false);
    },
    [key]
  );

  return {
    data,
    error,
    loading,
    refreshing,
    refetch,
    mutate,
    setError
  };
}
