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
      className="relative scroll-mt-20 overflow-hidden bg-[#0D1420]"
    >
      <div className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-28">
        <Reveal>
          <SectionHeading
            index="06"
            eyebrow="Contact"
            accent="cyan"
            title={
              <>
                Looking for a{" "}
                <em className="italic text-[#22D3EE]">Software Developer Intern?</em>
              </>
            }
            description="I'm actively looking for Software Developer Internships — full-stack, backend, or mobile roles. Fastest way to reach me is email. I read everything, whether it's an internship, a collaboration, or feedback on the exam platform and full-stack work."
          />
          <p className="tech-label mt-5 uppercase text-[#3D506A]">
            SDE Intern <span aria-hidden="true">/</span> Full-Stack{" "}
            <span aria-hidden="true">/</span> MERN · Next.js{" "}
            <span aria-hidden="true">/</span> Remote · On-site
          </p>
        </Reveal>

        <div className="mt-10 grid min-w-0 max-w-2xl gap-10">
          {/* Email */}
          <Reveal className="min-w-0">
            <div className="min-w-0">
              <a
                href={profile.socials.email}
                className="inline-flex max-w-full items-center gap-3 rounded border border-[rgba(255,255,255,0.12)] bg-[#111927] px-5 py-3 text-[16px] text-[#EEF2FF] transition hover:border-[rgba(255,255,255,0.2)]"
              >
                <span className="truncate">{profile.email}</span>
              </a>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <a
                  href={profile.socials.email}
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded bg-[#22D3EE] px-5 py-2.5 text-sm font-semibold text-[#051215] transition hover:brightness-110"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  Email Me
                </a>
                <button
                  type="button"
                  onClick={copyEmail}
                  aria-live="polite"
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded border px-5 py-2.5 text-sm transition"
                  style={{
                    borderColor: copied ? "#22D3EE" : "rgba(255,255,255,0.12)",
                    color: copied ? "#22D3EE" : "#7A90B0",
                    background: "transparent",
                  }}
                >
                  {copied ? (
                    <Check className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <Copy className="h-4 w-4" aria-hidden="true" />
                  )}
                  {copied ? "Copied!" : "Copy Email"}
                </button>
              </div>
            </div>
          </Reveal>

          {/* Social links */}
          <Reveal delay={0.08} className="min-w-0">
            <div className="flex flex-wrap gap-x-6 gap-y-3">
              {channels.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex min-h-[44px] items-center gap-2 text-sm text-[#7A90B0] transition hover:text-[#22D3EE]"
                >
                  <c.icon className="h-4 w-4" aria-hidden="true" />
                  {c.label}
                  <ArrowUpRight
                    className="h-3.5 w-3.5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </a>
              ))}
            </div>
            <p className="mt-8 max-w-md font-mono text-[11px] leading-5 text-[#3D506A]">
              Open to Software Developer Internships · {profile.location} ·{" "}
              {profile.education.school} · Graduating Apr 2027
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
