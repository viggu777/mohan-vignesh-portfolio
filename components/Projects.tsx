"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { ProjectCategory } from "@/types";
import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectVisual } from "@/components/ProjectVisual";
import { TechBadge } from "@/components/ui/TechBadge";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ACCENT_HEX } from "@/lib/accent";
import { cn } from "@/lib/utils";

const filters: Array<"All" | ProjectCategory> = ["All", "Full Stack", "Mobile", "AI / LLM"];

/**
 * Magazine layout: one featured showcase + compact 3-col grid.
 * Figma styling — bordered filter pills, violet FEATURED mark,
 * serif project names, technology markers, compact flow strips.
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
      className="relative scroll-mt-20 overflow-hidden"
    >
      <div className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-28">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <Reveal className="min-w-0">
            <SectionHeading
              index="03"
              eyebrow="Projects"
              accent="violet"
              title="Production systems, different problems."
              description="Each opens a case study with architecture, features, and engineering trade-offs. Previews are illustrative diagrams — not screenshots."
            />
          </Reveal>
          <Reveal delay={0.08}>
            <p className="tabular tech-label text-[#3D506A]">
              {String(visible.length).padStart(2, "0")}
              <span> / {String(projects.length).padStart(2, "0")}</span>
            </p>
          </Reveal>
        </div>

        {/* Filter pills — scrollable on mobile, 44px targets */}
        <Reveal delay={0.05}>
          <div
            role="group"
            aria-label="Filter projects by category"
            className="no-scrollbar -mx-4 mt-8 flex gap-1.5 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0"
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
                    "tech-label inline-flex min-h-[44px] flex-none items-center whitespace-nowrap rounded border px-3 py-1.5 text-[11px] transition-colors",
                    isActive
                      ? "border-transparent bg-[#A78BFA] font-semibold text-[#070A10]"
                      : "border-[rgba(255,255,255,0.07)] bg-transparent text-[#3D506A] hover:border-[rgba(255,255,255,0.12)] hover:text-[#7A90B0]"
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
            <article className="group relative mt-8 overflow-hidden rounded-lg border border-[rgba(255,255,255,0.07)] bg-[#0D1420]">
              <div className="relative grid min-w-0 lg:grid-cols-[1.4fr_1fr]">
                <div className="relative min-w-0 overflow-hidden border-b border-[rgba(255,255,255,0.07)] lg:border-b-0 lg:border-r">
                  <div className="h-full transition-transform duration-500 ease-out group-hover:scale-[1.012]">
                    <ProjectVisual project={featured} />
                  </div>
                  <span
                    className="tech-label absolute left-4 top-4 z-[2] rounded border px-2 py-0.5 text-[10px]"
                    style={{
                      background: `${ACCENT_HEX[featured.accent]}1F`,
                      color: ACCENT_HEX[featured.accent],
                      borderColor: `${ACCENT_HEX[featured.accent]}33`,
                    }}
                  >
                    Featured
                  </span>
                </div>
                <div className="relative flex min-w-0 flex-col justify-between bg-[#111927] p-8">
                  <div>
                    <p className="truncate tech-label text-[10px] uppercase text-[#3D506A]">
                      {featured.categoryLabel}
                    </p>
                    <h3 className="text-balance mt-3 font-display text-[26px] leading-[1.2] tracking-[-0.01em] text-[#EEF2FF]">
                      <Link
                        href={`/projects/${featured.slug}`}
                        aria-label={`${featured.name} — view case study`}
                        className="after:absolute after:inset-0 after:rounded-lg focus-visible:outline-none"
                      >
                        {featured.name}
                      </Link>
                    </h3>
                    <p
                      className="mt-1 text-sm italic"
                      style={{ color: ACCENT_HEX[featured.accent] }}
                    >
                      {featured.tagline}
                    </p>
                    <p className="mt-3 max-w-md text-sm leading-7 text-[#7A90B0]">
                      {featured.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-1.5" aria-label={`${featured.name} technologies`}>
                      {featured.tech.slice(0, 6).map((t) => (
                        <TechBadge key={t} name={t} size="xs" tone="surface" />
                      ))}
                    </div>
                  </div>
                  <div className="relative z-10 mt-6 flex flex-wrap gap-3">
                    {featured.liveUrl && (
                      <a
                        href={featured.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="tech-label inline-flex min-h-[44px] items-center rounded bg-[#A78BFA] px-3.5 py-2 text-xs font-semibold text-white transition hover:brightness-110"
                      >
                        Live ↗
                      </a>
                    )}
                    {featured.githubUrl && (
                      <a
                        href={featured.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${featured.name} GitHub repository`}
                        className="tech-label inline-flex min-h-[44px] items-center rounded border border-[rgba(255,255,255,0.12)] px-3.5 py-2 text-xs text-[#7A90B0] transition hover:text-[#EEF2FF]"
                      >
                        GitHub
                      </a>
                    )}
                    {!featured.liveUrl && !featured.githubUrl && (
                      <span className="tech-label inline-flex min-h-[44px] items-center text-xs text-[#3D506A]">
                        Case study ↓
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </article>
          </Reveal>
        )}

        {/* Grid — compact cards with flow strips */}
        <div className="mt-4 grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {gridItems.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 0.06} className="h-full min-w-0">
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>

        <p className="mt-5 font-mono text-[11px] leading-5 text-[#3D506A]">
          Showing {visible.length} of {projects.length} — {active}
        </p>
      </div>
    </section>
  );
}
