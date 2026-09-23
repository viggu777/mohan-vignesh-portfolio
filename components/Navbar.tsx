"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
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

  // PERF: rAF-throttled scroll listener (was firing setState per pixel).
  useEffect(() => {
    let raf = 0;
    let last = false;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const next = window.scrollY > 40;
        if (next !== last) {
          last = next;
          setScrolled(next);
        }
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
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
  }, [open]);

  const openCommandMenu = () => {
    document.dispatchEvent(new CustomEvent("command-menu:open"));
  };

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-all duration-300"
      style={{
        background: scrolled || open ? "rgba(13,20,32,0.92)" : "transparent",
        borderBottom:
          scrolled || open ? "1px solid rgba(255,255,255,0.07)" : "1px solid transparent",
        backdropFilter: scrolled || open ? "blur(12px)" : "none",
        WebkitBackdropFilter: scrolled || open ? "blur(12px)" : "none",
      }}
    >
      {/* h-16 preserves the header offset contract (pt-16 + scroll-mt-20 + 88px). */}
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6"
      >
        {/* Wordmark: serif italic name + mono mark */}
        <Link
          href="/#home"
          className="flex min-w-0 items-center gap-2"
          aria-label="Mohan Vignesh — home"
          style={{ textDecoration: "none" }}
        >
          <span
            className="font-display truncate text-[18px] italic tracking-[-0.01em] text-[#EEF2FF]"
          >
            {profile.firstName}
          </span>
          <span className="tech-label shrink-0 text-[10px] text-[#3D506A]">/MV</span>
        </Link>

        {/* Desktop: quiet text links, active section in primary */}
        <ul className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => {
            const id = hashOf(item.href).replace("#", "");
            const isActive = isHome && active === id;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "text-sm transition-colors",
                    isActive ? "text-[#EEF2FF]" : "text-[#7A90B0] hover:text-[#EEF2FF]"
                  )}
                  style={{ textDecoration: "none" }}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <button
            type="button"
            onClick={openCommandMenu}
            aria-label="Open quick navigation (Command K)"
            className="tech-label flex items-center gap-2 rounded border border-transparent px-2.5 py-1.5 text-xs text-[#3D506A] transition hover:border-[rgba(255,255,255,0.12)] hover:text-[#7A90B0]"
            style={{ borderColor: "rgba(255,255,255,0.07)" }}
          >
            <span>⌘K</span>
          </button>
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="tech-label rounded bg-[#EEF2FF] px-3.5 py-1.5 text-xs font-semibold text-[#070A10] transition hover:opacity-90"
            style={{ textDecoration: "none", letterSpacing: "0.03em" }}
          >
            Resume
          </a>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded text-[#7A90B0] transition hover:text-[#EEF2FF] md:hidden"
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
          className="border-t md:hidden"
          style={{
            background: "#0D1420",
            borderTopColor: "rgba(255,255,255,0.07)",
          }}
        >
          <ul className="safe-pb flex flex-col gap-1 px-6 pb-5 pt-3">
            {navItems.map((item) => {
              const id = hashOf(item.href).replace("#", "");
              const isActive = isHome && active === id;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "flex min-h-[48px] items-center rounded py-2 text-[15px] transition-colors",
                      isActive ? "text-[#EEF2FF]" : "text-[#7A90B0] hover:text-[#EEF2FF]"
                    )}
                    style={{ textDecoration: "none" }}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
            <li className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  openCommandMenu();
                }}
                className="tech-label flex-1 rounded border py-2.5 text-center text-[11px] text-[#3D506A]"
                style={{ borderColor: "rgba(255,255,255,0.07)" }}
              >
                ⌘K Command
              </button>
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="tech-label flex-1 rounded bg-[#EEF2FF] py-2.5 text-center text-[11px] font-semibold text-[#070A10]"
                style={{ textDecoration: "none" }}
              >
                Resume
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
