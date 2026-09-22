import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-emerald-300">
        <span aria-hidden="true" className="mr-2 text-emerald-400/60">
          {"//"}
        </span>
        {eyebrow}
      </p>
      <h2 className="text-balance mt-3 text-[28px] font-bold leading-[1.1] tracking-[-0.02em] text-white sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-3 max-w-xl text-[14.5px] leading-7 text-slate-400 sm:text-[15px]">{description}</p>
      ) : null}
    </div>
  );
}
