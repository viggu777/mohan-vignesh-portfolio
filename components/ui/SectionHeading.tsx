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

const accentRule: Record<SectionAccent, string> = {
  emerald: "from-emerald-300/60",
  sky: "from-sky-300/60",
  violet: "from-violet-300/60",
  amber: "from-amber-300/60",
  rose: "from-rose-300/60",
  cyan: "from-cyan-300/60",
};

/**
 * Editorial section header: mono index + eyebrow on a hairline rule,
 * oversized display title, quiet description.
 * `index` ("01") gives every section a dossier number without new content.
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
  title: string;
  description?: string;
  align?: "left" | "center";
  accent?: SectionAccent;
  index?: string;
}) {
  return (
    <div className={cn("min-w-0", align === "center" && "mx-auto text-center")}>
      <div
        className={cn(
          "flex items-center gap-3",
          align === "center" && "justify-center"
        )}
      >
        <p
          className={cn(
            "flex shrink-0 items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.24em]",
            accentText[accent]
          )}
        >
          {index ? (
            <span className="text-slate-500">{index}</span>
          ) : null}
          {index ? <span aria-hidden="true" className="text-slate-600">/</span> : null}
          <span aria-hidden="true">{"//"}</span>
          {eyebrow}
        </p>
        <span
          aria-hidden="true"
          className={cn(
            "h-px min-w-0 flex-1 bg-gradient-to-r to-transparent",
            accentRule[accent],
            align === "center" && "hidden"
          )}
        />
      </div>
      <h2 className="text-balance mt-4 text-[clamp(1.9rem,4.2vw,2.9rem)] font-bold leading-[1.04] tracking-[-0.03em] text-white sm:mt-5">
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-3 max-w-xl text-[13.5px] leading-6 text-slate-500 sm:text-[14.5px] sm:leading-7",
            align === "center" && "mx-auto"
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
