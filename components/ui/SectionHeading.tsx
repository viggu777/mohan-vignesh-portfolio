import { cn } from "@/lib/utils";

export type SectionAccent = "emerald" | "sky" | "violet" | "amber" | "rose" | "cyan";

const accentText: Record<SectionAccent, string> = {
  emerald: "text-emerald-300",
  sky: "text-sky-300",
  violet: "text-violet-300",
  amber: "text-amber-300",
  rose: "text-rose-300",
  cyan: "text-cyan-300",
};

const accentSlash: Record<SectionAccent, string> = {
  emerald: "text-emerald-400/60",
  sky: "text-sky-400/60",
  violet: "text-violet-400/60",
  amber: "text-amber-400/60",
  rose: "text-rose-400/60",
  cyan: "text-cyan-400/60",
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  accent = "emerald",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  accent?: SectionAccent;
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      <p className={cn("font-mono text-[11px] font-semibold uppercase tracking-[0.24em]", accentText[accent])}>
        <span aria-hidden="true" className={cn("mr-2", accentSlash[accent])}>
          {"//"}
        </span>
        {eyebrow}
      </p>
      <h2 className="text-balance mt-2.5 text-[24px] font-bold leading-[1.12] tracking-[-0.02em] text-white sm:mt-3 sm:text-[32px]">
        {title}
      </h2>
      {description ? (
        <p className="mt-2.5 max-w-xl text-[14px] leading-6 text-slate-400 sm:mt-3 sm:text-[15px] sm:leading-7">{description}</p>
      ) : null}
    </div>
  );
}
