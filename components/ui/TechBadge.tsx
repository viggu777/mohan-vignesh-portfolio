import { techIcon } from "@/components/tech-icons";
import { cn } from "@/lib/utils";

/**
 * Small elegant technology marker (Figma visual language).
 * Mono by default; `sans` variant for the Skills toolkit grid.
 * Always pairs the tech name with its small vector mark.
 */
export function TechBadge({
  name,
  size = "sm",
  sans = false,
  tone = "elevated",
  className,
}: {
  name: string;
  size?: "sm" | "xs";
  sans?: boolean;
  tone?: "elevated" | "surface";
  className?: string;
}) {
  const { Icon, color } = techIcon(name);
  const iconSize = size === "xs" ? 12 : 14;
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 rounded border",
        sans ? "px-2.5 py-1.5 text-xs" : size === "xs" ? "px-1.5 py-[3px] text-[10px]" : "px-2 py-1 text-[11px]",
        className
      )}
      style={{
        fontFamily: sans
          ? "var(--font-inter), system-ui, sans-serif"
          : "var(--font-jetbrains-mono), ui-monospace, monospace",
        fontWeight: 500,
        letterSpacing: sans ? undefined : "0.03em",
        color,
        borderColor: "rgba(255,255,255,0.12)",
        background: tone === "surface" ? "#0D1420" : "#111927",
      }}
    >
      <Icon size={iconSize} />
      {name}
    </span>
  );
}
