"use client";

import { useMemo, useState } from "react";
import { skillCategories } from "@/data/skills";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
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
      className="relative scroll-mt-20 overflow-hidden"
    >
      <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-8 sm:py-20">
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

        {/* Dense mono filter rail — 44px targets, no card chrome */}
        <Reveal delay={0.05}>
          <div
            className="no-scrollbar -mx-4 mt-7 flex gap-1 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0"
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

        {/* Dense ledger: one hairline row per group — the densest section */}
        <div className="mt-4 border-t border-white/[0.08]">
          {visible.map((cat, i) => (
            <Reveal key={cat.id} delay={Math.min(i, 3) * 0.04}>
              <div className="row-hover grid gap-2 border-b border-white/[0.07] py-5 hover:bg-white/[0.015] sm:grid-cols-[260px_1fr] sm:gap-8 sm:py-6">
                <div className="min-w-0">
                  <p className="flex items-baseline gap-2.5">
                    <span className="font-mono text-[11px] text-slate-600">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="truncate text-[15px] font-semibold tracking-tight text-white">
                      {cat.label}
                    </span>
                  </p>
                  <p className="mt-1 pl-8 font-mono text-[11px] text-slate-600">
                    {cat.description} · {cat.skills.length}
                  </p>
                </div>
                <ul
                  className="flex min-w-0 flex-wrap gap-x-1 gap-y-2 pl-8 sm:pl-0"
                  aria-label={`${cat.label} skills`}
                >
                  {cat.skills.map((s, si) => (
                    <li key={s} className="flex items-center gap-1 text-[13.5px]">
                      <span className="cursor-default rounded px-1.5 py-1 text-slate-300 transition-colors hover:bg-white/[0.06] hover:text-white">
                        {s}
                      </span>
                      {si < cat.skills.length - 1 && (
                        <span aria-hidden="true" className="text-[10px] text-slate-700">
                          /
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-4 font-mono text-[11px] text-slate-600">
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
        "inline-flex min-h-[44px] flex-none items-center whitespace-nowrap rounded-full border px-4 py-2 font-mono text-[12px] transition",
        active
          ? "border-white/80 bg-white font-semibold text-black"
          : "border-white/10 bg-transparent text-slate-500 hover:border-white/25 hover:text-white"
      )}
    >
      {children}
    </button>
  );
}
