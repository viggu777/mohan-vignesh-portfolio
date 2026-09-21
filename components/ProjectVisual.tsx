import type { Project } from "@/types";
import { cn } from "@/lib/utils";

/**
 * Abstract illustrative previews per project.
 * These are NOT screenshots — they are stylized diagrams so the cards
 * feel distinct while remaining honest. To use real screenshots, add
 * `public/projects/<slug>.png` and render it here instead.
 */
export function ProjectVisual({ project }: { project: Project }) {
  if (project.visual === "proctoring") {
    return (
      <div className="relative h-full min-h-[280px] overflow-hidden bg-[#08080f]" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_30%_20%,rgba(139,92,246,0.25),transparent_70%)]" />
        <div className="absolute inset-0 bg-grid opacity-60" />
        <div className="relative grid h-full grid-cols-[1fr_150px] gap-3 p-5">
          {/* exam dashboard mock */}
          <div className="rounded-xl border border-white/10 bg-[#0c0c15]/95 p-4">
            <div className="flex items-center justify-between">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500">live exam</p>
              <span className="rounded bg-red-400/15 px-1.5 py-0.5 font-mono text-[10px] text-red-300">● REC</span>
            </div>
            <div className="mt-3 space-y-2">
              {[92, 68, 45].map((w, i) => (
                <div key={i} className="rounded-md border border-white/[0.06] bg-white/[0.03] p-2">
                  <div className="h-1.5 rounded bg-white/10" style={{ width: `${w}%` }} />
                  <div className="mt-1.5 flex gap-1.5">
                    {["A", "B", "C"].map((o) => (
                      <span key={o} className="h-4 w-8 rounded border border-white/10 bg-black/40" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 flex items-center justify-between font-mono text-[10px] text-zinc-500">
              <span>timer · server-synced</span>
              <span className="text-zinc-300">auto-save on</span>
            </div>
          </div>
          {/* proctoring column */}
          <div className="flex flex-col gap-3">
            <div className="flex-1 rounded-xl border border-violet-400/25 bg-black/60 p-2.5">
              <div className="relative h-20 overflow-hidden rounded-lg border border-white/10 bg-gradient-to-br from-zinc-800 to-zinc-900">
                <div className="absolute inset-3 rounded-full border border-dashed border-emerald-300/50" />
                <div className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300" />
                <span className="absolute bottom-1 left-1 rounded bg-black/70 px-1 font-mono text-[9px] text-emerald-300">face · gaze</span>
              </div>
              <p className="mt-2 font-mono text-[10px] text-zinc-400">trust score</p>
              <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-[86%] rounded-full bg-gradient-to-r from-emerald-400 to-cyan-300" />
              </div>
            </div>
            <div className="rounded-xl border border-white/10 bg-[#0c0c15]/95 p-2.5 font-mono text-[10px] leading-5 text-zinc-500">
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
      <div className="relative h-full min-h-[280px] overflow-hidden bg-[#060a0e]" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_70%_25%,rgba(34,211,238,0.18),transparent_70%)]" />
        <div className="relative grid h-full grid-cols-[130px_1fr] gap-3 p-5">
          {/* phone frame */}
          <div className="rounded-[20px] border border-white/12 bg-black/70 p-2">
            <div className="rounded-[14px] border border-white/[0.07] bg-[#0b0e14] p-2.5">
              <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-zinc-500">studymate</p>
              <div className="mt-2 grid grid-cols-2 gap-1.5">
                {["focus", "plan", "sgpa", "ai"].map((s) => (
                  <span key={s} className="rounded-md border border-white/[0.07] bg-white/[0.04] px-1 py-1.5 text-center font-mono text-[9px] text-zinc-300">{s}</span>
                ))}
              </div>
              <div className="mt-2 rounded-md bg-cyan-400/10 p-1.5 font-mono text-[9px] leading-4 text-cyan-200">
                “summarize ch.4?”
              </div>
              <div className="mt-1.5 rounded-md border border-white/[0.06] bg-white/[0.03] p-1.5 font-mono text-[9px] leading-4 text-zinc-400">
                grounded in your pdf…
              </div>
            </div>
          </div>
          {/* retrieval flow */}
          <div className="flex flex-col justify-center gap-2">
            {[
              ["PDF ingest", "doc → text", "border-white/10"],
              ["chunk + embed", "512 tok · overlap", "border-violet-400/25"],
              ["atlas vector search", "user-scoped top-k", "border-cyan-300/25"],
              ["grounded answer", "hugging face", "border-emerald-300/25"],
            ].map(([t, s]) => (
              <div key={t} className="rounded-lg border border-white/10 bg-[#0b0e14]/90 px-3 py-2">
                <p className="text-[11px] font-medium text-zinc-200">{t}</p>
                <p className="font-mono text-[10px] text-zinc-500">{s}</p>
              </div>
            ))}
            <div className="flex items-center gap-1.5 pl-1 font-mono text-[10px] text-zinc-600">
              <span className="h-1 w-1 rounded-full bg-cyan-300" />
              <span className="h-1 w-1 rounded-full bg-violet-400" />
              <span className="h-1 w-1 rounded-full bg-emerald-300" />
              semantic retrieval path
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
      <div className="relative h-full min-h-[280px] overflow-hidden bg-[#0c0709]" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_70%_20%,rgba(251,113,133,0.16),transparent_70%)]" />
        <div className="relative grid h-full grid-cols-[1fr_140px] gap-3 p-5">
          {/* academy portal mock */}
          <div className="rounded-xl border border-white/10 bg-[#100b0e]/95 p-4">
            <div className="flex items-center justify-between">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500">gurukulam portal</p>
              <div className="flex gap-1">
                {["admin", "teacher", "student"].map((r, i) => (
                  <span
                    key={r}
                    className={`rounded px-1.5 py-0.5 font-mono text-[9px] ${
                      i === 0
                        ? "bg-rose-400/15 text-rose-300"
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
                  className="flex items-center justify-between rounded-md border border-white/[0.06] bg-black/40 px-2.5 py-2"
                >
                  <span className="text-[11px] text-zinc-300">{row}</span>
                  <span className={`font-mono text-[10px] ${i === 2 ? "text-rose-300" : "text-emerald-300"}`}>
                    {i === 2 ? "cloudinary" : "live"}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-3 flex gap-1.5">
              {[0, 1, 2].map((m) => (
                <div
                  key={m}
                  className="flex h-12 flex-1 items-center justify-center rounded-md border border-white/[0.07] bg-gradient-to-br from-rose-400/10 to-transparent font-mono text-[9px] text-zinc-500"
                >
                  media
                </div>
              ))}
            </div>
          </div>
          {/* deploy pipeline column */}
          <div className="flex flex-col justify-center gap-0">
            {[
              ["git", "push"],
              ["docker", "build"],
              ["jenkins", "ci/cd"],
              ["linux", "serve"],
            ].map(([t, s], i, arr) => (
              <div key={t}>
                <div className="rounded-lg border border-white/10 bg-[#100b0e]/95 px-2.5 py-2">
                  <p className="text-[11px] font-medium text-zinc-200">{t}</p>
                  <p className="font-mono text-[10px] text-zinc-500">{s}</p>
                </div>
                {i < arr.length - 1 && (
                  <div className="mx-auto h-2.5 w-px bg-gradient-to-b from-rose-300/60 to-rose-300/10" />
                )}
              </div>
            ))}
          </div>
        </div>
        <VisualCaption />
      </div>
    );
  }

  // admin
  return (
    <div className="relative h-full min-h-[280px] overflow-hidden bg-[#0a0805]" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_30%_20%,rgba(251,191,36,0.14),transparent_70%)]" />
      <div className="relative p-5">
        <div className="rounded-xl border border-white/10 bg-[#0d0c09]/95 p-4">
          <div className="flex items-center justify-between">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500">franchise admin</p>
            <div className="flex gap-1.5">
              <span className="rounded bg-emerald-400/15 px-1.5 py-0.5 font-mono text-[10px] text-emerald-300">paid</span>
              <span className="rounded bg-amber-300/15 px-1.5 py-0.5 font-mono text-[10px] text-amber-200">invoice →</span>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {[
              ["orders", "live"],
              ["revenue", "razorpay"],
              ["outlets", "rbac"],
            ].map(([k, v]) => (
              <div key={k} className="rounded-lg border border-white/[0.07] bg-white/[0.03] p-2.5">
                <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-zinc-500">{k}</p>
                <p className="mt-0.5 font-mono text-[11px] text-zinc-200">{v}</p>
              </div>
            ))}
          </div>
          <div className="mt-3 space-y-1.5">
            {["Masala Chai — outlet #04", "Kulhad order — bulk", "Franchise fee — Q3"].map((row, i) => (
              <div key={row} className="flex items-center justify-between rounded-md border border-white/[0.06] bg-black/40 px-2.5 py-2">
                <span className="text-[11px] text-zinc-300">{row}</span>
                <span className={cn("font-mono text-[10px]", i === 1 ? "text-amber-200" : "text-emerald-300")}>
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
    <span className="absolute bottom-2 right-3 rounded border border-white/10 bg-black/60 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-zinc-500">
      illustrative preview
    </span>
  );
}
