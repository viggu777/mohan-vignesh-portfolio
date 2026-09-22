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

const stats = [
  { value: "8.9", label: "CGPA · CSE '27", dot: "bg-sky-400" },
  { value: "500+", label: "LeetCode solved", dot: "bg-amber-300" },
  { value: "04", label: "Live projects", dot: "bg-violet-400" },
  { value: "MERN", label: "Next.js · RN", dot: "bg-emerald-400" },
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
      dot: "bg-sky-400",
      title: "Full-stack MERN",
      sub: "React · APIs · MongoDB",
    },
    {
      icon: Smartphone,
      tint: "bg-emerald-400/10 text-emerald-300 border-emerald-400/20",
      dot: "bg-emerald-400",
      title: "Next.js · React Native",
      sub: "Web & mobile apps",
    },
    {
      icon: Sparkles,
      tint: "bg-violet-400/10 text-violet-300 border-violet-400/20",
      dot: "bg-violet-400",
      title: "Practical GenAI features",
      sub: "RAG · prompt engineering",
    },
  ];

  const stack = ["Next.js", "React Native", "MongoDB", "Docker", "Firebase"];

  return (
    <div aria-hidden="true" className="relative mx-auto w-full max-w-[440px] select-none">
      {/* soft ambient glow behind card */}
      <div className="absolute -inset-8 rounded-[32px] bg-[radial-gradient(ellipse_55%_55%_at_50%_40%,rgba(52,211,153,0.16),rgba(125,211,252,0.08)_45%,transparent_70%)] blur-2xl" />
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-violet-500/15 blur-3xl" />

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.25, ease }}
        className="glass noise relative overflow-hidden rounded-3xl border border-white/10 shadow-[0_24px_80px_-24px_rgba(0,0,0,0.9)]"
      >
        {/* top gradient hairline */}
        <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/60 to-transparent" />

        <div className="relative p-5 sm:p-6">
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
          </div>

          {/* focus list */}
          <ul className="mt-5 space-y-2.5">
            {focus.map((f, i) => (
              <motion.li
                key={f.title}
                initial={reduce ? false : { opacity: 0, x: 18 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.45 + i * 0.12, ease }}
                className="group flex items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.03] px-3.5 py-3"
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
                <span className={`ml-auto h-1.5 w-1.5 shrink-0 rounded-full ${f.dot}`} />
              </motion.li>
            ))}
          </ul>

          {/* stack pills */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {stack.map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/[0.08] bg-white/[0.04] px-2.5 py-1 font-mono text-[10.5px] text-slate-300"
              >
                {t}
              </span>
            ))}
          </div>

          {/* footer */}
          <div className="mt-5 flex items-center justify-between border-t border-white/[0.07] pt-4">
            <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-slate-400">
              <MapPin className="h-3.5 w-3.5 text-slate-500" aria-hidden="true" />
              {profile.location}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 font-mono text-[10.5px] font-medium text-emerald-300">
              <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-emerald-400" />
              open to work
            </span>
          </div>
        </div>
      </motion.div>

      {/* single floating badge — desktop only */}
      {!reduce && (
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-5 -top-5 hidden rounded-2xl border border-white/10 bg-[#0a1120]/95 px-3.5 py-2.5 shadow-2xl backdrop-blur lg:block"
        >
          <p className="font-mono text-[10px] uppercase tracking-wider text-emerald-300">currently</p>
          <p className="text-[12.5px] font-semibold text-slate-100">exam engine · live</p>
        </motion.div>
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
      {/* background layers — rich mesh + grid + vignette */}
      <div aria-hidden="true" className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_50%_-5%,rgba(52,211,153,0.14),transparent_60%),radial-gradient(ellipse_60%_50%_at_85%_25%,rgba(167,139,250,0.13),transparent_65%),radial-gradient(ellipse_55%_45%_at_10%_30%,rgba(56,189,248,0.10),transparent_65%)]" />
        <div className="bg-grid mask-fade-radial absolute inset-0 opacity-70" />
        <div className="absolute left-1/2 top-[-180px] h-[380px] w-[680px] -translate-x-1/2 animate-aurora rounded-full bg-[radial-gradient(ellipse_at_center,rgba(52,211,153,0.12),transparent_65%)] blur-3xl" />
        <div className="absolute -right-40 top-[20%] h-[340px] w-[440px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(167,139,250,0.14),transparent_65%)] blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#05080f] to-transparent" />
      </div>

      <div className="relative mx-auto grid w-full max-w-6xl gap-10 px-4 pb-8 pt-8 sm:gap-10 sm:px-8 sm:pb-12 sm:pt-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-12 lg:pt-14">
        <motion.div
          variants={container}
          initial={initialState}
          animate="show"
          className="min-w-0 max-w-2xl"
        >
          {profile.availability.enabled && (
            <motion.div variants={item} className="flex max-w-full flex-wrap items-center gap-2">
              <span className="inline-flex max-w-full items-center gap-2.5 rounded-full border border-emerald-400/25 bg-emerald-400/[0.08] py-1.5 pl-3 pr-4 text-[12px] font-medium text-emerald-200 backdrop-blur sm:text-[12.5px]">
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
            className="text-balance mt-3 text-[32px] font-bold leading-[1.08] tracking-[-0.03em] text-white sm:text-5xl lg:text-[60px]"
          >
            Building real-world apps with{" "}
            <span className="text-gradient-hero">MERN &amp; Next.js.</span>
          </motion.h1>
          <motion.p variants={item} className="mt-5 max-w-xl text-[15px] leading-7 text-slate-400 sm:text-[16px]">
            {profile.summary}{" "}
            <span className="font-medium text-slate-200">
              Auth, RBAC, payments, and deployed full-stack systems.
            </span>
          </motion.p>

          {/* CTAs — full-width primary on mobile, quiet secondary */}
          <motion.div variants={item} className="mt-6 grid grid-cols-1 gap-2.5 sm:flex sm:flex-wrap sm:items-center">
            <Link
              href="/#projects"
              className="group inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-[15px] font-semibold text-black transition hover:bg-slate-200 active:scale-[0.99] sm:w-auto"
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
            className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-4"
            aria-label="Highlights"
          >
            {stats.map((s) => (
              <div
                key={s.label}
                className="flex flex-col rounded-2xl border border-white/[0.07] bg-white/[0.03] px-3.5 py-3 backdrop-blur sm:px-4 sm:py-3.5"
              >
                <dt className="order-2 mt-1 text-[11px] leading-4 text-slate-400 sm:text-[11.5px]">{s.label}</dt>
                <dd className="order-1 flex items-center gap-1.5 text-lg font-bold tracking-tight text-white sm:text-xl">
                  <span aria-hidden="true" className={`h-1.5 w-1.5 shrink-0 rounded-full ${s.dot}`} />
                  {s.value}
                </dd>
              </div>
            ))}
          </motion.dl>

          {/* socials — compact, no break-all */}
          <motion.div variants={item} className="mt-5 flex flex-wrap items-center gap-2">
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
