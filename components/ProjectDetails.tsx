import Link from "next/link";
import { ArrowLeft, ArrowRight, ExternalLink, AlertTriangle } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import type { Project } from "@/types";
import { projects } from "@/data/projects";
import { ProjectVisual } from "@/components/ProjectVisual";
import { Badge } from "@/components/ui/Badge";

export function ProjectDetails({ project }: { project: Project }) {
  const idx = projects.findIndex((p) => p.slug === project.slug);
  const prev = projects[(idx - 1 + projects.length) % projects.length];
  const next = projects[(idx + 1) % projects.length];

  return (
    <article>
      {/* header */}
      <header className="relative overflow-hidden border-b border-white/[0.06]">
        <div aria-hidden="true" className="absolute inset-0">
          <div className="absolute left-1/2 top-[-240px] h-[420px] w-[760px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.16),transparent_65%)] blur-2xl" />
          <div className="bg-grid mask-fade-radial absolute inset-0 opacity-60" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 pb-8 pt-16 sm:px-8 sm:pb-10 sm:pt-24">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-1.5 text-[13px] text-zinc-400 transition hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            All projects
          </Link>
          <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.22em] text-violet-300/90">
            {"// "}{project.categoryLabel}
          </p>
          <h1 className="text-balance mt-3 text-[30px] font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl">
            {project.name}
          </h1>
          <p className="mt-3 text-[16px] font-medium text-zinc-300">{project.tagline}</p>
          <p className="mt-2 font-mono text-[12px] text-zinc-500">
            {project.role}
            {project.year ? ` · ${project.year}` : ""}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg bg-white px-4 py-2.5 text-[13px] font-semibold text-black transition hover:bg-zinc-200"
              >
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                View Live
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/12 bg-white/[0.04] px-4 py-2.5 text-[13px] font-medium text-zinc-100 transition hover:border-white/25 hover:bg-white/[0.08]"
              >
                <GithubIcon className="h-3.5 w-3.5" />
                View GitHub
              </a>
            )}
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-8 sm:py-10">
        <div className="overflow-hidden rounded-2xl border border-white/[0.08]">
          <ProjectVisual project={project} />
        </div>
        <p className="mt-3 font-mono text-[11px] text-zinc-600">{project.replaceImageHint}</p>

        <div className="mt-5 flex flex-wrap gap-1.5" aria-label="Technology stack">
          {project.tech.map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
        </div>

        <div className="mt-6 space-y-3 text-[15px] leading-7 text-zinc-300 sm:mt-7">
          {project.longDescription.map((para, i) => (
            <p key={i} className={i > 0 ? "text-zinc-400" : undefined}>
              {para}
            </p>
          ))}
        </div>

        {project.note && (
          <aside className="mt-6 flex gap-3 rounded-xl border border-amber-300/20 bg-amber-300/[0.06] p-4 text-[13.5px] leading-6 text-amber-100/90">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" aria-hidden="true" />
            <p>{project.note}</p>
          </aside>
        )}

        <section aria-label="Key features" className="mt-8 sm:mt-10">
          <h2 className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-zinc-500">
            {"// "}features
          </h2>
          <div className="mt-3 grid gap-2.5 sm:mt-4 sm:grid-cols-2 sm:gap-3">
            {project.features.map((f) => (
              <div key={f.title} className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-5">
                <h3 className="text-[14.5px] font-semibold text-white">{f.title}</h3>
                <p className="mt-1.5 text-[13.5px] leading-6 text-zinc-400">{f.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section aria-label="Architecture" className="mt-8 sm:mt-10">
          <h2 className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-zinc-500">
            {"// "}architecture
          </h2>
          <ul className="mt-3 space-y-2 sm:mt-4 sm:space-y-2.5">
            {project.architecture.map((a) => (
              <li key={a} className="flex gap-2.5 rounded-xl border border-white/[0.06] bg-[#0b0b12] px-5 py-4 text-[14px] leading-6 text-zinc-300">
                <span aria-hidden="true" className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-cyan-300/70" />
                {a}
              </li>
            ))}
          </ul>
        </section>

        <section aria-label="Implementation details" className="mt-8 sm:mt-10">
          <h2 className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-zinc-500">
            {"// "}implementation
          </h2>
          <ul className="mt-3 grid gap-2 sm:mt-4 sm:grid-cols-2 sm:gap-2.5">
            {project.engineering.map((e) => (
              <li key={e} className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-5 py-4 text-[13.5px] leading-6 text-zinc-400">
                {e}
              </li>
            ))}
          </ul>
        </section>

        <section aria-label="Challenges and trade-offs" className="mt-8 sm:mt-10">
          <h2 className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-zinc-500">
            {"// "}challenges
          </h2>
          <div className="mt-3 space-y-2.5 sm:mt-4 sm:space-y-3">
            {project.challenges.map((c) => (
              <div key={c.problem} className="overflow-hidden rounded-xl border border-white/[0.07]">
                <p className="border-b border-white/[0.06] bg-white/[0.03] px-5 py-3.5 text-[14px] font-medium text-white">
                  {c.problem}
                </p>
                <p className="bg-[#0b0b12] px-5 py-3.5 text-[13.5px] leading-6 text-zinc-400">
                  <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-emerald-300/80">
                    approach —{" "}
                  </span>
                  {c.approach}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* prev / next */}
        <nav aria-label="More projects" className="mt-10 grid gap-2.5 sm:grid-cols-2 sm:gap-3">
          <Link
            href={`/projects/${prev.slug}`}
            className="group rounded-xl border border-white/[0.08] bg-white/[0.02] p-5 transition hover:border-white/[0.16]"
          >
            <span className="flex items-center gap-1.5 font-mono text-[11px] text-zinc-500">
              <ArrowLeft className="h-3 w-3" aria-hidden="true" /> previous
            </span>
            <span className="mt-1.5 block text-[15px] font-semibold text-white group-hover:text-violet-200">
              {prev.name}
            </span>
          </Link>
          <Link
            href={`/projects/${next.slug}`}
            className="group rounded-xl border border-white/[0.08] bg-white/[0.02] p-5 text-right transition hover:border-white/[0.16]"
          >
            <span className="flex items-center justify-end gap-1.5 font-mono text-[11px] text-zinc-500">
              next <ArrowRight className="h-3 w-3" aria-hidden="true" />
            </span>
            <span className="mt-1.5 block text-[15px] font-semibold text-white group-hover:text-violet-200">
              {next.name}
            </span>
          </Link>
        </nav>
      </div>
    </article>
  );
}
