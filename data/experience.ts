import type { ExperienceItem } from "@/types";

export const experience: ExperienceItem[] = [
  {
    role: "Gen AI Intern",
    company: "Sariki Technologies",
    period: "Jun 2026 — Present",
    summary:
      "Full-stack Next.js development on FarmTally, plus practical Generative AI features.",
    points: [
      "Contributing to the FarmTally full-stack web application using Next.js — application features and development workflows.",
      "Working with Generative AI and prompt engineering for practical AI-powered product features and application workflows.",
    ],
    tech: ["Next.js", "React", "REST APIs", "Node.js", "Prompt Engineering"],
    current: true,
  },
  {
    role: "MERN Stack Intern",
    company: "Headway Vision",
    period: "Jul 2025 — Mar 2026",
    summary:
      "Full-stack MERN development with JWT, role-based access, Firebase/Firestore — including two Study Abroad projects.",
    points: [
      "Developed MERN applications with JWT authentication, role-based access control, REST APIs, and MongoDB.",
      "Worked with Firebase and Firestore and contributed to two Study Abroad projects across frontend, backend, and database workflows.",
      "Collaborated through Git workflows and code reviews while contributing to live projects.",
    ],
    tech: ["React", "Node.js", "Express.js", "MongoDB", "JWT", "Firebase", "Firestore"],
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
