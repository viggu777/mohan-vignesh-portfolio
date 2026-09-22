import { profile } from "@/data/profile";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const pillars = [
  {
    index: "01",
    title: "Full-stack engineering",
    text: "React and Next.js frontends, Node + Express APIs, JWT with role-based access — owned end to end, from schema to deployment.",
  },
  {
    index: "02",
    title: "Web & mobile apps",
    text: "Next.js web apps and React Native mobile apps with Firebase — timetables, productivity flows, dashboards, and clean, usable interfaces.",
  },
  {
    index: "03",
    title: "Deployed, not demoed",
    text: "College-used exam platform for hundreds of concurrent students, a cross-platform study app, and a franchise system with payments and invoicing.",
  },
];

export function About() {
  return (
    <section id="about" aria-label="About me" className="relative scroll-mt-20 overflow-hidden">
      <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-8 sm:py-20">
        <Reveal>
          <SectionHeading
            index="01"
            eyebrow="About"
            accent="sky"
            title="Full-stack developer for web & mobile."
            description="I build real-world applications with auth, role-based access, REST APIs, databases, payments and deployment — with practical Generative AI features where they actually help."
          />
        </Reveal>

        {/* availability notice — hairline bar, not a filled card */}
        <Reveal delay={0.05}>
          <div className="mt-8 flex flex-col gap-2 border-y border-white/[0.08] py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
            <p className="flex min-w-0 items-start gap-3 text-[14.5px]">
              <span className="relative mt-1.5 flex h-2 w-2 shrink-0">
                <span className="absolute h-full w-full animate-pulse-dot rounded-full bg-emerald-400" />
              </span>
              <span className="min-w-0">
                <span className="font-semibold tracking-tight text-white">
                  Looking for Software Developer Internships
                </span>
                <span className="mt-0.5 block text-[13px] leading-6 text-slate-500">
                  Final-year CSE · graduating Apr 2027 · remote or on-site
                </span>
              </span>
            </p>
            <p className="shrink-0 pl-5 font-mono text-[11px] text-slate-500 sm:pl-0 sm:text-right">
              SDE Intern <span aria-hidden="true" className="text-slate-700">/</span> Full-Stack{" "}
              <span aria-hidden="true" className="text-slate-700">/</span> MERN · Next.js
            </p>
          </div>
        </Reveal>

        {/* pillars — numbered ledger rows, no cards, no icon-chips */}
        <ol className="mt-2">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.06}>
              <li className="row-hover grid gap-1 border-b border-white/[0.07] py-6 sm:grid-cols-[64px_240px_1fr] sm:items-baseline sm:gap-6">
                <span className="font-mono text-[12px] text-slate-600">{p.index}</span>
                <h3 className="text-[16px] font-semibold tracking-tight text-white sm:text-[17px]">
                  {p.title}
                </h3>
                <p className="max-w-2xl text-[14px] leading-6 text-slate-400">{p.text}</p>
              </li>
            </Reveal>
          ))}
        </ol>

        {/* essay + fact ledger */}
        <div className="mt-10 grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:gap-14">
          <Reveal delay={0.05}>
            <div className="min-w-0">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-slate-600">
                background
              </p>
              {/* Lead paragraph goes large — real scale contrast */}
              <p className="text-balance mt-4 text-[20px] font-medium leading-[1.45] tracking-[-0.01em] text-slate-100 sm:text-[22px]">
                I&apos;m <span className="text-white">{profile.firstName}</span>, a Full Stack
                Developer based in {profile.location} working across{" "}
                <span className="text-white">MERN, Next.js and React Native</span>.
              </p>
              <p className="mt-5 max-w-xl text-[14.5px] leading-7 text-slate-400">
                Currently a Gen AI Intern at Sariki Technologies working on the FarmTally Next.js
                app, and previously a MERN Stack Intern at Headway Vision on Study Abroad projects.
                I&apos;m actively looking for Software Developer Internships where I can contribute
                across the stack. I care about clean access control, server-authoritative state, and
                apps that hold up under real load — with practical GenAI features where useful.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <aside aria-label="Education" className="min-w-0 lg:pl-2">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-slate-600">
                education
              </p>
              <h3 className="text-balance mt-4 text-[17px] font-semibold leading-6 tracking-tight text-white">
                {profile.education.degree}
              </h3>
              <p className="mt-1 text-[14px] text-slate-400">{profile.education.school}</p>
              {/* CGPA as display numeral */}
              <p className="tabular mt-5 text-[44px] font-bold leading-none tracking-[-0.04em] text-white">
                {profile.education.cgpa.replace("/10", "")}
                <span className="text-[18px] font-semibold text-slate-500">/10</span>
              </p>
              <dl className="mt-5 border-t border-white/[0.08]">
                {[
                  ["program", "B.Tech · CSE"],
                  ["period", profile.education.period],
                  ["graduating", "Apr 2027"],
                  ["base", profile.location],
                ].map(([k, v]) => (
                  <div
                    key={k}
                    className="flex items-baseline justify-between gap-4 border-b border-white/[0.07] py-2.5"
                  >
                    <dt className="shrink-0 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-600">
                      {k}
                    </dt>
                    <dd className="min-w-0 truncate text-[13px] text-slate-300">{v}</dd>
                  </div>
                ))}
              </dl>
            </aside>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
