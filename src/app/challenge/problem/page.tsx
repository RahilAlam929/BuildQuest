"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  X,
  CalendarDays,
  Trophy,
  Zap,
  Layers3,
  Code2,
  Github,
  CheckCircle2,
  ArrowRight,
  Brain,
} from "lucide-react";

type ProblemType =
  | "hackathon"
  | "ideathon"
  | "weekly-debugging"
  | "weekly-github";

type ProblemConfig = {
  badge: string;
  title: string;
  accentTitle: string;
  accentBorder: string;
  accentBg: string;
  heroLabel: string;
  shortIntro: string;
  paragraphs: string[];
  quickStats: {
    label: string;
    value: string;
    color: string;
    icon: React.ReactNode;
  }[];
  deliverables: string[];
  solutionPoints: string[];
  featurePoints: string[];
  evaluationPoints: string[];
  footerNote?: string;
};

const problemData: Record<ProblemType, ProblemConfig> = {
  hackathon: {
    badge: "Hackathon Brief",
    title: "Developer Progress Tracker",
    accentTitle: "text-sky-300",
    accentBorder: "border-sky-500/20",
    accentBg: "bg-sky-500/5",
    heroLabel: "BuildQuest Hackathon",
    shortIntro:
      "Build a product that helps developers track skills, project execution, GitHub activity, and overall growth in one place.",
    paragraphs: [
      "Many students and beginner developers learn through tutorials, projects, and practice, but they often do not have a structured way to measure real progress.",
      "As a result, they stay busy without knowing whether their skills are improving, whether their projects are becoming stronger, or whether they are actually becoming job-ready.",
      "Your challenge is to design and build a product that gives developers a clear view of their progress, their activity, and the gaps they need to close.",
    ],
    quickStats: [
      {
        label: "Format",
        value: "Working product / dashboard",
        color: "text-sky-300",
        icon: <Layers3 className="h-4 w-4" />,
      },
      {
        label: "Focus",
        value: "Skills, projects, growth",
        color: "text-fuchsia-300",
        icon: <Zap className="h-4 w-4" />,
      },
      {
        label: "Timeline",
        value: "Event-based challenge",
        color: "text-emerald-300",
        icon: <CalendarDays className="h-4 w-4" />,
      },
      {
        label: "Outcome",
        value: "Visible progress system",
        color: "text-amber-300",
        icon: <Trophy className="h-4 w-4" />,
      },
    ],
    deliverables: [
      "Working MVP or prototype",
      "Short explanation of the workflow",
      "Demo link or video",
      "GitHub repository if available",
    ],
    solutionPoints: [
      "Track project activity and milestones clearly",
      "Show measurable progress over time",
      "Help users understand skill gaps and growth areas",
      "Make progress easy to review and improve",
    ],
    featurePoints: [
      "Project milestone tracker",
      "Skill progress dashboard",
      "GitHub activity layer",
      "Readiness score",
      "Weekly growth summary",
    ],
    evaluationPoints: [
      "Problem understanding",
      "Usefulness of the workflow",
      "UI and product clarity",
      "Execution quality",
      "Overall polish",
    ],
    footerNote:
      "Focus on making progress measurable, clear, and motivating.",
  },

  ideathon: {
    badge: "Ideathon Brief",
    title: "Personal Data Ownership",
    accentTitle: "text-fuchsia-300",
    accentBorder: "border-fuchsia-500/20",
    accentBg: "bg-fuchsia-500/5",
    heroLabel: "BuildQuest Ideathon",
    shortIntro:
      "Design a system where users own their personal data, control access to it, and benefit from transparent permission-based sharing.",
    paragraphs: [
      "Users generate massive amounts of personal data online, but they usually do not truly own, control, or benefit from it.",
      "Companies collect, analyze, and monetize this data while users remain unaware of how it is being used and what value is being extracted.",
      "Your challenge is to rethink this system and design a model where users gain visibility, control, and meaningful ownership over their digital data.",
    ],
    quickStats: [
      {
        label: "Format",
        value: "Idea / framework / concept",
        color: "text-sky-300",
        icon: <Layers3 className="h-4 w-4" />,
      },
      {
        label: "Focus",
        value: "Privacy, ownership, consent",
        color: "text-fuchsia-300",
        icon: <Brain className="h-4 w-4" />,
      },
      {
        label: "Timeline",
        value: "Event-based challenge",
        color: "text-emerald-300",
        icon: <CalendarDays className="h-4 w-4" />,
      },
      {
        label: "Outcome",
        value: "User-first system design",
        color: "text-amber-300",
        icon: <Trophy className="h-4 w-4" />,
      },
    ],
    deliverables: [
      "Strong concept or prototype",
      "Clear problem-solution explanation",
      "Flow or framework diagram",
      "Pitch deck or doc if available",
    ],
    solutionPoints: [
      "Give users visibility into collected data",
      "Enable permission-based access control",
      "Allow easy revocation and transparency",
      "Create a fairer user-benefit model",
    ],
    featurePoints: [
      "Consent dashboard",
      "Data access history",
      "Sharing permissions",
      "Transparent usage logs",
      "Value / reward layer",
    ],
    evaluationPoints: [
      "Originality",
      "Problem clarity",
      "User trust design",
      "System thinking",
      "Presentation quality",
    ],
    footerNote:
      "Think beyond privacy settings — design real ownership and control.",
  },

  "weekly-debugging": {
    badge: "Weekly Challenge Brief",
    title: "AI Code Debugging Assistant",
    accentTitle: "text-cyan-300",
    accentBorder: "border-cyan-500/20",
    accentBg: "bg-cyan-500/5",
    heroLabel: "Challenge of the Week",
    shortIntro:
      "Build an AI-powered tool that helps developers understand errors faster, find root causes, and get practical fix suggestions with clarity.",
    paragraphs: [
      "One of the biggest real problems in the tech world is that developers spend too much time debugging instead of building. Error messages are often unclear, logs are noisy, and stack traces can be difficult to understand, especially for beginners.",
      "As a result, developers lose momentum, switch contexts repeatedly, search random sources for fixes, and often solve issues slowly without really understanding the root cause.",
      "Your challenge is to build a focused product that turns confusion into clarity. The solution should help developers explain errors in simple language, identify likely causes, and provide useful, actionable suggestions to fix the issue faster.",
      "The best solutions will not feel like a generic chatbot. They should feel like a sharp developer tool that saves time, improves understanding, and fits naturally into real debugging workflows.",
    ],
    quickStats: [
      {
        label: "Duration",
        value: "7 day sprint",
        color: "text-cyan-300",
        icon: <CalendarDays className="h-4 w-4" />,
      },
      {
        label: "Problem",
        value: "Slow debugging and unclear errors",
        color: "text-sky-300",
        icon: <Code2 className="h-4 w-4" />,
      },
      {
        label: "Format",
        value: "Web app / extension / tool",
        color: "text-violet-300",
        icon: <Layers3 className="h-4 w-4" />,
      },
      {
        label: "Outcome",
        value: "Faster debugging workflow",
        color: "text-amber-300",
        icon: <Trophy className="h-4 w-4" />,
      },
    ],
    deliverables: [
      "Working MVP, prototype, or usable flow",
      "Error explanation and fix suggestion demo",
      "Demo link or short walkthrough video",
      "Repository link if available",
    ],
    solutionPoints: [
      "Explain why an error happened in simple language",
      "Identify probable root causes from logs or stack traces",
      "Suggest practical fixes or code-level improvements",
      "Help users avoid repeating the same issue",
      "Reduce debugging time and confusion",
    ],
    featurePoints: [
      "Paste error and get explanation instantly",
      "Stack trace breakdown",
      "Beginner-friendly explanation mode",
      "Advanced debugging view",
      "Framework-aware suggestions",
      "Past similar issue matching",
    ],
    evaluationPoints: [
      "Depth of problem understanding",
      "Quality of debugging insight",
      "Practical usefulness",
      "Speed and usability",
      "Execution and polish",
    ],
    footerNote:
      "Focus on clarity, usefulness, and speed. A smaller sharp tool is better than a bloated one.",
  },

  "weekly-github": {
    badge: "Weekly Challenge Brief",
    title: "Smart GitHub Project Analyzer",
    accentTitle: "text-violet-300",
    accentBorder: "border-violet-500/20",
    accentBg: "bg-violet-500/5",
    heroLabel: "Challenge of the Week",
    shortIntro:
      "Build a smart tool that analyzes GitHub repositories and helps developers improve project quality, documentation, and portfolio readiness.",
    paragraphs: [
      "A major problem in the tech world is that many developers build projects but fail to present them properly. Repositories are often incomplete, README files are weak, project structure is unclear, and important details are missing.",
      "Because of this, strong technical work often looks average from the outside. Recruiters, collaborators, and judges cannot quickly understand the value of the project or the quality of execution.",
      "Your challenge is to design a product that reviews a repository or GitHub profile and gives useful, actionable feedback that helps developers improve project clarity, documentation quality, and overall portfolio strength.",
      "The best solutions should help users turn raw code into strong public proof of skill.",
    ],
    quickStats: [
      {
        label: "Duration",
        value: "7 day sprint",
        color: "text-cyan-300",
        icon: <CalendarDays className="h-4 w-4" />,
      },
      {
        label: "Problem",
        value: "Weak GitHub presentation",
        color: "text-sky-300",
        icon: <Github className="h-4 w-4" />,
      },
      {
        label: "Format",
        value: "Analyzer / dashboard / tool",
        color: "text-violet-300",
        icon: <Layers3 className="h-4 w-4" />,
      },
      {
        label: "Outcome",
        value: "Stronger portfolio-ready repos",
        color: "text-amber-300",
        icon: <Trophy className="h-4 w-4" />,
      },
    ],
    deliverables: [
      "Working analyzer or prototype",
      "Repository review flow",
      "Improvement suggestions demo",
      "Demo link and optional GitHub repo",
    ],
    solutionPoints: [
      "Analyze repository quality and presentation",
      "Highlight missing documentation or structure issues",
      "Suggest improvements that increase clarity and trust",
      "Help developers present projects better",
      "Turn GitHub work into stronger portfolio proof",
    ],
    featurePoints: [
      "GitHub profile or repo scan",
      "README quality score",
      "Project completeness score",
      "Missing section detection",
      "Portfolio readiness suggestions",
      "Improvement checklist",
    ],
    evaluationPoints: [
      "Usefulness of analysis",
      "Quality of suggestions",
      "Output clarity",
      "Design and UX",
      "Execution and polish",
    ],
    footerNote:
      "Keep the analysis practical. Users should know exactly what to improve next.",
  },
};

export default function ChallengeProblemPage() {
  const searchParams = useSearchParams();
  const rawType = searchParams.get("type") as ProblemType | null;

  const type: ProblemType =
    rawType && rawType in problemData ? rawType : "hackathon";

  const problem = problemData[type];

  return (
    <main className="mx-auto min-h-screen max-w-5xl px-4 py-12 text-white">
      <div className="rounded-3xl border border-slate-800/70 bg-slate-950/60 p-6 shadow-[0_0_0_1px_rgba(15,23,42,0.6),0_20px_50px_rgba(2,6,23,0.45)] sm:p-8">
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/60 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-slate-400">
              {problem.badge}
            </div>

            <div className="mt-4 text-xs uppercase tracking-[0.18em] text-slate-500">
              Problem Statement
            </div>

            <h1
              className={`mt-2 text-3xl font-semibold tracking-tight sm:text-4xl ${problem.accentTitle}`}
            >
              {problem.title}
            </h1>
          </div>

          <Link
            href="/#challenge"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700 bg-slate-900/50 text-slate-300 transition hover:border-sky-400 hover:text-sky-300"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </Link>
        </div>

        <div
          className={`rounded-2xl border ${problem.accentBorder} ${problem.accentBg} p-5 sm:p-6`}
        >
          <div className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
            {problem.heroLabel}
          </div>
          <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
            {problem.title}
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
            {problem.shortIntro}
          </p>
        </div>

        <div className="mt-8 space-y-4 text-sm leading-7 text-slate-300">
          {problem.paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {problem.quickStats.map((item, index) => (
            <div
              key={index}
              className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4"
            >
              <div className={`flex items-center gap-2 ${item.color}`}>
                {item.icon}
                <span className="text-xs uppercase tracking-[0.16em]">
                  {item.label}
                </span>
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-300">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/50 p-5 sm:p-6">
          <h3 className="text-lg font-semibold text-white">
            What your solution should do
          </h3>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
            {problem.solutionPoints.map((point, index) => (
              <li key={index}>• {point}</li>
            ))}
          </ul>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5 sm:p-6">
            <h3 className="text-lg font-semibold text-white">Suggested features</h3>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
              {problem.featurePoints.map((point, index) => (
                <li key={index}>• {point}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5 sm:p-6">
            <h3 className="text-lg font-semibold text-white">Evaluation criteria</h3>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
              {problem.evaluationPoints.map((point, index) => (
                <li key={index}>• {point}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/50 p-5 sm:p-6">
          <h3 className="text-lg font-semibold text-white">Expected deliverables</h3>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
            {problem.deliverables.map((item, index) => (
              <li key={index}>• {item}</li>
            ))}
          </ul>
        </div>

        {problem.footerNote && (
          <div className="mt-8 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5 sm:p-6">
            <div className="flex items-center gap-2 text-emerald-300">
              <CheckCircle2 className="h-4 w-4" />
              <span className="text-xs uppercase tracking-[0.16em]">
                Important Note
              </span>
            </div>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              {problem.footerNote}
            </p>
          </div>
        )}

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href={`/challenge/register?type=${type}`}
            className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-sky-500 via-cyan-500 to-violet-500 px-5 py-3 text-sm font-semibold text-white transition hover:brightness-110"
          >
            Register Now
          </Link>

          <Link
            href={`/challenge/submit?type=${type}`}
            className="inline-flex items-center justify-center rounded-2xl border border-slate-700 bg-slate-900/70 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-slate-500"
          >
            Submit Solution
          </Link>

          <Link
            href="/#challenge"
            className="inline-flex items-center gap-2 rounded-2xl border border-slate-800 bg-slate-900/60 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-sky-400 hover:text-sky-300"
          >
            Back to Challenges
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}