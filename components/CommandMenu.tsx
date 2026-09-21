"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowUpRight, Copy, FileText, Mail } from "lucide-react";
import { navItems, profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { cn } from "@/lib/utils";

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
      className="fixed inset-0 z-[80] flex items-start justify-center bg-black/60 px-4 pt-[14vh] backdrop-blur-sm"
      onClick={() => setOpen(false)}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Quick command menu"
        className="w-full max-w-lg overflow-hidden rounded-xl border border-white/10 bg-[#0c0c13] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-white/[0.07] px-4">
          <span className="font-mono text-xs text-zinc-500">›</span>
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onInputKey}
            placeholder="Type a command — try “project”, “email”, “resume”…"
            aria-label="Search commands"
            aria-activedescendant={
              items.length > 0 ? `cmd-option-${safeHighlight}` : undefined
            }
            aria-controls="cmd-listbox"
            role="combobox"
            aria-expanded="true"
            aria-autocomplete="list"
            className="h-12 w-full bg-transparent text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none"
          />
          <kbd className="rounded border border-white/10 bg-white/[0.05] px-1.5 py-0.5 font-mono text-[10px] text-zinc-500">
            ESC
          </kbd>
        </div>
        <ul
          id="cmd-listbox"
          ref={listRef}
          className="max-h-72 overflow-y-auto p-2"
          role="listbox"
          aria-label="Commands"
        >
          {items.length === 0 && (
            <li className="px-3 py-6 text-center text-sm text-zinc-500">No matches.</li>
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
                  className={cn(
                    "flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors",
                    selected
                      ? "bg-white/[0.08] text-white"
                      : "text-zinc-300 hover:bg-white/[0.06]"
                  )}
                >
                  <span className="flex items-center gap-2">
                    {item.label.includes("Copy") ? (
                      <Copy className="h-3.5 w-3.5 text-zinc-500" aria-hidden="true" />
                    ) : item.label.includes("resume") ? (
                      <FileText className="h-3.5 w-3.5 text-zinc-500" aria-hidden="true" />
                    ) : item.label.includes("email") ? (
                      <Mail className="h-3.5 w-3.5 text-zinc-500" aria-hidden="true" />
                    ) : (
                      <ArrowUpRight className="h-3.5 w-3.5 text-zinc-500" aria-hidden="true" />
                    )}
                    {item.label}
                  </span>
                  <span className="truncate font-mono text-[11px] text-zinc-600">{item.hint}</span>
                </button>
              </li>
            );
          })}
        </ul>
        <p className="border-t border-white/[0.06] px-4 py-2 font-mono text-[10px] text-zinc-600">
          ↑↓ to navigate · ↵ to run · esc to close
        </p>
      </div>
    </div>
  );
}
