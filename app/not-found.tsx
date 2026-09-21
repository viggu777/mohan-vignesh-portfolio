import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0">
        <div className="bg-grid mask-fade-radial absolute inset-0 opacity-60" />
        <div className="absolute left-1/2 top-[-200px] h-[380px] w-[680px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.15),transparent_65%)] blur-2xl" />
      </div>
      <div className="relative mx-auto flex max-w-xl flex-col items-center px-5 py-32 text-center sm:px-8">
        <p className="font-mono text-[12px] uppercase tracking-[0.24em] text-zinc-500">{"// 404"}</p>
        <h1 className="mt-4 text-6xl font-semibold tracking-tight text-white">404</h1>
        <p className="mt-4 text-[15px] leading-7 text-zinc-400">
          This route doesn&apos;t exist — much like a hallucinated citation. Let&apos;s get you back
          to grounded content.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-zinc-200"
          >
            <Home className="h-4 w-4" aria-hidden="true" />
            Back home
          </Link>
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 rounded-lg border border-white/12 bg-white/[0.04] px-5 py-3 text-sm font-medium text-zinc-100 transition hover:border-white/25 hover:bg-white/[0.08]"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            View projects
          </Link>
        </div>
        <p className="mt-8 font-mono text-[11px] text-zinc-500">
          tip: press <span className="rounded border border-white/10 bg-white/[0.05] px-1.5 py-0.5">⌘K</span> anywhere to jump
        </p>
      </div>
    </div>
  );
}
