"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { techIcon } from "@/components/tech-icons";
import { useSafeReducedMotion } from "@/lib/use-safe-reduced-motion";

const ease = [0.22, 1, 0.36, 1] as const;

/* Ledger stats — serif numerals, micro mono labels. */
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

/* Engineering-stack composition — small vector marks, never giant logos. */
const heroStack = [
  "React",
  "Next.js",
  "Node.js",
  "Express.js",
  "MongoDB",
  "Firebase",
  "Docker",
  "RAG",
];

function TechStackVisual() {
  return (
    <div
      className="relative min-w-0 rounded-lg border p-6"
      style={{ background: "#0D1420", borderColor: "rgba(255,255,255,0.07)" }}
    >
      {/* Header label */}
      <div className="mb-5 flex items-center justify-between">
        <span
          className="tech-label"
          style={{ color: "#3D506A", fontSize: "9px", letterSpacing: "0.12em" }}
        >
          ENGINEERING STACK
        </span>
        <div className="flex gap-1" aria-hidden="true">
          {["#FF5F57", "#FFBD2E", "#27C93F"].map((c) => (
            <div key={c} className="h-2 w-2 rounded-full" style={{ background: c, opacity: 0.7 }} />
          ))}
        </div>
      </div>

      {/* Stack grid */}
      <ul className="mb-4 grid grid-cols-2 gap-2" aria-label="Engineering stack">
        {heroStack.map((tech, i) => {
          const { Icon, color } = techIcon(tech);
          const isSpecial = i === 0 || i === 1;
          return (
            <li
              key={tech}
              className="flex items-center gap-2 rounded px-3 py-2.5"
              style={{
                background: isSpecial ? `${color}12` : "#111927",
                border: `1px solid ${isSpecial ? `${color}30` : "rgba(255,255,255,0.07)"}`,
              }}
            >
              <Icon size={16} />
              <span
                className="tech-label"
                style={{ color: isSpecial ? color : "#7A90B0", fontSize: "11px" }}
              >
                {tech}
              </span>
            </li>
          );
        })}
      </ul>

      {/* Bottom line */}
      <div
        className="flex items-center justify-between pt-4"
        style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
      >
        <div className="flex gap-3">
          {[
            { label: "GitHub", href: profile.socials.github },
            { label: "LinkedIn", href: profile.socials.linkedin },
            { label: "LeetCode", href: profile.socials.leetcode },
          ].map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="tech-label transition-colors hover:text-[#7A90B0]"
              style={{ color: "#3D506A", textDecoration: "none", fontSize: "10px" }}
            >
              {s.label}
            </a>
          ))}
        </div>
        <div className="h-2 w-2 rounded-full" style={{ background: "#38BDF8", opacity: 0.8 }} />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Desktop-only Hero right side (reference: Viggu_Port.zip → App.tsx Hero) */
/* Terminal + tech constellation + commit activity + socials. Rendered only */
/* at lg+ via `hidden lg:*` wrappers below — mobile keeps TechStackVisual.   */
/* ------------------------------------------------------------------ */

/* Real project-backed terminal intro (StudyMate repo exists in data). */
const desktopIntroSequence = [
  { type: "cmd", text: "git clone github.com/viggu777/StudyMate-App" },
  { type: "out", text: "✓ Cloned — studymate" },
  { type: "cmd", text: "npm run dev" },
  { type: "out", text: "⚡ ready → localhost:3000" },
  { type: "cmd", text: "git log --oneline -3" },
  { type: "out", text: "a3f9c2e feat: RAG pipeline v2" },
  { type: "out", text: "b1d8e7a fix: trust-score aggregation" },
  { type: "out", text: "f7a2c1b chore: docker multi-stage" },
  { type: "cmd", text: "npm run build" },
  { type: "out", text: "✓ build passed" },
] as const;

type TerminalLine = { type: "cmd" | "out" | "hint"; text: string };

const terminalHint: TerminalLine = { type: "hint", text: "Interactive — type 'help' ↓" };

function runTerminalCommand(raw: string): { lines: TerminalLine[]; clear?: boolean; replay?: boolean } {
  const cmd = raw.trim().split(/\s+/)[0]?.toLowerCase() ?? "";
  switch (cmd) {
    case "":
      return { lines: [] };
    case "help":
      return {
        lines: [
          { type: "out", text: "whoami · stack · projects · socials · email · replay · clear" },
        ],
      };
    case "whoami":
      return {
        lines: [
          { type: "out", text: profile.name },
          { type: "out", text: profile.role },
          { type: "out", text: profile.location },
        ],
      };
    case "stack":
      return { lines: heroStack.map((t) => ({ type: "out" as const, text: `· ${t}` })) };
    case "projects":
      return {
        lines: projects.map((p) => ({ type: "out" as const, text: `· ${p.name} — ${p.tagline}` })),
      };
    case "socials":
      return {
        lines: [
          { type: "out", text: `· GitHub — ${profile.socials.github}` },
          { type: "out", text: `· LinkedIn — ${profile.socials.linkedin}` },
          { type: "out", text: `· LeetCode — ${profile.socials.leetcode}` },
        ],
      };
    case "email":
    case "contact":
      return { lines: [{ type: "out", text: profile.email }] };
    case "replay":
      return { lines: [], replay: true };
    case "clear":
      return { lines: [], clear: true };
    default:
      return { lines: [{ type: "out", text: `command not found: ${cmd} — try 'help'` }] };
  }
}

function DesktopTerminal() {
  const reduce = useSafeReducedMotion();
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [introDone, setIntroDone] = useState(false);
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  /* Keep the newest output in view while the terminal plays or prints. */
  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines, charIdx]);

  /* Intro: typewriter demo played once, then the prompt takes over. */
  useEffect(() => {
    if (introDone) return;
    if (reduce) {
      const timer = setTimeout(() => {
        setLines([...desktopIntroSequence, terminalHint] as TerminalLine[]);
        setLineIdx(desktopIntroSequence.length);
        setIntroDone(true);
      }, 0);
      return () => clearTimeout(timer);
    }
    if (lineIdx >= desktopIntroSequence.length) {
      const timer = setTimeout(() => {
        setLines((prev) => [...prev, terminalHint]);
        setIntroDone(true);
      }, 400);
      return () => clearTimeout(timer);
    }
    const cur = desktopIntroSequence[lineIdx];
    if (cur.type === "out") {
      const timer = setTimeout(() => {
        setLines((prev) => [...prev, { type: "out", text: cur.text }]);
        setLineIdx((i) => i + 1);
      }, 300);
      return () => clearTimeout(timer);
    }
    if (charIdx < cur.text.length) {
      const timer = setTimeout(() => setCharIdx((c) => c + 1), 38);
      return () => clearTimeout(timer);
    }
    const timer = setTimeout(() => {
      setLines((prev) => [...prev, { type: "cmd", text: cur.text }]);
      setLineIdx((i) => i + 1);
      setCharIdx(0);
    }, 500);
    return () => clearTimeout(timer);
  }, [lineIdx, charIdx, reduce, introDone]);

  const focusInput = () => inputRef.current?.focus();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!introDone || !value.trim()) return;
    const raw = value;
    const result = runTerminalCommand(raw);
    if (result.clear) {
      setLines([]);
    } else if (result.replay) {
      setCharIdx(0);
      setLineIdx(0);
      if (reduce) {
        setLines([...desktopIntroSequence, terminalHint] as TerminalLine[]);
        setLineIdx(desktopIntroSequence.length);
        setIntroDone(true);
      } else {
        setLines([]);
        setIntroDone(false);
      }
    } else {
      setLines((prev) => [...prev, { type: "cmd", text: raw }, ...result.lines]);
    }
    setValue("");
  };

  const cur =
    lineIdx < desktopIntroSequence.length
      ? desktopIntroSequence[lineIdx]
      : desktopIntroSequence[0];
  const isTyping =
    !reduce &&
    !introDone &&
    lineIdx < desktopIntroSequence.length &&
    cur.type === "cmd" &&
    charIdx < cur.text.length;

  return (
    <div
      onClick={focusInput}
      className="cursor-text overflow-hidden rounded-md transition-colors hover:border-[rgba(255,255,255,0.16)]"
      style={{
        background: "#070D18",
        border: "1px solid rgba(255,255,255,0.12)",
        fontFamily: "var(--font-jetbrains-mono), ui-monospace, monospace",
      }}
    >
      {/* Title bar */}
      <div
        className="flex items-center gap-2 px-3 py-2"
        style={{ background: "#111927", borderBottom: "1px solid rgba(255,255,255,0.07)" }}
      >
        <div className="flex gap-1.5" aria-hidden="true">
          {["#FF5F57", "#FFBD2E", "#27C93F"].map((c) => (
            <div key={c} className="h-2 w-2 rounded-full" style={{ background: c }} />
          ))}
        </div>
        <span style={{ fontSize: "10px", color: "#3D506A", letterSpacing: "0.05em" }}>
          ~/portfolio — zsh
        </span>
        <span
          className="ml-auto"
          style={{ fontSize: "9px", color: "#3D506A", letterSpacing: "0.05em" }}
        >
          type &apos;help&apos;
        </span>
      </div>
      {/* Output area — fixed height so the column never jumps; auto-scrolls. */}
      <div
        ref={bodyRef}
        aria-live="off"
        className="min-w-0 space-y-1 overflow-y-auto px-4 py-3"
        style={{ height: 172 }}
      >
        {lines.map((line, i) =>
          line.type === "cmd" ? (
            <div key={i} className="min-w-0 break-words" style={{ fontSize: "11px", lineHeight: 1.6 }}>
              <span style={{ color: "#34D399" }}>▸ </span>
              <span style={{ color: "#EEF2FF" }}>{line.text}</span>
            </div>
          ) : line.type === "hint" ? (
            <div key={i} className="min-w-0 break-words" style={{ fontSize: "11px", lineHeight: 1.6, color: "#38BDF8" }}>
              {line.text}
            </div>
          ) : (
            <div key={i} className="min-w-0 break-words" style={{ fontSize: "11px", lineHeight: 1.6, color: "#3D506A", paddingLeft: 12 }}>
              {line.text}
            </div>
          ),
        )}
        {isTyping ? (
          <div style={{ fontSize: "11px", lineHeight: 1.6 }}>
            <span style={{ color: "#34D399" }}>▸ </span>
            <span style={{ color: "#EEF2FF" }}>{cur.text.slice(0, charIdx)}</span>
            <span className="animate-pulse" style={{ color: "#38BDF8" }}>
              ▌
            </span>
          </div>
        ) : introDone ? (
          <form onSubmit={submit} className="flex min-w-0 items-center" style={{ fontSize: "11px", lineHeight: 1.6 }}>
            <span style={{ color: "#34D399" }}>▸&nbsp;</span>
            <input
              ref={inputRef}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              aria-label="Type a terminal command, for example help"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
              className="min-w-0 flex-1 bg-transparent outline-none"
              style={{ color: "#EEF2FF", caretColor: "#38BDF8" }}
            />
          </form>
        ) : (
          <div style={{ fontSize: "11px", lineHeight: 1.6 }}>
            <span style={{ color: "#34D399" }}>▸ </span>
            <span className="animate-pulse" style={{ color: "#38BDF8" }}>
              ▌
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

/* Constellation nodes — same 8 techs as the existing heroStack (source of truth). */
const desktopOrbitNodes = [
  { name: "React", xp: 50, yp: 50, size: 44, isCenter: true },
  { name: "Next.js", xp: 78, yp: 14, size: 32, isCenter: false },
  { name: "Node.js", xp: 18, yp: 20, size: 30, isCenter: false },
  { name: "Express.js", xp: 86, yp: 52, size: 28, isCenter: false },
  { name: "MongoDB", xp: 76, yp: 84, size: 28, isCenter: false },
  { name: "Docker", xp: 14, yp: 72, size: 28, isCenter: false },
  { name: "Firebase", xp: 48, yp: 8, size: 26, isCenter: false },
  { name: "RAG", xp: 50, yp: 92, size: 24, isCenter: false },
];

const desktopOrbitEdges: Array<[number, number]> = [
  [0, 1],
  [0, 2],
  [0, 3],
  [0, 4],
  [0, 5],
  [0, 7],
  [1, 2],
  [1, 3],
  [3, 4],
  [4, 7],
  [2, 5],
  [6, 1],
  [6, 0],
];

function DesktopTechOrbit() {
  const W = 200;
  const H = 200;
  const pts = desktopOrbitNodes.map((n) => {
    const { Icon, color } = techIcon(n.name);
    return { ...n, Icon, color, cx: (n.xp / 100) * W, cy: (n.yp / 100) * H };
  });

  return (
    <div>
      <span
        className="tech-label"
        style={{ fontSize: "9px", color: "#3D506A", letterSpacing: "0.1em" }}
      >
        TECH STACK
      </span>
      <div className="relative" style={{ marginTop: 8 }}>
        <svg
          viewBox={`0 0 ${W} ${H}`}
          width="100%"
          aria-hidden="true"
          style={{ display: "block", position: "absolute", inset: 0, pointerEvents: "none" }}
          preserveAspectRatio="xMidYMid meet"
        >
          <circle cx="100" cy="100" r="52" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.8" strokeDasharray="2 4" />
          <circle cx="100" cy="100" r="82" fill="none" stroke="rgba(255,255,255,0.025)" strokeWidth="0.6" strokeDasharray="1 5" />
          {desktopOrbitEdges.map(([a, b]) => {
            const pa = pts[a];
            const pb = pts[b];
            const grad = `hero-orbit-${a}-${b}`;
            return (
              <g key={grad}>
                <defs>
                  <linearGradient id={grad} x1={pa.cx} y1={pa.cy} x2={pb.cx} y2={pb.cy} gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor={pa.color} stopOpacity="0.3" />
                    <stop offset="100%" stopColor={pb.color} stopOpacity="0.12" />
                  </linearGradient>
                </defs>
                <line x1={pa.cx} y1={pa.cy} x2={pb.cx} y2={pb.cy} stroke={`url(#${grad})`} strokeWidth="0.7" />
              </g>
            );
          })}
        </svg>
        <div style={{ paddingBottom: `${(H / W) * 100}%` }} />
        {pts.map((n) => (
          <div
            key={n.name}
            className="absolute flex flex-col items-center"
            style={{ left: `${n.xp}%`, top: `${n.yp}%`, transform: "translate(-50%, -50%)" }}
          >
            <div
              className="flex items-center justify-center rounded-full transition-transform duration-300 hover:scale-110"
              style={{
                width: n.size,
                height: n.size,
                background: n.isCenter
                  ? `radial-gradient(circle, ${n.color}20 0%, ${n.color}08 100%)`
                  : `${n.color}10`,
                border: `1px solid ${n.color}${n.isCenter ? "55" : "30"}`,
                boxShadow: n.isCenter ? `0 0 16px ${n.color}22` : "none",
              }}
            >
              <n.Icon size={Math.round(n.size * 0.52)} />
            </div>
            <span
              className="tech-label"
              style={{
                fontSize: n.isCenter ? "8.5px" : "7.5px",
                color: n.isCenter ? n.color : "#3D506A",
                marginTop: 3,
                letterSpacing: "0.04em",
                whiteSpace: "nowrap",
                opacity: n.isCenter ? 1 : 0.8,
              }}
            >
              {n.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* Decorative activity pattern — no fake contribution counts claimed. */
const desktopContribCells = Array.from({ length: 70 }, (_, i) => {
  const seed = (i * 137 + 31) % 100;
  return seed < 20 ? 0 : seed < 45 ? 1 : seed < 65 ? 2 : seed < 85 ? 3 : 4;
});

function DesktopContrib() {
  const colors = [
    "#111927",
    "rgba(56,189,248,0.2)",
    "rgba(56,189,248,0.4)",
    "rgba(56,189,248,0.65)",
    "rgba(56,189,248,0.9)",
  ];
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="tech-label" style={{ fontSize: "9px", color: "#3D506A", letterSpacing: "0.1em" }}>
          COMMIT ACTIVITY
        </span>
        <span className="tech-label" style={{ fontSize: "9px", color: "#3D506A" }}>
          LAST 10 WEEKS
        </span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(10, 1fr)", gap: 3 }} aria-hidden="true">
        {desktopContribCells.map((level, i) => (
          <div key={i} className="rounded-sm" style={{ height: 9, background: colors[level] }} />
        ))}
      </div>
    </div>
  );
}

function handleFromUrl(url: string, prefix: "@" | "/"): string {
  const last = url.replace(/\/$/, "").split("/").pop() ?? "";
  return `${prefix}${last}`;
}

function DesktopHeroVisual() {
  const socials = [
    { label: "GitHub", handle: handleFromUrl(profile.socials.github, "@"), href: profile.socials.github, color: "#7A90B0" },
    { label: "LinkedIn", handle: handleFromUrl(profile.socials.linkedin, "/"), href: profile.socials.linkedin, color: "#0A66C2" },
    { label: "LeetCode", handle: handleFromUrl(profile.socials.leetcode, "@"), href: profile.socials.leetcode, color: "#FFA116" },
  ];
  return (
    <div className="flex min-w-0 flex-col gap-4">
      <DesktopTerminal />
      <div className="grid min-w-0 grid-cols-2 gap-4">
        <div
          className="min-w-0 rounded-md p-3 transition-colors hover:border-[rgba(255,255,255,0.16)]"
          style={{ background: "#0D1420", border: "1px solid rgba(255,255,255,0.07)" }}
        >
          <DesktopTechOrbit />
        </div>
        <div className="flex min-w-0 flex-col gap-4">
          <div
            className="min-w-0 flex-1 rounded-md p-3 transition-colors hover:border-[rgba(255,255,255,0.16)]"
            style={{ background: "#0D1420", border: "1px solid rgba(255,255,255,0.07)" }}
          >
            <DesktopContrib />
          </div>
          <div
            className="min-w-0 rounded-md p-3 transition-colors hover:border-[rgba(255,255,255,0.16)]"
            style={{ background: "#0D1420", border: "1px solid rgba(255,255,255,0.07)" }}
          >
            <div className="tech-label mb-2" style={{ fontSize: "9px", color: "#3D506A", letterSpacing: "0.1em" }}>
              FIND ME AT
            </div>
            <div className="flex flex-col gap-1.5">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between transition-opacity hover:opacity-80"
                  style={{ textDecoration: "none" }}
                >
                  <span className="tech-label" style={{ fontSize: "10px", color: "#3D506A" }}>
                    {s.label}
                  </span>
                  <span className="tech-label" style={{ fontSize: "9px", color: s.color }}>
                    {s.handle}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
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
    <section id="home" aria-label="Introduction" className="relative flex min-h-screen flex-col justify-center overflow-clip">
      <div className="mx-auto w-full min-w-0 max-w-6xl px-4 py-20 sm:px-6">
        <div className="grid items-center gap-16 lg:grid-cols-[1fr_380px] lg:gap-14 xl:grid-cols-[1fr_420px] xl:gap-20">
          {/* Left: text */}
          <motion.div
            variants={container}
            initial={initialState}
            animate="show"
            className="min-w-0 max-w-2xl"
          >
            {/* Metadata row */}
            <motion.div variants={item} className="mb-10 flex flex-wrap items-center gap-4">
              {profile.availability.enabled && (
                <span className="tech-label inline-flex items-center gap-2 text-[11px] text-[#38BDF8]">
                  <span className="relative flex h-2 w-2 shrink-0">
                    <span className="absolute h-full w-full animate-pulse-dot rounded-full bg-[#38BDF8]" />
                  </span>
                  {profile.availability.label}
                </span>
              )}
              <span className="tech-label text-[11px] text-[#3D506A]">{profile.location}</span>
              <span className="tech-label text-[11px] text-[#3D506A]">
                {profile.education.school} · B.Tech CSE
              </span>
            </motion.div>

            {/* Headline — serif display, italic sky accent */}
            <motion.h1
              variants={item}
              className="text-balance font-display text-[clamp(2.5rem,7vw,4.75rem)] leading-[1.06] tracking-[-0.02em] text-[#EEF2FF]"
            >
              Building
              <br />
              <em className="italic text-[#38BDF8]">real-world</em>
              <br />
              apps with MERN &amp; Next.js.
            </motion.h1>
            <motion.p
              variants={item}
              className="mt-6 max-w-xl text-[16px] leading-7 text-[#7A90B0]"
            >
              I&apos;m{" "}
              <strong className="font-medium text-[#EEF2FF]">{profile.name}</strong> —{" "}
              {profile.summary}{" "}
              <span className="font-medium text-[#EEF2FF]">
                Auth, RBAC, payments, and deployed full-stack systems.
              </span>
            </motion.p>

            {/* CTAs */}
            <motion.div variants={item} className="mb-12 mt-10 flex flex-wrap items-center gap-3">
              <Link
                href="/#projects"
                className="inline-flex min-h-[48px] items-center justify-center rounded bg-[#38BDF8] px-5 py-2.5 text-sm font-semibold text-[#06111A] transition hover:brightness-110 active:scale-[0.99]"
              >
                Explore projects
              </Link>
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[48px] items-center justify-center rounded border px-5 py-2.5 text-sm text-[#7A90B0] transition hover:border-[#38BDF8] hover:text-[#38BDF8]"
                style={{ borderColor: "rgba(255,255,255,0.12)" }}
              >
                Resume
              </a>
              <Link
                href="/#contact"
                className="inline-flex min-h-[48px] items-center justify-center px-2 py-2.5 text-sm text-[#7A90B0] transition hover:text-[#EEF2FF]"
              >
                Contact ↗
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.dl
              variants={item}
              aria-label="Highlights"
              className="flex flex-wrap gap-8"
            >
              {stats.map((s) => (
                <div key={s.label} className="min-w-0">
                  <dd className="tabular font-display text-[28px] leading-[1.1] tracking-[-0.02em] text-[#EEF2FF]">
                    {s.value}
                  </dd>
                  <dt className="tech-label mt-1 text-[#3D506A]">{s.label}</dt>
                </div>
              ))}
            </motion.dl>
          </motion.div>

          {/* Right: mobile keeps the existing engineering-stack visual unchanged */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.25, ease }}
            className="min-w-0 lg:hidden"
          >
            <TechStackVisual />
          </motion.div>

          {/* Right: desktop-only reference composition (terminal + orbit + activity) */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.25, ease }}
            className="hidden min-w-0 lg:block lg:w-full lg:max-w-[420px] lg:justify-self-end"
          >
            <DesktopHeroVisual />
          </motion.div>
        </div>
      </div>

      {/* tech strip — hairline rule, diamond separators */}
      <div className="relative border-t border-[rgba(255,255,255,0.07)] bg-black/20">
        {/* mobile marquee */}
        <div className="marquee-mask overflow-hidden sm:hidden">
          <div className="flex w-max animate-marquee items-center gap-3 px-5 py-4">
            {[...techStrip, ...techStrip].map((t, i) => (
              <span
                key={`${t}-${i}`}
                aria-hidden={i >= techStrip.length}
                className="flex shrink-0 items-center gap-3 font-mono text-[12px] text-[#3D506A]"
              >
                {t}
                <span aria-hidden="true">◆</span>
              </span>
            ))}
          </div>
        </div>
        {/* desktop static row */}
        <div className="mx-auto hidden max-w-6xl flex-wrap items-center gap-x-4 gap-y-2 px-6 py-4 sm:flex">
          {techStrip.map((t, i) => (
            <span key={t} className="flex items-center gap-4 font-mono text-[12px] text-[#3D506A]">
              {t}
              {i < techStrip.length - 1 && (
                <span aria-hidden="true" className="text-[8px]">
                  ◆
                </span>
              )}
            </span>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        aria-hidden="true"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex"
        style={{ opacity: 0.3 }}
      >
        <span className="tech-label" style={{ fontSize: "9px", letterSpacing: "0.1em" }}>
          SCROLL
        </span>
        <div className="h-8 w-px" style={{ background: "#3D506A" }} />
      </div>
    </section>
  );
}
