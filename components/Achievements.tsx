import { ArrowUpRight } from "lucide-react";
import { achievements } from "@/data/achievements";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const kickers: Record<string, string> = {
  code: "leetcode · consistency",
  trophy: "hackathon · finalist",
  users: "leadership · community",
};

export function Achievements() {
  return (
    <section
      id="achievements"
      aria-label="Achievements"
      className="relative overflow-hidden border-t border-white/[0.06]"
    >
      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-8 sm:py-24">
        <Reveal>
          <SectionHeading
            index="05"
            eyebrow="Achievements"
            accent="rose"
            title="Signals of consistency."
          />
        </Reveal>

        {/* Typographic interlude — airy, oversized titles, top rules.
            No cards, no icon-chips, no dots. */}
        <div className="mt-10 grid gap-10 sm:mt-12 md:grid-cols-3 md:gap-8">
          {achievements.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.07} className="min-w-0">
              <article className="group min-w-0 border-t-2 border-white/[0.12] pt-6">
                <p className="flex items-baseline justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-600">
                  <span className="truncate">{kickers[a.icon] ?? "signal"}</span>
                  <span aria-hidden="true" className="shrink-0 text-slate-700">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </p>
                {/* Large statement type — the whitespace moment */}
                <h3 className="text-balance mt-4 text-[clamp(1.5rem,2.6vw,1.9rem)] font-bold leading-[1.1] tracking-[-0.025em] text-white">
                  {a.title}
                </h3>
                <p className="mt-3 text-[13.5px] leading-6 text-slate-500">{a.description}</p>
                {a.href && (
                  <a
                    href={a.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex min-h-[44px] items-center gap-1.5 text-[13.5px] font-semibold text-rose-200 transition hover:text-rose-100"
                  >
                    {a.linkLabel ?? "View link"}
                    <ArrowUpRight
                      className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </a>
                )}
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
