"use client";

import { useMemo, useState } from "react";
import type { ProjectCategory } from "@/types";
import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/ProjectCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

const filters: Array<"All" | ProjectCategory> = ["All", "AI", "Full Stack", "Mobile"];

export function Projects() {
  const [active, setActive] = useState<(typeof filters)[number]>("All");

  const visible = useMemo(
    () =>
      active === "All"
        ? projects
        : projects.filter((p) => p.categories.includes(active)),
    [active]
  );

  return (
    <section
      id="projects"
      aria-label="Featured projects"
      className="relative scroll-mt-20 overflow-hidden border-t border-white/[0.06]"
    >
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-[-280px] h-[480px] w-[820px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.09),transparent_65%)] blur-2xl"
      />
      <div className="relative mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <SectionHeading
              eyebrow="Featured projects"
              title="Production systems, different problems."
              description="Each card opens a case study with architecture, features, and engineering trade-offs. Previews are illustrative diagrams — not screenshots."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <div
              role="group"
              aria-label="Filter projects by category"
              className="flex rounded-lg border border-white/10 bg-white/[0.03] p-1"
            >
              {filters.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setActive(f)}
                  aria-pressed={active === f}
                  className={cn(
                    "rounded-md px-3.5 py-2 text-[13px] font-medium transition",
                    active === f
                      ? "bg-white text-black"
                      : "text-zinc-400 hover:text-white"
                  )}
                >
                  {f}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:items-stretch">
          {visible.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 0.07} className="h-full">
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>

        <p className="mt-6 font-mono text-[11px] leading-5 text-zinc-500">
          Showing {visible.length} of {projects.length} — filter by AI / Full Stack / Mobile.
          Add future projects in <span className="text-zinc-400">data/projects.ts</span> without
          redesigning this section.
        </p>
      </div>
    </section>
  );
}
