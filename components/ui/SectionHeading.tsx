import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export type SectionAccent = "emerald" | "sky" | "violet" | "amber" | "rose" | "cyan";

const accentText: Record<SectionAccent, string> = {
  emerald: "text-[#34D399]",
  sky: "text-[#38BDF8]",
  violet: "text-[#A78BFA]",
  amber: "text-[#FBBF24]",
  rose: "text-[#FB7185]",
  cyan: "text-[#22D3EE]",
};

const accentRule: Record<SectionAccent, string> = {
  emerald: "#34D399",
  sky: "#38BDF8",
  violet: "#A78BFA",
  amber: "#FBBF24",
  rose: "#FB7185",
  cyan: "#22D3EE",
};

/**
 * Figma section header: mono `// eyebrow` label with a fading accent rule,
 * large serif display title, calm supporting description.
 * `index` is kept for API compatibility but no longer rendered —
 * the Figma system labels sections `// name` only.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  accent = "emerald",
  index,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
  accent?: SectionAccent;
  index?: string;
}) {
  void index;
  return (
    <div className={cn("min-w-0", align === "center" && "mx-auto text-center")}>
      <div className={cn("mb-6 flex items-center gap-2", align === "center" && "justify-center")}>
        <span className={cn("tech-label uppercase", accentText[accent])}>
          {"// "}
          {eyebrow}
        </span>
        <span
          aria-hidden="true"
          className={cn("h-px min-w-0 flex-1", align === "center" && "hidden")}
          style={{
            background: `linear-gradient(90deg, ${accentRule[accent]}33 0%, transparent 60%)`,
          }}
        />
      </div>
      <h2 className="text-balance font-display text-[clamp(1.75rem,3.5vw,2.375rem)] leading-[1.2] tracking-[-0.02em] text-[#EEF2FF]">
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-4 max-w-xl text-[15px] leading-7 text-[#7A90B0]",
            align === "center" && "mx-auto"
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
