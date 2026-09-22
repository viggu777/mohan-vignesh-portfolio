"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useSafeReducedMotion } from "@/lib/use-safe-reduced-motion";

/**
 * Scroll reveal — transform + opacity only (compositor-friendly, no layout shift).
 * Reduced y (16 vs 22) cuts perceived CLS; margin triggers slightly earlier
 * so content is settled before it enters the viewport.
 */
export function Reveal({
  children,
  delay = 0,
  y = 16,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  // Hydration-safe: false on server + first client render, so the
  // server HTML and the hydrated tree always match.
  const reduce = useSafeReducedMotion();
  if (reduce) {
    return <div className={className}>{children}</div>;
  }
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
