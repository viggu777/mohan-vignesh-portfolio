"use client";

import Link from "next/link";
import { ArrowUp, Code2 } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { profile } from "@/data/profile";

export function Footer() {
  const year = new Date().getFullYear();

  const toTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <footer className="border-t border-white/[0.06]" aria-label="Footer">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div>
          <p className="text-[14px] font-semibold tracking-tight text-white">
            {profile.name} <span className="font-normal text-zinc-500">· {profile.role}</span>
          </p>
          <p className="mt-1 font-mono text-[12px] text-zinc-600">
            © {year} · Designed & built from scratch with Next.js
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={profile.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-zinc-400 transition hover:border-white/25 hover:text-white"
          >
            <GithubIcon className="h-4 w-4" />
          </a>
          <a
            href={profile.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-zinc-400 transition hover:border-white/25 hover:text-white"
          >
            <LinkedinIcon className="h-4 w-4" />
          </a>
          <a
            href={profile.socials.leetcode}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LeetCode profile"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-zinc-400 transition hover:border-white/25 hover:text-white"
          >
            <Code2 className="h-4 w-4" aria-hidden="true" />
          </a>
          <button
            type="button"
            onClick={toTop}
            aria-label="Back to top"
            className="ml-2 inline-flex h-9 items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] px-3 text-[13px] text-zinc-400 transition hover:border-white/25 hover:text-white"
          >
            Top
            <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>
      <div className="px-5 pb-6 text-center sm:px-8">
        <Link href="/projects/cse-placement-training" className="font-mono text-[11px] text-zinc-700 hover:text-zinc-400">
          read the case studies →
        </Link>
      </div>
    </footer>
  );
}
