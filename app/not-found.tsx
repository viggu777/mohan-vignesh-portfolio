import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0">
        <div className="bg-grid mask-fade-radial absolute inset-0 opacity-60" />
        <div
          className="absolute left-1/2 top-[-200px] h-[380px] w-[680px] -translate-x-1/2 rounded-full blur-2xl"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(167,139,250,0.12), transparent 65%)",
          }}
        />
      </div>
      <div className="relative mx-auto flex max-w-xl flex-col items-center px-5 py-32 text-center sm:px-6">
        <p className="tech-label uppercase text-[#3D506A]">{"// 404"}</p>
        <h1 className="mt-4 font-display text-6xl tracking-[-0.02em] text-[#EEF2FF]">404</h1>
        <p className="mt-4 text-[15px] leading-7 text-[#7A90B0]">
          This route doesn&apos;t exist — much like a hallucinated citation. Let&apos;s get you back
          to grounded content.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="inline-flex min-h-[48px] items-center gap-2 rounded bg-[#EEF2FF] px-5 py-3 text-sm font-semibold text-[#070A10] transition hover:opacity-90"
          >
            <Home className="h-4 w-4" aria-hidden="true" />
            Back home
          </Link>
          <Link
            href="/#projects"
            className="inline-flex min-h-[48px] items-center gap-2 rounded border border-[rgba(255,255,255,0.12)] px-5 py-3 text-sm font-medium text-[#7A90B0] transition hover:text-[#EEF2FF]"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            View projects
          </Link>
        </div>
        <p className="mt-8 font-mono text-[11px] text-[#3D506A]">
          tip: press <span className="rounded border border-[rgba(255,255,255,0.07)] bg-white/[0.03] px-1.5 py-0.5">⌘K</span> anywhere to jump
        </p>
      </div>
    </div>
  );
}
