import type { SkillCategory } from "@/types";

export const skillCategories: SkillCategory[] = [
  {
    id: "ai",
    label: "AI & Generative AI",
    description: "Applied LLM and retrieval systems",
    skills: [
      "Generative AI",
      "LLMs",
      "RAG",
      "Embeddings",
      "Semantic Search",
      "Vector Search",
      "Prompt Engineering",
      "Document Processing",
      "Hugging Face",
      "Groq API",
      "Llama 3.1",
    ],
  },
  {
    id: "frontend",
    label: "Frontend Development",
    description: "Web and mobile interfaces",
    skills: ["React.js", "Next.js", "React Native", "Redux", "Tailwind CSS", "Bootstrap"],
  },
  {
    id: "backend",
    label: "Backend & APIs",
    description: "Services, auth, and access control",
    skills: ["Node.js", "Express.js", "REST APIs", "JWT", "Role-Based Access Control"],
  },
  {
    id: "databases",
    label: "Databases",
    description: "Operational and vector storage",
    skills: ["MongoDB", "MongoDB Atlas Vector Search", "PostgreSQL", "Firebase Firestore"],
  },
  {
    id: "devops",
    label: "DevOps & Tools",
    description: "Shipping and collaboration",
    skills: ["Docker", "Jenkins", "CI/CD", "Vercel", "Railway", "Git", "GitHub", "Postman"],
  },
  {
    id: "languages",
    label: "Programming Languages",
    description: "Daily drivers",
    skills: ["C++", "JavaScript", "Python"],
  },
  {
    id: "core",
    label: "Core Computer Science",
    description: "Foundations",
    skills: [
      "Data Structures & Algorithms",
      "DBMS",
      "OOP",
      "Computer Networks",
      "LLD",
      "API Design",
    ],
  },
];
