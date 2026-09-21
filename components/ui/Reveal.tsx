"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useSafeReducedMotion } from "@/lib/use-safe-reduced-motion";

export function Reveal({
  children,
  delay = 0,
  y = 22,
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
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
