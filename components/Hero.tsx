"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Mail, MapPin } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { profile } from "@/data/profile";
import { useSafeReducedMotion } from "@/lib/use-safe-reduced-motion";

const ease = [0.22, 1, 0.36, 1] as const;

function HeroVisual() {
  // Hydration-safe: matches the SSR output on first paint.
  const reduce = useSafeReducedMotion();
  return (
    <div
      aria-hidden="true"
      className="relative mx-auto w-full max-w-[520px] select-none"
    >
      {/* ambient glow */}
      <div className="absolute -inset-8 rounded-[28px] bg-[radial-gradient(ellipse_60%_55%_at_50%_30%,rgba(139,92,246,0.22),transparent_70%)]" />
      <div className="absolute -right-10 -top-10 h-56 w-56 rounded-full bg-cyan-400/[0.07] blur-3xl" />

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.25, ease }}
        className="code-glow relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0a0a12]/95 backdrop-blur"
      >
        {/* window chrome */}
        <div className="flex items-center gap-1.5 border-b border-white/[0.06] px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/80" />
          <span className="ml-3 font-mono text-[11px] text-zinc-500">
            rag-pipeline.ts — illustrative
          </span>
          <span className="ml-auto hidden items-center gap-1.5 font-mono text-[10px] text-emerald-300/80 sm:flex">
            <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-emerald-400" />
            vector index · live
          </span>
        </div>

        <div className="grid gap-0 sm:grid-cols-[1fr_170px]">
          <div className="p-5 font-mono text-[12px] leading-[1.75]">
            <p className="text-zinc-600">{"// retrieval → generation"}</p>
            <p>
              <span className="text-violet-300">const</span>{" "}
              <span className="text-zinc-100">chunks</span>{" "}
              <span className="text-zinc-500">=</span>{" "}
              <span className="text-cyan-300">await</span>{" "}
              <span className="text-zinc-200">ingest</span>
              <span className="text-zinc-500">(</span>
              <span className="text-amber-200/90">“notes.pdf”</span>
              <span className="text-zinc-500">)</span>
            </p>
            <p>
              <span className="text-violet-300">const</span>{" "}
              <span className="text-zinc-100">hits</span>{" "}
              <span className="text-zinc-500">=</span>{" "}
              <span className="text-cyan-300">await</span>{" "}
              <span className="text-zinc-200">vectorSearch</span>
              <span className="text-zinc-500">(</span>
              <span className="text-zinc-200">query</span>
              <span className="text-zinc-500">,</span>{" "}
              <span className="text-zinc-600">{"{ scope: user }"}</span>
              <span className="text-zinc-500">)</span>
            </p>
            <p>
              <span className="text-violet-300">return</span>{" "}
              <span className="text-zinc-200">generate</span>
              <span className="text-zinc-500">(</span>
              <span className="text-zinc-200">hits</span>
              <span className="text-zinc-500">,</span>{" "}
              <span className="text-zinc-600">{"{ grounded: true }"}</span>
              <span className="text-zinc-500">)</span>
            </p>
            <div className="mt-4 space-y-2 border-t border-white/[0.06] pt-4">
              {[
                { label: "chunk · embed", w: "92%", c: "bg-violet-400/70" },
                { label: "retrieve · top-k", w: "74%", c: "bg-cyan-300/70" },
                { label: "generate · grounded", w: "63%", c: "bg-emerald-300/70" },
              ].map((row) => (
                <div key={row.label}>
                  <div className="mb-1 flex justify-between text-[10px] text-zinc-500">
                    <span>{row.label}</span>
                  </div>
                  <div className="h-1 overflow-hidden rounded-full bg-white/[0.06]">
                    <motion.div
                      initial={reduce ? { width: row.w } : { width: 0 }}
                      animate={{ width: row.w }}
                      transition={{ duration: 1.2, delay: 0.7, ease }}
                      className={`h-full rounded-full ${row.c}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* side network panel */}
          <div className="hidden border-l border-white/[0.06] bg-white/[0.015] p-4 sm:block">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500">
              pipeline
            </p>
            <ul className="mt-3 space-y-2.5 font-mono text-[11px]">
              {[
                ["ingest", "emerald"],
                ["embed", "violet"],
                ["index", "violet"],
                ["retrieve", "cyan"],
                ["generate", "amber"],
              ].map(([s, c], i) => (
                <li key={s} className="flex items-center gap-2 text-zinc-400">
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      c === "emerald"
                        ? "bg-emerald-400"
                        : c === "violet"
                          ? "bg-violet-400"
                          : c === "cyan"
                            ? "bg-cyan-300"
                            : "bg-amber-300"
                    }`}
                  />
                  <span className="text-zinc-300">{s}</span>
                  <span className="ml-auto text-zinc-700">{`0${i + 1}`}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 rounded-lg border border-white/[0.07] bg-black/40 p-2.5">
              <p className="font-mono text-[10px] text-zinc-500">trust · proctoring</p>
              <p className="mt-1 font-mono text-[11px] text-zinc-300">
                face <span className="text-emerald-300">·</span> gaze{" "}
                <span className="text-emerald-300">·</span> focus
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* floating chips */}
      {!reduce && (
        <>
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-4 top-16 hidden rounded-xl border border-white/10 bg-[#0c0c14]/95 px-3 py-2 shadow-xl backdrop-blur sm:block"
          >
            <p className="font-mono text-[10px] text-zinc-500">mern · deployed</p>
            <p className="text-[12px] font-medium text-zinc-200">exam engine + analytics</p>
          </motion.div>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
            className="absolute -right-3 bottom-14 hidden rounded-xl border border-white/10 bg-[#0c0c14]/95 px-3 py-2 shadow-xl backdrop-blur sm:block"
          >
            <p className="font-mono text-[10px] text-zinc-500">mongodb atlas</p>
            <p className="text-[12px] font-medium text-zinc-200">vector search · user-scoped</p>
          </motion.div>
        </>
      )}
    </div>
  );
}

export function Hero() {
  const reduce = useSafeReducedMotion();
  // Variants stay STATIC across renders. Only `initial` branches on `reduce`:
  // `initial` applies at mount only, so the post-hydration flip (false -> true
  // for reduced-motion users) can never retarget or freeze the entrance —
  // the previous bug that left this column stuck at opacity 0.
  // Server + first client render both use "hidden", so hydration always matches.
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.09 } },
  };
  const item = {
    hidden: { opacity: 0, y: 22 },
    show: { opacity: 1, y: 0, transition: { duration: 0.65, ease } },
  };
  const initialState = reduce ? false : "hidden";

  return (
    <section id="home" aria-label="Introduction" className="relative overflow-hidden">
      {/* background layers */}
      <div aria-hidden="true" className="absolute inset-0">
        <div className="bg-grid mask-fade-radial absolute inset-0 opacity-70" />
        <div className="absolute left-1/2 top-[-320px] h-[560px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.16),transparent_65%)] blur-2xl" />
        <div className="absolute right-[-160px] top-[30%] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.08),transparent_65%)] blur-2xl" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/40 to-transparent" />
      </div>

      <div className="relative mx-auto grid max-w-6xl gap-14 px-5 pb-20 pt-14 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:pt-24">
        <motion.div
          variants={container}
          initial={initialState}
          animate="show"
          className="max-w-xl"
        >
          {profile.availability.enabled && (
            <motion.div variants={item}>
              <span className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] py-1.5 pl-3 pr-4 text-[12.5px] text-zinc-300 backdrop-blur">
                {profile.availability.dot && (
                  <span className="relative flex h-2 w-2">
                    <span className="absolute h-full w-full animate-pulse-dot rounded-full bg-emerald-400" />
                  </span>
                )}
                {profile.availability.label}
              </span>
            </motion.div>
          )}

          <motion.p
            variants={item}
            className="mt-7 font-mono text-[12px] uppercase tracking-[0.24em] text-zinc-500"
          >
            {profile.name}
          </motion.p>
          <motion.h1
            variants={item}
            className="text-balance mt-3 text-[42px] font-semibold leading-[1.04] tracking-[-0.02em] text-white sm:text-6xl"
          >
            Building Intelligent Products{" "}
            <span className="bg-gradient-to-r from-violet-300 via-blue-300 to-cyan-200 bg-clip-text text-transparent">
              with AI &amp; Code.
            </span>
          </motion.h1>
          <motion.p variants={item} className="mt-5 max-w-lg text-[15.5px] leading-7 text-zinc-400">
            {profile.summary}{" "}
            <span className="text-zinc-300">
              Full Stack AI Engineering, Generative AI and RAG — built for production, not demos.
            </span>
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/#projects"
              className="group inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-zinc-200"
            >
              Explore Projects
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 rounded-lg border border-white/12 bg-white/[0.04] px-5 py-3 text-sm font-medium text-zinc-100 transition hover:border-white/25 hover:bg-white/[0.08]"
            >
              Contact Me
            </Link>
          </motion.div>

          <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
            <a
              href={profile.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-[13.5px] text-zinc-400 transition hover:text-white"
            >
              <GithubIcon className="h-4 w-4" />
              <span className="underline-offset-4 group-hover:underline">GitHub</span>
            </a>
            <a
              href={profile.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-[13.5px] text-zinc-400 transition hover:text-white"
            >
              <LinkedinIcon className="h-4 w-4" />
              <span className="underline-offset-4 group-hover:underline">LinkedIn</span>
            </a>
            <a
              href={profile.socials.email}
              className="group inline-flex min-w-0 items-center gap-2 text-[13.5px] text-zinc-400 transition hover:text-white"
            >
              <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span className="break-all underline-offset-4 group-hover:underline">{profile.email}</span>
            </a>
            <span className="inline-flex items-center gap-1.5 text-[13px] text-zinc-500">
              <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
              {profile.location}
            </span>
          </motion.div>
        </motion.div>

        <HeroVisual />
      </div>

      {/* tech strip */}
      <div className="relative border-t border-white/[0.06]">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-8 gap-y-2 px-5 py-5 sm:px-8">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">
            working with
          </span>
          {["Llama 3.1 · Groq", "RAG · Vector Search", "React · Next.js", "Node · MongoDB", "Docker · CI/CD"].map(
            (t) => (
              <span key={t} className="font-mono text-[12px] text-zinc-400">
                {t}
              </span>
            )
          )}
        </div>
      </div>
    </section>
  );
}
