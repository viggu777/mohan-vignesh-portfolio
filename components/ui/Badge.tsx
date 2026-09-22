import { cn } from "@/lib/utils";

export function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border border-slate-400/15 bg-white/[0.04] px-2 py-1 font-mono text-[11px] leading-none text-slate-300",
        className
      )}
    >
      {children}
    </span>
  );
}
