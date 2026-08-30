"use client";

import { useEffect, useMemo, useState } from "react";

type TaskStatus = "todo" | "progress" | "done";

type Task = {
  id: number;
  title: string;
  status: TaskStatus;
};

const initialTasks: Task[] = [
  { id: 1, title: "Define project idea", status: "done" },
  { id: 2, title: "Plan features", status: "progress" },
  { id: 3, title: "Build MVP", status: "todo" },
  { id: 4, title: "Test the project", status: "todo" },
  { id: 5, title: "Deploy", status: "todo" },
];

const milestones = [
  { title: "Idea", description: "Define what you are building.", threshold: 0 },
  { title: "Planning", description: "Shape features and architecture.", threshold: 20 },
  { title: "MVP", description: "Build the first working version.", threshold: 40 },
  { title: "Testing", description: "Fix bugs and validate the product.", threshold: 70 },
  { title: "Deployment", description: "Ship your project to the world.", threshold: 90 },
  { title: "Shipped", description: "Your project is live.", threshold: 100 },
];

export default function BuildProgressPage() {
  const [project, setProject] = useState("My BuildQuest Project");
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [newTask, setNewTask] = useState("");
  const [github, setGithub] = useState("");
  const [deploy, setDeploy] = useState("");
  const [notes, setNotes] = useState("");
  const [stack, setStack] = useState("");
  const [deadline, setDeadline] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("buildquest-progress");

    if (saved) {
      try {
        const data = JSON.parse(saved);
        setProject(data.project ?? "My BuildQuest Project");
        setTasks(data.tasks ?? initialTasks);
        setGithub(data.github ?? "");
        setDeploy(data.deploy ?? "");
        setDeadline(data.deadline ?? "");
      } catch {
        // Ignore invalid saved data.
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "buildquest-progress",
      JSON.stringify({
        project,
        tasks,
        github,
        deploy,
        notes,
        stack,
        deadline,
      }),
    );
  }, [project, tasks, github, deploy]);

  const completed = tasks.filter((task) => task.status === "done").length;
  const inProgress = tasks.filter((task) => task.status === "progress").length;
  const todo = tasks.filter((task) => task.status === "todo").length;

  const progress = useMemo(() => {
    if (!tasks.length) return 0;
    return Math.round((completed / tasks.length) * 100);
  }, [completed, tasks.length]);

  const updateStatus = (id: number, status: TaskStatus) => {
    setTasks((current) =>
      current.map((task) =>
        task.id === id ? { ...task, status } : task,
      ),
    );
  };

  const addTask = () => {
    const title = newTask.trim();

    if (!title) return;

    setTasks((current) => [
      ...current,
      {
        id: Date.now(),
        title,
        status: "todo",
      },
    ]);

    setNewTask("");
  };

  const deleteTask = (id: number) => {
    setTasks((current) => current.filter((task) => task.id !== id));
  };

  const daysLeft = useMemo(() => {
    if (!deadline) return null;

    const target = new Date(deadline);
    const today = new Date();

    target.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    return Math.ceil(
      (target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
    );
  }, [deadline]);

  const resetProject = () => {
    if (!window.confirm("Reset this Build Lab project?")) return;

    setProject("My BuildQuest Project");
    setTasks(initialTasks);
    setGithub("");
    setDeploy("");
    setNotes("");
    setStack("");
    setDeadline("");
  };

  return (
    <main className="min-h-screen px-5 pb-20 pt-28 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10">
          <a
            href="/build-lab"
            className="text-xs text-slate-500 transition hover:text-white"
          >
            ← Back to Build Lab
          </a>

          <p className="mt-8 text-[10px] uppercase tracking-[0.2em] text-cyan-400">
            Build Progress
          </p>

          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Ship what you start.
          </h1>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <p className="max-w-2xl text-sm leading-7 text-slate-500">
              Track your project from idea to deployment. Everything is saved
              locally in your browser.
            </p>

            <button
              type="button"
              onClick={resetProject}
              className="w-fit rounded-xl border border-red-400/15 bg-red-400/[0.04] px-4 py-2.5 text-xs font-medium text-red-300 transition hover:border-red-400/30 hover:bg-red-400/[0.08]"
            >
              Reset project
            </button>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
          <section className="rounded-3xl border border-white/[0.08] bg-white/[0.025] p-6">
            <label className="text-[10px] uppercase tracking-[0.16em] text-slate-600">
              Project
            </label>

            <input
              value={project}
              onChange={(event) => setProject(event.target.value)}
              className="mt-3 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400/40"
              placeholder="Project name"
            />

            <div className="mt-7">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs text-slate-400">Overall progress</span>
                <span className="text-xs font-semibold text-cyan-300">
                  {progress}%
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-cyan-400 transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-2">
              <div className="rounded-xl border border-white/[0.06] bg-black/20 p-3">
                <p className="text-[10px] uppercase tracking-wider text-slate-600">
                  Done
                </p>
                <p className="mt-1 text-lg font-semibold text-emerald-300">
                  {completed}
                </p>
              </div>

              <div className="rounded-xl border border-white/[0.06] bg-black/20 p-3">
                <p className="text-[10px] uppercase tracking-wider text-slate-600">
                  Active
                </p>
                <p className="mt-1 text-lg font-semibold text-amber-300">
                  {inProgress}
                </p>
              </div>

              <div className="rounded-xl border border-white/[0.06] bg-black/20 p-3">
                <p className="text-[10px] uppercase tracking-wider text-slate-600">
                  To do
                </p>
                <p className="mt-1 text-lg font-semibold text-slate-300">
                  {todo}
                </p>
              </div>
            </div>

            <div className="mt-8 flex gap-2">
              <input
                value={newTask}
                onChange={(event) => setNewTask(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") addTask();
                }}
                className="min-w-0 flex-1 rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none focus:border-cyan-400/40"
                placeholder="Add a task..."
              />

              <button
                onClick={addTask}
                className="rounded-xl bg-white px-5 text-xs font-semibold text-slate-950 transition hover:bg-cyan-200"
              >
                Add
              </button>
            </div>

            <div className="mt-5 space-y-3">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="flex flex-col gap-3 rounded-2xl border border-white/[0.07] bg-black/20 p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${
                        task.status === "done"
                          ? "bg-emerald-400"
                          : task.status === "progress"
                            ? "bg-amber-400"
                            : "bg-slate-600"
                      }`}
                    />

                    <span
                      className={`text-sm ${
                        task.status === "done"
                          ? "text-slate-500 line-through"
                          : "text-slate-200"
                      }`}
                    >
                      {task.title}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <select
                      value={task.status}
                      onChange={(event) =>
                        updateStatus(
                          task.id,
                          event.target.value as TaskStatus,
                        )
                      }
                      className="rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-xs text-slate-300 outline-none"
                    >
                      <option value="todo">To do</option>
                      <option value="progress">In progress</option>
                      <option value="done">Done</option>
                    </select>

                    <button
                      onClick={() => deleteTask(task.id)}
                      className="rounded-lg border border-white/10 px-3 py-2 text-xs text-slate-600 transition hover:text-red-300"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <aside className="space-y-5">
            <div className="rounded-3xl border border-white/[0.08] bg-white/[0.025] p-6">
              <p className="text-[10px] uppercase tracking-[0.16em] text-slate-600">
                Project setup
              </p>

              <input
                value={stack}
                onChange={(event) => setStack(event.target.value)}
                placeholder="Tech stack — Next.js, TypeScript..."
                className="mt-4 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-xs text-white outline-none focus:border-cyan-400/40"
              />

              <div className="mt-3">
                <label className="mb-2 block text-[10px] uppercase tracking-[0.16em] text-slate-600">
                  Target deadline
                </label>
                <input
                  type="date"
                  value={deadline}
                  onChange={(event) => setDeadline(event.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-xs text-white outline-none focus:border-cyan-400/40"
                />
              </div>

              <textarea
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                placeholder="Project notes, ideas, blockers..."
                rows={5}
                className="mt-3 w-full resize-none rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-xs leading-6 text-white outline-none focus:border-cyan-400/40"
              />
            </div>

            <div className="rounded-3xl border border-white/[0.08] bg-white/[0.025] p-6">
              <p className="text-[10px] uppercase tracking-[0.16em] text-slate-600">
                Project links
              </p>

              <input
                value={github}
                onChange={(event) => setGithub(event.target.value)}
                placeholder="GitHub URL"
                className="mt-4 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-xs text-white outline-none focus:border-cyan-400/40"
              />

              <input
                value={deploy}
                onChange={(event) => setDeploy(event.target.value)}
                placeholder="Live / Deploy URL"
                className="mt-3 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-xs text-white outline-none focus:border-cyan-400/40"
              />

              {github && (
                <a
                  href={github}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 block text-xs text-cyan-300 hover:underline"
                >
                  Open GitHub →
                </a>
              )}

              {deploy && (
                <a
                  href={deploy}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 block text-xs text-cyan-300 hover:underline"
                >
                  Open deployment →
                </a>
              )}
            </div>

            <div className="rounded-3xl border border-white/[0.08] bg-white/[0.025] p-6">
              <p className="text-[10px] uppercase tracking-[0.16em] text-slate-600">
                Build status
              </p>

              <p className="mt-3 text-2xl font-semibold text-white">
                {progress === 100
                  ? "Shipped"
                  : progress > 0
                    ? "Building"
                    : "Planning"}
              </p>

              <p className="mt-2 text-xs leading-6 text-slate-500">
                {completed} of {tasks.length} tasks completed.
              </p>

              {daysLeft !== null && (
                <div className="mt-5 border-t border-white/[0.06] pt-4">
                  <p className="text-[10px] uppercase tracking-[0.16em] text-slate-600">
                    Deadline
                  </p>

                  <p
                    className={`mt-2 text-sm font-semibold ${
                      daysLeft < 0
                        ? "text-red-300"
                        : daysLeft <= 3
                          ? "text-amber-300"
                          : "text-cyan-300"
                    }`}
                  >
                    {daysLeft < 0
                      ? `${Math.abs(daysLeft)} days overdue`
                      : daysLeft === 0
                        ? "Due today"
                        : `${daysLeft} days remaining`}
                  </p>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
