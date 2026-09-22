import { GraduationCap, Layers, Cpu, Rocket } from "lucide-react";
import { profile } from "@/data/profile";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const pillars = [
  {
    icon: Layers,
    title: "Full-stack engineering",
    text: "React and Next.js frontends, Node + Express APIs, JWT with role-based access — owned end to end, from schema to deployment.",
  },
  {
    icon: Cpu,
    title: "Generative AI & RAG",
    text: "LLM workflows, document ingestion, chunking, embeddings, Atlas Vector Search retrieval, and grounded generation with Llama 3.1 and Hugging Face models.",
  },
  {
    icon: Rocket,
    title: "Deployed, not demoed",
    text: "College-used exam platform for hundreds of concurrent students, a cross-platform study app, and a franchise system with payments and invoicing.",
  },
];

export function About() {
  return (
    <section id="about" aria-label="About me" className="relative scroll-mt-20">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-24">
        <Reveal>
          <SectionHeading
            eyebrow="About"
            title="Engineer across the stack, focused on useful AI."
            description="I build products where the AI actually ships — retrieval pipelines, evaluation paths with fallbacks, and full-stack apps that survive real users, timers, payments, and flaky networks."
          />
        </Reveal>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <article className="card-lift h-full rounded-2xl border border-slate-400/12 bg-white/[0.03] p-6 backdrop-blur hover:border-emerald-300/25 hover:bg-emerald-400/[0.04]">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.05] text-zinc-300">
                  <p.icon className="h-4 w-4" aria-hidden="true" />
                </div>
                <h3 className="mt-4 text-[15px] font-semibold tracking-tight text-white">{p.title}</h3>
                <p className="mt-2 text-[14px] leading-6 text-zinc-400">{p.text}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-4 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
              <div className="rounded-2xl border border-slate-400/12 bg-gradient-to-br from-emerald-400/[0.07] via-white/[0.03] to-violet-400/[0.06] p-6 sm:p-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-zinc-500">
                background
              </p>
              <div className="mt-4 space-y-4 text-[15px] leading-7 text-zinc-300">
                <p>
                  I&apos;m <span className="font-medium text-white">{profile.firstName}</span>, a{" "}
                  Full Stack AI Engineer based in {profile.location}. My work
                  sits at the intersection of{" "}
                  <span className="text-white">Generative AI</span> and{" "}
                  <span className="text-white">full-stack product engineering</span> — RAG assistants,
                  proctored exam infrastructure, and admin systems with real payments.
                </p>
                <p className="text-zinc-400">
                  Currently a Gen AI Intern at Sariki Technologies and previously a MERN Stack Intern at
                  Headway Vision. I care about grounded generation, server-authoritative state, clean
                  access control, and deployments that hold up under load.
                </p>
              </div>
            </div>

            <aside
              aria-label="Education"
              className="rounded-2xl border border-white/[0.07] bg-[#0b0b12] p-6 sm:p-8"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-400/15 text-emerald-300">
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
