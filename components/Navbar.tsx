"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, FileText, Command } from "lucide-react";
import { navItems, profile } from "@/data/profile";
import { cn } from "@/lib/utils";

function hashOf(href: string): string {
  const i = href.indexOf("#");
  return i >= 0 ? href.slice(i) : href;
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navItems
      .map((n) => document.querySelector(hashOf(n.href)))
      .filter((el): el is Element => el !== null);
    // No sections on this route (e.g. project detail pages) — nothing to spy on.
    if (sections.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [pathname]);

  // Close the mobile menu with Escape and lock body scroll while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open ]);

  const openCommandMenu = () => {
    document.dispatchEvent(new CustomEvent("command-menu:open"));
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || open
          ? "border-b border-slate-400/10 bg-[#04060c]/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-8"
      >
        <Link
          href="/#home"
          className="group flex items-center gap-3"
          aria-label="Mohan Vignesh — home"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-emerald-300/25 bg-gradient-to-br from-emerald-400/25 to-violet-500/20 font-mono text-[13px] font-bold tracking-tight text-white shadow-[0_0_20px_-6px_rgba(52,211,153,0.5)]">
            {profile.monogram}
          </span>
          <span className="hidden max-w-[140px] truncate text-[13px] font-medium tracking-tight text-slate-200 sm:block">
            mohanvignesh
            <span className="text-slate-500">.dev</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const id = hashOf(item.href).replace("#", "");
            const isActive = isHome && active === id;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "rounded-md px-3 py-2 text-[13.5px] transition-colors",
                    isActive
                      ? "bg-white/[0.08] text-white"
                      : "text-slate-400 hover:bg-white/[0.05] hover:text-slate-100"
                  )}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden items-center gap-2 md:flex">
          <button
            type="button"
            onClick={openCommandMenu}
            aria-label="Open quick navigation (Command K)"
            className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.03] px-2 py-1.5 font-mono text-[11px] text-zinc-500 transition hover:border-white/25 hover:text-zinc-200"
          >
            <Command className="h-3 w-3" aria-hidden="true" />K
          </button>
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-white px-3.5 py-2 text-[13px] font-semibold text-black transition hover:bg-slate-200"
          >
            <FileText className="h-3.5 w-3.5" aria-hidden="true" />
            Resume
          </a>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-200 backdrop-blur transition hover:border-white/25 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          className="border-t border-white/[0.07] bg-[#05080f]/95 backdrop-blur-xl md:hidden"
        >
          <ul className="space-y-1 px-5 py-4 pb-6">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block min-h-[48px] rounded-xl px-4 py-3 text-[16px] font-medium text-slate-200 transition hover:bg-white/[0.06] hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="grid grid-cols-2 gap-2.5 pt-3">
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  openCommandMenu();
                }}
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-3 text-[14px] font-semibold text-slate-200"
              >
                <Command className="h-4 w-4" aria-hidden="true" />
                Jump
              </button>
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-white px-3.5 py-3 text-[14px] font-semibold text-black"
              >
                <FileText className="h-4 w-4" aria-hidden="true" />
                Resume
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
