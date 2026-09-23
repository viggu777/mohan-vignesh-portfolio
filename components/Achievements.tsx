import { ArrowUpRight } from "lucide-react";
import { achievements } from "@/data/achievements";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

/* Figma milestone treatment — large serif numeral, strong label,
   small supporting text. Numerals/labels derive from the real
   achievement titles; descriptions and links stay verbatim. */
const display: Record<string, { numeral: string; label: string; note: string }> = {
  code: { numeral: "500+", label: "DSA problems on LeetCode", note: "leetcode · consistency" },
  trophy: { numeral: "Finalist", label: "MVGR Hackathon", note: "hackathon · finalist" },
  users: { numeral: "Lead", label: "CSE Branch Coordinator", note: "leadership · techniverse 2k25" },
};

export function Achievements() {
  return (
    <section
      id="achievements"
      aria-label="Achievements"
      className="relative scroll-mt-20 overflow-hidden"
    >
      <div className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-28">
        <Reveal>
          <SectionHeading
            index="05"
            eyebrow="Achievements"
            accent="rose"
            title="Signals of consistency."
          />
        </Reveal>

        {/* Hairline-divided milestones — shared surface, no cards */}
        <div
          className="mt-12 grid gap-px sm:grid-cols-3"
          style={{ background: "rgba(255,255,255,0.07)" }}
        >
          {achievements.map((a, i) => {
            const d = display[a.icon] ?? { numeral: `0${i + 1}`, label: a.title, note: "signal" };
            return (
              <Reveal key={a.title} delay={i * 0.07} className="min-w-0">
                <article className="group h-full min-w-0 bg-[#070A10] p-8">
                  <p className="tech-label text-[10px] uppercase text-[#3D506A]">{d.note}</p>
                  <p className="mt-4 font-display text-[clamp(2.25rem,5vw,3.5rem)] leading-[1] tracking-[-0.03em] text-[#FB7185]">
                    {d.numeral}
                  </p>
                  <h3 className="mb-1 mt-3 text-[15px] font-medium text-[#EEF2FF]">
                    {d.label}
                  </h3>
                  <p className="text-sm leading-6 text-[#7A90B0]">{a.description}</p>
                  {a.href && (
                    <a
                      href={a.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-flex min-h-[44px] items-center gap-1.5 text-[13.5px] font-semibold text-[#FB7185] transition hover:text-[#EEF2FF]"
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
            );
          })}
        </div>
      </div>
    </section>
  );
}
