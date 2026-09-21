# Mohan Vignesh — Portfolio

Premium dark-mode personal portfolio for **Kola Mohan Vignesh Kumar**, Full Stack AI Engineer.
Built with Next.js (App Router), TypeScript, Tailwind CSS v4, Framer Motion, and Lucide icons.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Verify

```bash
npm run lint
npx tsc --noEmit
npm run build
```

## Configure

- **Availability pill:** edit `availability.label` in `data/profile.ts`.
- **Resume:** save your PDF as `public/resume.pdf` (see `public/resume.README.md`).
  The navbar Resume button and ⌘K menu link to `/resume.pdf`.
- **Projects:** add entries in `data/projects.ts` — cards, filters, and
  `/projects/[slug]` case-study pages update automatically. Illustrative previews
  live in `components/ProjectVisual.tsx`; drop real screenshots in
  `public/projects/<slug>.png` and wire them there.
- **Experience / skills / achievements:** edit `data/experience.ts`,
  `data/skills.ts`, `data/achievements.ts`.
- **Site URL for OG/sitemap:** set `NEXT_PUBLIC_SITE_URL` in production.

## Structure

- `app/` — layout, home page, `projects/[slug]`, 404, sitemap, robots, icon
- `components/` — Navbar, Hero, About, Experience, Projects, Skills,
  Achievements, Contact, Footer, CommandMenu, Spotlight, ProjectDetails
- `components/ui/` — SectionHeading, Reveal, Badge
- `data/` — profile, projects, experience, skills, achievements
- `types/` — shared TypeScript interfaces
- `lib/` — utilities
