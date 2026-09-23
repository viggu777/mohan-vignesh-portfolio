import type { Project } from "@/types";

/** Controlled accent hex per project/section identity (Figma system). */
export const ACCENT_HEX: Record<Project["accent"], string> = {
  violet: "#A78BFA",
  cyan: "#22D3EE",
  amber: "#FBBF24",
  rose: "#FB7185",
};
