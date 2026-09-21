import type { ExperienceItem } from "@/types";

export const experience: ExperienceItem[] = [
  {
    role: "Gen AI Intern",
    company: "Sariki Technologies",
    period: "Jun 2026 — Present",
    summary:
      "Generative AI applications and AI-powered product features, integrating LLM capabilities with application backends.",
    points: [
      "Work on Generative AI applications and AI-powered product features involving LLM-based workflows and AI engineering.",
      "Integrate AI capabilities with application backends, focusing on LLM API integration, data processing, prompting, and reliable application behavior.",
    ],
    tech: ["Generative AI", "LLMs", "Prompt Engineering", "REST APIs", "Node.js"],
    current: true,
  },
  {
    role: "MERN Stack Intern",
    company: "Headway Vision",
    period: "Jul 2025 — Mar 2026",
    summary:
      "Full-stack MERN development on SaaS products with authentication, role-based access, and deployment support.",
    points: [
      "Developed MERN applications with JWT authentication, RBAC, REST APIs, and MongoDB.",
      "Built backend services with validation and error handling; supported Docker and Jenkins CI/CD deployments.",
      "Collaborated through Git workflows and code reviews while contributing to SaaS products.",
    ],
    tech: ["React", "Node.js", "Express.js", "MongoDB", "JWT", "Docker", "Jenkins", "Linux"],
  },
  {
    role: "Associate Web Developer",
    company: "Students Gymkhana Center",
    period: "Mar 2024 — Mar 2025",
    summary:
      "Campus web development — built and maintained internal web applications with the student gymkhana team.",
    points: [
      "Built and maintained internal web applications using React and Node.js.",
      "Integrated backend APIs and enhanced UI/UX through team collaboration.",
    ],
    tech: ["React", "Node.js", "REST APIs"],
  },
];
