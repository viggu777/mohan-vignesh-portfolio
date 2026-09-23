import { cn } from "@/lib/utils";
import type { SectionAccent } from "@/components/ui/SectionHeading";

const dividerLine: Record<SectionAccent, string> = {
  emerald: "from-transparent via-emerald-300/50 to-transparent",
  sky: "from-transparent via-sky-300/50 to-transparent",
  violet: "from-transparent via-violet-300/50 to-transparent",
  amber: "from-transparent via-amber-300/50 to-transparent",
  rose: "from-transparent via-rose-300/50 to-transparent",
  cyan: "from-transparent via-cyan-300/50 to-transparent",
};

const dividerDot: Record<SectionAccent, string> = {
  emerald: "bg-emerald-300",
  sky: "bg-sky-300",
  violet: "bg-violet-300",
  amber: "bg-amber-300",
  rose: "bg-rose-300",
  cyan: "bg-cyan-300",
};

const dividerGlow: Record<SectionAccent, string> = {
  emerald: "rgba(52, 211, 153, 0.09)",
  sky: "rgba(56, 189, 248, 0.09)",
  violet: "rgba(167, 139, 250, 0.09)",
  amber: "rgba(251, 191, 36, 0.09)",
  rose: "rgba(251, 113, 133, 0.09)",
  cyan: "rgba(34, 211, 238, 0.09)",
};

/**
 * Session break — an unmistakable "previous section ended, new one starts"
 * signal between page sections. Gradient hairline in the INCOMING section's
 * accent, soft glow wash, center marker dot. Stronger than a plain border-t
 * so boundaries (especially Home → About) never read as continuous.
 */
export function SectionDivider({ accent = "emerald" }: { accent?: SectionAccent }) {
  return (
    <div aria-hidden="true" className="relative overflow-hidden py-4">
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 55% 130% at 50% 50%, ${dividerGlow[accent]}, transparent 70%)`,
        }}
      />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-8">
        <div className={cn("h-px bg-gradient-to-r", dividerLine[accent])} />
        <span
          className={cn(
            "absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full",
            dividerDot[accent]
          )}
          style={{ boxShadow: `0 0 12px 2px ${dividerGlow[accent]}` }}
        />
      </div>
    </div>
  );
}
