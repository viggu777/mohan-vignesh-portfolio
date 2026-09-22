"use client";

import { useMemo, useState } from "react";
import type { ProjectCategory } from "@/types";
import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/ProjectCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

const filters: Array<"All" | ProjectCategory> = ["All", "Full Stack", "Mobile", "AI", "AI Integration"];

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
        className="absolute -left-40 top-[-100px] h-[300px] w-[440px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(167,139,250,0.08),transparent_65%)] blur-2xl"
      />
      <div className="relative mx-auto max-w-6xl px-4 py-8 sm:px-8 sm:py-12">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <Reveal>
            <SectionHeading
              eyebrow="Featured projects"
              accent="violet"
              title="Production systems, different problems."
              description="Each card opens a case study with architecture, features, and engineering trade-offs. Previews are illustrative diagrams — not screenshots."
            />
          </Reveal>
          <Reveal delay={0.1} className="w-full sm:w-auto">
            <div
              role="group"
              aria-label="Filter projects by category"
              className="flex w-full gap-1 overflow-x-auto rounded-lg border border-white/10 bg-white/[0.03] p-1 sm:w-auto"
            >
              {filters.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setActive(f)}
                  aria-pressed={active === f}
                  className={cn(
                    "inline-flex min-h-[44px] flex-none items-center whitespace-nowrap rounded-md px-3 py-2 text-[12.5px] font-medium transition sm:px-3.5 sm:text-[13px]",
                    active === f
                      ? "bg-white/[0.09] text-white"
                      : "text-zinc-400 hover:text-white"
                  )}
                >
                  {f}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="mt-6 grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:items-stretch">
          {visible.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 0.07} className="h-full min-w-0">
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>

        <p className="mt-4 font-mono text-[11px] leading-5 text-zinc-600">
          Showing {visible.length} of {projects.length}
        </p>
      </div>
    </section>
  );
}
