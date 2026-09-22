import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import type { Project } from "@/types";
import { ProjectVisual } from "@/components/ProjectVisual";
import { Badge } from "@/components/ui/Badge";

const accentBorder: Record<Project["accent"], string> = {
  violet: "hover:border-violet-300/35",
  cyan: "hover:border-cyan-300/35",
  amber: "hover:border-amber-300/35",
  rose: "hover:border-rose-300/35",
};

const accentText: Record<Project["accent"], string> = {
  violet: "group-hover:text-violet-200",
  cyan: "group-hover:text-cyan-200",
  amber: "group-hover:text-amber-200",
  rose: "group-hover:text-rose-200",
};

export function ProjectCard({ project }: { project: Project }) {
  const secondaryCount = (project.liveUrl ? 1 : 0) + (project.githubUrl ? 1 : 0);
  // On mobile the primary spans full width and each secondary takes half;
  // a lone secondary also goes full width. Row layout returns on sm+.
  const secondarySpan = secondaryCount === 2 ? "col-span-1" : "col-span-2";
  return (
    <article
      className={`group row-hover relative flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-[#080d18] focus-within:border-emerald-300/40 ${accentBorder[project.accent]}`}
    >
      {/* Visual zooms subtly on hover — GPU transform on inner layer only */}
      <div className="overflow-hidden">
        <div className="transition-transform duration-500 ease-out group-hover:scale-[1.015]">
          <ProjectVisual project={project} />
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col p-5 pb-6 sm:p-6 sm:pb-7">
        <div className="flex items-center justify-between gap-3">
          <p className="truncate font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">
            {project.categoryLabel}
          </p>
          {project.year && (
            <span className="tabular shrink-0 font-mono text-[11px] text-slate-600">{project.year}</span>
          )}
        </div>
        <h3
          className={`mt-2.5 text-balance text-[21px] font-bold leading-tight tracking-[-0.02em] text-white transition-colors ${accentText[project.accent]}`}
        >
          <Link
            href={`/projects/${project.slug}`}
            aria-label={`${project.name} — view case study`}
            className="after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none"
          >
            {project.name}
          </Link>
        </h3>
        <p className="mt-1 text-[13px] font-medium text-slate-500">{project.tagline}</p>
        <p className="mt-3 text-[13.5px] leading-6 text-slate-400">{project.description}</p>

        <div className="mb-6 mt-4 flex flex-wrap gap-1.5" aria-label={`${project.name} technologies`}>
          {project.tech.slice(0, 5).map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
          {project.tech.length > 5 && (
            <span className="inline-flex items-center px-1 font-mono text-[11px] text-slate-600">
              +{project.tech.length - 5}
            </span>
          )}
        </div>

        <div className="mt-auto grid grid-cols-2 gap-2 border-t border-white/[0.07] pt-5 sm:flex sm:flex-wrap sm:items-center">
          <span className="col-span-2 inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-lg bg-white px-3.5 py-2 text-[13px] font-semibold text-black transition group-hover:bg-slate-200 sm:flex-none">
            Case study
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </span>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`relative z-10 inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-3.5 py-2 text-[13px] font-medium text-zinc-100 transition hover:border-white/25 hover:bg-white/[0.08] sm:flex-none ${secondarySpan}`}
            >
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              Live
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.name} GitHub repository`}
              className={`relative z-10 inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-3.5 py-2 text-[13px] font-medium text-zinc-100 transition hover:border-white/25 hover:bg-white/[0.08] sm:flex-none ${secondarySpan}`}
            >
              <GithubIcon className="h-3.5 w-3.5" />
              GitHub
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
