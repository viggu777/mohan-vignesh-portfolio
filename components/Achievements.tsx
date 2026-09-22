import { Code2, Trophy, Users, ArrowUpRight } from "lucide-react";
import { achievements } from "@/data/achievements";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const icons = {
  code: Code2,
  trophy: Trophy,
  users: Users,
};

const iconChips = {
  code: "border-sky-400/20 bg-sky-400/10 text-sky-300",
  trophy: "border-amber-300/20 bg-amber-300/10 text-amber-300",
  users: "border-rose-400/20 bg-rose-400/10 text-rose-300",
};

export function Achievements() {
  return (
    <section id="achievements" aria-label="Achievements" className="relative overflow-hidden border-t border-white/[0.06]">
      <div
        aria-hidden="true"
        className="absolute -left-40 top-[-100px] h-[280px] w-[420px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(251,113,133,0.07),transparent_65%)] blur-2xl"
      />
      <div className="relative mx-auto max-w-6xl px-4 py-8 sm:px-8 sm:py-12">
        <Reveal>
          <SectionHeading
            eyebrow="Achievements"
            accent="rose"
            title="Signals of consistency."
          />
        </Reveal>
        <div className="mt-6 grid gap-3 sm:gap-4 md:grid-cols-3">
          {achievements.map((a, i) => {
            const Icon = icons[a.icon];
            return (
              <Reveal key={a.title} delay={i * 0.07} className="h-full">
                <article className="card-lift flex h-full flex-col rounded-2xl border border-slate-400/12 bg-white/[0.03] p-5 hover:border-white/[0.14] hover:bg-white/[0.04] sm:p-6">
                  <div className={`flex h-9 w-9 items-center justify-center rounded-lg border ${iconChips[a.icon]}`}>
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
                      className="mt-4 inline-flex items-center gap-1 text-[13px] font-semibold text-rose-300 transition hover:text-rose-200"
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
