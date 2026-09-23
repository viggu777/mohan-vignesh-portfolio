/**
 * Shared technology-icon system (Figma visual language).
 *
 * Small, elegant vector marks for technologies — used in Hero, Skills,
 * Projects, Experience and case studies. Mostly monochrome with a subtle
 * per-tech tint; never giant logos, never image thumbnails.
 *
 * Unknown tech names fall back to a quiet geometric mark so every token
 * still reads as part of the same system.
 */

function SvgReact({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="2.2" fill="#61DAFB" />
      <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" strokeWidth="1.1" fill="none" />
      <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" strokeWidth="1.1" fill="none" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" strokeWidth="1.1" fill="none" transform="rotate(120 12 12)" />
    </svg>
  );
}

function SvgNextjs({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="none" stroke="#ffffff" strokeWidth="1.6" />
      <path d="M8 17V7l8 10h-2.4L8 9.6V17H8z" fill="#ffffff" />
    </svg>
  );
}

function SvgNodejs({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2L3 7v10l9 5 9-5V7L12 2z" fill="#339933" />
      <path d="M12 6v12M8 8l4 4 4-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SvgExpress({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <text x="3" y="17" fontFamily="monospace" fontWeight="700" fontSize="12" fill="#7A90B0">ex</text>
    </svg>
  );
}

function SvgMongoDB({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2C8 8 7 12 7 14.5c0 2.8 2.2 5 5 5s5-2.2 5-5C17 12 16 8 12 2z" fill="#47A248" />
      <path d="M12 5v14" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" opacity="0.7" />
    </svg>
  );
}

function SvgFirebase({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5.5 18.5L9 6l3 5-2 3.5L5.5 18.5z" fill="#FFA000" />
      <path d="M9 6l3 5 3.5-8L9 6z" fill="#F57F17" />
      <path d="M5.5 18.5l13-1L12 11 9 6 5.5 18.5z" fill="#FFCA28" />
      <path d="M12 11l6.5 6.5-3 1L12 11z" fill="#FFA000" />
    </svg>
  );
}

function SvgDocker({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2" y="11" width="3" height="2.5" rx="0.3" fill="#2496ED" />
      <rect x="6" y="11" width="3" height="2.5" rx="0.3" fill="#2496ED" />
      <rect x="10" y="11" width="3" height="2.5" rx="0.3" fill="#2496ED" />
      <rect x="14" y="11" width="3" height="2.5" rx="0.3" fill="#2496ED" />
      <rect x="6" y="7.5" width="3" height="2.5" rx="0.3" fill="#2496ED" />
      <rect x="10" y="7.5" width="3" height="2.5" rx="0.3" fill="#2496ED" />
      <rect x="10" y="4" width="3" height="2.5" rx="0.3" fill="#2496ED" />
      <path d="M18.5 13.5h2.5l1.5-3" stroke="#2496ED" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SvgTypeScript({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect width="24" height="24" rx="3" fill="#3178C6" />
      <path d="M11 8h7v2h-2.5V18h-2v-8H11V8zM6.5 11h2v5.2c.5.3 1 .4 1.6.4.9 0 1.4-.5 1.4-1.4V11h2v4.2c0 2-1.2 3-3.2 3-1 0-1.9-.3-2.8-.8L6.5 11z" fill="#fff" />
    </svg>
  );
}

function SvgJavaScript({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect width="24" height="24" rx="3" fill="#F7DF1E" />
      <path d="M7 18.5c.5.8 1.1 1.4 2.3 1.4 1 0 1.7-.5 1.7-1.2 0-.8-.7-1.1-1.8-1.6l-.6-.3C7 16 6 15 6 13.5c0-1.6 1.2-2.8 3.1-2.8 1.3 0 2.3.5 3 1.4l-1.6 1c-.4-.6-.8-.9-1.4-.9-.6 0-1 .4-1 .9 0 .6.4.9 1.4 1.3l.6.3c1.7.7 2.7 1.7 2.7 3.3 0 1.9-1.5 3-3.5 3-2 0-3.2-.9-3.8-2.2L7 18.5zm8.2.3c.3.6.6 1 1.3 1s1.1-.3 1.1-1.4V11h2v7.5c0 2.2-1.3 3.2-3.2 3.2-1.7 0-2.7-.9-3.2-2l2-.9z" fill="#000" />
    </svg>
  );
}

function SvgPython({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2C8 2 5 4 5 7v2h7V7h3c1 0 2-1 2-2s-1-2-2-2h-3z" fill="#3776AB" />
      <path d="M12 22c4 0 7-2 7-5v-2h-7v2h-3c-1 0-2 1-2 2s1 2 2 2h3z" fill="#FFD43B" />
      <circle cx="10" cy="5.5" r="1" fill="#fff" />
      <circle cx="14" cy="18.5" r="1" fill="#3776AB" />
    </svg>
  );
}

function SvgTailwind({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 6c-2.7 0-4.3 1.3-5 4 1-1.3 2.2-1.8 3.5-1.5.8.2 1.3.7 1.9 1.3.9 1 2 2.2 4.2 2.2 2.7 0 4.3-1.3 5-4-1 1.3-2.2 1.8-3.5 1.5-.8-.2-1.3-.7-1.9-1.3C15.3 7.2 14.2 6 12 6zm-5 6c-2.7 0-4.3 1.3-5 4 1-1.3 2.2-1.8 3.5-1.5.8.2 1.3.7 1.9 1.3.9 1 2 2.2 4.2 2.2 2.7 0 4.3-1.3 5-4-1 1.3-2.2 1.8-3.5 1.5-.8-.2-1.3-.7-1.9-1.3C10.3 13.2 9.2 12 7 12z" fill="#38BDF8" />
    </svg>
  );
}

function SvgGit({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M22.2 11.2l-9.4-9.4a1.1 1.1 0 00-1.6 0L9.4 3.6l2 2a1.3 1.3 0 011.7 1.7l2 2a1.3 1.3 0 11-.8.8l-1.8-1.8V13a1.3 1.3 0 11-1.1 0V8.2A1.3 1.3 0 019 6.9L7 4.9 1.8 10.1a1.1 1.1 0 000 1.6l9.4 9.4a1.1 1.1 0 001.6 0l9.4-9.4a1.1 1.1 0 000-1.5z" fill="#F05032" />
    </svg>
  );
}

function SvgVercel({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3L22 20H2L12 3z" fill="#fff" />
    </svg>
  );
}

function SvgSQL({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <ellipse cx="12" cy="6" rx="8" ry="3" fill="#336791" opacity="0.7" />
      <path d="M4 6v5c0 1.7 3.6 3 8 3s8-1.3 8-3V6" stroke="#336791" strokeWidth="1.2" fill="none" />
      <path d="M4 11v5c0 1.7 3.6 3 8 3s8-1.3 8-3v-5" stroke="#336791" strokeWidth="1.2" fill="none" />
    </svg>
  );
}

function SvgLinux({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2C9 2 7 5 7 9c0 2 .5 3.5 1.5 4.5C7 15 6 17 6 18.5c0 1.5 2 2.5 6 2.5s6-1 6-2.5c0-1.5-1-3.5-2.5-5 1-.9 1.5-2.3 1.5-4.5 0-4-2-7-5-7z" fill="none" stroke="#FFD43B" strokeWidth="1.3" />
      <circle cx="9.5" cy="9.5" r="1" fill="#FFD43B" />
      <circle cx="14.5" cy="9.5" r="1" fill="#FFD43B" />
      <path d="M9.5 14s.5 1.5 2.5 1.5S14.5 14 14.5 14" stroke="#FFD43B" strokeWidth="1" strokeLinecap="round" fill="none" />
    </svg>
  );
}

function SvgRAG({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2" y="3" width="7" height="5" rx="1" fill="#A78BFA" opacity="0.7" />
      <rect x="2" y="10" width="7" height="5" rx="1" fill="#A78BFA" opacity="0.5" />
      <path d="M9 5.5h3l3-3v14l-3-3H9" fill="none" stroke="#A78BFA" strokeWidth="1.2" strokeLinejoin="round" />
      <circle cx="19" cy="12" r="3" fill="none" stroke="#A78BFA" strokeWidth="1.2" />
    </svg>
  );
}

function SvgLLM({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M20.3 8.6A5.6 5.6 0 0016.8 4a5.7 5.7 0 00-5.4.4A5.6 5.6 0 006 5.2a5.7 5.7 0 00-2.3 4.2 5.6 5.6 0 00-1.1 5 5.7 5.7 0 003.5 3.6 5.6 5.6 0 005.4-.4 5.6 5.6 0 005.4.4 5.7 5.7 0 003.5-3.6 5.6 5.6 0 00-1.1-5.8z" stroke="#A78BFA" strokeWidth="1.2" fill="none" />
      <circle cx="12" cy="12" r="2.5" fill="#A78BFA" opacity="0.9" />
    </svg>
  );
}

function SvgVectorDB({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="5" cy="5" r="2" fill="#A78BFA" opacity="0.8" />
      <circle cx="19" cy="5" r="2" fill="#A78BFA" opacity="0.8" />
      <circle cx="5" cy="19" r="2" fill="#A78BFA" opacity="0.8" />
      <circle cx="19" cy="19" r="2" fill="#A78BFA" opacity="0.8" />
      <circle cx="12" cy="12" r="2.5" fill="#A78BFA" />
      <path d="M5 5l7 7M19 5l-7 7M5 19l7-7M19 19l-7-7" stroke="#A78BFA" strokeWidth="1" opacity="0.5" />
    </svg>
  );
}

function SvgJWT({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="4" y="10" width="16" height="10" rx="2" stroke="#7A90B0" strokeWidth="1.4" />
      <path d="M8 10V7a4 4 0 018 0v3" stroke="#7A90B0" strokeWidth="1.4" />
      <circle cx="12" cy="15" r="1.6" fill="#7A90B0" />
    </svg>
  );
}

function SvgCICD({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="5" cy="12" r="2.5" fill="none" stroke="#FF9900" strokeWidth="1.2" />
      <circle cx="12" cy="6" r="2.5" fill="none" stroke="#FF9900" strokeWidth="1.2" />
      <circle cx="19" cy="12" r="2.5" fill="none" stroke="#FF9900" strokeWidth="1.2" />
      <path d="M7.5 12h7M6.8 10L12 8.5M17.2 10L12 8.5" stroke="#FF9900" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

function SvgAPI({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="3" fill="none" stroke="#38BDF8" strokeWidth="1.3" />
      <circle cx="12" cy="12" r="7" fill="none" stroke="#38BDF8" strokeWidth="1" opacity="0.4" />
      <path d="M4 12h16" stroke="#38BDF8" strokeWidth="1" opacity="0.3" />
    </svg>
  );
}

function SvgSpark({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2l2.2 7.8L22 12l-7.8 2.2L12 22l-2.2-7.8L2 12l7.8-2.2L12 2z" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}

function SvgMark({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="7" y="7" width="10" height="10" rx="1.5" transform="rotate(45 12 12)" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

type IconFn = (props: { size?: number }) => React.ReactNode;

const ICONS: Array<{ match: RegExp; icon: IconFn; color: string }> = [
  { match: /react native|react\.js|^react$/i, icon: SvgReact, color: "#61DAFB" },
  { match: /next\.?js/i, icon: SvgNextjs, color: "#ffffff" },
  { match: /node\.?js/i, icon: SvgNodejs, color: "#6CC24A" },
  { match: /express/i, icon: SvgExpress, color: "#7A90B0" },
  { match: /mongo/i, icon: SvgMongoDB, color: "#47A248" },
  { match: /firebase|firestore/i, icon: SvgFirebase, color: "#FFCA28" },
  { match: /docker/i, icon: SvgDocker, color: "#2496ED" },
  { match: /typescript/i, icon: SvgTypeScript, color: "#3178C6" },
  { match: /javascript|es6/i, icon: SvgJavaScript, color: "#F7DF1E" },
  { match: /python/i, icon: SvgPython, color: "#3776AB" },
  { match: /tailwind/i, icon: SvgTailwind, color: "#38BDF8" },
  { match: /github actions|ci\/?cd|jenkins|actions/i, icon: SvgCICD, color: "#FF9900" },
  { match: /\bgit\b|github(?! actions)/i, icon: SvgGit, color: "#F05032" },
  { match: /vercel/i, icon: SvgVercel, color: "#ffffff" },
  { match: /postgres|sql(?!ite)/i, icon: SvgSQL, color: "#336791" },
  { match: /linux/i, icon: SvgLinux, color: "#FFD43B" },
  { match: /\brag\b|rag pipeline/i, icon: SvgRAG, color: "#A78BFA" },
  { match: /llm|llama|groq|hugging face|openai/i, icon: SvgLLM, color: "#A78BFA" },
  { match: /vector|embedding|semantic search/i, icon: SvgVectorDB, color: "#A78BFA" },
  { match: /jwt|auth|clerk|access control|rbac/i, icon: SvgJWT, color: "#7A90B0" },
  { match: /rest|websocket|api design/i, icon: SvgAPI, color: "#38BDF8" },
  { match: /prompt|genai|generative/i, icon: SvgSpark, color: "#34D399" },
];

/** Resolve a technology name to its small vector mark + tint. */
export function techIcon(name: string): { Icon: IconFn; color: string } {
  for (const entry of ICONS) {
    if (entry.match.test(name)) return { Icon: entry.icon, color: entry.color };
  }
  return { Icon: SvgMark, color: "#7A90B0" };
}
