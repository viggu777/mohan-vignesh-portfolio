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
      <p className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-violet-300/90">
        <span aria-hidden="true" className="mr-2 text-violet-400/60">
          {"//"}
        </span>
        {eyebrow}
      </p>
      <h2 className="text-balance mt-3 text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-3 text-[15px] leading-7 text-zinc-400">{description}</p>
      ) : null}
    </div>
  );
}
