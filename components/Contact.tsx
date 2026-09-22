"use client";

import { useState } from "react";
import { Check, Copy, Code2, Mail, ArrowUpRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { profile } from "@/data/profile";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

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
      className="relative scroll-mt-20 border-t border-white/[0.06] bg-white/[0.008]"
    >
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <Reveal>
            <SectionHeading
              eyebrow="Contact"
              title="Let's build something that ships."
              description="Fastest way to reach me is email. I read everything — whether it's an internship, a collaboration, or feedback on the exam platform and RAG work."
            />
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={profile.socials.email}
                className="btn-primary-glow inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-300 to-teal-200 px-5 py-3 text-sm font-bold text-[#04110b] transition hover:brightness-110"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                Email Me
              </a>
              <button
                type="button"
                onClick={copyEmail}
                aria-live="polite"
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-slate-400/20 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-emerald-300/30 hover:bg-emerald-400/10"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-emerald-300" aria-hidden="true" />
                ) : (
                  <Copy className="h-4 w-4" aria-hidden="true" />
                )}
                {copied ? "Copied!" : "Copy email"}
              </button>
            </div>
            <p className="mt-4 font-mono text-[13px] text-zinc-500" aria-label={`Email ${profile.email}`}>
              {profile.email}
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <ul className="divide-y divide-white/[0.06] overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0b0b12]">
              <li>
                <a
                  href={profile.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 px-5 py-4 transition hover:bg-white/[0.03]"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-zinc-300">
                    <LinkedinIcon className="h-4 w-4" />
                  </span>
                  <span className="flex-1">
                    <span className="block text-[14px] font-medium text-white">LinkedIn</span>
                    <span className="block font-mono text-[12px] text-zinc-500">linkedin.com/in/kmvk</span>
                  </span>
                  <ArrowUpRight
                    className="h-4 w-4 text-zinc-600 transition group-hover:translate-x-0.5 group-hover:text-zinc-200"
                    aria-hidden="true"
                  />
                </a>
              </li>
              <li>
                <a
                  href={profile.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 px-5 py-4 transition hover:bg-white/[0.03]"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-zinc-300">
                    <GithubIcon className="h-4 w-4" />
                  </span>
                  <span className="flex-1">
                    <span className="block text-[14px] font-medium text-white">GitHub</span>
                    <span className="block font-mono text-[12px] text-zinc-500">github.com/viggu777</span>
                  </span>
                  <ArrowUpRight
                    className="h-4 w-4 text-zinc-600 transition group-hover:translate-x-0.5 group-hover:text-zinc-200"
                    aria-hidden="true"
                  />
                </a>
              </li>
              <li>
                <a
                  href={profile.socials.leetcode}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 px-5 py-4 transition hover:bg-white/[0.03]"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-zinc-300">
                    <Code2 className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span className="flex-1">
                    <span className="block text-[14px] font-medium text-white">LeetCode</span>
                    <span className="block font-mono text-[12px] text-zinc-500">500+ problems solved</span>
                  </span>
                  <ArrowUpRight
                    className="h-4 w-4 text-zinc-600 transition group-hover:translate-x-0.5 group-hover:text-zinc-200"
                    aria-hidden="true"
                  />
                </a>
              </li>
            </ul>
            <p className="mt-4 rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 py-3 text-[13px] leading-6 text-zinc-500">
              Based in {profile.location} · {profile.education.school} · Graduating Apr 2027.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
