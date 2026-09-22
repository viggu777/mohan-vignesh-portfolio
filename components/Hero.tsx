"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  FileText,
  MapPin,
  Layers,
  Smartphone,
  Sparkles,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { profile } from "@/data/profile";
import { useSafeReducedMotion } from "@/lib/use-safe-reduced-motion";

const ease = [0.22, 1, 0.36, 1] as const;

/* Ledger stats — big tabular numerals, micro mono labels. No boxes, no dots. */
const stats = [
  { value: "8.9", label: "CGPA · CSE '27" },
  { value: "500+", label: "LeetCode solved" },
  { value: "04", label: "Live projects" },
  { value: "05", label: "Stacks shipped" },
];

const techStrip = [
  "React · Next.js",
  "Node · Express · MongoDB",
  "React Native · Firebase",
  "JWT · RBAC · REST APIs",
  "Docker · CI/CD",
  "Practical GenAI · RAG",
];

function HeroVisual() {
  const reduce = useSafeReducedMotion();

  const focus = [
    {
      icon: Layers,
      tint: "bg-sky-400/10 text-sky-300 border-sky-400/20",
      title: "Full-stack MERN",
      sub: "React · APIs · MongoDB",
    },
    {
      icon: Smartphone,
      tint: "bg-emerald-400/10 text-emerald-300 border-emerald-400/20",
      title: "Next.js · React Native",
      sub: "Web & mobile apps",
    },
    {
      icon: Sparkles,
      tint: "bg-violet-400/10 text-violet-300 border-violet-400/20",
      title: "Practical GenAI features",
      sub: "RAG · prompt engineering",
    },
  ];

  const stack = ["Next.js", "React Native", "MongoDB", "Docker", "Firebase"];

  return (
    <div aria-hidden="true" className="relative mx-auto min-w-0 w-full max-w-[440px] select-none">
      {/* single ambient wash — no scattered corner blobs */}
      <div className="absolute -inset-8 rounded-[32px] bg-[radial-gradient(ellipse_55%_55%_at_50%_40%,rgba(52,211,153,0.13),rgba(125,211,252,0.06)_45%,transparent_70%)] blur-2xl" />

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.25, ease }}
        className="glass noise relative min-w-0 overflow-hidden rounded-3xl border border-white/10 shadow-[0_24px_80px_-24px_rgba(0,0,0,0.9)]"
      >
        {/* top gradient hairline */}
        <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/60 to-transparent" />

        <div className="relative min-w-0 p-5 sm:p-6">
          {/* identity row */}
          <div className="flex items-center gap-3.5">
            <div className="relative shrink-0">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 via-sky-400 to-violet-400 p-[1.5px] sm:h-14 sm:w-14">
                <div className="flex h-full w-full items-center justify-center rounded-[14px] bg-[#0a1120] text-lg font-bold tracking-tight text-white">
                  {profile.monogram}
                </div>
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-[#0a1120] bg-emerald-400">
                <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-emerald-950" />
              </span>
            </div>
            <div className="min-w-0">
              <p className="truncate text-[15px] font-semibold text-white">{profile.name}</p>
              <p className="truncate font-mono text-[11px] text-slate-400">{profile.role}</p>
            </div>
            <span className="ml-auto hidden shrink-0 rounded-md border border-white/10 bg-black/40 px-2 py-1 font-mono text-[10px] text-slate-400 sm:block">
              id — 001
            </span>
          </div>

          {/* focus list — the one place icon-chips earn their keep */}
          <ul className="mt-5 space-y-2.5">
            {focus.map((f, i) => (
              <motion.li
                key={f.title}
                initial={reduce ? false : { opacity: 0, x: 18 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.45 + i * 0.12, ease }}
                className="flex items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.03] px-3.5 py-3"
              >
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border ${f.tint}`}
                >
                  <f.icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-[13.5px] font-semibold text-slate-100">
                    {f.title}
                  </span>
                  <span className="block truncate font-mono text-[11px] text-slate-400">{f.sub}</span>
                </span>
                <span className="ml-auto shrink-0 font-mono text-[10px] text-slate-600">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </motion.li>
            ))}
          </ul>

          {/* stack — quiet slash list instead of pills */}
          <p className="mt-4 truncate font-mono text-[11px] text-slate-500">
            {stack.join("  /  ")}
          </p>

          {/* footer */}
          <div className="mt-4 flex items-center justify-between gap-2 border-t border-white/[0.07] pt-4">
            <span className="inline-flex min-w-0 items-center gap-1.5 font-mono text-[11px] text-slate-400">
              <MapPin className="h-3.5 w-3.5 shrink-0 text-slate-500" aria-hidden="true" />
              <span className="truncate">{profile.location}</span>
            </span>
            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 font-mono text-[10.5px] font-medium text-emerald-300">
              <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-emerald-400" />
              open to work
            </span>
          </div>
        </div>
      </motion.div>

      {/* single floating ticket — desktop only, no motion loop cost on mobile */}
      {!reduce && (
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-5 right-0 hidden max-w-full rounded-2xl border border-white/10 bg-[#0a1120]/95 px-3.5 py-2.5 shadow-2xl backdrop-blur lg:block"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-emerald-300">
            live system
          </p>
          <p className="mt-0.5 text-[12.5px] font-semibold text-slate-100">
            exam engine · 300 concurrent
          </p>
        </motion.div>
      )}
    </div>
  );
}

export function Hero() {
  const reduce = useSafeReducedMotion();
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.07 } },
  };
  const item = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.65, ease } },
  };
  const initialState = reduce ? false : "hidden";

  return (
    <section id="home" aria-label="Introduction" className="relative overflow-clip">
      {/* background: one wash + grid + vignette. No corner-blob scatter. */}
      <div aria-hidden="true" className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_50%_at_50%_-5%,rgba(52,211,153,0.12),transparent_60%)]" />
        <div className="bg-grid mask-fade-radial absolute inset-0 opacity-60" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#05080f] to-transparent" />
      </div>

      <div className="relative mx-auto grid w-full min-w-0 max-w-6xl gap-12 px-4 pb-10 pt-10 sm:px-8 sm:pb-14 sm:pt-14 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-14 lg:pt-20">
        <motion.div
          variants={container}
          initial={initialState}
          animate="show"
          className="min-w-0 max-w-2xl"
        >
          {profile.availability.enabled && (
            <motion.div variants={item} className="flex max-w-full flex-wrap items-center gap-2">
              <span className="inline-flex max-w-full items-center gap-2.5 rounded-full border border-white/[0.1] bg-white/[0.03] py-1.5 pl-3 pr-4 text-[12px] font-medium text-slate-300 backdrop-blur sm:text-[12.5px]">
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
            className="mt-7 font-mono text-[11px] uppercase tracking-[0.26em] text-slate-500 sm:text-[12px]"
          >
            <span className="text-emerald-300">~/</span> {profile.name} — portfolio 2026
          </motion.p>
          {/* Display type: the loudest moment on the page */}
          <motion.h1
            variants={item}
            className="text-balance mt-4 text-[clamp(2.75rem,7vw,4.9rem)] font-bold leading-[0.98] tracking-[-0.045em] text-white"
          >
            Building real-world apps with{" "}
            <span className="text-gradient-hero">MERN &amp; Next.js.</span>
          </motion.h1>
          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-[16px] leading-7 text-slate-400 sm:text-[17px] sm:leading-8"
          >
            {profile.summary}{" "}
            <span className="font-medium text-slate-200">
              Auth, RBAC, payments, and deployed full-stack systems.
            </span>
          </motion.p>

          {/* CTAs */}
          <motion.div variants={item} className="mt-7 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:items-center">
            <Link
              href="/#projects"
              className="group inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-[15px] font-semibold text-black transition hover:bg-slate-200 active:scale-[0.99] sm:w-auto"
            >
              Explore projects
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
            <div className="grid grid-cols-2 gap-2.5 sm:flex sm:gap-3">
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

          {/* stats ledger — hairlines, oversized numerals */}
          <motion.dl
            variants={item}
            aria-label="Highlights"
            className="mt-9 grid grid-cols-2 gap-x-6 border-t border-white/[0.08] pt-5 sm:grid-cols-4"
          >
            {stats.map((s) => (
              <div key={s.label} className="min-w-0 py-1">
                <dd className="tabular order-1 text-[28px] font-bold tracking-[-0.03em] text-white sm:text-[32px]">
                  {s.value}
                </dd>
                <dt className="order-2 mt-1 font-mono text-[10px] uppercase leading-4 tracking-[0.14em] text-slate-500">
                  {s.label}
                </dt>
              </div>
            ))}
          </motion.dl>

          {/* socials — quiet text links */}
          <motion.div variants={item} className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
            <a
              href={profile.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center gap-1.5 text-[13.5px] font-medium text-slate-300 transition hover:text-white"
            >
              <GithubIcon className="h-4 w-4" />
              GitHub
              <ArrowUpRight className="h-3.5 w-3.5 text-slate-600" aria-hidden="true" />
            </a>
            <a
              href={profile.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center gap-1.5 text-[13.5px] font-medium text-slate-300 transition hover:text-white"
            >
              <LinkedinIcon className="h-4 w-4" />
              LinkedIn
              <ArrowUpRight className="h-3.5 w-3.5 text-slate-600" aria-hidden="true" />
            </a>
            <span className="inline-flex min-h-[44px] items-center gap-1.5 text-[13px] text-slate-500">
              <MapPin className="h-3.5 w-3.5 shrink-0 text-slate-600" aria-hidden="true" />
              <span className="truncate">{profile.location}</span>
            </span>
          </motion.div>
        </motion.div>

        <HeroVisual />
      </div>

      {/* tech strip — hairline rule, diamond separators */}
      <div className="relative border-t border-white/[0.06] bg-black/20">
        {/* mobile marquee */}
        <div className="marquee-mask overflow-hidden sm:hidden">
          <div className="flex w-max animate-marquee items-center gap-3 px-5 py-4">
            {[...techStrip, ...techStrip].map((t, i) => (
              <span
                key={`${t}-${i}`}
                aria-hidden={i >= techStrip.length}
                className="flex shrink-0 items-center gap-3 font-mono text-[12px] text-slate-500"
              >
                {t}
                <span aria-hidden="true" className="text-slate-700">◆</span>
              </span>
            ))}
          </div>
        </div>
        {/* desktop static row */}
        <div className="mx-auto hidden max-w-6xl flex-wrap items-center gap-x-4 gap-y-2 px-8 py-4 sm:flex">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-slate-600">
            stack
          </span>
          <span aria-hidden="true" className="h-3 w-px bg-white/10" />
          {techStrip.map((t, i) => (
            <span key={t} className="flex items-center gap-4 font-mono text-[12px] text-slate-500">
              {t}
              {i < techStrip.length - 1 && (
                <span aria-hidden="true" className="text-[8px] text-slate-700">◆</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
