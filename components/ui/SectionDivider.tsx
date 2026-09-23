import type { SectionAccent } from "@/components/ui/SectionHeading";

/**
 * Quiet session break — a single 1px hairline (Figma `.divider`).
 * Alternating section background tones carry the rhythm instead of
 * glowing accent rules. `accent` is kept for API compatibility.
 */
export function SectionDivider({ accent }: { accent?: SectionAccent }) {
  void accent;
  return (
    <div aria-hidden="true" className="relative">
      <div className="divider" />
    </div>
  );
}
