import { cn } from "@/lib/utils";

/**
 * Quiet mono token — hairline border, no fill fight.
 * Used for tech lists; keeps density high without card noise.
 */
export function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center rounded-md border border-white/[0.09] bg-transparent px-2 py-1 font-mono text-[11px] leading-none text-slate-400 transition-colors hover:border-white/20 hover:text-slate-200",
        className
      )}
    >
      {children}
    </span>
  );
}
