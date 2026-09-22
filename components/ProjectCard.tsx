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

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article
      className={`group card-lift relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-400/12 bg-[#080d18] focus-within:border-emerald-300/40 ${accentBorder[project.accent]}`}
    >
      <ProjectVisual project={project} />

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between gap-3">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-500">
            {project.categoryLabel}
          </p>
          {project.year && (
            <span className="font-mono text-[11px] text-zinc-500">{project.year}</span>
          )}
        </div>
        <h3 className="mt-2 text-xl font-semibold tracking-tight text-white transition-colors group-hover:text-emerald-200">
          <Link
            href={`/projects/${project.slug}`}
            aria-label={`${project.name} — view case study`}
            className="after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none"
          >
            {project.name}
          </Link>
        </h3>
        <p className="mt-1 text-[13.5px] font-medium text-zinc-400">{project.tagline}</p>
        <p className="mt-3 text-[14px] leading-6 text-zinc-400">{project.description}</p>

        <div className="mt-4 flex flex-wrap gap-1.5" aria-label={`${project.name} technologies`}>
          {project.tech.slice(0, 7).map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
          {project.tech.length > 7 && (
            <span className="inline-flex items-center px-1 font-mono text-[11px] text-zinc-500">
              +{project.tech.length - 7}
            </span>
          )}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-2.5 border-t border-slate-400/10 pt-5">
          <span className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg bg-white px-3.5 py-2 text-[13px] font-semibold text-black transition group-hover:bg-slate-200">
            Case study
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </span>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-3.5 py-2 text-[13px] font-medium text-zinc-100 transition hover:border-white/25 hover:bg-white/[0.08]"
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
              className="relative inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-3.5 py-2 text-[13px] font-medium text-zinc-100 transition hover:border-white/25 hover:bg-white/[0.08]"
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
