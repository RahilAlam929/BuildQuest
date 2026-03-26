"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Brain,
  Search,
  Sparkles,
  Target,
  Zap,
  ShieldCheck,
  Lightbulb,
  Filter,
} from "lucide-react";

type Difficulty = "Easy" | "Medium" | "Hard";

type Problem = {
  slug: string;
  title: string;
  category: string;
  difficulty: Difficulty;
  description: string;
  tags: string[];
  featured?: boolean;
};

const problems: Problem[] = [
  {
    slug: "ai-debugging-assistant",
    title: "AI Code Debugging Assistant",
    category: "Developer Tools",
    difficulty: "Hard",
    description:
      "Build a system that analyzes errors, explains root causes, and suggests fixes like a smart debugging assistant.",
    tags: ["AI", "DevTools", "Product"],
    featured: true,
  },
  {
    slug: "github-analyzer",
    title: "Smart GitHub Project Analyzer",
    category: "Portfolio",
    difficulty: "Medium",
    description:
      "Analyze GitHub repositories and suggest improvements for portfolio quality and project presentation.",
    tags: ["GitHub", "Analytics", "Portfolio"],
    featured: true,
  },
  {
    slug: "deep-work-system",
    title: "Deep Work Productivity System",
    category: "SaaS",
    difficulty: "Medium",
    description:
      "Design a tool that helps users track deep work sessions, focus time, and productivity trends.",
    tags: ["Productivity", "Focus", "SaaS"],
  },
  {
    slug: "freelancer-client-tracker",
    title: "Freelancer Client Tracker",
    category: "Business",
    difficulty: "Easy",
    description:
      "Build a simple system to manage clients, track project progress, and monitor payments.",
    tags: ["Freelance", "Dashboard", "CRM"],
  },
  {
    slug: "ai-resume-reviewer",
    title: "AI Resume Reviewer",
    category: "AI Tools",
    difficulty: "Medium",
    description:
      "Create a resume analysis tool that gives useful suggestions for stronger hiring outcomes.",
    tags: ["AI", "Career", "Resume"],
  },
  {
    slug: "student-progress-intelligence",
    title: "Student Progress Intelligence",
    category: "EdTech",
    difficulty: "Hard",
    description:
      "Develop a system that tracks student learning progress and highlights gaps, consistency, and outcomes.",
    tags: ["EdTech", "Tracking", "Analytics"],
  },
];

const difficultyFilters: Array<"All" | Difficulty> = ["All", "Easy", "Medium", "Hard"];

function difficultyStyles(level: Difficulty) {
  if (level === "Easy") {
    return "border-emerald-500/20 bg-emerald-500/10 text-emerald-300";
  }
  if (level === "Medium") {
    return "border-amber-500/20 bg-amber-500/10 text-amber-300";
  }
  return "border-rose-500/20 bg-rose-500/10 text-rose-300";
}

export default function ProblemBankPage() {
  const [query, setQuery] = useState("");
  const [activeDifficulty, setActiveDifficulty] = useState<"All" | Difficulty>("All");

  const filteredProblems = useMemo(() => {
    const q = query.trim().toLowerCase();

    return problems.filter((problem) => {
      const matchesDifficulty =
        activeDifficulty === "All" || problem.difficulty === activeDifficulty;

      const matchesQuery =
        !q ||
        problem.title.toLowerCase().includes(q) ||
        problem.description.toLowerCase().includes(q) ||
        problem.category.toLowerCase().includes(q) ||
        problem.tags.some((tag) => tag.toLowerCase().includes(q));

      return matchesDifficulty && matchesQuery;
    });
  }, [query, activeDifficulty]);

  const featuredProblems = useMemo(
    () => problems.filter((problem) => problem.featured).slice(0, 3),
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

      <div className="mt-6 overflow-hidden rounded-[36px] border border-slate-800/70 bg-slate-950/60 p-6 shadow-[0_0_0_1px_rgba(15,23,42,0.6),0_24px_60px_rgba(2,6,23,0.46)] sm:p-8">
        {/* Hero */}
        <section className="relative overflow-hidden rounded-[32px] border border-slate-800/70 bg-slate-950/70 p-6 sm:p-8">
          <div className="pointer-events-none absolute -left-16 top-8 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="pointer-events-none absolute right-0 top-0 h-44 w-44 rounded-full bg-fuchsia-500/10 blur-3xl" />

          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full border border-fuchsia-500/20 bg-fuchsia-500/10 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-fuchsia-300">
              <Sparkles className="h-4 w-4" />
              Problem Bank
            </div>

            <div className="mt-4 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <div>
                <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl">
                  Real-world problems worth building for
                </h1>
                <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-400 sm:text-base">
                  Explore practical, high-signal challenges designed for developers,
                  builders, and startup-minded creators. Use these to practice product
                  thinking, build useful solutions, and ship stronger projects.
                </p>
              </div>

              <div className="rounded-[28px] border border-slate-800/70 bg-slate-900/35 p-5">
                <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-cyan-300">
                  <Brain className="h-4 w-4" />
                  AI Builder Hint
                </div>

                <div className="mt-5 space-y-3">
                  <QuickHint
                    icon={<Lightbulb className="h-4 w-4" />}
                    title="Best for portfolios"
                    text="Choose medium or hard problems with product-like output."
                  />
                  <QuickHint
                    icon={<ShieldCheck className="h-4 w-4" />}
                    title="Best for hackathons"
                    text="Pick problems that can show a demo within a short time."
                  />
                  <QuickHint
                    icon={<Zap className="h-4 w-4" />}
                    title="Best for quick builds"
                    text="Easy problems are ideal for fast MVP shipping."
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Search + filter */}
        <section className="mt-8 rounded-[28px] border border-slate-800/70 bg-slate-900/35 p-5 sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-white">
                Search and filter problems
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Find the right problem by title, category, description, or tag.
              </p>
            </div>

            <div className="relative w-full max-w-xl">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search AI, portfolio, dashboard, productivity..."
                className="h-[52px] w-full rounded-2xl border border-slate-800 bg-slate-950/55 py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400"
              />
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-950/55 px-4 py-2 text-sm text-slate-300">
              <Filter className="h-4 w-4" />
              Difficulty
            </div>

            {difficultyFilters.map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => setActiveDifficulty(level)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  activeDifficulty === level
                    ? "bg-gradient-to-r from-sky-500 via-cyan-500 to-violet-500 text-white"
                    : "border border-slate-700 bg-slate-950/55 text-slate-300 hover:border-cyan-400 hover:text-cyan-300"
                }`}
              >
                {level}
              </button>
            ))}
          </div>

          <div className="mt-5 text-sm text-slate-400">
            Showing <span className="font-semibold text-white">{filteredProblems.length}</span>{" "}
            problem{filteredProblems.length !== 1 ? "s" : ""}
          </div>
        </section>

        {/* Featured */}
        <section className="mt-8">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-cyan-300" />
            <h2 className="text-2xl font-semibold text-white">Featured problems</h2>
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-3">
            {featuredProblems.map((problem) => (
              <Link
                key={problem.slug}
                href={`/problem/${problem.slug}`}
                className="group rounded-[28px] border border-slate-800/70 bg-slate-900/35 p-5 transition hover:border-cyan-400/30 hover:bg-slate-900/55"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-cyan-300">
                    Featured
                  </span>

                  <span
                    className={`rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.16em] ${difficultyStyles(
                      problem.difficulty
                    )}`}
                  >
                    {problem.difficulty}
                  </span>
                </div>

                <h3 className="mt-4 text-lg font-semibold text-white">
                  {problem.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  {problem.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {problem.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-slate-700 bg-slate-950/60 px-3 py-1 text-[11px] text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-cyan-300 transition group-hover:text-sky-300">
                  Solve Problem
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Problem explorer */}
        <section className="mt-8">
          <div className="flex items-center gap-2">
            <Target className="h-5 w-5 text-violet-300" />
            <h2 className="text-2xl font-semibold text-white">Problem explorer</h2>
          </div>

          {filteredProblems.length === 0 ? (
            <div className="mt-5 rounded-[28px] border border-dashed border-slate-700 bg-slate-950/35 p-10 text-center">
              <div className="text-lg font-semibold text-white">No problems found</div>
              <p className="mt-2 text-sm text-slate-400">
                Try a different search keyword or difficulty filter.
              </p>
            </div>
          ) : (
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {filteredProblems.map((problem) => (
                <div
                  key={problem.slug}
                  className="rounded-[28px] border border-slate-800/70 bg-slate-900/35 p-5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        {problem.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-slate-400">
                        {problem.description}
                      </p>
                    </div>

                    <span
                      className={`shrink-0 rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.16em] ${difficultyStyles(
                        problem.difficulty
                      )}`}
                    >
                      {problem.difficulty}
                    </span>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-cyan-300">
                      {problem.category}
                    </span>

                    {problem.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-slate-700 bg-slate-950/60 px-3 py-1 text-[11px] text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 flex items-center justify-between gap-3">
                    <div className="text-xs uppercase tracking-[0.16em] text-slate-500">
                      Build a solution
                    </div>

                    <Link
                      href={`/problem/${problem.slug}`}
                      className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-950/60 px-4 py-2 text-sm font-medium text-cyan-300 transition hover:border-cyan-400 hover:text-sky-300"
                    >
                      Solve Problem
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Workflow */}
        <section className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Understand the problem",
              text: "Read the pain point, user need, and expected output clearly before building.",
            },
            {
              title: "Design the solution",
              text: "Think product-first: workflow, user journey, core features, and what matters most.",
            },
            {
              title: "Build and submit",
              text: "Ship a focused MVP, attach proof, and submit a strong summary with clear execution.",
            },
          ].map((step, index) => (
            <div
              key={step.title}
              className="rounded-[28px] border border-slate-800/70 bg-slate-900/35 p-5"
            >
              <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-cyan-500/10 text-sm font-semibold text-cyan-300">
                {index + 1}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-white">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">{step.text}</p>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}

function QuickHint({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-800/70 bg-slate-950/50 p-4">
      <div className="flex items-center gap-2 text-cyan-300">
        {icon}
        <span className="text-xs uppercase tracking-[0.16em]">{title}</span>
      </div>
      <p className="mt-2 text-sm leading-6 text-slate-300">{text}</p>
    </div>
  );
}