import { GraduationCap, Layers, Smartphone, Rocket } from "lucide-react";
import { profile } from "@/data/profile";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const pillars = [
  {
    icon: Layers,
    title: "Full-stack engineering",
    text: "React and Next.js frontends, Node + Express APIs, JWT with role-based access — owned end to end, from schema to deployment.",
    chip: "border-sky-400/20 bg-sky-400/10 text-sky-300",
  },
  {
    icon: Smartphone,
    title: "Web & mobile apps",
    text: "Next.js web apps and React Native mobile apps with Firebase — timetables, productivity flows, dashboards, and clean, usable interfaces.",
    chip: "border-violet-400/20 bg-violet-400/10 text-violet-300",
  },
  {
    icon: Rocket,
    title: "Deployed, not demoed",
    text: "College-used exam platform for hundreds of concurrent students, a cross-platform study app, and a franchise system with payments and invoicing.",
    chip: "border-emerald-400/20 bg-emerald-400/10 text-emerald-300",
  },
];

export function About() {
  return (
    <section id="about" aria-label="About me" className="relative scroll-mt-20 overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute -left-40 top-[-100px] h-[300px] w-[440px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(125,211,252,0.07),transparent_65%)] blur-2xl"
      />
      <div className="relative mx-auto max-w-6xl px-4 py-8 sm:px-8 sm:py-12">
        <Reveal>
          <SectionHeading
            eyebrow="About"
            accent="sky"
            title="Full-stack developer for web & mobile."
            description="I build real-world applications with auth, role-based access, REST APIs, databases, payments and deployment — with practical Generative AI features where they actually help."
          />
        </Reveal>

        {/* open-to-work banner */}
        <Reveal delay={0.05}>
          <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.05] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-5">
            <div className="flex items-start gap-3">
              <span className="relative mt-1 flex h-2.5 w-2.5 shrink-0">
                <span className="absolute h-full w-full animate-pulse-dot rounded-full bg-emerald-400" />
              </span>
              <div>
                <p className="text-[14.5px] font-semibold text-white">
                  Looking for Software Developer Internships
                </p>
                <p className="mt-1 text-[13px] leading-6 text-zinc-400">
                  Final-year CSE student (graduating Apr 2027) · open to remote or on-site roles.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5 pl-5 sm:justify-end sm:pl-0">
              {["SDE Intern", "Full-Stack", "MERN / Next.js"].map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-emerald-400/20 bg-black/30 px-3 py-1 font-mono text-[11px] text-emerald-200"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="mt-3 grid gap-3 sm:mt-4 sm:gap-4 md:grid-cols-3">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08} className="h-full">
              <article className="card-lift h-full rounded-2xl border border-slate-400/12 bg-white/[0.03] p-5 backdrop-blur hover:border-white/[0.14] hover:bg-white/[0.04] sm:p-6">
                <div className={`flex h-9 w-9 items-center justify-center rounded-lg border ${p.chip}`}>
                  <p.icon className="h-4 w-4" aria-hidden="true" />
                </div>
                <h3 className="mt-4 text-[15px] font-semibold tracking-tight text-white">{p.title}</h3>
                <p className="mt-2 text-[14px] leading-6 text-zinc-400">{p.text}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-3 grid gap-3 sm:gap-4 lg:grid-cols-[1.4fr_1fr]">
              <div className="rounded-2xl border border-slate-400/12 bg-white/[0.03] p-5 sm:p-7">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-zinc-500">
                background
              </p>
              <div className="mt-4 space-y-4 text-[15px] leading-7 text-zinc-300">
                <p>
                  I&apos;m <span className="font-medium text-white">{profile.firstName}</span>, a{" "}
                  Full Stack Developer based in {profile.location}. My work
                  sits across <span className="text-white">MERN, Next.js and React Native</span> — exam
                  platforms, study apps, and admin systems with real payments and deployments.
                </p>
                <p className="text-zinc-400">
                  Currently a Gen AI Intern at Sariki Technologies working on the FarmTally Next.js app,
                  and previously a MERN Stack Intern at Headway Vision on Study Abroad projects. I&apos;m
                  actively looking for Software Developer Internships where I can contribute across the
                  stack. I care about clean access control, server-authoritative state, and apps that hold
                  up under real load — with practical GenAI features where useful.
                </p>
              </div>
            </div>

            <aside
              aria-label="Education"
              className="rounded-2xl border border-white/[0.07] bg-[#0b0b12] p-5 sm:p-7"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-sky-400/20 bg-sky-400/10 text-sky-300">
                  <GraduationCap className="h-4 w-4" aria-hidden="true" />
                </div>
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-zinc-500">
                  education
                </p>
              </div>
              <h3 className="mt-4 text-[15px] font-semibold leading-6 text-white">
                {profile.education.degree}
              </h3>
              <p className="mt-1 text-[14px] text-zinc-400">{profile.education.school}</p>
              <dl className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-3.5">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500">cgpa</dt>
                  <dd className="mt-1 text-lg font-semibold text-white">{profile.education.cgpa}</dd>
                </div>
                <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-3.5">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500">
                    graduating
                  </dt>
                  <dd className="mt-1 text-lg font-semibold text-white">Apr 2027</dd>
                </div>
              </dl>
              <p className="mt-4 font-mono text-[11px] text-zinc-600">{profile.education.period}</p>
            </aside>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
