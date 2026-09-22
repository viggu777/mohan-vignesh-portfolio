import type { Profile, NavItem } from "@/types";

export const profile: Profile = {
  name: "Kola Mohan Vignesh Kumar",
  firstName: "Mohan Vignesh",
  monogram: "MV",
  role: "Full Stack AI Engineer | Generative AI Developer",
  headline: "Building Intelligent Products with AI & Code.",
  summary:
    "Full Stack AI Engineer working across Generative AI, RAG, and production MERN applications — from embeddings and retrieval pipelines to deployed frontends, APIs, and databases.",
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
    // Configurable status pill. Keep factual — currently interning.
    // Change this string anytime, e.g. "Open to Summer 2027 internships".
    label: "Gen AI Intern @ Sariki Technologies",
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
