"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowUpRight, Copy, FileText, Mail } from "lucide-react";
import { navItems, profile } from "@/data/profile";
import { projects } from "@/data/projects";

interface CommandItem {
  label: string;
  hint: string;
  run: () => void;
}

export function CommandMenu() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [highlight, setHighlight] = useState(0);
  const router = useRouter();
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setQuery("");
        setHighlight(0);
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    };
    const onCustomOpen = () => {
      setQuery("");
      setHighlight(0);
      setOpen(true);
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("command-menu:open", onCustomOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("command-menu:open", onCustomOpen);
    };
  }, []);

  const items: CommandItem[] = useMemo(() => {
    const q = query.trim().toLowerCase();
    const all: CommandItem[] = [
      ...navItems.map((n) => ({
        label: `Go to ${n.label}`,
        hint: n.href,
        run: () => {
          setOpen(false);
          router.push(n.href);
        },
      })),
      ...projects.map((p) => ({
        label: `Project: ${p.name}`,
        hint: "detail page",
        run: () => {
          setOpen(false);
          router.push(`/projects/${p.slug}`);
        },
      })),
      {
        label: "Copy email address",
        hint: profile.email,
        run: async () => {
          try {
            await navigator.clipboard.writeText(profile.email);
          } catch {
            /* clipboard unavailable */
          }
          setOpen(false);
        },
      },
      {
        label: "Open resume",
        hint: "Google Drive",
        run: () => {
          setOpen(false);
          window.open(profile.resumeUrl, "_blank", "noopener");
        },
      },
      {
        label: "Open GitHub",
        hint: "viggu777",
        run: () => {
          setOpen(false);
          window.open(profile.socials.github, "_blank", "noopener");
        },
      },
    ];
    if (!q) return all;
    return all.filter((i) => `${i.label} ${i.hint}`.toLowerCase().includes(q));
  }, [query, router]);

  // Clamp during render (no effect) so the highlight never points past the list.
  const safeHighlight =
    items.length === 0 ? 0 : Math.min(highlight, items.length - 1);

  useEffect(() => {
    listRef.current
      ?.querySelector('[aria-selected="true"]')
      ?.scrollIntoView({ block: "nearest" });
  }, [safeHighlight]);

  if (!open) return null;

  const onInputKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlight((h) => (items.length === 0 ? 0 : (h + 1) % items.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlight((h) =>
        items.length === 0 ? 0 : (h - 1 + items.length) % items.length
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      items[safeHighlight]?.run();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[80] flex items-start justify-center px-4 pt-[15vh]"
      style={{ background: "rgba(7,10,16,0.7)", backdropFilter: "blur(6px)" }}
      onClick={() => setOpen(false)}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Quick command menu"
        className="w-full max-w-md overflow-hidden rounded-lg border"
        style={{
          background: "#111927",
          borderColor: "rgba(255,255,255,0.12)",
          boxShadow: "0 24px 60px rgba(0,0,0,0.6)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="flex items-center gap-3 px-4 py-3"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
        >
          <span className="font-mono text-sm text-[#3D506A]" aria-hidden="true">›</span>
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onInputKey}
            placeholder="Type a command or search..."
            aria-label="Search commands"
            aria-activedescendant={
              items.length > 0 ? `cmd-option-${safeHighlight}` : undefined
            }
            aria-controls="cmd-listbox"
            role="combobox"
            aria-expanded="true"
            aria-autocomplete="list"
            className="h-8 w-full bg-transparent text-sm text-[#EEF2FF] placeholder:text-[#3D506A] focus:outline-none"
          />
          <kbd className="tech-label rounded border border-[rgba(255,255,255,0.07)] bg-white/[0.03] px-1.5 py-0.5 text-[10px] text-[#3D506A]">
            ESC
          </kbd>
        </div>
        <ul
          id="cmd-listbox"
          ref={listRef}
          className="max-h-72 overflow-y-auto py-1"
          role="listbox"
          aria-label="Commands"
        >
          {items.length === 0 && (
            <li className="px-4 py-6 text-center text-[13px] text-[#3D506A]">
              {query ? `No results for "${query}"` : "No matches."}
            </li>
          )}
          {items.map((item, i) => {
            const selected = i === safeHighlight;
            return (
              <li key={item.label} id={`cmd-option-${i}`}>
                <button
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onMouseEnter={() => setHighlight(i)}
                  onFocus={() => setHighlight(i)}
                  onClick={item.run}
                  className="flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left text-[13.5px] transition-colors"
                  style={{
                    background: selected ? "#162030" : "transparent",
                    color: selected ? "#EEF2FF" : "#7A90B0",
                  }}
                >
                  <span className="flex items-center gap-2">
                    {item.label.includes("Copy") ? (
                      <Copy className="h-3.5 w-3.5 text-[#3D506A]" aria-hidden="true" />
                    ) : item.label.includes("resume") ? (
                      <FileText className="h-3.5 w-3.5 text-[#3D506A]" aria-hidden="true" />
                    ) : item.label.includes("email") ? (
                      <Mail className="h-3.5 w-3.5 text-[#3D506A]" aria-hidden="true" />
                    ) : (
                      <ArrowUpRight className="h-3.5 w-3.5 text-[#3D506A]" aria-hidden="true" />
                    )}
                    {item.label}
                  </span>
                  <span className="tech-label truncate text-[10px] text-[#3D506A]">{item.hint}</span>
                </button>
              </li>
            );
          })}
        </ul>
        <p
          className="tech-label border-t px-4 py-2 text-[10px] text-[#3D506A]"
          style={{ borderTopColor: "rgba(255,255,255,0.07)" }}
        >
          ↑↓ to navigate · ↵ to run · esc to close
        </p>
      </div>
    </div>
  );
}
