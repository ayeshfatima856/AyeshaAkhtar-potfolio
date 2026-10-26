"use client";

import { useEffect, useRef, useState, useCallback, useSyncExternalStore } from "react";
import { apiGet } from "./types";

/* ---------- generic data fetch hook ---------- */
export function useApi<T>(url: string | null) {
  const [state, setState] = useState<{ d: T | null; e: string | null; v: string }>({
    d: null,
    e: null,
    v: "",
  });
  const [nonce, setNonce] = useState(0);

  useEffect(() => {
    if (!url) return;
    let alive = true;
    apiGet<T>(url)
      .then((d) => {
        if (alive) setState({ d, e: null, v: url });
      })
      .catch((e: Error) => {
        if (alive) setState({ d: null, e: e.message || "Request failed", v: url });
      });
    return () => {
      alive = false;
    };
  }, [url, nonce]);

  const refetch = useCallback(() => setNonce((n) => n + 1), []);

  const loading = !!url && state.v !== url && !state.e;
  return { data: state.d, loading, error: state.e, refetch };
}

/* ---------- animated count-up (starts when visible) ---------- */
export function useCountUp(target: number, duration = 1600, decimals = 0) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          const t0 = performance.now();
          const tick = (now: number) => {
            const p = Math.min(1, (now - t0) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            setValue(parseFloat((target * eased).toFixed(decimals)));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target, duration, decimals]);

  return { ref, value };
}

/* ---------- media query hook ---------- */
export function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (cb: () => void) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    [query]
  );
  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query]);
  const getServerSnapshot = () => false;
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
