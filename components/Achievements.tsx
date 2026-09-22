import { Code2, Trophy, Users, ArrowUpRight } from "lucide-react";
import { achievements } from "@/data/achievements";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const icons = {
  code: Code2,
  trophy: Trophy,
  users: Users,
};

export function Achievements() {
  return (
    <section aria-label="Achievements" className="relative border-t border-white/[0.06]">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
        <Reveal>
          <SectionHeading
            eyebrow="Achievements"
            title="Signals of consistency."
          />
        </Reveal>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {achievements.map((a, i) => {
            const Icon = icons[a.icon];
            return (
              <Reveal key={a.title} delay={i * 0.07}>
                <article className="card-lift flex h-full flex-col rounded-2xl border border-slate-400/12 bg-white/[0.03] p-6 hover:border-emerald-300/25 hover:bg-emerald-400/[0.04]">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.05] text-zinc-200">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 text-[15px] font-semibold tracking-tight text-white">
                    {a.title}
                  </h3>
                  <p className="mt-2 flex-1 text-[13.5px] leading-6 text-zinc-400">{a.description}</p>
                  {a.href && (
                    <a
                      href={a.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-1 text-[13px] font-semibold text-emerald-300 transition hover:text-emerald-200"
                    >
                      {a.linkLabel ?? "View link"}
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  )}
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
