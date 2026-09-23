import { experience } from "@/data/experience";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { TechBadge } from "@/components/ui/TechBadge";

export function Experience() {
  return (
    <section
      id="experience"
      aria-label="Professional experience"
      className="relative scroll-mt-20 overflow-hidden bg-[#0D1420]"
    >
      <div className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-28">
        <Reveal>
          <SectionHeading
            index="02"
            eyebrow="Experience"
            accent="emerald"
            title="Where I've worked."
            description="Three roles spanning campus web development, full-stack MERN work, and practical GenAI features."
          />
        </Reveal>

        {/* Timeline — thin accent rail, large role type, quiet metadata */}
        <div className="mt-12 max-w-3xl">
          <ol>
            {experience.map((job, i) => (
              <Reveal key={job.company} delay={i * 0.05}>
                <li className="relative">
                  {/* Timeline line */}
                  {i < experience.length - 1 && (
                    <div
                      aria-hidden="true"
                      className="absolute bottom-0 left-[7px] top-8 w-px"
                      style={{ background: "rgba(255,255,255,0.07)" }}
                    />
                  )}

                  <div className="flex gap-6 pb-10">
                    {/* Node */}
                    <div className="mt-1.5 shrink-0">
                      <div
                        aria-hidden="true"
                        className="h-3.5 w-3.5 rounded-full border-2"
                        style={{ borderColor: "#34D399", background: "#0D1420" }}
                      />
                    </div>

                    {/* Content */}
                    <div className="min-w-0 flex-1 pb-2">
                      <div className="mb-2 flex flex-wrap items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h3
                            className="font-display text-[22px] italic leading-[1.2] tracking-[-0.01em] text-[#EEF2FF]"
                          >
                            {job.role}
                          </h3>
                          <p className="mt-0.5 text-sm text-[#34D399]">{job.company}</p>
                        </div>
                        <div className="flex shrink-0 flex-col items-end gap-1">
                          <span className="tech-label text-[10px] text-[#3D506A]">
                            {job.period}
                          </span>
                          {job.current ? (
                            <span className="tech-label inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase text-[#34D399]">
                              <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-[#34D399]" />
                              current
                            </span>
                          ) : (
                            <span className="tech-label text-[10px] uppercase text-[#3D506A]">
                              internship
                            </span>
                          )}
                        </div>
                      </div>
                      <p className="mb-3 max-w-2xl text-sm leading-7 text-[#7A90B0]">
                        {job.summary}
                      </p>
                      <ul className="mb-3 max-w-2xl space-y-2">
                        {job.points.map((pt) => (
                          <li
                            key={pt}
                            className="flex gap-3 text-[14px] leading-6 text-[#7A90B0]"
                          >
                            <span
                              aria-hidden="true"
                              className="mt-[11px] h-px w-4 shrink-0 bg-[#3D506A]"
                            />
                            <span className="min-w-0">{pt}</span>
                          </li>
                        ))}
                      </ul>
                      <div
                        className="flex flex-wrap gap-1.5"
                        aria-label={`Technologies at ${job.company}`}
                      >
                        {job.tech.map((t) => (
                          <TechBadge key={t} name={t} size="xs" />
                        ))}
                      </div>
                    </div>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
