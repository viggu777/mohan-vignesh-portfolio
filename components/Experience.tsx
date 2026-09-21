import { Briefcase } from "lucide-react";
import { experience } from "@/data/experience";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/Badge";

export function Experience() {
  return (
    <section
      id="experience"
      aria-label="Professional experience"
      className="relative scroll-mt-20 border-t border-white/[0.06] bg-white/[0.008]"
    >
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <Reveal>
          <SectionHeading
            eyebrow="Experience"
            title="Where I've worked."
            description="Three roles spanning campus web development, full-stack MERN work, and Generative AI product engineering."
          />
        </Reveal>

        <ol className="relative mt-12 space-y-5">
          <span
            aria-hidden="true"
            className="absolute bottom-6 left-[19px] top-2 w-px bg-gradient-to-b from-violet-400/40 via-white/10 to-transparent"
          />
          {experience.map((job, i) => (
            <Reveal key={job.company} delay={i * 0.06}>
              <li className="relative pl-12">
                <span
                  aria-hidden="true"
                  className="absolute left-[11px] top-6 flex h-[18px] w-[18px] items-center justify-center rounded-full border border-white/15 bg-[#0b0b12]"
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${job.current ? "bg-emerald-400" : "bg-zinc-600"}`}
                  />
                </span>
                <article className="rounded-2xl border border-white/[0.07] bg-[#0b0b12]/80 p-6 transition-colors hover:border-white/[0.14] sm:p-7">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="flex flex-wrap items-center gap-2 text-[15px] font-semibold tracking-tight text-white">
                        {job.role} — {job.company}
                        {job.current && (
                          <span className="rounded-full border border-emerald-400/25 bg-emerald-400/10 px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-emerald-300">
                            current
                          </span>
                        )}
                      </p>
                      <p className="mt-1 font-mono text-[12px] text-zinc-500">{job.period}</p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 rounded-md border border-white/[0.07] bg-white/[0.03] px-2.5 py-1.5 font-mono text-[11px] text-zinc-400">
                      <Briefcase className="h-3 w-3" aria-hidden="true" />
                      Internship
                    </span>
                  </div>
                  <p className="mt-3 text-[14.5px] leading-6 text-zinc-300">{job.summary}</p>
                  <ul className="mt-4 space-y-2.5">
                    {job.points.map((pt) => (
                      <li key={pt} className="flex gap-2.5 text-[14px] leading-6 text-zinc-400">
                        <span aria-hidden="true" className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-violet-400/70" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 flex flex-wrap gap-1.5" aria-label={`Technologies at ${job.company}`}>
                    {job.tech.map((t) => (
                      <Badge key={t}>{t}</Badge>
                    ))}
                  </div>
                </article>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
