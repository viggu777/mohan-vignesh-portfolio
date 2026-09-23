"use client";

import { useMemo, useState } from "react";
import { skillCategories } from "@/data/skills";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { TechBadge } from "@/components/ui/TechBadge";
import { cn } from "@/lib/utils";

export function Skills() {
  const [active, setActive] = useState("all");

  const visible = useMemo(
    () =>
      active === "all"
        ? skillCategories
        : skillCategories.filter((c) => c.id === active),
    [active]
  );

  const totalTools = useMemo(
    () => skillCategories.reduce((n, c) => n + c.skills.length, 0),
    []
  );

  return (
    <section
      id="skills"
      aria-label="Technical skills"
      className="relative scroll-mt-20 overflow-hidden bg-[#0D1420]"
    >
      <div className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-28">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <Reveal className="min-w-0">
            <SectionHeading
              index="04"
              eyebrow="Skills"
              accent="amber"
              title="A practical, production-oriented toolkit."
              description={`No proficiency bars or fake ratings — ${skillCategories.length} groups, ${totalTools} tools I actually build and deploy with.`}
            />
          </Reveal>
        </div>

        {/* Filter pills — toggle off returns to All, 44px targets */}
        <Reveal delay={0.05}>
          <div
            className="no-scrollbar -mx-4 mt-8 flex gap-1.5 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0"
            role="group"
            aria-label="Filter skill categories"
          >
            <FilterPill active={active === "all"} onClick={() => setActive("all")}>
              All · {totalTools}
            </FilterPill>
            {skillCategories.map((c) => (
              <FilterPill
                key={c.id}
                active={active === c.id}
                onClick={() => setActive(active === c.id ? "all" : c.id)}
              >
                {c.label}
              </FilterPill>
            ))}
          </div>
        </Reveal>

        {/* Toolkit grid — one card per group, icon markers per tool */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((cat) => (
            <Reveal key={cat.id} className="min-w-0">
              <div className="h-full rounded border border-[rgba(255,255,255,0.07)] bg-[#111927] p-5">
                <p className="tech-label mb-4 text-[10px] uppercase text-[#FBBF24]">
                  {cat.label}
                </p>
                <ul className="flex flex-wrap gap-2" aria-label={`${cat.label} skills`}>
                  {cat.skills.map((s) => (
                    <li key={s}>
                      <TechBadge name={s} sans tone="surface" />
                    </li>
                  ))}
                </ul>
                <p className="mt-4 font-mono text-[11px] text-[#3D506A]">
                  {cat.description} · {cat.skills.length}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-4 font-mono text-[11px] text-[#3D506A]">
          {visible.length} group{visible.length === 1 ? "" : "s"} ·{" "}
          {visible.reduce((n, c) => n + c.skills.length, 0)} tools shown
        </p>
      </div>
    </section>
  );
}

function FilterPill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "tech-label inline-flex min-h-[44px] flex-none items-center whitespace-nowrap rounded-full border px-4 py-2 text-[12px] transition",
        active
          ? "border-transparent bg-[#FBBF24] font-semibold text-[#070A10]"
          : "border-[rgba(255,255,255,0.07)] bg-transparent text-[#3D506A] hover:border-[rgba(255,255,255,0.12)] hover:text-[#7A90B0]"
      )}
    >
      {children}
    </button>
  );
}
