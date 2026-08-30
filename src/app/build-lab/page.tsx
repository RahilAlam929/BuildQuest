"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Check,
  ChevronRight,
  Code2,
  Copy,
  FolderKanban,
  Github,
  Globe,
  Save,
  Terminal,
} from "lucide-react";

type Task = {
  id: number;
  title: string;
  description: string;
  done: boolean;
};

const starterTasks: Task[] = [
  {
    id: 1,
    title: "Define the problem",
    description: "Write down the real problem your project solves.",
    done: false,
  },
  {
    id: 2,
    title: "Choose the tech stack",
    description: "Decide frontend, backend, database and deployment.",
    done: false,
  },
  {
    id: 3,
    title: "Design the MVP",
    description: "List only the features required for the first working version.",
    done: false,
  },
  {
    id: 4,
    title: "Build the first version",
    description: "Create the core functionality before polishing the UI.",
    done: false,
  },
  {
    id: 5,
    title: "Test everything",
    description: "Check the main user flow and fix obvious issues.",
    done: false,
  },
  {
    id: 6,
    title: "Deploy",
    description: "Put your project online and verify the production build.",
    done: false,
  },
];

export default function BuildLabPage() {
  const [projectName, setProjectName] = useState("");
  const [idea, setIdea] = useState("");
  const [stack, setStack] = useState("Next.js + TypeScript + Tailwind");
  const [tasks, setTasks] = useState<Task[]>(starterTasks);
  const [saved, setSaved] = useState(false);

  const completed = tasks.filter((task) => task.done).length;

  const progress = useMemo(() => {
    if (!tasks.length) return 0;
    return Math.round((completed / tasks.length) * 100);
  }, [completed, tasks.length]);

  function toggleTask(id: number) {
    setTasks((current) =>
      current.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
    setSaved(false);
  }

  function saveProject() {
    const project = {
      projectName,
      idea,
      stack,
      tasks,
      savedAt: new Date().toISOString(),
    };

    localStorage.setItem("buildquest-build-lab", JSON.stringify(project));
    setSaved(true);
  }

  async function copyPlan() {
    const plan = `# ${projectName || "My BuildQuest Project"}

Idea:
${idea || "Define the project idea"}

Tech Stack:
${stack}

Progress:
${progress}%

Tasks:
${tasks
  .map((task) => `${task.done ? "[x]" : "[ ]"} ${task.title}`)
  .join("\n")}
`;

    await navigator.clipboard.writeText(plan);
  }

  return (
    <main className="min-h-screen bg-[#020202] px-5 pb-20 pt-24 text-white sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-xs text-slate-500 transition hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to BuildQuest
        </Link>

        <div className="mb-10">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-slate-400">
            Build Lab
          </div>

          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
            Turn an idea into a project.
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
            Plan your project, choose your stack, track the MVP and ship a
            working build.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1fr_0.42fr]">
          <section className="rounded-[28px] border border-white/[0.08] bg-white/[0.025] p-6 sm:p-8">
            <div className="mb-7 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10">
                <FolderKanban className="h-5 w-5 text-cyan-300" />
              </div>

              <div>
                <h2 className="text-sm font-semibold">Project workspace</h2>
                <p className="text-xs text-slate-600">
                  Start with the fundamentals.
                </p>
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-xs font-medium text-slate-400">
                  Project name
                </label>

                <input
                  value={projectName}
                  onChange={(e) => {
                    setProjectName(e.target.value);
                    setSaved(false);
                  }}
                  placeholder="e.g. Student Productivity OS"
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-700 focus:border-cyan-400/40"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-medium text-slate-400">
                  What are you building?
                </label>

                <textarea
                  value={idea}
                  onChange={(e) => {
                    setIdea(e.target.value);
                    setSaved(false);
                  }}
                  rows={5}
                  placeholder="Describe the problem, target users and your solution..."
                  className="w-full resize-none rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm leading-6 text-white outline-none placeholder:text-slate-700 focus:border-cyan-400/40"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-medium text-slate-400">
                  Technology stack
                </label>

                <input
                  value={stack}
                  onChange={(e) => {
                    setStack(e.target.value);
                    setSaved(false);
                  }}
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none focus:border-cyan-400/40"
                />
              </div>
            </div>
          </section>

          <aside className="rounded-[28px] border border-white/[0.08] bg-white/[0.025] p-6">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500">Build progress</span>
              <span className="text-2xl font-semibold">{progress}%</span>
            </div>

            <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-cyan-400 transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>

            <p className="mt-3 text-xs text-slate-600">
              {completed} of {tasks.length} milestones completed
            </p>

            <div className="mt-8 space-y-3">
              <button
                onClick={saveProject}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-xs font-semibold text-slate-950 transition hover:bg-cyan-200"
              >
                <Save className="h-4 w-4" />
                {saved ? "Saved locally" : "Save Project"}
              </button>

              <button
                onClick={copyPlan}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-xs text-slate-300 transition hover:border-white/20 hover:text-white"
              >
                <Copy className="h-4 w-4" />
                Copy Project Plan
              </button>
            </div>
          </aside>
        </div>

        <section className="mt-5 rounded-[28px] border border-white/[0.08] bg-white/[0.025] p-6 sm:p-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-[10px] uppercase tracking-[0.18em] text-slate-600">
                MVP Roadmap
              </p>
              <h2 className="mt-2 text-xl font-semibold">
                Ship it step by step.
              </h2>
            </div>

            <span className="text-xs text-slate-600">
              {completed}/{tasks.length} complete
            </span>
          </div>

          <div className="mt-7 grid gap-3">
            {tasks.map((task) => (
              <button
                key={task.id}
                onClick={() => toggleTask(task.id)}
                className="group flex w-full items-start gap-4 rounded-2xl border border-white/[0.07] bg-black/20 p-4 text-left transition hover:border-cyan-400/20"
              >
                <span
                  className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border ${
                    task.done
                      ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
                      : "border-white/10 text-transparent"
                  }`}
                >
                  <Check className="h-3.5 w-3.5" />
                </span>

                <span className="min-w-0 flex-1">
                  <span
                    className={`block text-sm font-medium ${
                      task.done ? "text-slate-500 line-through" : "text-white"
                    }`}
                  >
                    {task.title}
                  </span>

                  <span className="mt-1 block text-xs leading-6 text-slate-600">
                    {task.description}
                  </span>
                </span>

                <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-slate-700 transition group-hover:text-cyan-300" />
              </button>
            ))}
          </div>
        </section>

        <section className="mt-5 grid gap-5 md:grid-cols-3">
          {[
            {
              icon: Code2,
              title: "Write code",
              text: "Move from idea to a working MVP.",
            },
            {
              icon: Terminal,
              title: "Test locally",
              text: "Validate the important user flows.",
            },
            {
              icon: Globe,
              title: "Ship online",
              text: "Deploy and share your finished project.",
            },
          ].map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5"
              >
                <Icon className="h-5 w-5 text-cyan-300" />
                <h3 className="mt-4 text-sm font-semibold">{item.title}</h3>
                <p className="mt-2 text-xs leading-6 text-slate-600">
                  {item.text}
                </p>
              </div>
            );
          })}
        </section>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/challenge"
            className="inline-flex items-center gap-2 rounded-xl bg-cyan-400 px-4 py-2.5 text-xs font-semibold text-slate-950 transition hover:bg-cyan-300"
          >
            Join a Challenge
            <ChevronRight className="h-3.5 w-3.5" />
          </Link>

          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-xs text-slate-300 transition hover:border-white/20 hover:text-white"
          >
            <Github className="h-3.5 w-3.5" />
            GitHub
          </a>
        </div>
      </div>
    </main>
  );
}
