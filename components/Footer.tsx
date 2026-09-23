"use client";

import Link from "next/link";
import { ArrowUp, Code2, ArrowUpRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { navItems, profile } from "@/data/profile";

export function Footer() {
  const year = new Date().getFullYear();

  const toTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <footer className="border-t border-[rgba(255,255,255,0.07)]" aria-label="Footer">
      <div className="mx-auto max-w-6xl px-4 pt-8 sm:px-6">
        {/* Top ledger row: identity / index / actions */}
        <div className="flex flex-col gap-6 pb-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <p className="flex min-w-0 items-center gap-2.5">
              <span className="font-display text-[16px] italic text-[#EEF2FF]">
                {profile.firstName}
              </span>
              <span className="tech-label text-[10px] text-[#3D506A]">/MV</span>
            </p>
            <p className="mt-2 max-w-xs truncate font-mono text-[11px] text-[#3D506A]">
              {profile.role}
            </p>
          </div>

          <nav aria-label="Footer" className="min-w-0">
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {navItems.map((n) => (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    className="inline-flex min-h-[44px] items-center text-[13px] text-[#7A90B0] transition hover:text-[#EEF2FF]"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={profile.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="inline-flex h-11 w-11 items-center justify-center rounded border border-[rgba(255,255,255,0.07)] text-[#3D506A] transition hover:border-[rgba(255,255,255,0.12)] hover:text-[#EEF2FF]"
            >
              <GithubIcon className="h-4 w-4" />
            </a>
            <a
              href={profile.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="inline-flex h-11 w-11 items-center justify-center rounded border border-[rgba(255,255,255,0.07)] text-[#3D506A] transition hover:border-[rgba(255,255,255,0.12)] hover:text-[#EEF2FF]"
            >
              <LinkedinIcon className="h-4 w-4" />
            </a>
            <a
              href={profile.socials.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LeetCode profile"
              className="inline-flex h-11 w-11 items-center justify-center rounded border border-[rgba(255,255,255,0.07)] text-[#3D506A] transition hover:border-[rgba(255,255,255,0.12)] hover:text-[#EEF2FF]"
            >
              <Code2 className="h-4 w-4" aria-hidden="true" />
            </a>
            <button
              type="button"
              onClick={toTop}
              aria-label="Back to top"
              className="tech-label ml-1 inline-flex h-11 items-center gap-1.5 rounded border border-[rgba(255,255,255,0.07)] px-4 text-[13px] text-[#7A90B0] transition hover:border-[rgba(255,255,255,0.12)] hover:text-[#EEF2FF]"
            >
              Top
              <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Bottom hairline: colophon + case-study link */}
        <div className="safe-pb flex flex-col items-start justify-between gap-2 border-t border-[rgba(255,255,255,0.07)] py-5 sm:flex-row sm:items-center">
          <p className="tech-label text-[11px] text-[#3D506A]">
            © {year} · Designed & built from scratch with Next.js
          </p>
          <Link
            href="/projects/cse-placement-training"
            className="group inline-flex min-h-[44px] items-center gap-1 font-mono text-[11px] text-[#3D506A] transition hover:text-[#7A90B0]"
          >
            read the case studies
            <ArrowUpRight
              className="h-3.5 w-3.5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </footer>
  );
}
