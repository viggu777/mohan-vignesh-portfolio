"use client";

import { useState } from "react";
import { Check, Copy, Code2, Mail, ArrowUpRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { profile } from "@/data/profile";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const channels = [
  {
    label: "LinkedIn",
    handle: "linkedin.com/in/kmvk",
    href: profile.socials.linkedin,
    icon: LinkedinIcon,
  },
  {
    label: "GitHub",
    handle: "github.com/viggu777",
    href: profile.socials.github,
    icon: GithubIcon,
  },
  {
    label: "LeetCode",
    handle: "500+ problems solved",
    href: profile.socials.leetcode,
    icon: Code2,
  },
];

export function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable — mailto fallback still works */
    }
  };

  return (
    <section
      id="contact"
      aria-label="Contact"
      className="relative scroll-mt-20 overflow-hidden border-t border-white/[0.06]"
    >
      {/* Same reference container as About / Experience / Skills — left aligned throughout */}
      <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-8 sm:py-20">
        <Reveal>
          <SectionHeading
            index="06"
            eyebrow="Contact"
            accent="cyan"
            title="Looking for a Software Developer Intern?"
            description="I'm actively looking for Software Developer Internships — full-stack, backend, or mobile roles. Fastest way to reach me is email. I read everything, whether it's an internship, a collaboration, or feedback on the exam platform and full-stack work."
          />
          <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.18em] text-slate-600">
            SDE Intern <span aria-hidden="true" className="text-slate-700">/</span> Full-Stack{" "}
            <span aria-hidden="true" className="text-slate-700">/</span> MERN · Next.js{" "}
            <span aria-hidden="true" className="text-slate-700">/</span> Remote · On-site
          </p>
        </Reveal>

        {/* One coherent two-column grid inside the same container — no nested narrow box */}
        <div className="mt-10 grid min-w-0 gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          {/* Left: email + CTAs + footnote, all starting at the container's left edge */}
          <Reveal className="min-w-0">
            <div className="min-w-0">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-slate-600">
                direct
              </p>
              <a
                href={profile.socials.email}
                className="group mt-4 inline-flex min-w-0 max-w-full items-baseline gap-2 text-[clamp(1.2rem,3.6vw,1.7rem)] font-bold tracking-[-0.03em] text-white underline decoration-white/20 decoration-2 underline-offset-8 transition hover:decoration-cyan-300/60"
              >
                <span className="truncate">{profile.email}</span>
                <ArrowUpRight
                  className="h-5 w-5 shrink-0 self-center text-slate-600 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan-300"
                  aria-hidden="true"
                />
              </a>
              <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:items-center">
                <a
                  href={profile.socials.email}
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-slate-200"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  Email Me
                </a>
                <button
                  type="button"
                  onClick={copyEmail}
                  aria-live="polite"
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-white/12 bg-white/[0.04] px-5 py-3 text-sm font-medium text-slate-100 transition hover:border-white/25 hover:bg-white/[0.08]"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-emerald-300" aria-hidden="true" />
                  ) : (
                    <Copy className="h-4 w-4" aria-hidden="true" />
                  )}
                  {copied ? "Copied!" : "Copy email"}
                </button>
              </div>
              <p className="mt-8 max-w-md font-mono text-[11px] leading-5 text-slate-600">
                Open to Software Developer Internships · {profile.location} ·{" "}
                {profile.education.school} · Graduating Apr 2027
              </p>
            </div>
          </Reveal>

          {/* Right: channel rows — simple flex justify-between, full column width */}
          <Reveal delay={0.08} className="min-w-0">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-slate-600">
              elsewhere
            </p>
            <ul className="mt-4 border-t border-white/[0.08]">
              {channels.map((c) => (
                <li key={c.label} className="border-b border-white/[0.08]">
                  <a
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex min-h-[68px] items-center justify-between gap-4 py-4 transition-colors hover:bg-white/[0.02]"
                  >
                    <span className="min-w-0">
                      <span className="block truncate text-[16px] font-semibold tracking-tight text-white">
                        {c.label}
                      </span>
                      <span className="mt-0.5 block truncate font-mono text-[12px] text-slate-500">
                        {c.handle}
                      </span>
                    </span>
                    <span className="flex shrink-0 items-center gap-2.5">
                      <c.icon
                        className="h-4 w-4 text-slate-600 transition group-hover:text-slate-200"
                        aria-hidden="true"
                      />
                      <ArrowUpRight
                        className="h-4 w-4 text-slate-700 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white"
                        aria-hidden="true"
                      />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
