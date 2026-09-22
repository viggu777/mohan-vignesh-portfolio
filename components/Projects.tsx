"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import type { Project, ProjectCategory } from "@/types";
import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectVisual } from "@/components/ProjectVisual";
import { Badge } from "@/components/ui/Badge";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

const filters: Array<"All" | ProjectCategory> = ["All", "Full Stack", "Mobile", "AI", "AI Integration"];

const featureGlow: Record<Project["accent"], string> = {
  violet: "bg-[radial-gradient(ellipse_60%_50%_at_30%_20%,rgba(167,139,250,0.12),transparent_70%)]",
  cyan: "bg-[radial-gradient(ellipse_60%_50%_at_30%_20%,rgba(34,211,238,0.10),transparent_70%)]",
  amber: "bg-[radial-gradient(ellipse_60%_50%_at_30%_20%,rgba(251,191,36,0.10),transparent_70%)]",
  rose: "bg-[radial-gradient(ellipse_60%_50%_at_30%_20%,rgba(251,113,133,0.10),transparent_70%)]",
};

/**
 * Magazine layout: one full-bleed feature (large ProjectVisual) +
 * compact 2-col grid for the rest. Underline filter tabs, no boxes.
 */
export function Projects() {
  const [active, setActive] = useState<(typeof filters)[number]>("All");

  const visible = useMemo(
    () =>
      active === "All"
        ? projects
        : projects.filter((p) => p.categories.includes(active)),
    [active]
  );

  const showFeature = active === "All" && visible.length > 0;
  const [featured, ...rest] = visible;
  const gridItems = showFeature ? rest : visible;

  return (
    <section
      id="projects"
      aria-label="Featured projects"
      className="relative scroll-mt-20 overflow-hidden border-t border-white/[0.06]"
    >
      <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-8 sm:py-20">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <Reveal className="min-w-0">
            <SectionHeading
              index="03"
              eyebrow="Featured projects"
              accent="violet"
              title="Production systems, different problems."
              description="Each opens a case study with architecture, features, and engineering trade-offs. Previews are illustrative diagrams — not screenshots."
            />
          </Reveal>
          <Reveal delay={0.08}>
            <p className="tabular font-mono text-[12px] text-slate-600">
              {String(visible.length).padStart(2, "0")}
              <span className="text-slate-700"> / {String(projects.length).padStart(2, "0")}</span>
            </p>
          </Reveal>
        </div>

        {/* Underline tabs — scrollable on mobile, 44px targets */}
        <Reveal delay={0.05}>
          <div
            role="group"
            aria-label="Filter projects by category"
            className="no-scrollbar -mx-4 mt-6 flex gap-0.5 overflow-x-auto border-b border-white/[0.08] px-4 sm:mx-0 sm:px-0"
          >
            {filters.map((f) => {
              const isActive = active === f;
              return (
                <button
                  key={f}
                  type="button"
                  onClick={() => setActive(f)}
                  aria-pressed={isActive}
                  data-active={isActive}
                  className={cn(
                    "filter-tab inline-flex min-h-[44px] flex-none items-center whitespace-nowrap px-3.5 py-2.5 text-[13px] font-medium transition-colors sm:px-4",
                    isActive ? "text-white" : "text-slate-500 hover:text-slate-200"
                  )}
                >
                  {f}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Feature — the ProjectVisual showcase */}
        {showFeature && featured && (
          <Reveal delay={0.05}>
            <article className="group relative mt-8 overflow-hidden rounded-2xl border border-white/[0.09] bg-[#080d18]">
              <div aria-hidden="true" className={cn("absolute inset-0", featureGlow[featured.accent])} />
              <div className="relative grid min-w-0 lg:grid-cols-[1.15fr_0.85fr]">
                <div className="relative min-w-0 overflow-hidden border-b border-white/[0.07] lg:border-b-0 lg:border-r">
                  <div className="h-full transition-transform duration-500 ease-out group-hover:scale-[1.012]">
                    <ProjectVisual project={featured} />
                  </div>
                  <span className="absolute left-4 top-4 z-[2] rounded-full border border-white/15 bg-black/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-slate-200 backdrop-blur">
                    ★ featured
                  </span>
                </div>
                <div className="relative flex min-w-0 flex-col justify-center p-6 pb-7 sm:p-8 sm:pb-10">
                  <p className="truncate font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">
                    {featured.categoryLabel}
                  </p>
                  <h3 className="text-balance mt-3 text-[clamp(1.6rem,3.4vw,2.2rem)] font-bold leading-[1.05] tracking-[-0.03em] text-white">
                    <Link
                      href={`/projects/${featured.slug}`}
                      aria-label={`${featured.name} — view case study`}
                      className="after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none"
                    >
                      {featured.name}
                    </Link>
                  </h3>
                  <p className="mt-2 text-[13.5px] font-medium text-slate-400">{featured.tagline}</p>
                  <p className="mt-3 max-w-md text-[14px] leading-6 text-slate-400">
                    {featured.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5" aria-label={`${featured.name} technologies`}>
                    {featured.tech.slice(0, 6).map((t) => (
                      <Badge key={t}>{t}</Badge>
                    ))}
                  </div>
                  <div className="relative z-10 mt-6 flex flex-wrap items-center gap-2">
                    <span className="inline-flex min-h-[44px] items-center gap-1.5 rounded-lg bg-white px-4 py-2.5 text-[13.5px] font-semibold text-black transition group-hover:bg-slate-200">
                      Read case study
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </span>
                    {featured.liveUrl && (
                      <a
                        href={featured.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-[44px] items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2.5 text-[13px] font-medium text-zinc-100 transition hover:border-white/25 hover:bg-white/[0.08]"
                      >
                        <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                        Live
                      </a>
                    )}
                    {featured.githubUrl && (
                      <a
                        href={featured.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${featured.name} GitHub repository`}
                        className="inline-flex min-h-[44px] items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2.5 text-[13px] font-medium text-zinc-100 transition hover:border-white/25 hover:bg-white/[0.08]"
                      >
                        <GithubIcon className="h-3.5 w-3.5" />
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </article>
          </Reveal>
        )}

        {/* Grid — 2-col for air (was cramped 3-col) */}
        <div className="mt-5 grid min-w-0 grid-cols-1 gap-5 sm:grid-cols-2 lg:items-stretch">
          {gridItems.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 2) * 0.06} className="h-full min-w-0">
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>

        <p className="mt-5 font-mono text-[11px] leading-5 text-slate-600">
          Showing {visible.length} of {projects.length} — {active}
        </p>
      </div>
    </section>
  );
}
