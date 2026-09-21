import { useSyncExternalStore } from "react";

function subscribe(callback: () => void): () => void {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getSnapshot(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Hydration-safe replacement for framer-motion's `useReducedMotion`.
 *
 * framer-motion v13 reads the media query during render, so the server
 * (always `false`) and a reduced-motion client (first render `true`)
 * produce different HTML -> React hydration error.
 *
 * This hook returns `false` on the server AND on the first client render
 * (via the server snapshot), then syncs to the real preference after
 * hydration. All conditional `reduce ? A : B` branches below therefore
 * match the SSR output on first paint and only diverge afterwards,
 * which React handles as a normal update.
 */
export function useSafeReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
