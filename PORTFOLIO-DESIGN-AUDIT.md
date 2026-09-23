# PORTFOLIO-DESIGN-AUDIT.md

> Implementation audit + Figma redesign handoff. Document ONLY — no code was changed.
> Verified against source at `/home/viggu/Documents/Portfolio-Website` on 2026-09-23.
> Files inspected: `app/*`, `components/*`, `components/ui/*`, `data/*`, `types/*`, `lib/*`, `public/*`, `package.json`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`, `eslint.config.mjs`, `README.md`.

---

## 1. Current Application Structure

### Framework & setup

| Item | Value (source) |
|---|---|
| Framework | Next.js `16.3.5` — **App Router only**, no `pages/` dir (`package.json:14`) |
| React | `19.2.8` + `react-dom 19.2.8` (`package.json:15-16`) |
| Language | TypeScript `^5`, `strict:true`, `target ES2017`, `jsx:react-jsx`, alias `@/* → ./*` (`tsconfig.json`) |
| Styling | Tailwind CSS `^4` via `@tailwindcss/postcss`; `@import "tailwindcss"` + `@theme` tokens in `app/globals.css`. No `tailwind.config.js` |
| Animation | `framer-motion ^13.4.0` (`motion`, variants, `whileInView`) |
| Icons | `lucide-react ^1.47.0` + 2 hand-written SVGs (`GithubIcon`, `LinkedinIcon` in `components/icons.tsx`) |
| Fonts | `next/font/google`: `Inter` (`--font-inter`) + `JetBrains_Mono` (`--font-jetbrains-mono`), `display:swap`, latin (`app/layout.tsx:9-19`) |
| UI kit | None (no Radix/shadcn/MUI). Hand-rolled primitives in `components/ui/` |
| Backend/API | **None.** No `app/api/`, Route Handlers, Server Actions, DB client, auth provider |
| Env vars | Optional `NEXT_PUBLIC_SITE_URL` only (sitemap fallback `https://mohanvignesh.dev`). No `.env` files |
| Lint | `eslint ^9` + `eslint-config-next 16.3.5` (`core-web-vitals` + `typescript`) |
| Config | `next.config.ts` = empty default; `postcss.config.mjs` = `@tailwindcss/postcss` only |

### Folder / file map

```
app/
  layout.tsx            # root layout: fonts, metadata, viewport, shell (Spotlight/Navbar/main/Footer/CommandMenu), skip link, pt-16 offset
  page.tsx              # home: Hero→Divider(sky)→About→Divider(emerald)→Experience→Divider(violet)→Projects→Divider(amber)→Skills→Divider(rose)→Achievements→Divider(cyan)→Contact
  globals.css           # tailwind import, @theme tokens, keyframes, utilities, scrollbar, selection, focus, reduced-motion guard
  projects/[slug]/page.tsx  # dynamic case-study route: generateStaticParams + generateMetadata + notFound()
  not-found.tsx         # custom 404
  robots.ts             # { userAgent:"*", allow:"/" }
  sitemap.ts            # / + 5×/projects/<slug> from data; base NEXT_PUBLIC_SITE_URL ?? https://mohanvignesh.dev
  icon.svg              # favicon: dark rounded square, "MV", violet→cyan ring, emerald dot
components/
  Navbar.tsx            # fixed header, scroll-spy, desktop pill, ⌘K + Resume, mobile menu
  Hero.tsx              # #home: pill, kicker, H1, summary, CTAs, stats ledger, socials, HeroVisual card, tech strip
  About.tsx             # #about: heading, availability bar, 3 pillars, essay + education ledger
  Experience.tsx        # #experience: 3-job ledger
  Projects.tsx          # #projects: count, filter tabs, featured article + 2-col grid
  ProjectCard.tsx       # card: visual, category/year, stretched-link title, tagline, desc, tech 5/+N, action bar
  ProjectDetails.tsx    # case-study template: header, visual+hint, tech, longDescription, note, features/architecture/implementation/challenges, prev-next
  ProjectVisual.tsx     # pure-CSS illustrative preview per visual key (proctoring/rag/admin/academy/crm) + caption
  Skills.tsx            # #skills: filter pills + per-group ledger rows
  Achievements.tsx      # #achievements: 3 typographic columns
  Contact.tsx           # #contact: email display, Email Me + Copy email, elsewhere rows
  Footer.tsx            # identity, footer nav, socials, back-to-top, colophon + case-study link
  CommandMenu.tsx       # ⌘K/Ctrl+K palette: nav + projects + copy-email + resume + GitHub
  Spotlight.tsx         # pointer-following radial glow (fine-pointer desktop only)
  icons.tsx             # GithubIcon, LinkedinIcon (fill=currentColor)
  ui/Badge.tsx          # mono hairline tech token
  ui/Reveal.tsx         # scroll reveal (framer-motion whileInView once)
  ui/SectionHeading.tsx # index/eyebrow rule + display title + description; accent variants
  ui/SectionDivider.tsx # accent gradient hairline + glow + center dot
data/
  profile.ts            # profile singleton + navItems (identity/nav/socials/resume single source)
  projects.ts           # 5 projects + getProject(slug)
  experience.ts         # 3 roles
  skills.ts             # 7 skill groups (45 tools)
  achievements.ts       # 3 achievements
types/index.ts          # NavItem, SocialLink, ProjectCategory, ProjectFeature, Project, ExperienceItem, SkillCategory, Achievement, Profile
lib/utils.ts            # cn() — join truthy classes
lib/use-safe-reduced-motion.ts  # hydration-safe reduced-motion hook (useSyncExternalStore, server snapshot false)
public/                 # file.svg, globe.svg, next.svg, vercel.svg, window.svg (unused scaffold leftovers) + resume.README.md (docs, not a PDF)
```

> `README.md:27` mentions `public/resume.pdf`, but implemented `resumeUrl` is a Google Drive link (`data/profile.ts:32`). Drive is current behavior.

---

## 2. Pages and Routes

| URL | File | Purpose | Static/Dynamic |
|---|---|---|---|
| `/` | `app/page.tsx` | Single scrolling page, 7 sections | Static |
| `/#home` | `Hero.tsx` (`section#home`) | Hero anchor | Static anchor |
| `/#about` | `About.tsx` (`#about`) | About anchor | Static anchor |
| `/#experience` | `Experience.tsx` (`#experience`) | Experience anchor | Static anchor |
| `/#projects` | `Projects.tsx` (`#projects`) | Projects anchor | Static anchor |
| `/#skills` | `Skills.tsx` (`#skills`) | Skills anchor (not in nav) | Static anchor |
| `/#contact` | `Contact.tsx` (`#contact`) | Contact anchor | Static anchor |
| `#achievements` | `Achievements.tsx` (`#achievements`) | Achievements (no nav link, no ⌘K entry) | Static anchor |
| `/projects/cse-placement-training` | `app/projects/[slug]/page.tsx` + `ProjectDetails` | Case study: exam platform | Static (pre-rendered) |
| `/projects/studymate` | same | Case study: RN + RAG app | Static |
| `/projects/tea-mahall` | same | Case study: franchise + payments | Static |
| `/projects/kuchipudi-kala-gurukulam` | same | Case study: academy + DevOps | Static |
| `/projects/cse-placement-crm` | same | Case study: Firebase CRM | Static |
| `/projects/<unknown>` | same (`notFound()`) | → custom 404 | Dynamic fallback |
| `/robots.txt` | `app/robots.ts` | allow-all | Generated |
| `/sitemap.xml` | `app/sitemap.ts` | `/` + 5 project URLs, `lastModified: now` | Generated |
| unmatched | `app/not-found.tsx` | Custom 404 | Static |

### Per-route notes

- **`/`**: sections in fixed order with `SectionDivider` accents sky→emerald→violet→amber→rose→cyan. Navbar links `/#home|about|experience|projects|skills|contact`; footer repeats them. Layout wraps content in `pt-16` offset for fixed `h-16` header. Smooth anchor scroll via CSS (`scroll-behavior:smooth`, `scroll-padding-top:88px`).
- **`/projects/[slug]`**: `generateStaticParams()` maps all 5 slugs (SSG); `generateMetadata()` sets `title: project.name`, `description: tagline — description`, OG `title <name> · Mohan Vignesh`, `type:article`. Template: header (`All projects`→`/#projects`, `// categoryLabel`, H1 name, tagline, `role · year`, Live/GitHub buttons) → visual + hint caption → full tech → `longDescription` → optional amber `note` → `// features` grid → `// architecture` rows → `// implementation` grid → `// challenges` problem/approach cards → circular prev/next (`(idx±1+len)%len`).
- **404**: mono `// 404`, giant `404` H1, copy in §3.11, `Back home` (`/`) + `View projects` (`/#projects`), `⌘K` hint. Grid + violet radial decoration. ⌘K still works (menu lives in root layout).

---

## 3. Complete Website Content

Transcribed exactly as implemented. No rewriting.

### 3.1 Navigation labels (`data/profile.ts:41-48`)

`Home → /#home`, `About → /#about`, `Experience → /#experience`, `Projects → /#projects`, `Skills → /#skills`, `Contact → /#contact`. Achievements has no nav item.

### 3.2 Profile (`data/profile.ts:3-39`)

- Name `Kola Mohan Vignesh Kumar`; first `Mohan Vignesh`; monogram `MV`
- Role: `Full Stack Developer | MERN · Next.js · AI Integration`
- Headline (data): `Building Real-World Web & Mobile Apps with MERN & Next.js.`
- Summary: `CSE undergraduate building real-world web and mobile apps with MERN, Next.js, and React Native — from auth, role-based access, REST APIs and databases to payments, deployment, and LLM integration (RAG pipelines, semantic search).`
- Location `Visakhapatnam, India`; education `B.Tech in Computer Science and Engineering` / `RGUKT IIIT Srikakulam` / `8.9/10` / `2023 — Apr 2027`
- Email `kmvk777@gmail.com`; availability `Open to Software Developer Internships` (enabled, dot)
- Resume `https://drive.google.com/file/d/1B8sULopG3tCX3Zi5XQOdsZYetp7PWwHQ/view?usp=sharing`
- Socials: GitHub `https://github.com/viggu777`; LinkedIn `https://linkedin.com/in/kmvk`; LeetCode `https://leetcode.com/u/viggu777`; email `mailto:kmvk777@gmail.com`

### 3.3 Hero (`components/Hero.tsx`)

- Pill: `Open to Software Developer Internships` (emerald pulsing dot)
- Kicker: `~/` (emerald) + `Kola Mohan Vignesh Kumar — portfolio 2026`
- H1: `Building real-world apps with MERN & Next.js.` (2nd sentence gradient mint→sky→lavender)
- Sub: `{summary}` + bold `Auth, RBAC, payments, and deployed full-stack systems.`
- CTAs: `Explore projects` (→`/#projects`) · `Resume` (Drive) · `Contact` (→`/#contact`)
- Stats: `8.9 / CGPA · CSE '27` · `500+ / LeetCode solved` · `04 / Live projects` · `05 / Stacks shipped`
- Socials: `GitHub ↗` · `LinkedIn ↗` · `Visakhapatnam, India`
- Identity card: name, role, chip `id — 001`; rows `Full-stack MERN / React · APIs · MongoDB (01)` · `Next.js · React Native / Web & mobile apps (02)` · `Practical GenAI features / RAG · prompt engineering (03)`; stack `Next.js / React Native / MongoDB / Docker / Firebase`; footer `Visakhapatnam, India` + `open to work`; desktop-only ticket `live system / exam engine · 300 concurrent`
- Tech strip (label `stack`): `React · Next.js` ◆ `Node · Express · MongoDB` ◆ `React Native · Firebase` ◆ `JWT · RBAC · REST APIs` ◆ `Docker · CI/CD` ◆ `Practical GenAI · RAG`

### 3.4 About (`components/About.tsx`)

- Heading `01 // About` (sky): title `Full-stack developer for web & mobile.`; desc `I build real-world applications with auth, role-based access, REST APIs, databases, payments and deployment — with practical Generative AI features where they actually help.`
- Availability bar: `Looking for Software Developer Internships` / `Final-year CSE · graduating Apr 2027 · remote or on-site`; right `SDE Intern / Full-Stack / MERN · Next.js`
- Pillars: `01 / Full-stack engineering / React and Next.js frontends, Node + Express APIs, JWT with role-based access — owned end to end, from schema to deployment.` · `02 / Web & mobile apps / Next.js web apps and React Native mobile apps with Firebase — timetables, productivity flows, dashboards, and clean, usable interfaces.` · `03 / Deployed, not demoed / College-used exam platform for hundreds of concurrent students, a cross-platform study app, and a franchise system with payments and invoicing.`
- Essay: kicker `background`; lead `I'm Mohan Vignesh, a Full Stack Developer based in Visakhapatnam, India working across MERN, Next.js and React Native.`; body `Currently a Gen AI Intern at Sariki Technologies working on the FarmTally Next.js app, and previously a MERN Stack Intern at Headway Vision on Study Abroad projects. I'm actively looking for Software Developer Internships where I can contribute across the stack. I care about clean access control, server-authoritative state, and apps that hold up under real load — with practical GenAI features where useful.`
- Education: kicker `education`; `B.Tech in Computer Science and Engineering`; `RGUKT IIIT Srikakulam`; numeral `8.9/10`; rows `program / B.Tech · CSE` · `period / 2023 — Apr 2027` · `graduating / Apr 2027` · `base / Visakhapatnam, India`

### 3.5 Experience (`data/experience.ts`; heading `02 // Experience`, emerald, title `Where I've worked.`, desc `Three roles spanning campus web development, full-stack MERN work, and practical GenAI features.`)

1. `Gen AI Intern` @ `Sariki Technologies`, `Jun 2026 — Present` (`current`): summary `Full-stack Next.js development on FarmTally, plus practical Generative AI features.` Points: `Contributing to the FarmTally full-stack web application using Next.js — application features and development workflows.` / `Working with Generative AI and prompt engineering for practical AI-powered product features and application workflows.` Tech: `Next.js, React, REST APIs, Node.js, Prompt Engineering`
2. `MERN Stack Intern` @ `Headway Vision`, `Jul 2025 — Mar 2026` (`internship`): summary `Full-stack MERN development with JWT, role-based access, Firebase/Firestore — including two Study Abroad projects.` Points: `Developed MERN applications with JWT authentication, role-based access control, REST APIs, and MongoDB.` / `Worked with Firebase and Firestore and contributed to two Study Abroad projects across frontend, backend, and database workflows.` / `Collaborated through Git workflows and code reviews while contributing to live projects.` Tech: `React, Node.js, Express.js, MongoDB, JWT, Firebase, Firestore`
3. `Associate Web Developer` @ `Students Gymkhana Center`, `Mar 2024 — Mar 2025` (`internship`): summary `Campus web development — built and maintained internal web applications with the student gymkhana team.` Points: `Built and maintained internal web applications using React and Node.js.` / `Integrated backend APIs and enhanced UI/UX through team collaboration.` Tech: `React, Node.js, REST APIs`

### 3.6 Projects short content

Heading `03 // Featured projects` (violet): title `Production systems, different problems.`; desc `Each opens a case study with architecture, features, and engineering trade-offs. Previews are illustrative diagrams — not screenshots.` Filters: `All / Full Stack / Mobile / AI / LLM`. Count `02 / 05` style (zero-padded visible/total). Badge `★ featured`. Buttons `Read case study` (featured) / `Case study` (grid) · `Live` · `GitHub`. Line `Showing <n> of 5 — <filter>`.

1. `CSE Placement Training` — `Live proctored examination platform used by my college` — `Exam scheduling, automated grading, rankings and percentile analytics for up to 300 concurrent students — with webcam proctoring, Trust Score violation tracking, and resilient exam recovery.`
2. `StudyMate` — `Student productivity & learning app` — `Cross-platform React Native app with Pomodoro, timetable, SGPA and study workflows — with a practical RAG assistant for questions over the student's own PDFs.`
3. `Tea Mahall` — `Admin-based tea franchise application` — `Franchise management with an authenticated admin dashboard, role-based CRUD, real-time state, Razorpay payments, transactional email, and automated invoice PDFs.`
4. `Kuchipudi Kala Gurukulam` — `Live classical dance academy platform` — `Full-stack MERN platform with JWT authentication and role-based access, Cloudinary-backed media, and Docker + Jenkins deployment on a Linux server.`
5. `CSE Placement CRM` — `Placement management platform used by 30+ CSE students` — `Role-based placement workflows for student and placement data — Firebase Auth + Firestore with real-time updates, built on React with GitHub Actions CI/CD to Firebase hosting.`

### 3.7 Skills (`data/skills.ts`; heading `04 // Skills`, amber, title `A practical, production-oriented toolkit.`, desc `No proficiency bars or fake ratings — 7 groups, 45 tools I actually build and deploy with.` — counts computed)

Pills: `All · 45` + group labels (re-click active → All). Footer: `<n> groups · <m> tools shown`.
- `Frontend Development / Web and mobile interfaces`: JavaScript (ES6+), React.js, Next.js, React Native, Redux, Tailwind CSS, Bootstrap
- `AI / LLM Integration / RAG pipelines & LLM features`: RAG Pipelines, LLM Integration, Prompt Engineering, Embeddings & Vector Search, Semantic Search, Hugging Face, Groq API, Llama 3.1
- `Backend & APIs / Services, auth, and access control`: Node.js, Express.js, REST APIs, JWT, Role-Based Access Control, Clerk
- `Databases / Operational and app data`: MongoDB, MongoDB Atlas, SQL, Firebase Firestore
- `DevOps & Tools / Shipping and collaboration`: Docker, Jenkins, GitHub Actions, Linux, Vercel, Railway, Render, Git, GitHub, Postman
- `Programming Languages / Daily drivers`: C++, C, JavaScript, Python
- `Core Computer Science / Foundations`: Data Structures & Algorithms, DBMS, OOP, Computer Networks, LLD, API Design

### 3.8 Achievements (`data/achievements.ts`; heading `05 // Achievements`, rose, title `Signals of consistency.`, no description)

Kickers: `code → leetcode · consistency`; `trophy → hackathon · finalist`; `users → leadership · community`.
1. `500+ DSA problems on LeetCode` / `Consistent problem-solving across data structures and algorithms — the foundation behind my backend and full-stack work.` / `View LeetCode profile` (→ LeetCode)
2. `MVGR Hackathon — Finalist` / `Selected for the final round after clearing the initial online screening.` (no link)
3. `CSE Branch Coordinator — Techniverse 2K25` / `Coordinated CSE participation for the Techniverse 2K25 technical fest.` (no link)

### 3.9 Contact (`components/Contact.tsx`)

Heading `06 // Contact` (cyan): title `Looking for a Software Developer Intern?`; desc `I'm actively looking for Software Developer Internships — full-stack, backend, or mobile roles. Fastest way to reach me is email. I read everything, whether it's an internship, a collaboration, or feedback on the exam platform and full-stack work.` Role line: `SDE Intern / Full-Stack / MERN · Next.js / Remote · On-site`.
Left (`direct`): email `kmvk777@gmail.com` (mailto, underline, ↗); buttons `Email Me` + `Copy email`/`Copied!`; footnote `Open to Software Developer Internships · Visakhapatnam, India · RGUKT IIIT Srikakulam · Graduating Apr 2027`.
Right (`elsewhere`): `LinkedIn / linkedin.com/in/kmvk` · `GitHub / github.com/viggu777` · `LeetCode / 500+ problems solved` (all external, icon + ↗).

### 3.10 Footer (`components/Footer.tsx`)

Identity: `MV` + `Kola Mohan Vignesh Kumar` + `Full Stack Developer | MERN · Next.js · AI Integration`. Nav: same 6 labels. Icon buttons: `GitHub profile`, `LinkedIn profile`, `LeetCode profile`; `Top` (`Back to top`). Colophon: `© <year> · Designed & built from scratch with Next.js` (year = `new Date().getFullYear()`). Link: `read the case studies` → `/projects/cse-placement-training`.

### 3.11 Navbar / CommandMenu / 404 strings

- Navbar: wordmark `mohanvignesh` + `.dev`, indicator `open`; buttons `K` (`Open quick navigation (Command K)`), `Resume`; mobile `Open menu`/`Close menu`, numbered `01–06`, `Jump` + `Resume`, footer `kmvk777@gmail.com · Visakhapatnam, India`.
- CommandMenu: input `Type a command — try “project”, “email”, “resume”…`; items `Go to <Nav>` (`/#…`) · `Project: <Name>` (`detail page`) · `Copy email address` (email) · `Open resume` (`Google Drive`) · `Open GitHub` (`viggu777`); empty `No matches.`; footer `↑↓ to navigate · ↵ to run · esc to close`; labels `Quick command menu`, `Search commands`, `Commands`.
- 404: `// 404` · `404` · `This route doesn't exist — much like a hallucinated citation. Let's get you back to grounded content.` · `Back home` · `View projects` · `tip: press ⌘K anywhere to jump`.

---

## 4. Projects

### 4.1 Data vs hardcoded

- **Structured (`data/projects.ts`, typed `types/index.ts:19-41`):** slug, name, tagline, description, longDescription, categoryLabel, categories, tech, liveUrl?, githubUrl?, year?, role, visual, accent, features, architecture, engineering, challenges, note?, replaceImageHint. Cards, filters, featured, detail pages, sitemap, ⌘K all derive from this array — new entry auto-propagates.
- **Hardcoded (chrome only):** filter list `["All","Full Stack","Mobile","AI / LLM"]` (`Projects.tsx:16`), featured-vs-grid split, `tech.slice(0,6)` featured / `slice(0,5)+"+N"` cards, accent→style maps, `ProjectVisual` diagrams, detail labels (`// features/architecture/implementation/challenges`), prev/next, hint-caption rendering. `visual` keys map to CSS diagrams, not screenshots.

### 4.2 Per-project record

**P1 — CSE Placement Training** (`cse-placement-training`): longDescription 3 paras (exam engine w/ server timers/auto-save/crash-recovery/JSON import; proctoring: face/gaze/fullscreen/tab/Trust Score; Llama 3.1 8B via Groq semantic grading w/ partial marking + manual fallback — **removed from production**). Tech(12): React, Node.js, Express.js, MongoDB, Firebase, JWT, WebGazer, face-api.js, Groq, Llama 3.1, Vercel, Railway. Cats `[Full Stack, AI / LLM]`; label `Full Stack · Proctoring · MERN`; accent violet; visual `proctoring`; year 2025; role `Design, frontend, backend, proctoring & deployment`. Features: Exam engine / Webcam proctoring / Grading & analytics / Access control. Architecture(4): Vercel+Railway+Mongo+Firebase; server-authoritative timers; on-device proctoring→Trust Score; isolated Groq path. Engineering(4): randomized delivery; auto-save+auto-submit; bulk JSON import; role-scoped APIs. Challenges(3): 300 concurrent → server-side timers, small payloads, reload resilience; noisy signals → Trust Score for human review; LLM availability → fallback then removal. Note (amber): `AI semantic evaluation (Llama 3.1 via Groq) is no longer in production. Live site reflects the stable rule-based grading path.` Live `https://cse-placements-training.vercel.app`; **no GitHub** (button hidden). Hint: add `public/projects/cse-placement-training.png`.

**P2 — StudyMate** (`studymate`): longDescription 3 paras (Expo + Firebase Auth + Express + Atlas; RAG: ingest→extract→chunk→embed→Atlas Vector Search→HF generation; user-isolated retrieval). Tech(8): React Native, Expo, Node.js, Express.js, MongoDB Atlas, Firebase, RAG, Hugging Face. Cats `[Mobile, Full Stack, AI / LLM]`; label `Mobile · RAG · Full Stack`; accent cyan; visual `rag`; 2025; role `Mobile app, backend, RAG pipeline & vector search`. Features: Study workflows / PDF Q&A assistant / RAG pipeline / User-isolated retrieval. Arch: Expo+Express; ingestion chain; scoped query chain; Atlas dual-use. Eng: chunking for study PDFs; per-call user filters; separated data paths. Challenges: PDF layout variance → normalization; grounding → retrieval-constrained generation; auth consistency → Firebase tokens e2e. **No live;** GitHub `https://github.com/viggu777/StudyMate-App`. Hint `public/projects/studymate.png`.

**P3 — Tea Mahall** (`tea-mahall`): longDescription 2 paras (admin dashboard + customer pages; Razorpay + Nodemailer + server PDFs). Tech(8): MERN, Clerk, Razorpay, Nodemailer, MongoDB, Express.js, React, Node.js. Cats `[Full Stack]`; label `Full Stack · Admin Dashboard · Payments`; accent amber; visual `admin`; 2025; role `Full-stack build, auth, payments & invoicing`. Features: Admin dashboard / Franchise workflows / Payments / Email + invoicing. Arch: MERN + Clerk RBAC + Razorpay + Nodemailer + server invoices. Eng: role-guarded CRUD; realtime state; server-side PDFs. Challenges: payment/order/email consistency → backend-authoritative; RBAC bypass → UI+API enforcement. Live `https://teamahall.netlify.app`; GitHub `https://github.com/viggu777/tea-mahall`. Hint `public/projects/tea-mahall.png`.

**P4 — Kuchipudi Kala Gurukulam** (`kuchipudi-kala-gurukulam`): longDescription 2 paras (MERN + JWT RBAC; Cloudinary + Docker + Jenkins on Linux). Tech(9): MongoDB, Express.js, React, Node.js, JWT, Cloudinary, Docker, Jenkins, Linux. Cats `[Full Stack]`; label `Full Stack · DevOps · CI/CD`; accent rose; visual `academy`; **year omitted** (comment: `Year and live URL not provided — add them when confirmed` → year hidden); role `Full-stack build, auth & DevOps`. Features: Authentication & RBAC / Media via Cloudinary / Containerized deployment / CI/CD pipeline. **No live;** GitHub `https://github.com/Sampradayam/ksg-platform`. Hint `public/projects/kuchipudi-kala-gurukulam.png`.

**P5 — CSE Placement CRM** (`cse-placement-crm`): longDescription 3 paras (30+ students; React+Firebase direct, no Express; Actions CI/CD). Tech(5): React.js, Firebase Authentication, Firebase Firestore, GitHub Actions, Firebase Hosting. Cats `[Full Stack]`; label `Full Stack · Firebase · CI/CD`; accent cyan; visual `crm`; 2025; role `Frontend, Firebase data model, auth & CI/CD`. Features: Placement workflows / Role-based access / Realtime data / Automated deploys. **No live, no GitHub** (card shows only `Case study`). Hint `public/projects/cse-placement-crm.png`.

### 4.3 Card behavior (`ProjectCard.tsx`)

Stretched-link: title `<Link href=/projects/<slug>>` with `after:absolute after:inset-0`; Live/GitHub anchors `relative z-10` stay clickable above it. Hover: per-accent border (`hover:border-<accent>-300/35`), title → accent-200, inner visual `scale-[1.015]` 500ms, `Case study` → `bg-slate-200`, `row-hover` border/bg. Tech: first 5 + `+N`. Action grid: mobile `grid-cols-2` (primary spans 2, lone secondary spans 2, two secondaries split) → `sm:flex` row. Year only if defined. Focus: `focus-within:border-emerald-300/40`.

### 4.4 Detail behavior (`ProjectDetails.tsx` + `[slug]/page.tsx`)

Full page (not modal). Conditional Live/GitHub (never dead buttons). Full tech list, first longDescription para `zinc-300` rest `zinc-400`, amber note aside, `features` 2-col, `architecture` cyan-dot rows, `engineering` 2-col, `challenges` problem header + `approach — …` emerald prefix, circular prev/next (hover → violet-200).

### 4.5 Hover/click/animation

Hover = CSS transitions only (no layout shift except inner-layer scale). Click: title/featured → detail; `Case study` span visual-only (stretched link handles it); Live/GitHub → new-tab. Filters: `setActive`, underline via `.filter-tab::after` + `data-active` (no shift). Entrance via `Reveal` (`delay (i%2)*0.06`). `ProjectVisual` static CSS (only `animate-pulse-dot` REC/live dots inside).

---

## 5. Components

| Component | Path | Purpose | Used in | Props/data | Interactions | Responsive | Animation |
|---|---|---|---|---|---|---|---|
| Navbar | `components/Navbar.tsx` (client) | Fixed header, spy, pill nav, ⌘K+Resume, mobile menu | `layout.tsx` | `navItems/profile` direct; `scrolled/open/active`; `usePathname` | Scroll→bg; observer spy; toggle+Esc+scroll-lock; `command-menu:open` | Pill+actions `md:flex`; burger `md:hidden`; dropdown panel | bg `transition-all 300ms`; active dot `transition-all` |
| Hero (+HeroVisual) | `components/Hero.tsx` (client) | `#home` intro, CTAs, stats, socials, card, strip | `page.tsx` | `profile`; local `stats/techStrip/focus/stack` | Links only | `lg:grid-cols-[1.08fr_0.92fr]`; CTAs stack mobile; stats 2→4 col; marquee mobile/static desktop; ticket `lg:block` | Stagger 0.07, y24 0.65s; card y28 0.8s d0.25; rows x18; ticket y-loop 5s; reduce→static |
| About | `components/About.tsx` (server) | `#about` heading, avail bar, pillars, essay+education | `page.tsx` | `profile`; local `pillars[3]` | None | Pillars `sm:grid-cols-[64px_240px_1fr]`; essay `lg:grid-cols-[1.25fr_0.75fr]` | `Reveal`, `delay i*0.06` |
| Experience | `components/Experience.tsx` (server) | `#experience` ledger | `page.tsx` | `experience` | None | Rows `lg:grid-cols-[250px_1fr]` | `Reveal i*0.05` |
| Projects | `components/Projects.tsx` (client) | `#projects` filter+featured+grid | `page.tsx` | `active` state; `visible` memo; featured/rest | `setActive` filter; links | Grid `1→sm:2` col; featured `lg:[1.15fr_0.85fr]`; tabs scroll-x mobile | `Reveal`; visual `scale-[1.012]` hover 500ms |
| ProjectCard | `components/ProjectCard.tsx` | Card | `Projects.tsx` | `{project:Project}` | Stretched-link + z-10 externals | Actions 2-col mobile→flex sm+ | CSS hover only |
| ProjectDetails | `components/ProjectDetails.tsx` | Case-study template | `[slug]/page.tsx` | `{project}`; prev/next modulo | Links | `sm:grid-cols-2` blocks | None (static) |
| ProjectVisual | `components/ProjectVisual.tsx` | CSS diagram per `visual` | Card, featured, Details | `{project}` switch on `visual` | None | `grid-cols-1`→`sm:` splits; phone max-widths | Static (+pulse dots) |
| Skills | `components/Skills.tsx` (client) | `#skills` pills+ledger | `page.tsx` | `active`; `visible/totalTools` memos | Pill toggle (re-click→all) | Pills scroll-x mobile→`sm:flex-wrap`; rows `sm:[260px_1fr]` | `Reveal min(i,3)*0.04`; pill `transition` |
| Achievements | `components/Achievements.tsx` | 3 statements | `page.tsx` | `achievements`; `kickers` | 1 external link | `md:grid-cols-3` | `Reveal i*0.07`; arrow micro-shift |
| Contact | `components/Contact.tsx` (client) | `#contact` email+channels | `page.tsx` | `profile`; `copied`; `channels[3]` | Clipboard+1.8s `Copied!`; mailto | `lg:[1.05fr_0.95fr]`; CTAs stack | `Reveal`; color transitions |
| Footer | `components/Footer.tsx` (client) | Footer | `layout.tsx` | `navItems/profile`; `getFullYear()` | `toTop` (smooth/auto); links | Rows stack→`sm:flex-row` | Color transitions |
| CommandMenu | `components/CommandMenu.tsx` (client) | ⌘K palette | `layout.tsx` | `open/query/highlight`; `useRouter`; items from nav+projects+actions | ⌘K/Ctrl+K, Esc, custom event, type-filter, ↑↓/Enter/mouse, backdrop close | `max-w-lg`, `max-h-72` scroll, `pt-[14vh]` | None (instant mount) |
| Spotlight | `components/Spotlight.tsx` (client) | Cursor glow | `layout.tsx` | `pos/visible` | pointermove rAF; leave hides | `hidden md:block`; off on coarse/reduce | opacity 500ms |
| Badge | `components/ui/Badge.tsx` | Mono tech token | Experience/Projects/Card/Details | `{children,className?}` | Hover border/text | `shrink-0`, wraps | `transition-colors` |
| Reveal | `components/ui/Reveal.tsx` (client) | Scroll reveal | All home sections/cards | `{children,delay=0,y=16,className?}` | `whileInView once` | Pass-through | opacity+y 0.55s `[0.22,1,0.36,1]`, margin `-60px`; reduce→plain div |
| SectionHeading | `components/ui/SectionHeading.tsx` | Editorial header | 6 home sections | `{eyebrow,title,description?,align?,accent?,index?}` | None | `text-balance`, fluid title | None |
| SectionDivider | `components/ui/SectionDivider.tsx` | Inter-section break | `page.tsx` ×6 | `{accent?}` | None | `max-w-6xl` | None (static) |
| GithubIcon/LinkedinIcon | `components/icons.tsx` | Brand glyphs | Hero/Projects/Card/Details/Contact/Footer | `{className?}` | Inherit hover | `h-4 w-4` typical | None |

Buttons (3 styles, keep roles): primary white `bg-white text-black hover:bg-slate-200`; secondary hairline `border-white/10 bg-white/[0.04] hover:border-white/25 hover:bg-white/[0.08]`; ghost `border-transparent hover:bg-white/[0.06]`. Touch targets `min-h-44/48px` (nav kbd/buttons `h-11`).

---

## 6. Current Visual Design System

### Colors

| Role | Value | Where |
|---|---|---|
| Page bg | `#04060c` (body class); `body{background:#05080f}` fallback; header scrolled `bg-[#04060c]/85`; mobile menu `bg-[#05080f]/95` | `layout.tsx:72`, `globals.css:91`, `Navbar.tsx:86` |
| Surfaces | `panel #080d18` (cards/featured), `panel-2 #0b1222`, detail rows `#0b0b12`, visuals `#08080f/#060a0e/#0c0709/#050b0e/#0a0805/#0d0c09`, glass `linear-gradient(180deg,rgba(13,20,36,.92),rgba(7,11,22,.94))+blur(18px)` | `globals.css:8-9,182` |
| Text | primary white / `#e2e8f0`; secondary `slate-300/400` (`zinc-300/400` details/404); muted `slate-500/600`,`zinc-500/600`; faint `slate-700` | Throughout |
| Accents | violet `#a78bfa`, blue `#7dd3fc`, cyan `#22d3ee`, emerald `#34d399`, mint `#5eead4`, amber `#fbbf24` (+ sky/rose defaults) | `globals.css:11-16` |
| Borders | `line rgba(148,163,184,.14)`; hairlines `border-white/[0.06–0.12]` | `globals.css:10` |
| Status | emerald-300/400 (open/live/ok), red-400 (REC), amber-300 (pending/review) | Hero, visuals, note |
| Selection | `rgba(52,211,153,.28)` bg, `#ecfdf5` text | `globals.css:116` |
| Scrollbar | track `#04060c`, thumb `#1e293b` (hover `#334155`), 10px, r8 | `globals.css:122` |
| Focus | `2px solid #34d399`, offset 3px, r4 | `globals.css:137` |

Section accents: About sky, Experience emerald, Projects violet, Skills amber, Achievements rose, Contact cyan (heading + incoming divider). Project accents: training violet, StudyMate cyan, Tea Mahall amber, Gurukulam rose, CRM cyan.

### Typography

- Sans `var(--font-inter),ui-sans-serif,system-ui,-apple-system,"Segoe UI",sans-serif`; mono `var(--font-jetbrains-mono),ui-monospace,"SF Mono",Menlo,monospace`. Body Inter + `ss01/cv11`, antialiased. Mono for kickers/labels/badges/counts/captions.
- Weights 400 body / 500 taglines-summaries / 600 buttons-rows-H3 / 700 display; mono kickers 600 + tracking `0.14–0.26em` uppercase.
- Sizes: H1 `clamp(2.75rem,7vw,4.9rem)` lh `0.98` tr `-0.045em` 700 (token `--text-display-hero`); H2 `clamp(1.9rem,4.2vw,2.9rem)` lh `1.04` tr `-0.03em` 700 (token `--text-display-section`); sub token `--text-display-sub clamp(1.35rem,2.6vw,1.75rem)`; featured H3 `clamp(1.6rem,3.4vw,2.2rem)`; achievements `clamp(1.5rem,2.6vw,1.9rem)`; card titles `21px`; detail H1 `30px→48px`; body hero `16–17px/28–32` / sections `14–15px/24–28` / card desc `13.5px/24`; labels `11–13px`; micro mono `10–12px`.
- `text-balance` on displays; `truncate` on handles/emails/labels; `tabular-nums` on counts/CGPA.

### Spacing/layout

Container `max-w-6xl px-4 sm:px-8`; detail `max-w-4xl`; 404 `max-w-xl`; HeroVisual `max-w-[440px]`. Sections `py-14 sm:py-20` + divider `py-4`. Header offset `pt-16` + `scroll-mt-20` + `scroll-padding-top:88px`. Grids: hero `lg:[1.08fr_0.92fr] g12/14`; experience `lg:[250px_1fr]`; featured `lg:[1.15fr_0.85fr]`; cards `sm:2col g5`; contact `lg:[1.05fr_0.95fr]`; skills rows `sm:[260px_1fr]`; pillars `sm:[64px_240px_1fr]`; essay `lg:[1.25fr_0.75fr]`. Card padding `p-5 sm:p-6 (+pb-6/7)`; detail `px-4 sm:px-8 py-8 sm:py-10`.

### Radius/shadow/gradient/glow

Radius `lg8 / xl12 / 2xl16 / 3xl24 (hero card) / full (pills/dots)`. Shadows: `code-glow`, hero `0_24px_80px_-24px`, `card-lift:hover 0_20px_50px_-20px`, `btn-primary-glow`, visuals `0_16px_40px_-20px`, palette `2xl`. Gradients: `text-gradient-hero 92deg #6ee7b7→#7dd3fc→#c4b5fd`; monogram `emerald-400/25→violet-500/20`; hero card `emerald→sky→violet`; hairlines `via-<accent>-300/60`; washes (emerald 12% hero top, violet 16% detail, per-accent 10–12%). Effects: `.noise` 5% turbulence, `.bg-grid` 44px (32px ≤640px), `.bg-dots` 22px, fade masks, `visual-frame` highlight+vignette, `.glass` blur. Tech strip `border-t bg-black/20`; footer `border-t`.

### Breakpoints

Tailwind defaults only: `sm:640 md:768 lg:1024`. Custom: `@media(max-width:640px)` grid tightening; `@media(max-width:380px)` body 15px. `sm:` = padding/2-col/CTAs/static strip; `md:` = desktop nav + spotlight; `lg:` = splits + ticket.

---

## 7. Animations and Motion

| Effect | Where | Trigger | Timing | Type/lib | Layout? | Mobile | Reduced-motion |
|---|---|---|---|---|---|---|---|
| Hero stagger | `Hero.tsx` | Mount | 0.65s stagger 0.07; card 0.8s d0.25; rows 0.6s d0.45+i*.12; ease `[0.22,1,0.36,1]` | framer-motion y24→0 | No | Same | static (`initial=false`) |
| Scroll reveal | `Reveal.tsx` | `whileInView once, margin -60px` | 0.55s + delay 0–0.1, same ease | framer-motion y16→0 | No | Same | plain div |
| Ticket loop | `Hero.tsx:148` | Mount ∞ | 5s `repeat:Infinity easeInOut` y`[0,-8,0]` | framer-motion | No | Not rendered (`lg:block`) | Not rendered |
| Pulse dots | Navbar/Hero/About/Experience/visuals (`animate-pulse-dot`) | Always | 2s ∞ (glow 0→7px) | CSS `pulse-dot` | No | Same | clamped 0.01ms |
| Tech marquee | Hero strip (`animate-marquee`) | Always | 28s linear ∞ `0→-50%` (dup list) | CSS | No (masked w-max) | Mobile only; desktop static | clamped |
| Unused tokens | `--animate-aurora/float-slow/spin-slow` | Defined, **not referenced** | 9/14/24s | CSS | — | — | clamped |
| Card hovers | Cards/featured/rows | Hover | 0.25–0.5s; visual scale 500ms | CSS (border/bg/color/transform) | No (inner scale; rows no transform) | N/A touch; tap works | clamped |
| Filter underline | `.filter-tab::after` | `data-active` | opacity 0.2s, scaleX 0.25s | CSS pseudo 0.6→1 | No | Same | clamped |
| Navbar bg | `Navbar.tsx:84` | scrollY>24 | `transition-all 300ms` | CSS + rAF | No | Same | clamped |
| Spotlight | `Spotlight.tsx` | pointermove rAF | opacity 500ms | rAF + CSS | No (fixed, pointer-events-none) | Disabled (`md:block`+coarse guard) | Disabled |
| Smooth scroll | `globals.css:73` | Anchors/toTop | Native | CSS + `scroll-padding-top:88px` | Scroll | Same | `auto`; toTop branches |
| Skip/focus | Global | Tab | Instant | CSS outline; `sr-only→visible` | No | Same | N/A |
| CommandMenu/menu | Overlays | State | None (instant) | Conditional render | Body lock (menu) | `pt-[14vh] max-w-lg` | N/A |

Global guard (`globals.css:78-89`): `scroll-behavior:auto`, all anim/transitions `0.01ms !important ×1`. `useSafeReducedMotion()` in Hero/Reveal gives SSR-safe static fallback.

---

## 8. Responsive Design

| BP | Layout | Nav | Type | Grids | Shown/hidden |
|---|---|---|---|---|---|
| ≥1024 (`lg`) | 2-col hero/contact/experience/essay/featured | Pill + ⌘K + Resume; spotlight (fine pointer) | H1→4.9rem H2→2.9rem | Cards 2-col; features 2-col; achievements 3-col (from md) | Ticket shown; desktop tech row |
| 768–1023 | Hero stacks (card ≤440px); single-col sections | Desktop nav ≥768; burger below | Clamp scales | Cards 2-col from sm | Spotlight ≥768; menu hidden ≥768 |
| 640–767 | Single-col, `px-8 py-20` | Burger + panel (to 768) | Stats 4-col from sm | Rows split `sm:`; actions row sm+ | Marquee to 640; desktop strip from sm |
| <640 | Stacked `px-4 py-14`; full-width primary CTA + 2-col secondary; 2-col action grids | Burger `h-11`; dropdown 52px rows, 48px Jump/Resume, email footer | H1 floor 2.75rem; 15px ≤380px | 1-col cards/visuals; stats 2-col | Marquee on; ticket off; truncate/min-w-0 guards |

Targets 44–52px; tabs scrollable (`no-scrollbar`); `overflow-x:hidden` + `min-width:0`; `safe-pb` for home indicator. Fragile points: stretched-link depends on `z-10` secondaries; long mono strings depend on `truncate`; 320px gutters narrow by design.

---

## 9. Functional Behavior

### MUST PRESERVE

1. Anchor nav + smooth scroll (`/#home|about|experience|projects|skills|contact` from any route; offsets `pt-16/scroll-mt-20/padding-top 88px`).
2. Scroll-spy (`IntersectionObserver -40%/-55%`, `aria-current`, no-op on project pages).
3. Header bg switch (transparent→blurred >24px, rAF; solid when menu open).
4. Mobile menu (toggle, Esc, scroll-lock, link-click close, `aria-expanded/controls/label`).
5. Project filtering (`All/Full Stack/Mobile/AI / LLM`, `aria-pressed`+`data-active`, `02 / 05` count, `Showing n of 5 — filter`, featured-only-on-All).
6. Detail routing (`/projects/<slug>`×5 SSG, unknown→404, circular prev/next, `All projects→/#projects`).
7. Conditional Live/GitHub (P1 no GitHub; P2/P4/P5 no Live; P5 neither — never dead buttons).
8. Stretched-link + `z-10` externals (breaks taps if lost).
9. Skill pills (toggle-off→all, `n groups · m tools`).
10. Copy-email (clipboard + `Copied!` 1.8s + `aria-live=polite`, silent fail w/ mailto fallback).
11. Resume single source (`profile.resumeUrl` Drive, `_blank noopener`: Navbar+Hero+menu+⌘K).
12. External `rel=noopener noreferrer` on all `_blank`.
13. ⌘K (toggle ⌘K/Ctrl+K, `command-menu:open` event, type-filter, ↑↓/Enter/Esc, backdrop close, `router.push` internal vs `window.open` external, dialog/listbox ARIA).
14. Back-to-top (smooth unless reduced-motion).
15. Skip link (`→#main`).
16. `/robots.txt` allow-all; `/sitemap.xml` (`/`+5 slugs, `NEXT_PUBLIC_SITE_URL` base).
17. Reduced-motion + coarse-pointer guards (static fallbacks).
18. Single-source data (`data/*.ts`, `getProject(slug)`, `profile`).
19. No-backend assumption (no fetch/forms/API — don't invent endpoints).

Non-features (need no preservation): theme switcher, contact form, search, pagination, i18n, auth, CMS.

---

## 10. Assets

| Asset | Path | Represents | Used | Size/notes |
|---|---|---|---|---|
| Icon/favicon | `app/icon.svg` | `MV` dark rounded square, violet→cyan ring, emerald dot | Tab/PWA (App Router convention) | `64×64 rx14`, 22px mono |
| Scaffold SVGs (unused) | `public/next.svg, vercel.svg, file.svg, globe.svg, window.svg` | Next.js leftovers | **Nowhere** (no imports) | Leave alone |
| Resume doc | `public/resume.README.md` | Drive setup docs, **not a PDF** | Docs only | Live file is remote Drive link |
| Resume (remote) | Drive `1B8sULopG3tCX3Zi5XQOdsZYetp7PWwHQ` | Actual PDF | Navbar/Hero/menu/⌘K | `Manage versions` keeps link stable |
| Screenshots | None (`public/projects/*.png` absent) | Intended screenshots | Hint strings only | `ProjectVisual` CSS diagrams instead |
| Fonts | None local; `next/font/google` Inter + JetBrains Mono | Typefaces | Layout vars | `swap`, latin |
| Video/audio/Lottie | None | — | — | Don't add w/o perf review |
| Backgrounds | None (files); CSS grids/gradients/noise data-URI | Texture | `globals.css` | Inline SVG turbulence |

Do not replace assets per brief — keep `icon.svg`, no invented screenshots.

---

## 11. SEO and Metadata

`app/layout.tsx:21-67` + `[slug]/page.tsx:14-27` + `robots.ts` + `sitemap.ts`:
- Title default `Mohan Vignesh — Full Stack Developer`, template `%s · Mohan Vignesh`; project `title: <name>`.
- Description: `Mohan Vignesh (Kola Mohan Vignesh Kumar) — Full Stack Developer building MERN, Next.js, and React Native applications with auth, RBAC, payments, deployment, and practical Generative AI features. Open to Software Developer Internships.`
- Keywords: `Mohan Vignesh, Full Stack Developer, MERN, Next.js, React Native, React, Portfolio`. Authors/creator `Kola Mohan Vignesh Kumar` (+GitHub URL).
- Canonical `/` + `metadataBase https://mohanvignesh.dev` (comment: set `NEXT_PUBLIC_SITE_URL` for absolute OG).
- OG home: title `Mohan Vignesh — Full Stack Developer`; desc `Building real-world web & mobile apps with MERN & Next.js. Auth, RBAC, payments, deployment, with practical GenAI features.`; `website`, `en_IN`, site `Mohan Vignesh — Portfolio`. No `og:image`. Project OG: `<name> · Mohan Vignesh`, `type:article`. No per-project image.
- Twitter `summary_large_image`, same title family, desc `MERN, Next.js, React Native, and practical Generative AI features.` No image/handle.
- Viewport `themeColor #04060c`, `device-width, initialScale 1`. Robots index+follow + allow-all route. Sitemap `/`+5 slugs `lastModified: now`. Favicon `app/icon.svg`. No JSON-LD. Semantics: `lang="en"`, single `main#main`, labeled sections, one `h1` per page, `h2` sections, `h3` cards.

---

## 12. Accessibility

- Semantics: `header/nav/main/footer`, labeled `section`s, `article` cards/details, `ol/ul/dl`, `aside` (education, note). No `<img>`.
- ARIA: labels on navs/sections/tech lists/icon buttons (`Open/Close menu`, `Open quick navigation`, `Back to top`, `<project> GitHub repository`); `aria-current` active nav; `aria-pressed` filters; dialog/listbox/option/combobox + `activedescendant/controls` in palette; `aria-selected`; `aria-live=polite` copy; `aria-hidden` on decor/icons/visuals; `role=presentation` backdrop.
- Keyboard: native button/a/input everywhere; skip link; `:focus-visible` emerald outline; cards `focus-within` border; palette ↑↓/Enter/Esc + autoscroll; menu Esc. No focus trap (by design; Esc/backdrop closes).
- Focus: global outline rule; title links `focus-visible:outline-none` inside highlighted cards.
- Alt: none needed (no images; visuals `aria-hidden` + caption; brand SVGs hidden).
- Reduced motion: CSS clamp + hook fallbacks + spotlight/coarse guards + toTop branch (§7).
- Contrast (as-built): body high; `slate-500/600` 10–11px micro-labels, emerald/cyan accents, amber note — redesign must re-verify smallest sizes.

---

## 13. Performance and Technical Constraints

1. Server-first: server = About/Experience/Achievements/Card/Details/Visual/ui; client only = Navbar/Hero/Projects/Skills/Contact/Footer/CommandMenu/Spotlight/Reveal/hook. Keep hooks/effects/`usePathname/useRouter/motion` in client; don't wrap whole page.
2. Images: no `next/image` today (no rasters). New screenshots → `next/image` + `width/height` or `fill+sizes` (avoid CLS), wire `public/projects/<slug>.png` per hints.
3. Dynamic imports: none; use `next/dynamic (+ssr:false)` for any heavy add (3D/charts).
4. Animation budget: compositor-only (transform/opacity), rAF scroll/pointer, `once:true`, `contain:content`, no-transform row hovers. No scroll-linked layout reads, big blur areas on low-end, mobile infinite loops.
5. Client-only APIs: `scrollY/matchMedia`, `IntersectionObserver`, `clipboard`, `dispatchEvent`, rAF, `window.open/router.push` — never in server render.
6. Hydration: `useSafeReducedMotion` (`useSyncExternalStore`, server `false`) exists because framer's `useReducedMotion` mismatched SSR. Don't read `matchMedia` during render.
7. Integrations: none at runtime (links only). No new env/API assumed.
8. Fonts: `next/font/google` vars — change `layout.tsx` + `@theme` + body fallback together.
9. Tailwind v4: `@theme` tokens, in-`@theme` keyframes, plain-CSS utilities, no config file. `next dev` rewrites `AGENTS.md` — leave it.
10. Verify: `npm run lint`, `npx tsc --noEmit`, `npm run build`.

---

## 14. Current Problems / Design Limitations

### DESIGN-ONLY (safe to restyle)

Palette, type scale, radius, shadows, gradients, glow, grid/dots/noise, dividers, kickers, badges, buttons, card surfaces, ledger rows, footer colophon, 404 decor. `ProjectVisual` diagrams (explicit placeholders → screenshots/illustrations OK, keep prop contract or replace wholesale). `replaceImageHint` visible caption (restyle/remove = component edit). Tech strip, numerals, statement type. 404 copy styling (keep links+hint).

### FUNCTIONAL (change only with care)

Anchor IDs, scroll offsets (`scroll-padding-top/scroll-mt/pt-16`), filter semantics (`ProjectCategory` union, featured-on-All, counts, `aria-pressed/data-active`), skill toggle-off, conditional buttons, stretched-link+z-10, circular prev/next, `notFound()`, static params/metadata, clipboard flow, `mailto:`, ⌘K registry/keys/ARIA/event name, spy margins + `isHome`, menu lock/Esc, toTop branch, SEO (template/canonical/robots/sitemap/metadataBase), reduce/coarse guards, hydration-safe hook.

### COUPLED (UI+logic — extra care)

1. Stretched-link vs new inner interactives (need `relative z-10` + ≥44px or taps misroute).
2. `.filter-tab::after` + `data-active` (markup must keep attribute).
3. `ProjectVisual` size contract (`min-h-220/280`, `border-b`, `overflow-hidden`, `visual-frame`, `aria-hidden`) — `next/image` swap must hold aspect or CLS/misalign.
4. Header set (`h-16`+`pt-16`+`88px`+`scroll-mt-20`) — change together.
5. Spy selectors (`hashOf(nav.href)` ↔ section `id`s) — rename together.
6. Achievements outside nav/⌘K; `01–06` indices assume order — reorder needs index/accent/divider updates.
7. `SectionHeading` index/eyebrow/accent per section — reorder mismatches dossier numbering/color story.
8. `truncate`+`min-w-0` grids — wider type breaks 320px.
9. No render-time `matchMedia` — reintroduces hydration errors.
10. Resume single source — no per-component hardcoding.

---

## 15. Redesign-Safe Architecture

**Style freely (layout/type/spacing/color/hierarchy/motion):** section rhythm, dividers, containers, grids, gaps; display scales, tracking/leading, kickers, numerals, gradient stops; `@theme` accents, hairlines, surfaces, washes, textures, selection/scrollbar/focus; `Badge`/buttons (keep 3 roles+sizes)/cards/rows/channels/footer/404; featured-vs-grid emphasis, `★ featured`, captions; reveal distance/duration/delay, hovers, marquee speed, spotlight, divider glow (keep reduce fallbacks).

**Keep logic (structure/behavior):** ids/hrefs/slugs, `types/` shapes, `data/` truth; client/server split; `cn()`; safe-motion pattern; rAF; `once:true`; filter machines + counts/labels/ARIA; stretched-link stacking; conditionals; circular prev/next; clipboard; resume sourcing; `rel` attrs; ⌘K registry/keys/events/ARIA; spy; menu lock/Esc; toTop; metadata/robots/sitemap/favicon; a11y roles/labels/focus/skip/reduce.

---

## 16. Exact File Mapping

| Feature | File | Component | Logic | Design change? |
|---|---|---|---|---|
| Shell/fonts/meta/skip/offset | `app/layout.tsx` | `RootLayout` | font vars, metadata, viewport, `pt-16`+`main#main`, skip | Partial (keep structure/ids/offsets) |
| Tokens/keyframes/utils/scroll/focus | `app/globals.css` | CSS | `@theme`, `.filter-tab/.visual-frame/.row-hover`, reduce guard | Yes (keep class contracts+guard) |
| Home assembly+dividers | `app/page.tsx` | `Home` | order + divider accents | Partial (reorder w/ index+accent fix) |
| Detail route+SEO | `app/projects/[slug]/page.tsx` | `ProjectPage` | static params, metadata, `notFound()` | Partial (keep data flow) |
| 404 | `app/not-found.tsx` | `NotFound` | `/`+`/#projects` links, ⌘K hint | Yes (keep links) |
| Robots/sitemap | `app/robots.ts`, `app/sitemap.ts` | — | allow-all; `/`+5 slugs | No |
| Favicon | `app/icon.svg` | — | App-icon convention | No |
| Navbar+menu+spy | `components/Navbar.tsx` | `Navbar` | rAF scroll, observer, Esc/lock, custom event | Yes (keep heights/ids/ARIA/events) |
| Hero+card+strip | `components/Hero.tsx` | `Hero/HeroVisual` | stagger, reduce, links, constants | Yes (keep copy/links/IDs) |
| About | `components/About.tsx` | `About` | static + pillars + education | Yes |
| Experience | `components/Experience.tsx` | `Experience` | map + `current` tag + badges | Yes |
| Projects+filters+featured | `components/Projects.tsx` | `Projects` | `active`, `visible`, split, counts | Yes (keep semantics/counts/links) |
| Card | `components/ProjectCard.tsx` | `ProjectCard` | stretched-link, `5/+N`, conditionals, `secondarySpan` | Yes (keep stacking/conditionals) |
| Detail template | `components/ProjectDetails.tsx` | `ProjectDetails` | prev/next %, conditionals, note, maps | Yes (keep sections/nav) |
| Previews | `components/ProjectVisual.tsx` | `ProjectVisual/Caption` | `visual`-key switch, static CSS, hidden | Yes (replace freely; keep contract) |
| Skills+filters | `components/Skills.tsx` | `Skills/FilterPill` | toggle, memos, counts | Yes (keep semantics) |
| Achievements | `components/Achievements.tsx` | `Achievements` | map + kickers + conditional link | Yes |
| Contact+copy | `components/Contact.tsx` | `Contact` | `copied`, clipboard+timeout, channels | Yes (keep flow/targets) |
| Footer+top | `components/Footer.tsx` | `Footer` | year, toTop MQ, nav/socials | Yes (keep links) |
| Palette | `components/CommandMenu.tsx` | `CommandMenu` | keys/event/filter/keyboard/router/clipboard | Partial (keep registry/keys/ARIA) |
| Glow | `components/Spotlight.tsx` | `Spotlight` | rAF, guards | Yes (removable, no functional loss) |
| Brand icons | `components/icons.tsx` | `GithubIcon/LinkedinIcon` | `fill currentColor` | Yes (keep names/props) |
| Token | `components/ui/Badge.tsx` | `Badge` | span passthrough | Yes |
| Reveal | `components/ui/Reveal.tsx` | `Reveal` | `whileInView once`, reduce fallback | Partial (tune; keep fallback) |
| Header | `components/ui/SectionHeading.tsx` | `SectionHeading` | index/eyebrow/accent/align | Yes (keep props) |
| Divider | `components/ui/SectionDivider.tsx` | `SectionDivider` | accent maps | Yes |
| Profile/nav | `data/profile.ts` | `profile/navItems` | single source | No (frozen) |
| Projects | `data/projects.ts` | `projects/getProject` | single source, 5+ surfaces | No |
| Experience | `data/experience.ts` | `experience` | single source | No |
| Skills | `data/skills.ts` | `skillCategories` | single source | No |
| Achievements | `data/achievements.ts` | `achievements` | single source | No |
| Types | `types/index.ts` | interfaces | contracts | No (additive only) |
| `cn()` | `lib/utils.ts` | `cn` | truthy join | No |
| Motion hook | `lib/use-safe-reduced-motion.ts` | `useSafeReducedMotion` | SSR-safe store | No |
| Public | `public/*.svg`, `resume.README.md` | — | unused + docs | No |
| Toolchain | `next.config.ts`, `postcss`, `tsconfig`, `eslint`, `package.json` | — | build | No |

---

## 17. Design Handoff Summary

### KEEP EXACTLY

All §3 copy (hero/about/experience/projects/skills/achievements/contact/footer/nav/CTAs/404/palette, stats `8.9/500+/04/05`, counts, hints, hint-data); `data/*.ts` + `types/` (owner-approved edits only); routes/anchors/IDs/slugs/hrefs (6 anchors + 5 slugs + mailto + Drive + social/live URLs incl. 3 intentionally absent); §9 behaviors; assets (`icon.svg`, remote resume, no invented screenshots, unused SVGs untouched); ARIA + motion/coarse guards.

### CAN REDESIGN

All visuals: palette/surfaces/borders, typefaces/scales/weights (`layout.tsx`+`@theme`+components), spacing/containers/grids, radius/shadows/gradients/glows/textures, dividers/kickers/badges/buttons/cards/rows, `ProjectVisual` (or real `public/projects/<slug>.png`), strip treatment, numerals, colophon, 404 decor, overlay aesthetics, motion tuning — preserving §9 + §12.

### DO NOT BREAK

Header/offset set; anchor IDs; `navItems`↔ID coupling; `isHome` guard; stretched-link+z-10; conditionals; `slice` density (re-spec consciously); `data-active`/`aria-pressed`; featured-on-All; skill toggle-off; counts; static params/metadata/`notFound()`/circular prev-next/back-link; clipboard+`aria-live`; `resumeUrl` sourcing; `rel` attrs; ⌘K keys/event/filter/ARIA/routing; menu lock/Esc/`aria-expanded/controls`; safe-motion SSR; global reduce guard; spotlight/coarse guards; toTop branch; SEO set; `lang`, heading order; build checks; server/client split; no new required env/API.

### CURRENT DESIGN CHARACTER

Dark developer-editorial single page on near-black `#04060c` with hairline borders and mono micro-labels. Inter carries oversized tight display type; JetBrains Mono marks indices, kickers, badges, counts, captions. Numbered dossier sections (`01–06`) split by accent-tinted gradient hairlines with glowing dots. Dense ledger rows replace cards except the hero identity card, project showcase, and case-study blocks, which use glass, inner highlights, and soft glows. Each section/project owns one accent (sky, emerald, violet, amber, rose, cyan) tinting kickers, dividers, hovers. Previews are disclosed CSS diagrams, not screenshots. Motion is restrained and compositor-friendly — hero stagger, once-only reveals, pulse dots, mobile-only marquee, hover shifts, desktop-only spotlight — all with reduced-motion fallbacks.

### RECOMMENDED FIGMA DELIVERABLES

1. Global styles: tokens (bg/surfaces/text/accents/borders/status), type scales + tracking/leading, spacing grid, containers (`6xl/4xl`), radius/shadows/gradients/glows, grid/dots/noise, button+badge+hairline specs, focus/selection/scrollbar, breakpoints (sm/md/lg + 380px guard).
2. Desktop home (1440 + 1024): header (transparent+scrolled), hero (copy+card+strip), 6 dividers, about, experience, projects (filter+featured+grid), skills (pills+ledger), achievements (3-col), contact (2-col), footer.
3. Mobile home (390 + 320): header + open menu, stacked hero (full CTAs, 2-col stats, marquee), ledgers, scrollable tabs, 1-col cards + 2-col actions, contact/footer stacks + safe-area.
4. Case study (desktop+mobile): header (back link, category, H1, tagline, role·year, Live/GitHub variants incl. empty states), visual+caption, tech, long-form, amber note, features/architecture/implementation/challenges, prev/next.
5. Component states: tabs active/inactive, featured card, standard card (5+`+N`, Live/GitHub both/one/none, year/no-year), counts, hover/focus-within.
6. Overlays: ⌘K (empty/query/no-match), mobile menu, 404.
7. Motion spec: reveal (y/duration/ease/once), hero stagger, dot pulse, marquee timing, card hover, tab underline, navbar transition, spotlight size/intensity, reduced-motion states.
8. Assets: `MV` mark usage, resume link affordances, placeholder-vs-screenshot plan for 5 visuals, icon set (lucide + brand paths).

---

## Verification checklist

- [x] 7 sections + 6 divider accents (`page.tsx`)
- [x] fonts/metadata/viewport/shell/skip (`layout.tsx`)
- [x] static params + metadata + 404 path (`[slug]/page.tsx`)
- [x] 404, robots, sitemap, icon
- [x] 5 projects full fields/URLs/tech/features/arch/eng/challenges/notes
- [x] 16 components + 4 ui primitives (paths/props/interactions)
- [x] `data/*.ts` content transcribed
- [x] `globals.css` tokens/keyframes/utils/guards
- [x] animations, responsive, assets, SEO, a11y, constraints, coupling
- [x] No app files modified — docs only (check `git status`)

*End of audit.*
