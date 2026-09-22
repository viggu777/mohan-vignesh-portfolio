"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, FileText, MapPin } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { profile } from "@/data/profile";
import { useSafeReducedMotion } from "@/lib/use-safe-reduced-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const stats = [
  { value: "8.9", label: "CGPA · CSE '27" },
  { value: "500+", label: "LeetCode solved" },
  { value: "04", label: "Systems shipped" },
  { value: "RAG", label: "GenAI · MERN" },
];

const techStrip = [
  "Llama 3.1 · Groq",
  "RAG · Vector Search",
  "React · Next.js",
  "Node · Express · MongoDB",
  "Docker · CI/CD",
  "Hugging Face · LangChain",
];

function HeroVisual() {
  const reduce = useSafeReducedMotion();
  return (
    <div aria-hidden="true" className="relative mx-auto w-full max-w-[560px] select-none">
      {/* single soft glow — no competing green/purple orbs */}

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.25, ease }}
        className="code-glow glass noise relative overflow-hidden rounded-2xl border border-slate-400/15 sm:rounded-3xl"
      >
        {/* window chrome */}
        <div className="flex items-center gap-1.5 border-b border-slate-400/10 bg-white/[0.02] px-3.5 py-3 sm:px-4">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-2 truncate font-mono text-[11px] text-slate-400">
            rag-pipeline.ts — live
          </span>
          <span className="ml-auto hidden shrink-0 items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 font-mono text-[10px] font-medium text-emerald-300 sm:flex">
            <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-emerald-400" />
            grounded · 38ms
          </span>
        </div>

        <div className="grid gap-0 sm:grid-cols-[1fr_168px]">
          <div className="min-w-0 p-4 font-mono text-[12px] leading-[1.8] sm:p-5">
            <p className="text-slate-500">{"// retrieval → generation"}</p>
            <p className="break-all">
              <span className="text-emerald-300">const</span>{" "}
              <span className="text-slate-100">chunks</span>{" "}
              <span className="text-slate-500">=</span>{" "}
              <span className="text-sky-300">await ingest</span>
              <span className="text-slate-500">(</span>
              <span className="text-amber-200/90">“pdf”</span>
              <span className="text-slate-500">)</span>
            </p>
            <p className="break-all">
              <span className="text-emerald-300">const</span>{" "}
              <span className="text-slate-100">hits</span>{" "}
              <span className="text-slate-500">=</span>{" "}
              <span className="text-sky-300">await search</span>
              <span className="text-slate-500">(</span>
              <span className="text-slate-200">q</span>
              <span className="text-slate-500">)</span>
            </p>
            <p className="break-all">
              <span className="text-slate-300">return</span>{" "}
              <span className="text-slate-200">answer</span>
              <span className="text-slate-500">(</span>
              <span className="text-slate-200">hits</span>
              <span className="text-slate-500">)</span>
            </p>
            <div className="mt-4 space-y-2.5 border-t border-slate-400/10 pt-4">
              {[
                { label: "chunk · embed", w: "92%", c: "bg-emerald-400/80", pct: "1.2k" },
                { label: "retrieve · top-8", w: "76%", c: "bg-sky-400/80", pct: "38ms" },
                { label: "generate · cited", w: "64%", c: "bg-slate-300/80", pct: "cited" },
              ].map((row) => (
                <div key={row.label}>
                  <div className="mb-1 flex items-center justify-between text-[10px] text-slate-400">
                    <span className="truncate">{row.label}</span>
                    <span className="ml-2 shrink-0 font-medium text-slate-300">{row.pct}</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.07]">
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
          <div className="hidden border-l border-slate-400/10 bg-white/[0.015] p-4 sm:block">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
              pipeline
            </p>
            <ul className="mt-3 space-y-2.5 font-mono text-[11px]">
              {[
                ["ingest", "bg-emerald-400"],
                ["embed", "bg-teal-300"],
                ["index", "bg-sky-400"],
                ["retrieve", "bg-cyan-300"],
                ["generate", "bg-violet-400"],
              ].map(([s, c], i) => (
                <li key={s} className="flex items-center gap-2 text-slate-400">
                  <span className={`h-1.5 w-1.5 rounded-full ${c}`} />
                  <span className="text-slate-300">{s}</span>
                  <span className="ml-auto text-slate-600">{`0${i + 1}`}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 rounded-xl border border-emerald-400/15 bg-emerald-400/[0.06] p-2.5">
              <p className="font-mono text-[10px] text-emerald-300/80">eval · grounded</p>
              <p className="mt-1 font-mono text-[11px] text-slate-200">
                cited <span className="text-emerald-300">✓</span> scoped{" "}
                <span className="text-emerald-300">✓</span>
              </p>
            </div>
          </div>
        </div>

        {/* terminal footer — mobile visible, compact */}
        <div className="flex items-center gap-2 border-t border-slate-400/10 bg-black/40 px-3.5 py-2.5 font-mono text-[10.5px] text-slate-400 sm:px-4">
          <span className="text-emerald-300">➜</span>
          <span className="truncate">deploy: exam-engine · 400 concurrent · p95 210ms</span>
          <span className="ml-auto hidden shrink-0 text-slate-500 sm:inline">us · prod</span>
        </div>
      </motion.div>

      {/* floating chips — desktop only */}
      {!reduce && (
        <>
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-5 top-14 hidden rounded-2xl border border-slate-400/15 bg-[#0a1120]/95 px-3.5 py-2.5 shadow-2xl backdrop-blur lg:block"
          >
            <p className="font-mono text-[10px] uppercase tracking-wider text-emerald-300">mern · live</p>
            <p className="text-[12.5px] font-semibold text-slate-100">exam engine + analytics</p>
          </motion.div>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
            className="absolute -right-4 bottom-16 hidden rounded-2xl border border-slate-400/15 bg-[#0a1120]/95 px-3.5 py-2.5 shadow-2xl backdrop-blur lg:block"
          >
            <p className="font-mono text-[10px] uppercase tracking-wider text-sky-300">atlas vector</p>
            <p className="text-[12.5px] font-semibold text-slate-100">user-scoped · cited</p>
          </motion.div>
        </>
      )}
    </div>
  );
}

export function Hero() {
  const reduce = useSafeReducedMotion();
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
  };
  const item = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.65, ease } },
  };
  const initialState = reduce ? false : "hidden";

  return (
    <section id="home" aria-label="Introduction" className="relative overflow-clip">
      {/* background layers — faint grid only, no muddy color bands */}
      <div aria-hidden="true" className="absolute inset-0">
        <div className="bg-grid mask-fade-radial absolute inset-0 opacity-60" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </div>

      <div className="relative mx-auto grid w-full max-w-6xl gap-8 px-5 pb-10 pt-10 sm:gap-10 sm:px-8 sm:pb-14 sm:pt-14 lg:grid-cols-[1.04fr_0.96fr] lg:items-center lg:pt-16">
        <motion.div
          variants={container}
          initial={initialState}
          animate="show"
          className="min-w-0 max-w-2xl"
        >
          {profile.availability.enabled && (
            <motion.div variants={item}>
              <span className="inline-flex max-w-full items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] py-1.5 pl-3 pr-4 text-[12px] font-medium text-slate-300 backdrop-blur sm:text-[12.5px]">
                {profile.availability.dot && (
                  <span className="relative flex h-2 w-2 shrink-0">
                    <span className="absolute h-full w-full animate-pulse-dot rounded-full bg-emerald-400" />
                  </span>
                )}
                <span className="truncate">{profile.availability.label}</span>
              </span>
            </motion.div>
          )}

          <motion.p
            variants={item}
            className="mt-6 font-mono text-[11px] uppercase tracking-[0.26em] text-slate-400 sm:text-[12px]"
          >
            <span className="text-emerald-300">~/</span> {profile.name}
          </motion.p>
          <motion.h1
            variants={item}
            className="text-balance mt-3 text-[40px] font-bold leading-[1.04] tracking-[-0.03em] text-white sm:text-6xl lg:text-[64px]"
          >
            Building intelligent products with{" "}
            <span className="text-gradient-hero">AI &amp; code.</span>
          </motion.h1>
          <motion.p variants={item} className="mt-5 max-w-xl text-[15px] leading-7 text-slate-400 sm:text-[16px]">
            {profile.summary}{" "}
            <span className="font-medium text-slate-200">
              Production RAG, full-stack MERN, and evals with fallbacks.
            </span>
          </motion.p>

          {/* CTAs — restrained white primary, quiet secondary */}
          <motion.div variants={item} className="mt-7 grid grid-cols-1 gap-3 sm:flex sm:flex-wrap sm:items-center">
            <Link
              href="/#projects"
              className="group inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-[15px] font-semibold text-black transition hover:bg-slate-200 active:scale-[0.99] sm:w-auto"
            >
              Explore projects
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
            <div className="grid grid-cols-2 gap-3 sm:flex sm:gap-3">
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-white/12 bg-white/[0.04] px-5 py-3 text-[14px] font-medium text-slate-100 backdrop-blur transition hover:border-white/25 hover:bg-white/[0.08]"
              >
                <FileText className="h-4 w-4" aria-hidden="true" />
                Resume
              </a>
              <Link
                href="/#contact"
                className="inline-flex min-h-[48px] items-center justify-center gap-1.5 rounded-xl border border-transparent px-5 py-3 text-[14px] font-semibold text-slate-300 transition hover:bg-white/[0.06] hover:text-white"
              >
                Contact
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </motion.div>

          {/* stats — 2x2 on mobile, 4-col on sm+ */}
          <motion.dl
            variants={item}
            className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4"
            aria-label="Highlights"
          >
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-white/[0.07] bg-white/[0.03] px-4 py-3.5 backdrop-blur"
              >
                <dt className="order-2 mt-1 text-[11.5px] leading-4 text-slate-400">{s.label}</dt>
                <dd className="order-1 text-xl font-bold tracking-tight text-white">{s.value}</dd>
              </div>
            ))}
          </motion.dl>

          {/* socials — compact, no break-all */}
          <motion.div variants={item} className="mt-7 flex flex-wrap items-center gap-2">
            <a
              href={profile.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[40px] items-center gap-2 rounded-lg border border-slate-400/12 bg-white/[0.03] px-3 py-2 text-[13px] font-medium text-slate-300 transition hover:border-slate-300/30 hover:text-white"
            >
              <GithubIcon className="h-4 w-4" />
              GitHub
            </a>
            <a
              href={profile.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[40px] items-center gap-2 rounded-lg border border-slate-400/12 bg-white/[0.03] px-3 py-2 text-[13px] font-medium text-slate-300 transition hover:border-sky-300/40 hover:text-white"
            >
              <LinkedinIcon className="h-4 w-4" />
              LinkedIn
            </a>
            <span className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg px-2 py-2 text-[13px] text-slate-400">
              <MapPin className="h-3.5 w-3.5 shrink-0 text-slate-500" aria-hidden="true" />
              <span className="truncate">{profile.location}</span>
            </span>
          </motion.div>
        </motion.div>

        <HeroVisual />
      </div>

      {/* tech strip — single clean row on desktop, marquee only on mobile */}
      <div className="relative border-t border-white/[0.06] bg-black/20">
        {/* mobile marquee */}
        <div className="marquee-mask overflow-hidden sm:hidden">
          <div className="flex w-max animate-marquee items-center gap-8 px-5 py-4">
            {[...techStrip, ...techStrip].map((t, i) => (
              <span
                key={`${t}-${i}`}
                aria-hidden={i >= techStrip.length}
                className="shrink-0 font-mono text-[12px] text-slate-400"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
        {/* desktop static row */}
        <div className="mx-auto hidden max-w-6xl flex-wrap items-center gap-x-7 gap-y-2 px-8 py-4 sm:flex">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-slate-500">
            working with
          </span>
          {techStrip.map((t) => (
            <span key={t} className="font-mono text-[12px] text-slate-400">
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
