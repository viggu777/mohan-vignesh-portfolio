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

  return (
    <section
      id="skills"
      aria-label="Technical skills"
      className="relative scroll-mt-20 border-t border-white/[0.06] bg-white/[0.008]"
    >
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <SectionHeading
              eyebrow="Skills"
              title="A practical, production-oriented toolkit."
              description="No proficiency bars or fake ratings — just the tools I actually build and deploy with, grouped by where they run."
            />
          </Reveal>
        </div>

        <Reveal delay={0.05}>
          <div
            className="mt-8 flex flex-wrap gap-1.5"
            role="group"
            aria-label="Filter skill categories"
          >
            <FilterPill active={active === "all"} onClick={() => setActive("all")}>
              All
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

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((cat, i) => (
            <Reveal key={cat.id} delay={(i % 3) * 0.06}>
              <article className="card-lift h-full rounded-2xl border border-slate-400/12 bg-[#080d18] p-6 hover:border-white/[0.14]">
                <h3 className="text-[15px] font-semibold tracking-tight text-white">{cat.label}</h3>
                <p className="mt-0.5 font-mono text-[11px] text-zinc-500">{cat.description}</p>
                <ul className="mt-4 flex flex-wrap gap-1.5" aria-label={`${cat.label} skills`}>
                  {cat.skills.map((s) => (
                    <li
                      key={s}
                      className="cursor-default rounded-md border border-slate-400/12 bg-white/[0.04] px-2.5 py-1.5 text-[12.5px] text-slate-300 transition hover:border-white/25 hover:bg-white/[0.07] hover:text-white"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
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
        "rounded-full border px-3.5 py-1.5 text-[13px] transition",
        active
          ? "border-white bg-white font-medium text-black"
          : "border-white/10 bg-white/[0.03] text-zinc-400 hover:border-white/25 hover:text-white"
      )}
    >
      {children}
    </button>
  );
}
