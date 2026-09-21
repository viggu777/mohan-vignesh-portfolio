import type { Project } from "@/types";

export const projects: Project[] = [
  {
    slug: "cse-placement-training",
    name: "CSE Placement Training",
    tagline: "Live proctored examination platform used by my college",
    description:
      "Exam scheduling, automated grading, rankings and percentile analytics for up to 300 concurrent students — with webcam proctoring, Trust Score violation tracking, and resilient exam recovery.",
    longDescription: [
      "A deployed CSE placement-training platform used by my college for training and assessments. It handles exam scheduling, randomized questions, server-controlled timers, auto-save, automatic submission on expiry, crash recovery, and JSON bulk question import.",
      "The proctoring layer combines webcam face detection, gaze tracking, fullscreen and tab monitoring, suspicious-action detection, and a Trust Score that aggregates violations for review.",
      "I also integrated Llama 3.1 8B Instant through the Groq API for semantic answer evaluation with partial marking and a manual-review fallback. That AI evaluation path was later removed from production due to API and deployment constraints — the rule-based grading, rankings, and percentile analytics remain live.",
    ],
    categoryLabel: "Full Stack · AI Evaluation · Proctoring",
    categories: ["AI", "Full Stack"],
    tech: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Firebase",
      "JWT",
      "WebGazer",
      "face-api.js",
      "Groq",
      "Llama 3.1",
      "Vercel",
      "Railway",
    ],
    liveUrl: "https://cse-placements-training.vercel.app",
    year: "2025",
    role: "Design, frontend, backend, proctoring & deployment",
    visual: "proctoring",
    accent: "violet",
    features: [
      {
        title: "Exam engine",
        description:
          "Scheduling, randomized questions, server-controlled timers, auto-save, deadline handling, crash recovery, and bulk JSON question import.",
      },
      {
        title: "Webcam proctoring",
        description:
          "Face detection, gaze tracking, fullscreen/tab monitoring, suspicious-action detection, and Trust Score–based violation tracking.",
      },
      {
        title: "Grading & analytics",
        description:
          "Automated grading with rankings and percentile analytics. Semantic evaluation with Llama 3.1 via Groq (partial marking + manual-review fallback) — since removed from production.",
      },
      {
        title: "Access control",
        description:
          "JWT authentication with role-based workflows for admins, coordinators, and students.",
      },
    ],
    architecture: [
      "React frontend on Vercel; Node.js + Express API on Railway; MongoDB for exams, questions, attempts, and results; Firebase for auth/session support.",
      "Server is the source of truth for timers and submission deadlines — clients auto-save and recover after crashes or reloads.",
      "Proctoring runs on-device (WebGazer + face-api.js) and streams violation events to the backend, where a Trust Score aggregates them per attempt.",
      "Groq / Llama 3.1 evaluation ran as an isolated service path with manual-review fallback so grading never blocked on the LLM.",
    ],
    engineering: [
      "Randomized question delivery to reduce leakage across concurrent sessions.",
      "Auto-save with deadline-aware auto-submission on time expiry.",
      "Bulk question import via JSON for fast exam setup by coordinators.",
      "Role-scoped APIs so students, coordinators, and admins only see their workflows.",
    ],
    challenges: [
      {
        problem: "300 concurrent students during training and assessments.",
        approach:
          "Kept timers and grading server-side, minimized payload sizes, and made the client resilient to reloads so spikes degrade gracefully instead of losing attempts.",
      },
      {
        problem: "Cheating signals are noisy (lighting, movement, tab changes).",
        approach:
          "Combined multiple weak signals — face presence, gaze, fullscreen, tab visibility — into a single Trust Score for human review instead of hard auto-fail.",
      },
      {
        problem: "LLM evaluation depended on external API availability.",
        approach:
          "Wrapped semantic grading with partial marking plus manual-review fallback, then removed it from production when API and deployment constraints made it unreliable.",
      },
    ],
    note: "AI semantic evaluation (Llama 3.1 via Groq) is no longer in production. Live site reflects the stable rule-based grading path.",
    replaceImageHint:
      "Illustrative preview — replace with a real screenshot by adding `public/projects/cse-placement-training.png` and wiring it into ProjectVisual.",
  },
  {
    slug: "studymate",
    name: "StudyMate",
    tagline: "Student productivity app with a RAG study assistant",
    description:
      "Cross-platform React Native app with Pomodoro, timetable, SGPA and study workflows — plus a RAG assistant that answers questions over the student's own PDFs.",
    longDescription: [
      "A cross-platform student productivity and learning app built with React Native (Expo), Firebase Authentication, Node.js, Express.js, and MongoDB Atlas.",
      "Beyond Pomodoro, timetable, SGPA, and study workflows, the core AI feature is a RAG-based study assistant for PDF question answering: document ingestion, text extraction, chunking, embeddings, MongoDB Atlas Vector Search, semantic retrieval, and Hugging Face LLM generation.",
      "Retrieval is user-isolated, so each student's questions are answered only from their own documents.",
    ],
    categoryLabel: "Mobile · RAG · Vector Search",
    categories: ["AI", "Mobile", "Full Stack"],
    tech: [
      "React Native",
      "Expo",
      "Node.js",
      "Express.js",
      "MongoDB Atlas",
      "Firebase",
      "RAG",
      "Hugging Face",
    ],
    githubUrl: "https://github.com/viggu777/StudyMate-App",
    year: "2025",
    role: "Mobile app, backend, RAG pipeline & vector search",
    visual: "rag",
    accent: "cyan",
    features: [
      {
        title: "Study workflows",
        description:
          "Pomodoro timer, timetable, SGPA calculator, and focused study flows in one cross-platform app.",
      },
      {
        title: "PDF Q&A assistant",
        description:
          "Ask questions over uploaded PDFs with grounded, retrieval-based answers instead of generic chat.",
      },
      {
        title: "RAG pipeline",
        description:
          "Document ingestion, text extraction, chunking, embeddings, Atlas Vector Search retrieval, and Hugging Face generation.",
      },
      {
        title: "User-isolated retrieval",
        description:
          "Vector search is scoped per user so documents never leak across accounts.",
      },
    ],
    architecture: [
      "Expo (React Native) client with Firebase Auth; Express API handling uploads, chunking, and Q&A orchestration.",
      "Ingestion: PDF → text extraction → chunking → embeddings → MongoDB Atlas with Vector Search index.",
      "Query: embed question → semantic retrieval (user-scoped) → grounded generation with Hugging Face LLM.",
      "MongoDB Atlas stores both app data (timetable, sessions, SGPA) and vectorized document chunks.",
    ],
    engineering: [
      "Chunking tuned for study PDFs so answers cite coherent passages rather than fragments.",
      "User-scoped vector filters on every retrieval call.",
      "Separation of productivity data and RAG data paths for clearer access control.",
    ],
    challenges: [
      {
        problem: "Study PDFs vary in layout and text quality.",
        approach:
          "Normalized extracted text before chunking so headings, lists, and broken line-breaks don't poison embeddings.",
      },
      {
        problem: "Keeping answers grounded, not hallucinated.",
        approach:
          "Constrained generation to retrieved passages and surfaced the retrieval step so failures are debuggable.",
      },
      {
        problem: "Mobile + backend auth consistency.",
        approach:
          "Used Firebase Auth tokens end-to-end so the API can enforce per-user document isolation.",
      },
    ],
    replaceImageHint:
      "Illustrative preview — replace with a real screenshot by adding `public/projects/studymate.png` and wiring it into ProjectVisual.",
  },
  {
    slug: "tea-mahall",
    name: "Tea Mahall",
    tagline: "Admin-based tea franchise application",
    description:
      "Franchise management with an authenticated admin dashboard, role-based CRUD, real-time state, Razorpay payments, transactional email, and automated invoice PDFs.",
    longDescription: [
      "An admin-based tea franchise application with customer-facing pages and a full management dashboard: products, orders, and franchise workflows with authentication and role-based CRUD.",
      "Payments run through Razorpay, transactional email through Nodemailer, and invoicing through server-side PDF generation — with real-time state management across the dashboard.",
    ],
    categoryLabel: "Full Stack · Admin Dashboard · Payments",
    categories: ["Full Stack"],
    tech: ["MERN", "Clerk", "Razorpay", "Nodemailer", "MongoDB", "Express.js", "React", "Node.js"],
    liveUrl: "https://teamahall.netlify.app",
    githubUrl: "https://github.com/viggu777/tea-mahall",
    year: "2025",
    role: "Full-stack build, auth, payments & invoicing",
    visual: "admin",
    accent: "amber",
    features: [
      {
        title: "Admin dashboard",
        description:
          "Authentication with role-based CRUD for products, orders, and franchise operations.",
      },
      {
        title: "Franchise workflows",
        description:
          "Structured management flows with real-time state updates across the dashboard.",
      },
      {
        title: "Payments",
        description: "Razorpay integration for secure checkout and transaction handling.",
      },
      {
        title: "Email + invoicing",
        description:
          "Nodemailer transactional emails with server-side automated invoice PDF generation.",
      },
    ],
    architecture: [
      "MERN stack: React dashboard + customer pages, Express API, MongoDB for catalog, orders, and users.",
      "Clerk for authentication with role-based access control on admin operations.",
      "Razorpay for payments; Nodemailer for order and franchise email workflows; server modules render invoice PDFs.",
    ],
    engineering: [
      "Role-guarded CRUD so franchise staff only access their operations.",
      "Real-time dashboard state for orders and inventory changes.",
      "Server-side invoice rendering so PDFs are consistent regardless of client.",
    ],
    challenges: [
      {
        problem: "Keeping payments, orders, and emails consistent.",
        approach:
          "Made the backend the authority for transaction state, with email and PDF steps downstream of a confirmed order.",
      },
      {
        problem: "Different roles need different capabilities.",
        approach:
          "Enforced RBAC both in the UI and on the API so role checks can't be bypassed client-side.",
      },
    ],
    replaceImageHint:
      "Illustrative preview — replace with a real screenshot by adding `public/projects/tea-mahall.png` and wiring it into ProjectVisual.",
  },
  {
    slug: "kuchipudi-kala-gurukulam",
    name: "Kuchipudi Kala Gurukulam",
    tagline: "Live classical dance academy platform",
    description:
      "Full-stack MERN platform with JWT authentication and role-based access, Cloudinary-backed media, and Docker + Jenkins deployment on a Linux server.",
    longDescription: [
      "A live full-stack MERN application for Kuchipudi Kala Gurukulam, a classical dance academy, with JWT authentication and role-based access control across the platform.",
      "Media assets are stored and delivered through Cloudinary, and the system is deployed on a Linux server with Docker containerization and a Jenkins CI/CD pipeline.",
    ],
    categoryLabel: "Full Stack · DevOps · CI/CD",
    categories: ["Full Stack"],
    tech: [
      "MongoDB",
      "Express.js",
      "React",
      "Node.js",
      "JWT",
      "Cloudinary",
      "Docker",
      "Jenkins",
      "Linux",
    ],
    githubUrl: "https://github.com/Sampradayam/ksg-platform",
    // Year and live URL not provided — add them when confirmed.
    role: "Full-stack build, auth & DevOps",
    visual: "academy",
    accent: "rose",
    features: [
      {
        title: "Authentication & RBAC",
        description:
          "JWT authentication with role-based access control guarding academy workflows.",
      },
      {
        title: "Media via Cloudinary",
        description:
          "Cloudinary-backed storage and delivery for academy media assets.",
      },
      {
        title: "Containerized deployment",
        description:
          "Docker containerization on a Linux server for consistent, reproducible deploys.",
      },
      {
        title: "CI/CD pipeline",
        description:
          "Jenkins pipeline automating build and delivery instead of manual deploys.",
      },
    ],
    architecture: [
      "MERN stack: React frontend, Express API, MongoDB for academy data and users.",
      "JWT-based auth with role-scoped routes enforced on the API, not just the UI.",
      "Cloudinary for media upload, storage, and delivery.",
      "Docker images running on a Linux server; Jenkins CI/CD automates the path from commit to deploy.",
    ],
    engineering: [
      "Role-guarded routes so each role only reaches its own workflows.",
      "Containerized services so staging and production behave identically.",
      "Pipeline-driven delivery to remove manual, error-prone deploy steps.",
    ],
    challenges: [
      {
        problem: "Keeping server environments consistent across deploys.",
        approach:
          "Containerized the services with Docker so the app runs the same way everywhere.",
      },
      {
        problem: "Manual deployments are slow and risky.",
        approach:
          "Built a Jenkins CI/CD pipeline so commits flow to the server through an automated, repeatable path.",
      },
    ],
    replaceImageHint:
      "Illustrative preview — replace with a real screenshot by adding `public/projects/kuchipudi-kala-gurukulam.png` and wiring it into ProjectVisual.",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
