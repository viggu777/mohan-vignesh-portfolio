import type { Profile, NavItem } from "@/types";

export const profile: Profile = {
  name: "Kola Mohan Vignesh Kumar",
  firstName: "Mohan Vignesh",
  monogram: "MV",
  role: "Full Stack Developer | MERN · Next.js · React Native",
  headline: "Building Real-World Web & Mobile Apps with MERN & Next.js.",
  summary:
    "CSE undergraduate building real-world web and mobile apps with MERN, Next.js, and React Native — from auth, role-based access, REST APIs and databases to payments, deployment, with practical Generative AI features.",
  location: "Visakhapatnam, India",
  education: {
    degree: "B.Tech in Computer Science and Engineering",
    school: "RGUKT IIIT Srikakulam",
    cgpa: "8.9/10",
    period: "2023 — Apr 2027",
  },
  email: "kmvk777@gmail.com",
  availability: {
    enabled: true,
    dot: true,
    // Configurable status pill. Keep factual — currently interning + open to roles.
    label: "Open to Software Developer Internships",
  },
  // Resume via Google Drive (recommended — see `public/resume.README.md`).
  // 1. Upload the PDF to Drive → Share → "Anyone with the link" (Viewer).
  // 2. Paste the share link below:
  //    https://drive.google.com/file/d/<FILE_ID>/view?usp=sharing
  // 3. For future updates use Drive's "Manage versions" (right-click the file
  //    → Manage versions → Upload new version). The link NEVER changes, so
  //    this file never needs another edit.
  resumeUrl: "https://drive.google.com/file/d/1B8sULopG3tCX3Zi5XQOdsZYetp7PWwHQ/view?usp=sharing",
  socials: {
    github: "https://github.com/viggu777",
    linkedin: "https://linkedin.com/in/kmvk",
    leetcode: "https://leetcode.com/u/viggu777",
    email: "mailto:kmvk777@gmail.com",
  },
};

export const navItems: NavItem[] = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/#about" },
  { label: "Experience", href: "/#experience" },
  { label: "Projects", href: "/#projects" },
  { label: "Skills", href: "/#skills" },
  { label: "Contact", href: "/#contact" },
];
