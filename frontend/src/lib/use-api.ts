"use client";

import { useState, useEffect, useCallback, useRef } from "react";

type UseApiState<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
};

/**
 * Lightweight data-fetching hook.
 * Usage: const { data, loading } = useApi(() => metricsApi.overview());
 */
export function useApi<T>(fetcher: () => Promise<T>, deps: unknown[] = []): UseApiState<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetcher();
      setData(result);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

// ── Polling hook ─────────────────────────────────────────

type UsePollingState<T> = UseApiState<T> & {
  /** Whether polling is currently active */
  polling: boolean;
  /** Manually stop polling */
  stop: () => void;
  /** Manually start polling */
  start: () => void;
};

/**
 * Polling hook — repeatedly calls the fetcher until a condition is met.
 *
 * Usage:
 *   const { data } = usePolling(
 *     () => diagnosisApi.get(id),
 *     (d) => d.status !== "running",  // stop when not running
 *     2000,                           // poll every 2s
 *   );
 */
export function usePolling<T>(
  fetcher: () => Promise<T>,
  /** Return true to STOP polling */
  stopCondition: (data: T) => boolean,
  intervalMs = 2000,
  deps: unknown[] = [],
  /** Set to false to prevent polling from starting. Defaults to true when deps are all truthy. */
  enabled?: boolean,
): UsePollingState<T> {
  // Auto-enable when all deps are truthy (e.g. runningId is set)
  const isEnabled = enabled ?? deps.every(Boolean);

  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [polling, setPolling] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pollingRef = useRef(false);

  const fetchData = useCallback(async () => {
    try {
      const result = await fetcher();
      setData(result);
      setError(null);
      if (stopCondition(result)) {
        setPolling(false);
        pollingRef.current = false;
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  const stop = useCallback(() => {
    setPolling(false);
    pollingRef.current = false;
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const start = useCallback(() => {
    setPolling(true);
    pollingRef.current = true;
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    // Clean up any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (!isEnabled) {
      setPolling(false);
      pollingRef.current = false;
      return;
    }

    // Start polling
    setLoading(true);
    setPolling(true);
    pollingRef.current = true;
    fetchData();

    intervalRef.current = setInterval(() => {
      if (pollingRef.current) {
        fetchData();
      }
    }, intervalMs);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [fetchData, intervalMs, isEnabled]);

  const refetch = fetchData;

  return { data, loading, error, refetch, polling, stop, start };
}
