import { experience } from "@/data/experience";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/Badge";

export function Experience() {
  return (
    <section
      id="experience"
      aria-label="Professional experience"
      className="relative scroll-mt-20 overflow-hidden"
    >
      <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-8 sm:py-20">
        <Reveal>
          <SectionHeading
            index="02"
            eyebrow="Experience"
            accent="emerald"
            title="Where I've worked."
            description="Three roles spanning campus web development, full-stack MERN work, and practical GenAI features."
          />
        </Reveal>

        {/* Resume ledger — no timeline spine, no cards */}
        <ol className="mt-8 border-t border-white/[0.09]">
          {experience.map((job, i) => (
            <Reveal key={job.company} delay={i * 0.05}>
              <li className="row-hover grid gap-5 border-b border-white/[0.08] py-8 hover:bg-white/[0.012] sm:py-9 lg:grid-cols-[250px_1fr] lg:gap-10">
                {/* Left meta rail */}
                <div className="min-w-0">
                  <p className="flex items-center gap-2.5 font-mono text-[11px] text-slate-500">
                    <span className="text-slate-600">{String(i + 1).padStart(2, "0")}</span>
                    <span aria-hidden="true" className="h-px w-6 bg-white/15" />
                    <span className="truncate">{job.period}</span>
                  </p>
                  <p className="mt-3 text-[19px] font-bold leading-tight tracking-[-0.02em] text-white sm:text-[21px]">
                    {job.company}
                  </p>
                  <p className="mt-1 text-[14px] font-medium text-slate-300">{job.role}</p>
                  <p className="mt-3 flex flex-wrap items-center gap-2">
                    {job.current ? (
                      <span className="inline-flex items-center gap-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald-300">
                        <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-emerald-400" />
                        current
                      </span>
                    ) : (
                      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-600">
                        internship
                      </span>
                    )}
                  </p>
                </div>

                {/* Right detail */}
                <div className="min-w-0">
                  <p className="max-w-2xl text-[15px] font-medium leading-7 text-slate-200">
                    {job.summary}
                  </p>
                  <ul className="mt-4 max-w-2xl space-y-2.5">
                    {job.points.map((pt) => (
                      <li key={pt} className="flex gap-3 text-[14px] leading-6 text-slate-400">
                        <span aria-hidden="true" className="mt-[11px] h-px w-4 shrink-0 bg-slate-600" />
                        <span className="min-w-0">{pt}</span>
                      </li>
                    ))}
                  </ul>
                  <div
                    className="mt-5 flex flex-wrap gap-1.5"
                    aria-label={`Technologies at ${job.company}`}
                  >
                    {job.tech.map((t) => (
                      <Badge key={t}>{t}</Badge>
                    ))}
                  </div>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
