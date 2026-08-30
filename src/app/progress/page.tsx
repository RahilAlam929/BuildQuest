"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type Roadmap = {
  name: string;
  description: string;
  topics: string[];
};

const roadmaps: Roadmap[] = [
  {
    name: "Frontend Development",
    description: "Build modern web interfaces from fundamentals to production.",
    topics: [
      "HTML & CSS",
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Tailwind CSS",
      "APIs",
      "Deployment",
    ],
  },
  {
    name: "Full Stack Development",
    description: "Learn frontend, backend, databases and deployment.",
    topics: [
      "HTML & CSS",
      "JavaScript",
      "React",
      "Next.js",
      "Node.js",
      "REST APIs",
      "PostgreSQL",
      "Authentication",
      "Docker",
      "Deployment",
    ],
  },
  {
    name: "AI & Data Science",
    description: "From Python fundamentals to machine learning projects.",
    topics: [
      "Python",
      "NumPy",
      "Pandas",
      "Data Visualization",
      "Statistics",
      "Machine Learning",
      "Scikit-learn",
      "Deep Learning",
      "AI Projects",
    ],
  },
];

export default function ProgressPage() {
  const [selected, setSelected] = useState(0);
  const [completed, setCompleted] = useState<string[]>([]);

  const roadmap = roadmaps[selected];

  const progress = useMemo(() => {
    if (!roadmap.topics.length) return 0;
    return Math.round((completed.length / roadmap.topics.length) * 100);
  }, [completed, roadmap]);

  function toggleTopic(topic: string) {
    setCompleted((current) =>
      current.includes(topic)
        ? current.filter((item) => item !== topic)
        : [...current, topic]
    );
  }

  return (
    <main className="min-h-screen bg-[#020202] px-5 pb-20 pt-28 text-white sm:px-8">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/"
          className="text-xs text-slate-500 transition hover:text-white"
        >
          ← Back to BuildQuest
        </Link>

        <div className="mt-8">
          <p className="text-xs uppercase tracking-[0.2em] text-cyan-400">
            Learning Progress
          </p>

          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            Build your roadmap.
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
            Pick a learning path, complete topics and track how far you've
            progressed.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {roadmaps.map((item, index) => (
            <button
              key={item.name}
              onClick={() => {
                setSelected(index);
                setCompleted([]);
              }}
              className={`rounded-2xl border p-5 text-left transition ${
                selected === index
                  ? "border-cyan-400/40 bg-cyan-400/[0.06]"
                  : "border-white/[0.08] bg-white/[0.02] hover:border-white/20"
              }`}
            >
              <h2 className="text-sm font-semibold">{item.name}</h2>
              <p className="mt-2 text-xs leading-6 text-slate-500">
                {item.description}
              </p>
            </button>
          ))}
        </div>

        <section className="mt-8 rounded-3xl border border-white/[0.08] bg-white/[0.025] p-6 sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-slate-600">
                Current roadmap
              </p>
              <h2 className="mt-2 text-2xl font-semibold">{roadmap.name}</h2>
            </div>

            <div className="text-left sm:text-right">
              <div className="text-3xl font-semibold text-cyan-300">
                {progress}%
              </div>
              <p className="text-xs text-slate-600">
                {completed.length} / {roadmap.topics.length} completed
              </p>
            </div>
          </div>

          <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/[0.06]">
            <div
              className="h-full rounded-full bg-cyan-400 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="mt-8 space-y-3">
            {roadmap.topics.map((topic, index) => {
              const done = completed.includes(topic);

              return (
                <button
                  key={topic}
                  onClick={() => toggleTopic(topic)}
                  className="flex w-full items-center gap-4 rounded-2xl border border-white/[0.07] bg-black/20 p-4 text-left transition hover:border-cyan-400/20"
                >
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs ${
                      done
                        ? "border-cyan-400/40 bg-cyan-400/10 text-cyan-300"
                        : "border-white/10 text-slate-600"
                    }`}
                  >
                    {done ? "✓" : index + 1}
                  </span>

                  <span
                    className={`text-sm ${
                      done
                        ? "text-slate-500 line-through"
                        : "text-slate-200"
                    }`}
                  >
                    {topic}
                  </span>
                </button>
              );
            })}
          </div>

          {progress === 100 && (
            <div className="mt-6 rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.06] p-5">
              <p className="text-sm font-semibold text-emerald-300">
                Roadmap completed.
              </p>
              <p className="mt-1 text-xs text-slate-500">
                You finished every topic in this learning path. Now build a
                real project to apply what you learned.
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
