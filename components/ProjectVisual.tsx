import type { Project } from "@/types";
import { cn } from "@/lib/utils";

/**
 * Abstract illustrative previews per project.
 * These are NOT screenshots — they are stylized diagrams so the cards
 * feel distinct while remaining honest. To use real screenshots, add
 * `public/projects/<slug>.png` and render it here instead.
 *
 * Polish pass: shared `visual-frame` overlay (top highlight + inner
 * vignette), per-accent ambient wash, crisper hairlines, refined caption.
 * Pure CSS — no motion, no images, no layout shift.
 *
 * Mobile-first: every visual stacks vertically on small screens
 * (`grid-cols-1`) and only splits into columns on `sm:` and up,
 * so nothing gets squished or overflows at 320–480px.
 */
export function ProjectVisual({ project }: { project: Project }) {
  if (project.visual === "proctoring") {
    return (
      <div className="visual-frame relative isolate min-h-[220px] overflow-hidden border-b border-white/[0.07] bg-[#08080f] sm:min-h-[280px]" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_30%_20%,rgba(167,139,250,0.12),transparent_70%)]" />
        <div className="absolute inset-0 bg-grid opacity-60" />
        <div className="relative z-[2] grid min-w-0 grid-cols-1 gap-3 p-3.5 pb-9 sm:grid-cols-[1fr_150px] sm:p-5 sm:pb-9">
          {/* exam dashboard mock */}
          <div className="min-w-0 rounded-xl border border-white/[0.12] bg-[#0c0c15]/95 p-3.5 shadow-[0_16px_40px_-20px_rgba(0,0,0,0.9)] sm:p-4">
            <div className="flex items-center justify-between gap-2">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-400">live exam</p>
              <span className="flex shrink-0 items-center gap-1.5 rounded bg-red-400/15 px-1.5 py-0.5 font-mono text-[10px] text-red-300">
                <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-red-400" />
                REC
              </span>
            </div>
            <div className="mt-3 space-y-2">
              {[92, 68, 45].map((w, i) => (
                <div key={i} className="rounded-md border border-white/[0.07] bg-white/[0.03] p-2">
                  <div className="h-1.5 rounded bg-white/15" style={{ width: `${w}%` }} />
                  <div className="mt-1.5 flex gap-1.5">
                    {["A", "B", "C"].map((o) => (
                      <span key={o} className={cn("h-4 w-8 rounded border", i === 0 && o === "A" ? "border-emerald-300/40 bg-emerald-300/10" : "border-white/10 bg-black/40")} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 flex items-center justify-between gap-2 font-mono text-[10px] text-zinc-500">
              <span className="truncate">timer · server-synced</span>
              <span className="shrink-0 text-emerald-300">auto-save on</span>
            </div>
          </div>
          {/* proctoring column — side-by-side mini cards on mobile */}
          <div className="grid min-w-0 grid-cols-2 gap-3 sm:flex sm:flex-col">
            <div className="min-w-0 flex-1 rounded-xl border border-violet-400/25 bg-black/60 p-2.5 shadow-[0_0_32px_-12px_rgba(167,139,250,0.4)]">
              <div className="relative h-16 overflow-hidden rounded-lg border border-white/10 bg-gradient-to-br from-zinc-800 to-zinc-900 sm:h-20">
                <div className="absolute inset-3 rounded-full border border-dashed border-emerald-300/50" />
                <div className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300 shadow-[0_0_8px_rgba(103,232,249,0.9)]" />
                <span className="absolute bottom-1 left-1 rounded bg-black/70 px-1 font-mono text-[9px] text-emerald-300">face · gaze</span>
              </div>
              <p className="mt-2 font-mono text-[10px] text-zinc-400">trust score</p>
              <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-[86%] rounded-full bg-gradient-to-r from-emerald-400 to-cyan-300" />
              </div>
            </div>
            <div className="min-w-0 rounded-xl border border-white/[0.12] bg-[#0c0c15]/95 p-2.5 font-mono text-[10px] leading-5 text-zinc-500">
              <p>fullscreen <span className="text-emerald-300">ok</span></p>
              <p>tab focus <span className="text-emerald-300">ok</span></p>
              <p>violations <span className="text-amber-300">→ review</span></p>
            </div>
          </div>
        </div>
        <VisualCaption />
      </div>
    );
  }

  if (project.visual === "rag") {
    return (
      <div className="visual-frame relative isolate min-h-[220px] overflow-hidden border-b border-white/[0.07] bg-[#060a0e] sm:min-h-[280px]" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_70%_25%,rgba(34,211,238,0.12),transparent_70%)]" />
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="relative z-[2] grid min-w-0 grid-cols-1 gap-3 p-3.5 pb-9 sm:grid-cols-[130px_1fr] sm:p-5 sm:pb-9">
          {/* phone frame */}
          <div className="mx-auto w-full max-w-[230px] rounded-[20px] border border-white/[0.14] bg-black/70 p-2 shadow-[0_16px_40px_-20px_rgba(0,0,0,0.9)] sm:mx-0 sm:max-w-none">
            <div className="rounded-[14px] border border-white/[0.08] bg-[#0b0e14] p-2.5">
              <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-zinc-400">studymate</p>
              <div className="mt-2 grid grid-cols-2 gap-1.5">
                {["focus", "plan", "sgpa", "ai"].map((s) => (
                  <span key={s} className={cn("rounded-md border px-1 py-1.5 text-center font-mono text-[9px]", s === "ai" ? "border-cyan-300/30 bg-cyan-300/10 text-cyan-200" : "border-white/[0.08] bg-white/[0.04] text-zinc-300")}>{s}</span>
                ))}
              </div>
              <div className="mt-2 rounded-md border border-cyan-300/20 bg-cyan-400/10 p-1.5 font-mono text-[9px] leading-4 text-cyan-200">
                “summarize ch.4?”
              </div>
              <div className="mt-1.5 rounded-md border border-white/[0.07] bg-white/[0.03] p-1.5 font-mono text-[9px] leading-4 text-zinc-400">
                grounded in your pdf…
              </div>
            </div>
          </div>
          {/* retrieval flow */}
          <div className="flex min-w-0 flex-col justify-center gap-2">
            {[
              ["PDF ingest", "doc → text"],
              ["chunk + embed", "512 tok · overlap"],
              ["atlas vector search", "user-scoped top-k"],
              ["grounded answer", "hugging face"],
            ].map(([t, s], i) => (
              <div key={t} className={cn("min-w-0 rounded-lg border bg-[#0b0e14]/90 px-3 py-2", i === 2 ? "border-cyan-300/25 shadow-[0_0_24px_-12px_rgba(34,211,238,0.5)]" : "border-white/[0.12]")}>
                <p className="truncate text-[11px] font-medium text-zinc-100">{t}</p>
                <p className="truncate font-mono text-[10px] text-zinc-500">{s}</p>
              </div>
            ))}
            <div className="flex items-center gap-1.5 pl-1 font-mono text-[10px] text-zinc-500">
              <span className="h-1 w-1 shrink-0 rounded-full bg-cyan-300" />
              <span className="h-1 w-1 shrink-0 rounded-full bg-violet-400" />
              <span className="h-1 w-1 shrink-0 rounded-full bg-emerald-300" />
              <span className="truncate">semantic retrieval path</span>
            </div>
          </div>
        </div>
        <VisualCaption />
      </div>
    );
  }

  // academy: portal + deploy pipeline
  if (project.visual === "academy") {
    return (
      <div className="visual-frame relative isolate min-h-[220px] overflow-hidden border-b border-white/[0.07] bg-[#0c0709] sm:min-h-[280px]" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_70%_20%,rgba(251,113,133,0.11),transparent_70%)]" />
        <div className="relative z-[2] grid min-w-0 grid-cols-1 gap-3 p-3.5 pb-9 sm:grid-cols-[1fr_140px] sm:p-5 sm:pb-9">
          {/* academy portal mock */}
          <div className="min-w-0 rounded-xl border border-white/[0.12] bg-[#100b0e]/95 p-3.5 shadow-[0_16px_40px_-20px_rgba(0,0,0,0.9)] sm:p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-400">gurukulam portal</p>
              <div className="flex gap-1">
                {["admin", "teacher", "student"].map((r, i) => (
                  <span
                    key={r}
                    className={`rounded px-1.5 py-0.5 font-mono text-[9px] ${
                      i === 0
                        ? "border border-rose-300/30 bg-rose-400/15 text-rose-200"
                        : "bg-white/[0.05] text-zinc-500"
                    }`}
                  >
                    {r}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-3 space-y-1.5">
              {["Admissions", "Batches", "Gallery"].map((row, i) => (
                <div
                  key={row}
                  className="flex items-center justify-between gap-2 rounded-md border border-white/[0.07] bg-black/40 px-2.5 py-2"
                >
                  <span className="truncate text-[11px] text-zinc-200">{row}</span>
                  <span className={cn("shrink-0 font-mono text-[10px]", i === 2 ? "text-rose-200" : "text-emerald-300")}>
                    {i === 2 ? "cloudinary" : "live"}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-3 flex gap-1.5">
              {[0, 1, 2].map((m) => (
                <div
                  key={m}
                  className="flex h-12 flex-1 items-center justify-center rounded-md border border-white/[0.08] bg-gradient-to-br from-rose-400/10 to-transparent font-mono text-[9px] text-zinc-500"
                >
                  media
                </div>
              ))}
            </div>
          </div>
          {/* deploy pipeline — 2-col chips on mobile, vertical rail on sm+ */}
          <div className="grid min-w-0 grid-cols-2 gap-1.5 sm:flex sm:flex-col sm:justify-center sm:gap-0">
            {[
              ["git", "push"],
              ["docker", "build"],
              ["jenkins", "ci/cd"],
              ["linux", "serve"],
            ].map(([t, s], i, arr) => (
              <div key={t} className="min-w-0">
                <div className={cn("rounded-lg border px-2 py-2 text-center sm:px-2.5 sm:text-left", i === 2 ? "border-rose-300/25 bg-[#100b0e]/95 shadow-[0_0_24px_-12px_rgba(251,113,133,0.5)]" : "border-white/[0.12] bg-[#100b0e]/95")}>
                  <p className="truncate text-[11px] font-medium text-zinc-100">{t}</p>
                  <p className="truncate font-mono text-[10px] text-zinc-500">{s}</p>
                </div>
                {i < arr.length - 1 && (
                  <div className="mx-auto hidden h-2.5 w-px bg-gradient-to-b from-rose-300/60 to-rose-300/10 sm:block" />
                )}
              </div>
            ))}
          </div>
        </div>
        <VisualCaption />
      </div>
    );
  }

  // crm: placement management — Firestore realtime + role-based workflows.
  // Distinct from the tea franchise "admin" visual (no chai/orders rows).
  if (project.visual === "crm") {
    return (
      <div className="visual-frame relative isolate min-h-[220px] overflow-hidden border-b border-white/[0.07] bg-[#050b0e] sm:min-h-[280px]" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_30%_20%,rgba(34,211,238,0.12),transparent_70%)]" />
        <div className="relative z-[2] grid min-w-0 grid-cols-1 gap-3 p-3.5 pb-9 sm:grid-cols-[1fr_140px] sm:p-5 sm:pb-9">
          {/* placement board mock */}
          <div className="min-w-0 rounded-xl border border-cyan-300/[0.18] bg-[#080f14]/95 p-3.5 shadow-[0_16px_40px_-20px_rgba(0,0,0,0.9)] sm:p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-400">placement crm</p>
              <div className="flex shrink-0 gap-1.5">
                <span className="flex items-center gap-1 rounded border border-cyan-300/25 bg-cyan-400/15 px-1.5 py-0.5 font-mono text-[10px] text-cyan-100">
                  <span className="h-1 w-1 animate-pulse-dot rounded-full bg-cyan-300" />
                  live sync
                </span>
                <span className="rounded border border-emerald-300/20 bg-emerald-400/15 px-1.5 py-0.5 font-mono text-[10px] text-emerald-200">30+ students</span>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-1.5 sm:gap-2">
              {[
                ["drives", "12 active"],
                ["applied", "248"],
                ["placed", "shortlist"],
              ].map(([k, v]) => (
                <div key={k} className="min-w-0 rounded-lg border border-white/[0.08] bg-white/[0.03] p-2 sm:p-2.5">
                  <p className="truncate font-mono text-[9px] uppercase tracking-[0.14em] text-zinc-500">{k}</p>
                  <p className="mt-0.5 truncate font-mono text-[11px] text-zinc-100">{v}</p>
                </div>
              ))}
            </div>
            <div className="mt-3 space-y-1.5">
              {[
                ["Infosys — Systems Engineer", "42 applied"],
                ["TCS — Ninja drive", "shortlisting"],
                ["Wipro — Project Engineer", "drive open"],
              ].map(([row, status], i) => (
                <div key={row} className="flex items-center justify-between gap-2 rounded-md border border-white/[0.07] bg-black/40 px-2.5 py-2">
                  <span className="truncate text-[11px] text-zinc-200">{row}</span>
                  <span className={cn("shrink-0 font-mono text-[10px]", i === 2 ? "text-cyan-100" : "text-emerald-300")}>
                    {status}
                  </span>
                </div>
              ))}
            </div>
          </div>
          {/* roles + realtime column */}
          <div className="grid min-w-0 grid-cols-2 gap-3 sm:flex sm:flex-col sm:justify-center">
            <div className="min-w-0 rounded-xl border border-cyan-300/20 bg-black/60 p-2.5">
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-500">roles</p>
              <div className="mt-2 flex flex-wrap gap-1">
                {["student", "coordinator", "admin"].map((r, i) => (
                  <span
                    key={r}
                    className={cn(
                      "rounded border px-1.5 py-0.5 font-mono text-[9px]",
                      i === 1 ? "border-cyan-300/30 bg-cyan-400/15 text-cyan-100" : "border-transparent bg-white/[0.05] text-zinc-500"
                    )}
                  >
                    {r}
                  </span>
                ))}
              </div>
              <p className="mt-2 font-mono text-[10px] leading-5 text-zinc-500">
                firestore <span className="text-cyan-100">realtime</span>
              </p>
              <div className="mt-1 flex gap-1">
                {[86, 64, 92].map((w, i) => (
                  <span key={i} className="h-1 flex-1 overflow-hidden rounded-full bg-white/10">
                    <span className="block h-full rounded-full bg-cyan-300/80" style={{ width: `${w}%` }} />
                  </span>
                ))}
              </div>
            </div>
            <div className="min-w-0 rounded-xl border border-white/[0.12] bg-[#080f14]/95 p-2.5 font-mono text-[10px] leading-5 text-zinc-500">
              <p>auth <span className="text-emerald-300">firebase</span></p>
              <p>db <span className="text-cyan-100">firestore</span></p>
              <p>deploy <span className="text-zinc-200">actions →</span></p>
            </div>
          </div>
        </div>
        <VisualCaption />
      </div>
    );
  }

  // admin (Tea Mahall franchise)
  return (
    <div className="visual-frame relative isolate min-h-[220px] overflow-hidden border-b border-white/[0.07] bg-[#0a0805] sm:min-h-[280px]" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_30%_20%,rgba(251,191,36,0.10),transparent_70%)]" />
      <div className="relative z-[2] min-w-0 p-3.5 pb-9 sm:p-5 sm:pb-9">
        <div className="rounded-xl border border-white/[0.12] bg-[#0d0c09]/95 p-3.5 shadow-[0_16px_40px_-20px_rgba(0,0,0,0.9)] sm:p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-400">franchise admin</p>
            <div className="flex shrink-0 gap-1.5">
              <span className="rounded border border-emerald-300/20 bg-emerald-400/15 px-1.5 py-0.5 font-mono text-[10px] text-emerald-200">paid</span>
              <span className="rounded border border-amber-300/25 bg-amber-300/15 px-1.5 py-0.5 font-mono text-[10px] text-amber-100">invoice →</span>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-1.5 sm:gap-2">
            {[
              ["orders", "live"],
              ["revenue", "razorpay"],
              ["outlets", "rbac"],
            ].map(([k, v]) => (
              <div key={k} className="min-w-0 rounded-lg border border-white/[0.08] bg-white/[0.03] p-2 sm:p-2.5">
                <p className="truncate font-mono text-[9px] uppercase tracking-[0.14em] text-zinc-500">{k}</p>
                <p className="mt-0.5 truncate font-mono text-[11px] text-zinc-100">{v}</p>
              </div>
            ))}
          </div>
          <div className="mt-3 space-y-1.5">
            {["Masala Chai — outlet #04", "Kulhad order — bulk", "Franchise fee — Q3"].map((row, i) => (
              <div key={row} className="flex items-center justify-between gap-2 rounded-md border border-white/[0.07] bg-black/40 px-2.5 py-2">
                <span className="truncate text-[11px] text-zinc-200">{row}</span>
                <span className={cn("shrink-0 font-mono text-[10px]", i === 1 ? "text-amber-100" : "text-emerald-300")}>
                  {i === 1 ? "pending" : "done"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <VisualCaption />
    </div>
  );
}

function VisualCaption() {
  return (
    <span className="absolute bottom-2 right-3 z-[2] flex items-center gap-1.5 rounded-full border border-white/10 bg-black/70 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-zinc-500 backdrop-blur">
      <span className="h-1 w-1 rounded-full bg-emerald-400/70" />
      illustrative preview
    </span>
  );
}
