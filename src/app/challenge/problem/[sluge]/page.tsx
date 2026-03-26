"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Brain,
  Sparkles,
  Target,
  Zap,
  CheckCircle,
} from "lucide-react";

const problemData: any = {
  "ai-debugging-assistant": {
    title: "AI Code Debugging Assistant",
    difficulty: "Hard",
    category: "Developer Tools",
    description:
      "Developers often struggle to understand complex errors. Build an AI assistant that explains errors and suggests fixes.",
    requirements: [
      "Explain errors in simple language",
      "Suggest possible fixes",
      "Support multiple languages/frameworks",
    ],
    features: [
      "Error analysis",
      "Code suggestions",
      "Smart hints",
    ],
  },

  "github-analyzer": {
    title: "Smart GitHub Project Analyzer",
    difficulty: "Medium",
    category: "Portfolio",
    description:
      "Build a tool that analyzes GitHub repositories and gives improvement suggestions.",
    requirements: [
      "Analyze README",
      "Check project structure",
      "Suggest improvements",
    ],
    features: [
      "Score system",
      "UI insights",
      "Project feedback",
    ],
  },
};

export default function ProblemDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const problem = problemData[slug];

  if (!problem) {
    return <div className="text-white p-10">Problem not found</div>;
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-12 text-white">
      <Link href="/problem-bank" className="flex items-center gap-2 text-sm">
        <ArrowLeft className="h-4 w-4" />
        Back to Problems
      </Link>

      {/* HERO */}
      <div className="mt-6 rounded-3xl border border-slate-800 bg-slate-950/60 p-6">
        <div className="text-cyan-300 text-xs uppercase flex gap-2">
          <Sparkles className="h-4 w-4" />
          Problem Detail
        </div>

        <h1 className="mt-3 text-3xl font-semibold">
          {problem.title}
        </h1>

        <p className="mt-3 text-slate-400">{problem.description}</p>

        <div className="mt-4 flex gap-3">
          <span className="px-3 py-1 border rounded-full text-xs">
            {problem.difficulty}
          </span>
          <span className="px-3 py-1 border rounded-full text-xs">
            {problem.category}
          </span>
        </div>
      </div>

      {/* REQUIREMENTS */}
      <section className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
        <h2 className="flex items-center gap-2 text-xl font-semibold">
          <Target className="h-5 w-5 text-cyan-300" />
          Requirements
        </h2>

        <ul className="mt-4 space-y-2 text-sm text-slate-400">
          {problem.requirements.map((req: string) => (
            <li key={req} className="flex gap-2">
              <CheckCircle className="h-4 w-4 text-green-400" />
              {req}
            </li>
          ))}
        </ul>
      </section>

      {/* FEATURES */}
      <section className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
        <h2 className="flex items-center gap-2 text-xl font-semibold">
          <Brain className="h-5 w-5 text-violet-300" />
          Suggested Features
        </h2>

        <ul className="mt-4 space-y-2 text-sm text-slate-400">
          {problem.features.map((f: string) => (
            <li key={f} className="flex gap-2">
              <Zap className="h-4 w-4 text-yellow-400" />
              {f}
            </li>
          ))}
        </ul>
      </section>

      {/* CTA */}
      <div className="mt-8 flex gap-3">
        <Link
          href={`/challenge/submit?type=weekly`}
          className="px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 text-white"
        >
          Submit Solution 🚀
        </Link>

        <button className="px-6 py-3 rounded-full border border-slate-700">
          View Discussions
        </button>
      </div>
    </main>
  );
}