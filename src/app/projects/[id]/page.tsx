"use client";

import Link from "next/link";
import { useState } from "react";

const tasks = [
  "Define project idea",
  "Create project structure",
  "Build core features",
  "Test the application",
  "Deploy the project",
  "Write README",
];

export default function ProjectDetailPage() {
  const [completed, setCompleted] = useState<string[]>([]);

  const progress = Math.round(
    (completed.length / tasks.length) * 100
  );

  function toggleTask(task: string) {
    setCompleted((current) =>
      current.includes(task)
        ? current.filter((item) => item !== task)
        : [...current, task]
    );
  }

  return (
    <main className="min-h-screen bg-[#020202] px-5 pb-20 pt-28 text-white sm:px-8">
      <div className="mx-auto max-w-5xl">

        <Link
          href="/projects"
          className="text-xs text-slate-500 transition hover:text-white"
        >
          ← Back to Projects
        </Link>

        <section className="mt-8 rounded-3xl border border-white/[0.08] bg-white/[0.025] p-6 sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-cyan-400">
                Project Workspace
              </p>

              <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">
                My First Build
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500">
                A practical project workspace for planning, building,
                testing and shipping your project.
              </p>
            </div>

            <span className="w-fit rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1.5 text-xs text-cyan-300">
              Building
            </span>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/[0.07] bg-black/20 p-4">
              <p className="text-[10px] uppercase tracking-wider text-slate-600">
                Stack
              </p>
              <p className="mt-2 text-sm text-slate-300">
                Next.js · TypeScript · Tailwind
              </p>
            </div>

            <div className="rounded-2xl border border-white/[0.07] bg-black/20 p-4">
              <p className="text-[10px] uppercase tracking-wider text-slate-600">
                Status
              </p>
              <p className="mt-2 text-sm text-slate-300">
                Active Build
              </p>
            </div>

            <div className="rounded-2xl border border-white/[0.07] bg-black/20 p-4">
              <p className="text-[10px] uppercase tracking-wider text-slate-600">
                Progress
              </p>
              <p className="mt-2 text-sm text-cyan-300">
                {progress}%
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-xs text-slate-300 hover:border-white/20 hover:text-white"
            >
              GitHub →
            </a>

            <a
              href="#"
              className="rounded-xl bg-white px-4 py-2.5 text-xs font-semibold text-slate-950"
            >
              Live Demo →
            </a>
          </div>
        </section>

        <section className="mt-6 rounded-3xl border border-white/[0.08] bg-white/[0.025] p-6 sm:p-8">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-slate-600">
                Build Checklist
              </p>

              <h2 className="mt-2 text-xl font-semibold">
                Ship this project
              </h2>
            </div>

            <span className="text-sm text-slate-500">
              {completed.length}/{tasks.length}
            </span>
          </div>

          <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/[0.06]">
            <div
              className="h-full rounded-full bg-cyan-400 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="mt-6 space-y-3">
            {tasks.map((task) => {
              const done = completed.includes(task);

              return (
                <button
                  key={task}
                  onClick={() => toggleTask(task)}
                  className="flex w-full items-center gap-4 rounded-2xl border border-white/[0.07] bg-black/20 p-4 text-left transition hover:border-cyan-400/20"
                >
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs ${
                      done
                        ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
                        : "border-white/10 text-slate-600"
                    }`}
                  >
                    {done ? "✓" : ""}
                  </span>

                  <span
                    className={`text-sm ${
                      done
                        ? "text-slate-600 line-through"
                        : "text-slate-300"
                    }`}
                  >
                    {task}
                  </span>
                </button>
              );
            })}
          </div>

          {progress === 100 && (
            <div className="mt-6 rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.05] p-5">
              <p className="text-sm font-semibold text-emerald-300">
                Project ready to ship.
              </p>

              <p className="mt-1 text-xs text-slate-500">
                All build tasks are complete. Add your deployment link and
                share your project.
              </p>
            </div>
          )}
        </section>

      </div>
    </main>
  );
}
