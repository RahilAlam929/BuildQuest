"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  Brain,
  Code2,
  Cpu,
  Database,
  Globe,
  Layers3,
  Search,
  Server,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Wrench,
} from "lucide-react";

type Category =
  | "All"
  | "Frontend"
  | "Full Stack"
  | "Data Science"
  | "AI / ML"
  | "Cybersecurity"
  | "Mobile"
  | "IoT / Robotics"
  | "DevOps / Cloud";

type Level = "All" | "Beginner" | "Intermediate" | "Advanced";

type Skill =
  | "All"
  | "UI/UX"
  | "APIs"
  | "Auth"
  | "Dashboards"
  | "ML"
  | "Data Analysis"
  | "Automation"
  | "Security"
  | "Mobile UI"
  | "Sensors"
  | "Deployment";

type ProjectIdea = {
  slug: string;
  title: string;
  category: Exclude<Category, "All">;
  level: Exclude<Level, "All">;
  description: string;
  skills: string[];
  stack: string[];
  resource: string;
  featured?: boolean;
};

const categories: Category[] = [
  "All",
  "Frontend",
  "Full Stack",
  "Data Science",
  "AI / ML",
  "Cybersecurity",
  "Mobile",
  "IoT / Robotics",
  "DevOps / Cloud",
];

const levels: Level[] = ["All", "Beginner", "Intermediate", "Advanced"];

const skills: Skill[] = [
  "All",
  "UI/UX",
  "APIs",
  "Auth",
  "Dashboards",
  "ML",
  "Data Analysis",
  "Automation",
  "Security",
  "Mobile UI",
  "Sensors",
  "Deployment",
];

const projectIdeas: ProjectIdea[] = [
  {
    slug: "personal-portfolio-2",
    title: "Personal Portfolio 2.0",
    category: "Frontend",
    level: "Beginner",
    description:
      "Build a clean portfolio with sections, animations, responsive design, and polished project cards.",
    skills: ["UI/UX"],
    stack: ["Next.js", "Tailwind CSS", "Framer Motion"],
    resource: "https://vercel.com/templates/portfolio",
    featured: true,
  },
  {
    slug: "landing-page-system",
    title: "Product Landing Page System",
    category: "Frontend",
    level: "Beginner",
    description:
      "Create reusable landing page sections for startups, SaaS products, and portfolios.",
    skills: ["UI/UX"],
    stack: ["React", "Tailwind CSS"],
    resource: "https://tailwindcss.com/showcase",
  },
  {
    slug: "student-club-dashboard",
    title: "Student Club Dashboard",
    category: "Frontend",
    level: "Intermediate",
    description:
      "Create a dashboard for events, registrations, teams, and notices with charts and stats.",
    skills: ["Dashboards", "UI/UX"],
    stack: ["React", "Tailwind CSS", "Chart.js"],
    resource: "https://ui.shadcn.com/",
    featured: true,
  },
  {
    slug: "admin-panel-ui",
    title: "Admin Panel UI Kit",
    category: "Frontend",
    level: "Intermediate",
    description:
      "Build a complete admin panel UI with tables, analytics, filters, and reusable components.",
    skills: ["Dashboards", "UI/UX"],
    stack: ["Next.js", "shadcn/ui", "Tailwind CSS"],
    resource: "https://ui.shadcn.com/",
  },
  {
    slug: "weather-dashboard",
    title: "Weather Dashboard",
    category: "Frontend",
    level: "Beginner",
    description:
      "Build a weather app with current data, city search, and clean visual cards.",
    skills: ["APIs", "UI/UX"],
    stack: ["React", "OpenWeather API", "Tailwind CSS"],
    resource: "https://github.com/public-apis/public-apis",
  },
  {
    slug: "job-portal-auth",
    title: "Job Portal with Authentication",
    category: "Full Stack",
    level: "Intermediate",
    description:
      "Build a platform where users sign up, create profiles, and apply to jobs.",
    skills: ["Auth", "APIs"],
    stack: ["Next.js", "MongoDB", "JWT"],
    resource: "https://nextjs.org/learn/dashboard-app",
    featured: true,
  },
  {
    slug: "ecommerce-store",
    title: "E-commerce Store",
    category: "Full Stack",
    level: "Advanced",
    description:
      "Create a complete store with products, cart, checkout, and order management.",
    skills: ["Auth", "APIs"],
    stack: ["Next.js", "MongoDB", "Stripe"],
    resource: "https://vercel.com/templates",
  },
  {
    slug: "task-management-app",
    title: "Task Management App",
    category: "Full Stack",
    level: "Intermediate",
    description:
      "Build a project/task app with boards, deadlines, and user-based access.",
    skills: ["Auth", "Dashboards"],
    stack: ["Next.js", "MongoDB", "Prisma"],
    resource: "https://vercel.com/templates",
  },
  {
    slug: "social-media-mini",
    title: "Mini Social Media App",
    category: "Full Stack",
    level: "Advanced",
    description:
      "Create posts, likes, comments, profiles, and a feed with authentication.",
    skills: ["Auth", "APIs"],
    stack: ["Next.js", "MongoDB", "Cloudinary"],
    resource: "https://nextjs.org/docs/app",
  },
  {
    slug: "expense-tracker-app",
    title: "Expense Tracker App",
    category: "Full Stack",
    level: "Beginner",
    description:
      "Track personal expenses, categories, and monthly usage with simple charts.",
    skills: ["Dashboards"],
    stack: ["React", "Node.js", "MongoDB"],
    resource: "https://vercel.com/templates",
  },
  {
    slug: "student-performance-predictor",
    title: "Student Performance Predictor",
    category: "Data Science",
    level: "Intermediate",
    description:
      "Predict student outcomes and visualize learning patterns using structured data.",
    skills: ["Data Analysis", "ML"],
    stack: ["Python", "Pandas", "Scikit-learn"],
    resource: "https://scikit-learn.org/",
    featured: true,
  },
  {
    slug: "sales-forecast-dashboard",
    title: "Sales Forecasting Dashboard",
    category: "Data Science",
    level: "Advanced",
    description:
      "Use historical sales data to forecast future revenue and display business insights.",
    skills: ["Data Analysis", "ML", "Dashboards"],
    stack: ["Python", "Streamlit", "Prophet"],
    resource: "https://streamlit.io/",
  },
  {
    slug: "movie-recommendation-system",
    title: "Movie Recommendation System",
    category: "Data Science",
    level: "Intermediate",
    description:
      "Suggest movies to users based on ratings, content, or collaborative filtering.",
    skills: ["ML", "Data Analysis"],
    stack: ["Python", "Pandas", "Scikit-learn"],
    resource: "https://scikit-learn.org/",
  },
  {
    slug: "customer-segmentation",
    title: "Customer Segmentation Analysis",
    category: "Data Science",
    level: "Advanced",
    description:
      "Cluster users into different groups based on behavior and purchasing patterns.",
    skills: ["ML", "Data Analysis"],
    stack: ["Python", "Pandas", "Matplotlib"],
    resource: "https://pandas.pydata.org/",
  },
  {
    slug: "ai-resume-reviewer",
    title: "AI Resume Reviewer",
    category: "AI / ML",
    level: "Intermediate",
    description:
      "Review resumes and generate useful suggestions for better hiring outcomes.",
    skills: ["ML"],
    stack: ["OpenAI API", "Next.js", "Node.js"],
    resource: "https://platform.openai.com/docs",
    featured: true,
  },
  {
    slug: "ai-debugging-assistant",
    title: "AI Code Debugging Assistant",
    category: "AI / ML",
    level: "Advanced",
    description:
      "Explain coding errors, suggest fixes, and improve developer debugging workflow.",
    skills: ["ML", "Automation"],
    stack: ["Next.js", "OpenAI API", "MongoDB"],
    resource: "https://platform.openai.com/docs",
  },
  {
    slug: "ai-study-assistant",
    title: "AI Study Assistant",
    category: "AI / ML",
    level: "Intermediate",
    description:
      "Build a study helper that summarizes notes, answers questions, and organizes revision.",
    skills: ["ML", "Automation"],
    stack: ["Next.js", "OpenAI API"],
    resource: "https://platform.openai.com/docs",
  },
  {
    slug: "document-qa-system",
    title: "Document Q&A System",
    category: "AI / ML",
    level: "Advanced",
    description:
      "Upload documents and ask questions from them using embeddings or retrieval-based workflows.",
    skills: ["ML", "Automation"],
    stack: ["Python", "LangChain", "OpenAI API"],
    resource: "https://platform.openai.com/docs",
  },
  {
    slug: "password-strength-analyzer",
    title: "Password Strength Analyzer",
    category: "Cybersecurity",
    level: "Beginner",
    description:
      "Check password quality and explain weaknesses with simple actionable advice.",
    skills: ["Security"],
    stack: ["JavaScript", "React", "Regex"],
    resource: "https://owasp.org/",
  },
  {
    slug: "phishing-email-detector",
    title: "Phishing Email Detector",
    category: "Cybersecurity",
    level: "Advanced",
    description:
      "Detect suspicious emails through pattern analysis and classification rules.",
    skills: ["Security", "ML"],
    stack: ["Python", "Scikit-learn", "Flask"],
    resource: "https://owasp.org/",
  },
  {
    slug: "secure-file-locker",
    title: "Secure File Locker",
    category: "Cybersecurity",
    level: "Intermediate",
    description:
      "Build a secure app for file encryption, upload protection, and access control.",
    skills: ["Security", "Auth"],
    stack: ["Node.js", "MongoDB", "Crypto"],
    resource: "https://owasp.org/",
  },
  {
    slug: "network-scan-visualizer",
    title: "Network Scan Visualizer",
    category: "Cybersecurity",
    level: "Advanced",
    description:
      "Visualize scanned devices, ports, and network structure in a clean dashboard.",
    skills: ["Security", "Dashboards"],
    stack: ["Python", "Flask", "D3.js"],
    resource: "https://owasp.org/",
  },
  {
    slug: "habit-tracker-app",
    title: "Habit Tracker App",
    category: "Mobile",
    level: "Beginner",
    description:
      "Track habits, daily routines, and streaks through a simple mobile app.",
    skills: ["Mobile UI"],
    stack: ["Flutter", "Firebase"],
    resource: "https://flutter.dev/",
  },
  {
    slug: "campus-navigation-app",
    title: "Campus Navigation App",
    category: "Mobile",
    level: "Intermediate",
    description:
      "Help students find classrooms, blocks, and facilities using map-based navigation.",
    skills: ["Mobile UI", "APIs"],
    stack: ["Flutter", "Google Maps API"],
    resource: "https://developers.google.com/maps",
  },
  {
    slug: "medicine-reminder-app",
    title: "Medicine Reminder App",
    category: "Mobile",
    level: "Beginner",
    description:
      "Create an app for reminders, dosage timing, and family medicine tracking.",
    skills: ["Mobile UI"],
    stack: ["Flutter", "Firebase"],
    resource: "https://flutter.dev/",
  },
  {
    slug: "food-delivery-ui",
    title: "Food Delivery App UI",
    category: "Mobile",
    level: "Intermediate",
    description:
      "Build a complete food ordering UI flow with home, restaurant, cart, and tracking screens.",
    skills: ["Mobile UI", "UI/UX"],
    stack: ["Flutter", "Dart"],
    resource: "https://flutter.dev/",
  },
  {
    slug: "smart-dustbin-monitor",
    title: "Smart Dustbin Monitor",
    category: "IoT / Robotics",
    level: "Intermediate",
    description:
      "Track bin levels and send alerts when waste collection is needed.",
    skills: ["Sensors", "Automation"],
    stack: ["Arduino", "ESP32", "Firebase"],
    resource: "https://www.arduino.cc/",
  },
  {
    slug: "delivery-bot",
    title: "Line Following Delivery Bot",
    category: "IoT / Robotics",
    level: "Advanced",
    description:
      "Design a movement-based delivery bot with autonomous control logic.",
    skills: ["Sensors", "Automation"],
    stack: ["Arduino", "C++", "IR Sensors"],
    resource: "https://www.arduino.cc/",
  },
  {
    slug: "home-automation-system",
    title: "Home Automation System",
    category: "IoT / Robotics",
    level: "Intermediate",
    description:
      "Control devices like lights and fans remotely using sensors and mobile triggers.",
    skills: ["Automation", "Sensors"],
    stack: ["ESP32", "Blynk", "Arduino IDE"],
    resource: "https://www.arduino.cc/",
  },
  {
    slug: "smart-attendance-device",
    title: "Smart Attendance Device",
    category: "IoT / Robotics",
    level: "Advanced",
    description:
      "Create an attendance system using RFID, sensors, or face recognition logic.",
    skills: ["Sensors", "Automation"],
    stack: ["Arduino", "Python", "RFID"],
    resource: "https://www.arduino.cc/",
  },
  {
    slug: "ci-cd-pipeline",
    title: "CI/CD Deployment Pipeline",
    category: "DevOps / Cloud",
    level: "Intermediate",
    description:
      "Set up automated testing and deployment for a modern app workflow.",
    skills: ["Deployment", "Automation"],
    stack: ["GitHub Actions", "Docker", "Vercel"],
    resource: "https://docs.github.com/en/actions",
  },
  {
    slug: "microservice-app",
    title: "Containerized Microservice App",
    category: "DevOps / Cloud",
    level: "Advanced",
    description:
      "Split services into separate containers and manage local deployment cleanly.",
    skills: ["Deployment", "Automation"],
    stack: ["Docker", "Node.js", "Nginx"],
    resource: "https://www.docker.com/resources/what-container/",
  },
  {
    slug: "aws-portfolio-deploy",
    title: "Portfolio Deployment on Cloud",
    category: "DevOps / Cloud",
    level: "Beginner",
    description:
      "Learn how to deploy a portfolio or web app with proper hosting and domain setup.",
    skills: ["Deployment"],
    stack: ["Vercel", "AWS", "Domain DNS"],
    resource: "https://vercel.com/docs",
  },
  {
    slug: "monitoring-dashboard",
    title: "Monitoring Dashboard",
    category: "DevOps / Cloud",
    level: "Advanced",
    description:
      "Build a system that tracks uptime, logs, and alerts in one monitoring panel.",
    skills: ["Deployment", "Dashboards"],
    stack: ["Grafana", "Prometheus", "Docker"],
    resource: "https://grafana.com/",
  },
];

function levelClass(level: Exclude<Level, "All">) {
  if (level === "Beginner") {
    return "border-emerald-500/20 bg-emerald-500/10 text-emerald-300";
  }
  if (level === "Intermediate") {
    return "border-amber-500/20 bg-amber-500/10 text-amber-300";
  }
  return "border-rose-500/20 bg-rose-500/10 text-rose-300";
}

function categoryIcon(category: Exclude<Category, "All">) {
  switch (category) {
    case "Frontend":
      return <Code2 className="h-5 w-5" />;
    case "Full Stack":
      return <Layers3 className="h-5 w-5" />;
    case "Data Science":
      return <Database className="h-5 w-5" />;
    case "AI / ML":
      return <Brain className="h-5 w-5" />;
    case "Cybersecurity":
      return <ShieldCheck className="h-5 w-5" />;
    case "Mobile":
      return <Smartphone className="h-5 w-5" />;
    case "IoT / Robotics":
      return <Cpu className="h-5 w-5" />;
    case "DevOps / Cloud":
      return <Server className="h-5 w-5" />;
  }
}

export default function IdeaForgePage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [activeLevel, setActiveLevel] = useState<Level>("All");
  const [activeSkill, setActiveSkill] = useState<Skill>("All");

  const filteredProjects = useMemo(() => {
    const q = query.trim().toLowerCase();

    return projectIdeas.filter((project) => {
      const categoryMatch =
        activeCategory === "All" || project.category === activeCategory;

      const levelMatch = activeLevel === "All" || project.level === activeLevel;

      const skillMatch =
        activeSkill === "All" ||
        project.skills.some((skill) =>
          skill.toLowerCase().includes(activeSkill.toLowerCase())
        );

      const searchMatch =
        !q ||
        project.title.toLowerCase().includes(q) ||
        project.description.toLowerCase().includes(q) ||
        project.category.toLowerCase().includes(q) ||
        project.skills.some((skill) => skill.toLowerCase().includes(q)) ||
        project.stack.some((tech) => tech.toLowerCase().includes(q));

      return categoryMatch && levelMatch && skillMatch && searchMatch;
    });
  }, [query, activeCategory, activeLevel, activeSkill]);

  const featuredProjects = useMemo(
    () => projectIdeas.filter((project) => project.featured).slice(0, 6),
    []
  );

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-4 py-12 text-white">
      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/50 px-4 py-2 text-sm text-slate-300 transition hover:border-cyan-400 hover:text-cyan-300"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </Link>

      <div className="mt-6 rounded-[32px] border border-slate-800/70 bg-slate-950/60 p-6 shadow-[0_0_0_1px_rgba(15,23,42,0.5),0_20px_50px_rgba(2,6,23,0.4)] sm:p-8">
        <section className="rounded-[28px] border border-slate-800/70 bg-slate-900/35 p-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-cyan-300">
            <Sparkles className="h-4 w-4" />
            Idea Forge
          </div>

          <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            Discover projects that match your skill and field
          </h1>

          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-400">
            Filter by category, difficulty, and skill focus. Only matching projects
            will be shown, so users can quickly find what they actually want to build.
          </p>
        </section>

        <section className="mt-8 rounded-[28px] border border-slate-800/70 bg-slate-900/35 p-5 sm:p-6">
          <div className="grid gap-4 lg:grid-cols-4">
            <div className="lg:col-span-2">
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Search
              </label>
              <div className="relative">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search AI, dashboard, auth, mobile, robotics..."
                  className="h-[50px] w-full rounded-2xl border border-slate-800 bg-slate-950/55 py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Category
              </label>
              <select
                value={activeCategory}
                onChange={(e) => setActiveCategory(e.target.value as Category)}
                className="h-[50px] w-full rounded-2xl border border-slate-800 bg-slate-950/55 px-4 text-sm text-white outline-none focus:border-cyan-400"
              >
                {categories.map((category) => (
                  <option key={category} value={category} className="bg-slate-950 text-white">
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Level
              </label>
              <select
                value={activeLevel}
                onChange={(e) => setActiveLevel(e.target.value as Level)}
                className="h-[50px] w-full rounded-2xl border border-slate-800 bg-slate-950/55 px-4 text-sm text-white outline-none focus:border-cyan-400"
              >
                {levels.map((level) => (
                  <option key={level} value={level} className="bg-slate-950 text-white">
                    {level}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Skill Focus
              </label>
              <select
                value={activeSkill}
                onChange={(e) => setActiveSkill(e.target.value as Skill)}
                className="h-[50px] w-full rounded-2xl border border-slate-800 bg-slate-950/55 px-4 text-sm text-white outline-none focus:border-cyan-400"
              >
                {skills.map((skill) => (
                  <option key={skill} value={skill} className="bg-slate-950 text-white">
                    {skill}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4 text-sm text-slate-400">
            Showing <span className="font-semibold text-white">{filteredProjects.length}</span>{" "}
            project{filteredProjects.length !== 1 ? "s" : ""}
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold text-white">Featured project ideas</h2>
          <div className="mt-5 grid gap-4 lg:grid-cols-3">
            {featuredProjects.map((project) => (
              <a
                key={project.slug}
                href={project.resource}
                target="_blank"
                rel="noreferrer"
                className="group rounded-[24px] border border-slate-800/70 bg-slate-900/35 p-5 transition hover:border-cyan-400/30 hover:bg-slate-900/55"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-700 bg-slate-950/60 text-cyan-300">
                    {categoryIcon(project.category)}
                  </div>
                  <span
                    className={`rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.16em] ${levelClass(
                      project.level
                    )}`}
                  >
                    {project.level}
                  </span>
                </div>

                <h3 className="mt-4 text-lg font-semibold text-white">{project.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">{project.description}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {project.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-slate-700 bg-slate-950/60 px-3 py-1 text-[11px] text-slate-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-cyan-300 transition group-hover:text-sky-300">
                  Open Resource
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold text-white">All project ideas</h2>

          {filteredProjects.length === 0 ? (
            <div className="mt-5 rounded-[24px] border border-dashed border-slate-700 bg-slate-950/35 p-10 text-center">
              <div className="text-lg font-semibold text-white">No matching projects found</div>
              <p className="mt-2 text-sm text-slate-400">
                Change the filter or search keyword to explore more ideas.
              </p>
            </div>
          ) : (
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {filteredProjects.map((project) => (
                <div
                  key={project.slug}
                  className="rounded-[24px] border border-slate-800/70 bg-slate-900/35 p-5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-slate-700 bg-slate-950/60 text-cyan-300">
                      {categoryIcon(project.category)}
                    </div>
                    <span
                      className={`rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.16em] ${levelClass(
                        project.level
                      )}`}
                    >
                      {project.level}
                    </span>
                  </div>

                  <h3 className="mt-4 text-lg font-semibold text-white">{project.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{project.description}</p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-cyan-300">
                      {project.category}
                    </span>
                    {project.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full border border-slate-700 bg-slate-950/60 px-3 py-1 text-[11px] text-slate-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5">
                    <div className="text-xs uppercase tracking-[0.16em] text-slate-500">
                      Suggested Stack
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-slate-700 bg-slate-950/60 px-3 py-1 text-[11px] text-slate-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 flex items-center justify-between gap-3">
                    <div className="text-xs uppercase tracking-[0.16em] text-slate-500">
                      Start from resource
                    </div>
                    <a
                      href={project.resource}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-950/60 px-4 py-2 text-sm font-medium text-cyan-300 transition hover:border-cyan-400 hover:text-sky-300"
                    >
                      Open Link
                      <Wrench className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}