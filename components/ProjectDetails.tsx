import Link from "next/link";
import { ArrowLeft, ArrowRight, AlertTriangle } from "lucide-react";
import type { Project } from "@/types";
import { projects } from "@/data/projects";
import { ProjectVisual } from "@/components/ProjectVisual";
import { TechBadge } from "@/components/ui/TechBadge";
import { ACCENT_HEX } from "@/lib/accent";

export function ProjectDetails({ project }: { project: Project }) {
  const idx = projects.findIndex((p) => p.slug === project.slug);
  const prev = projects[(idx - 1 + projects.length) % projects.length];
  const next = projects[(idx + 1) % projects.length];
  const accent = ACCENT_HEX[project.accent];

  return (
    <article>
      {/* header */}
      <header className="relative overflow-hidden border-b border-[rgba(255,255,255,0.07)]">
        <div aria-hidden="true" className="absolute inset-0">
          <div
            className="absolute left-1/2 top-[-240px] h-[420px] w-[760px] -translate-x-1/2 rounded-full blur-2xl"
            style={{ background: `radial-gradient(ellipse at center, ${accent}29, transparent 65%)` }}
          />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 pb-8 pt-16 sm:px-6 sm:pb-10 sm:pt-24">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-1.5 text-[13px] text-[#7A90B0] transition hover:text-[#EEF2FF]"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            All projects
          </Link>
          <p className="tech-label mt-6 uppercase" style={{ color: accent }}>
            {"// "}
            {project.categoryLabel}
          </p>
          <h1 className="text-balance mt-3 font-display text-[30px] leading-[1.1] tracking-[-0.02em] text-[#EEF2FF] sm:text-5xl">
            {project.name}
          </h1>
          <p className="mt-3 text-[16px] italic" style={{ color: accent }}>
            {project.tagline}
          </p>
          <p className="mt-2 font-mono text-[12px] text-[#3D506A]">
            {project.role}
            {project.year ? ` · ${project.year}` : ""}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="tech-label inline-flex min-h-[44px] items-center rounded px-4 py-2.5 text-xs font-semibold text-white transition hover:brightness-110"
                style={{ background: accent }}
              >
                View Live ↗
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="tech-label inline-flex min-h-[44px] items-center rounded border border-[rgba(255,255,255,0.12)] px-4 py-2.5 text-xs text-[#7A90B0] transition hover:text-[#EEF2FF]"
              >
                View GitHub
              </a>
            )}
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-10">
        <div className="overflow-hidden rounded-lg border border-[rgba(255,255,255,0.07)]">
          <ProjectVisual project={project} />
        </div>
        <p className="mt-3 font-mono text-[11px] text-[#3D506A]">{project.replaceImageHint}</p>

        <div className="mt-5 flex flex-wrap gap-1.5" aria-label="Technology stack">
          {project.tech.map((t) => (
            <TechBadge key={t} name={t} size="xs" />
          ))}
        </div>

        <div className="mt-6 space-y-3 text-[15px] leading-7 text-[#7A90B0] sm:mt-7">
          {project.longDescription.map((para, i) => (
            <p key={i} className={i > 0 ? undefined : "text-[#EEF2FF]"}>
              {para}
            </p>
          ))}
        </div>

        {project.note && (
          <aside
            className="mt-6 flex gap-3 rounded border p-4 text-[13.5px] leading-6"
            style={{
              borderColor: "rgba(251,191,36,0.2)",
              background: "rgba(251,191,36,0.06)",
              color: "rgba(253,230,180,0.9)",
            }}
          >
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-[#FBBF24]" aria-hidden="true" />
            <p>{project.note}</p>
          </aside>
        )}

        <section aria-label="Key features" className="mt-10">
          <h2 className="tech-label uppercase text-[#3D506A]">
            {"// "}features
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {project.features.map((f) => (
              <div
                key={f.title}
                className="rounded border border-[rgba(255,255,255,0.07)] bg-[#111927] p-5"
              >
                <h3 className="text-[14.5px] font-semibold text-[#EEF2FF]">{f.title}</h3>
                <p className="mt-1.5 text-[13.5px] leading-6 text-[#7A90B0]">{f.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section aria-label="Architecture" className="mt-10">
          <h2 className="tech-label uppercase text-[#3D506A]">
            {"// "}architecture
          </h2>
          <ul className="mt-4 space-y-2.5">
            {project.architecture.map((a) => (
              <li
                key={a}
                className="flex gap-2.5 rounded border border-[rgba(255,255,255,0.07)] bg-[#0D1420] px-5 py-4 text-[14px] leading-6 text-[#7A90B0]"
              >
                <span
                  aria-hidden="true"
                  className="mt-[9px] h-1 w-1 shrink-0 rounded-full"
                  style={{ background: accent }}
                />
                {a}
              </li>
            ))}
          </ul>
        </section>

        <section aria-label="Implementation details" className="mt-10">
          <h2 className="tech-label uppercase text-[#3D506A]">
            {"// "}implementation
          </h2>
          <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
            {project.engineering.map((e) => (
              <li
                key={e}
                className="rounded border border-[rgba(255,255,255,0.07)] bg-[#111927] px-5 py-4 text-[13.5px] leading-6 text-[#7A90B0]"
              >
                {e}
              </li>
            ))}
          </ul>
        </section>

        <section aria-label="Challenges and trade-offs" className="mt-10">
          <h2 className="tech-label uppercase text-[#3D506A]">
            {"// "}challenges
          </h2>
          <div className="mt-4 space-y-3">
            {project.challenges.map((c) => (
              <div
                key={c.problem}
                className="overflow-hidden rounded border border-[rgba(255,255,255,0.07)]"
              >
                <p className="border-b border-[rgba(255,255,255,0.07)] bg-[#111927] px-5 py-3.5 text-[14px] font-medium text-[#EEF2FF]">
                  {c.problem}
                </p>
                <p className="bg-[#0D1420] px-5 py-3.5 text-[13.5px] leading-6 text-[#7A90B0]">
                  <span className="tech-label uppercase text-[#34D399]">
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
            className="group rounded border border-[rgba(255,255,255,0.07)] bg-[#0D1420] p-5 transition hover:border-[rgba(255,255,255,0.12)]"
          >
            <span className="flex items-center gap-1.5 font-mono text-[11px] text-[#3D506A]">
              <ArrowLeft className="h-3 w-3" aria-hidden="true" /> previous
            </span>
            <span className="mt-1.5 block text-[15px] font-semibold text-[#EEF2FF] group-hover:text-white">
              {prev.name}
            </span>
          </Link>
          <Link
            href={`/projects/${next.slug}`}
            className="group rounded border border-[rgba(255,255,255,0.07)] bg-[#0D1420] p-5 text-right transition hover:border-[rgba(255,255,255,0.12)]"
          >
            <span className="flex items-center justify-end gap-1.5 font-mono text-[11px] text-[#3D506A]">
              next <ArrowRight className="h-3 w-3" aria-hidden="true" />
            </span>
            <span className="mt-1.5 block text-[15px] font-semibold text-[#EEF2FF] group-hover:text-white">
              {next.name}
            </span>
          </Link>
        </nav>
      </div>
    </article>
  );
}
