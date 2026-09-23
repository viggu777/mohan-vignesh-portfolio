import Link from "next/link";
import type { Project } from "@/types";
import { FlowStrip } from "@/components/ProjectVisual";
import { TechBadge } from "@/components/ui/TechBadge";
import { ACCENT_HEX } from "@/lib/accent";
import { cn } from "@/lib/utils";

export function ProjectCard({ project }: { project: Project }) {
  const secondaryCount = (project.liveUrl ? 1 : 0) + (project.githubUrl ? 1 : 0);
  // On mobile the primary spans full width and each secondary takes half;
  // a lone secondary also goes full width. Row layout returns on sm+.
  const secondarySpan = secondaryCount === 2 ? "col-span-1" : "col-span-2";
  const accent = ACCENT_HEX[project.accent];
  return (
    <article
      className="group row-hover relative flex h-full min-w-0 flex-col overflow-hidden rounded-lg border border-[rgba(255,255,255,0.07)] bg-[#0D1420] focus-within:border-[rgba(255,255,255,0.2)]"
    >
      {/* Compact flow visual — shared pipeline language, per-project steps */}
      <div className="flex min-h-[120px] items-center justify-center border-b border-[rgba(255,255,255,0.07)] bg-[#111927] px-4 py-7">
        <FlowStrip project={project} />
      </div>

      <div className="flex min-w-0 flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-3">
          <p className="truncate tech-label text-[10px] uppercase text-[#3D506A]">
            {project.categoryLabel}
          </p>
          {project.year && (
            <span className="tabular shrink-0 font-mono text-[11px] text-[#3D506A]">{project.year}</span>
          )}
        </div>
        <h3 className="text-balance mt-2 text-[15px] font-medium leading-snug text-[#EEF2FF] transition-colors group-hover:text-white">
          <Link
            href={`/projects/${project.slug}`}
            aria-label={`${project.name} — view case study`}
            className="after:absolute after:inset-0 after:rounded-lg focus-visible:outline-none"
          >
            {project.name}
          </Link>
        </h3>
        <p className="mt-1 text-[12px] italic" style={{ color: accent }}>
          {project.tagline}
        </p>
        <p className="mt-2 flex-1 text-[12px] leading-[1.65] text-[#7A90B0]">
          {project.description}
        </p>

        <div className="mb-4 mt-3 flex flex-wrap gap-1" aria-label={`${project.name} technologies`}>
          {project.tech.slice(0, 5).map((t) => (
            <TechBadge key={t} name={t} size="xs" />
          ))}
          {project.tech.length > 5 && (
            <span className="inline-flex items-center px-1 font-mono text-[11px] text-[#3D506A]">
              +{project.tech.length - 5}
            </span>
          )}
        </div>

        <div className="mt-auto grid grid-cols-2 gap-2 border-t border-[rgba(255,255,255,0.07)] pt-4 sm:flex sm:flex-wrap sm:items-center">
          <span
            className="tech-label col-span-2 inline-flex min-h-[44px] items-center justify-center rounded px-3.5 py-1.5 text-xs sm:flex-none"
            style={{ background: `${accent}1F`, color: accent, border: `1px solid ${accent}33` }}
          >
            Case study
          </span>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "tech-label relative z-10 inline-flex min-h-[44px] items-center justify-center rounded border border-[rgba(255,255,255,0.07)] px-3.5 py-1.5 text-xs text-[#3D506A] transition hover:text-[#7A90B0] sm:flex-none",
                secondarySpan
              )}
            >
              Live ↗
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.name} GitHub repository`}
              className={cn(
                "tech-label relative z-10 inline-flex min-h-[44px] items-center justify-center rounded border border-[rgba(255,255,255,0.07)] px-3.5 py-1.5 text-xs text-[#3D506A] transition hover:text-[#7A90B0] sm:flex-none",
                secondarySpan
              )}
            >
              GitHub
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
