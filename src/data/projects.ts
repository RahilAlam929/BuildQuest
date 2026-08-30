export type ProjectDifficulty = "Beginner" | "Intermediate" | "Advanced";

export type ProjectIdea = {
  id: string;
  title: string;
  description: string;
  category: "AI" | "Web" | "Mobile" | "SaaS" | "Cloud" | "Robotics";
  difficulty: ProjectDifficulty;
  time: string;
  stack: string[];
  featured?: boolean;
};

export const projectIdeas: ProjectIdea[] = [
  {
    id: "ai-resume-analyzer",
    title: "AI Resume Analyzer",
    description:
      "Build an AI tool that analyzes resumes, identifies missing skills, and suggests improvements.",
    category: "AI",
    difficulty: "Intermediate",
    time: "8–12 Hours",
    stack: ["Next.js", "TypeScript", "AI", "Supabase"],
    featured: true,
  },
  {
    id: "realtime-chat",
    title: "Real-time Chat App",
    description:
      "Create a modern real-time messaging platform with authentication and online presence.",
    category: "Web",
    difficulty: "Beginner",
    time: "4–6 Hours",
    stack: ["Next.js", "TypeScript", "Supabase"],
    featured: true,
  },
  {
    id: "ai-study-copilot",
    title: "AI Study Copilot",
    description:
      "Create an AI assistant that turns notes into summaries, quizzes, flashcards, and study plans.",
    category: "AI",
    difficulty: "Advanced",
    time: "12–20 Hours",
    stack: ["Next.js", "Python", "FastAPI", "AI"],
    featured: true,
  },
  {
    id: "developer-dashboard",
    title: "Developer Dashboard",
    description:
      "Build a personal dashboard for GitHub activity, projects, learning progress, and coding goals.",
    category: "SaaS",
    difficulty: "Intermediate",
    time: "8–12 Hours",
    stack: ["Next.js", "Tailwind", "PostgreSQL"],
  },
  {
    id: "cloud-monitor",
    title: "Cloud Resource Monitor",
    description:
      "Build a dashboard that monitors cloud resources, uptime, usage, and deployment status.",
    category: "Cloud",
    difficulty: "Advanced",
    time: "15–25 Hours",
    stack: ["Next.js", "Node.js", "Docker", "AWS"],
  },
  {
    id: "robot-control",
    title: "Remote Robot Control Panel",
    description:
      "Create a web interface for controlling and monitoring a connected robotics project.",
    category: "Robotics",
    difficulty: "Advanced",
    time: "15–30 Hours",
    stack: ["React", "Python", "MQTT", "IoT"],
  },
];
