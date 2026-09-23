import { profile } from "@/data/profile";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const pillars = [
  {
    symbol: "◈",
    title: "Full-stack engineering",
    text: "React and Next.js frontends, Node + Express APIs, JWT with role-based access — owned end to end, from schema to deployment.",
  },
  {
    symbol: "⚛",
    title: "Web & mobile apps",
    text: "Next.js web apps and React Native mobile apps with Firebase — timetables, productivity flows, dashboards, and clean, usable interfaces.",
  },
  {
    symbol: "✦",
    title: "Deployed, not demoed",
    text: "College-used exam platform for hundreds of concurrent students, a cross-platform study app, and a franchise system with payments and invoicing.",
  },
];

export function About() {
  return (
    <section id="about" aria-label="About me" className="relative scroll-mt-20 overflow-hidden">
      <div className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-28">
        <Reveal>
          <SectionHeading
            index="01"
            eyebrow="About"
            accent="sky"
            title={
              <>
                Full-stack developer{" "}
                <em className="italic text-[#38BDF8]">for web &amp; mobile.</em>
              </>
            }
            description="I build real-world applications with auth, role-based access, REST APIs, databases, payments and deployment — with practical Generative AI features where they actually help."
          />
        </Reveal>

        {/* availability notice — hairline bar, not a filled card */}
        <Reveal delay={0.05}>
          <div className="mt-8 flex flex-col gap-2 border-y border-[rgba(255,255,255,0.07)] py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
            <p className="flex min-w-0 items-start gap-3 text-[14.5px]">
              <span className="relative mt-1.5 flex h-2 w-2 shrink-0">
                <span className="absolute h-full w-full animate-pulse-dot rounded-full bg-emerald-400" />
              </span>
              <span className="min-w-0">
                <span className="font-semibold tracking-tight text-[#EEF2FF]">
                  Looking for Software Developer Internships
                </span>
                <span className="mt-0.5 block text-[13px] leading-6 text-[#7A90B0]">
                  Final-year CSE · graduating Apr 2027 · remote or on-site
                </span>
              </span>
            </p>
            <p className="shrink-0 pl-5 font-mono text-[11px] text-[#7A90B0] sm:pl-0 sm:text-right">
              SDE Intern <span aria-hidden="true">/</span> Full-Stack{" "}
              <span aria-hidden="true">/</span> MERN · Next.js
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-16 lg:grid-cols-[1fr_1fr]">
          {/* Statement — existing essay lead, set large in Figma serif */}
          <Reveal className="min-w-0">
            <div className="min-w-0">
              <p className="text-balance font-display text-[clamp(1.75rem,4vw,2.75rem)] leading-[1.18] tracking-[-0.02em] text-[#EEF2FF]">
                I&apos;m {profile.firstName},{" "}
                <em className="italic text-[#38BDF8]">a Full Stack Developer</em> based in{" "}
                {profile.location}.
              </p>
              <p className="mt-5 max-w-xl text-[14.5px] leading-7 text-[#7A90B0]">
                I work across MERN, Next.js and React Native. Currently a Gen AI Intern at Sariki Technologies working on the FarmTally Next.js
                app, and previously a MERN Stack Intern at Headway Vision on Study Abroad projects.
                I&apos;m actively looking for Software Developer Internships where I can contribute
                across the stack. I care about clean access control, server-authoritative state, and
                apps that hold up under real load — with practical GenAI features where useful.
              </p>

              {/* Education */}
              <aside
                aria-label="Education"
                className="mt-8 rounded border border-[rgba(255,255,255,0.07)] bg-[#111927] p-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-[#EEF2FF]">
                      {profile.education.degree}
                    </p>
                    <p className="mt-0.5 text-sm text-[#7A90B0]">{profile.education.school}</p>
                  </div>
                  <p className="tech-label shrink-0 text-[10px] text-[#38BDF8]">
                    {profile.education.period}
                  </p>
                </div>
                <dl className="mt-4 border-t border-[rgba(255,255,255,0.07)]">
                  {[
                    ["program", "B.Tech · CSE"],
                    ["cgpa", profile.education.cgpa],
                    ["graduating", "Apr 2027"],
                    ["base", profile.location],
                  ].map(([k, v]) => (
                    <div
                      key={k}
                      className="flex items-baseline justify-between gap-4 border-b border-[rgba(255,255,255,0.07)] py-2.5 last:border-b-0"
                    >
                      <dt className="tech-label shrink-0 text-[10px] uppercase text-[#3D506A]">
                        {k}
                      </dt>
                      <dd className="tabular min-w-0 truncate text-[13px] text-[#7A90B0]">{v}</dd>
                    </div>
                  ))}
                </dl>
              </aside>
            </div>
          </Reveal>

          {/* Pillars */}
          <div className="flex min-w-0 flex-col gap-4">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.06} className="min-w-0">
                <div
                  className="flex gap-4 rounded border border-[rgba(255,255,255,0.07)] bg-[#0D1420] p-5"
                >
                  <div
                    aria-hidden="true"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded text-[18px] text-[#38BDF8]"
                    style={{ background: "rgba(56,189,248,0.12)" }}
                  >
                    {p.symbol}
                  </div>
                  <div className="min-w-0">
                    <h3 className="mb-1 text-sm font-medium text-[#EEF2FF]">{p.title}</h3>
                    <p className="text-sm leading-[1.65] text-[#7A90B0]">{p.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
