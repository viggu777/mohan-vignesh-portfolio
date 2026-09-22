export interface NavItem {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
  username?: string;
}

export type ProjectCategory = "AI" | "Full Stack" | "Mobile" | "AI Integration";

export interface ProjectFeature {
  title: string;
  description: string;
}

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  longDescription: string[];
  categoryLabel: string;
  categories: ProjectCategory[];
  tech: string[];
  liveUrl?: string;
  githubUrl?: string;
  /** Omit when unknown — the card/detail page hides it instead of guessing. */
  year?: string;
  role: string;
  visual: "proctoring" | "rag" | "admin" | "academy" | "crm";
  accent: "violet" | "cyan" | "amber" | "rose";
  features: ProjectFeature[];
  architecture: string[];
  engineering: string[];
  challenges: { problem: string; approach: string }[];
  note?: string;
  replaceImageHint: string;
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  location?: string;
  summary: string;
  points: string[];
  tech: string[];
  current?: boolean;
}

export interface SkillCategory {
  id: string;
  label: string;
  description: string;
  skills: string[];
}

export interface Achievement {
  title: string;
  description: string;
  href?: string;
  linkLabel?: string;
  icon: "code" | "trophy" | "users";
}

export interface Profile {
  name: string;
  firstName: string;
  monogram: string;
  role: string;
  headline: string;
  summary: string;
  location: string;
  education: {
    degree: string;
    school: string;
    cgpa: string;
    period: string;
  };
  email: string;
  availability: {
    enabled: boolean;
    dot: boolean;
    /** Edit this string to change the hero status pill. Factual default: current role. */
    label: string;
  };
  resumeUrl: string;
  socials: {
    github: string;
    linkedin: string;
    leetcode: string;
    email: string;
  };
}
