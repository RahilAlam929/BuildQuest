"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Project = {
  id: number;
  name: string;
  description: string;
  status: "Planning" | "Building" | "Shipped";
  github?: string;
  demo?: string;
  stack?: string[];
};

const defaultProject: Project = {
  id: 1,
  name: "My First Build",
  description:
    "A practical project workspace for planning, building, testing and shipping your project.",
  status: "Building",
  github: "",
  demo: "",
  stack: ["Next.js", "TypeScript", "Tailwind CSS"],
};

const tasks = [
  "Define project idea",
  "Create project structure",
  "Build core features",
  "Test the application",
  "Deploy the project",
  "Write README",
];

export default function ProjectDetailPage() {
  const [project, setProject] = useState<Project>(defaultProject);
  const [editing, setEditing] = useState(false);

  const [name, setName] = useState(defaultProject.name);
  const [description, setDescription] = useState(defaultProject.description);
  const [github, setGithub] = useState("");
  const [demo, setDemo] = useState("");
  const [stack, setStack] = useState(
    defaultProject.stack?.join(", ") || ""
  );

  const [completed, setCompleted] = useState<string[]>([]);

  useEffect(() => {
    const savedProjects = localStorage.getItem("buildquest-projects");

    if (savedProjects) {
      try {
        const projects: Project[] = JSON.parse(savedProjects);
        const found = projects.find((item) => item.id === 1);

        if (found) {
          setProject(found);
          setName(found.name);
          setDescription(found.description);
          setGithub(found.github || "");
          setDemo(found.demo || "");
          setStack(found.stack?.join(", ") || "");
        }
      } catch {
        console.log("Could not load project");
      }
    }

    const savedTasks = localStorage.getItem(
      "buildquest-project-1-tasks"
    );

    if (savedTasks) {
      try {
        setCompleted(JSON.parse(savedTasks));
      } catch {
        setCompleted([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "buildquest-project-1-tasks",
      JSON.stringify(completed)
    );
  }, [completed]);

  const progress = Math.round(
    (completed.length / tasks.length) * 100
  );

  function saveProject() {
    const updated: Project = {
      ...project,
      name: name.trim() || "Untitled Project",
      description:
        description.trim() || "No description added.",
      github: github.trim(),
      demo: demo.trim(),
      stack: stack
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    };

    setProject(updated);
    setEditing(false);

    const saved = localStorage.getItem("buildquest-projects");

    let projects: Project[] = [];

    if (saved) {
      try {
        projects = JSON.parse(saved);
      } catch {
        projects = [];
      }
    }

    const exists = projects.some((item) => item.id === 1);

    if (exists) {
      projects = projects.map((item) =>
        item.id === 1 ? updated : item
      );
    } else {
      projects.push(updated);
    }

    localStorage.setItem(
      "buildquest-projects",
      JSON.stringify(projects)
    );
  }

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

          {!editing ? (
            <>
              <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-cyan-400">
                    Project Workspace
                  </p>

                  <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">
                    {project.name}
                  </h1>

                  <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500">
                    {project.description}
                  </p>
                </div>

                <button
                  onClick={() => setEditing(true)}
                  className="w-fit rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-xs text-slate-300 transition hover:border-cyan-400/20 hover:text-white"
                >
                  Edit Project
                </button>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/[0.07] bg-black/20 p-4">
                  <p className="text-[10px] uppercase tracking-wider text-slate-600">
                    Stack
                  </p>

                  <div className="mt-2 flex flex-wrap gap-2">
                    {project.stack?.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-white/10 px-2.5 py-1 text-[10px] text-slate-400"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-white/[0.07] bg-black/20 p-4">
                  <p className="text-[10px] uppercase tracking-wider text-slate-600">
                    Status
                  </p>

                  <p className="mt-2 text-sm text-cyan-300">
                    {project.status}
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
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-xs text-slate-300 hover:border-white/20 hover:text-white"
                  >
                    GitHub →
                  </a>
                )}

                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-xl bg-white px-4 py-2.5 text-xs font-semibold text-slate-950"
                  >
                    Live Demo →
                  </a>
                )}
              </div>
            </>
          ) : (
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-cyan-400">
                Edit Project
              </p>

              <div className="mt-6 grid gap-4">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Project name"
                  className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none placeholder:text-slate-700 focus:border-cyan-400/40"
                />

                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Project description"
                  rows={4}
                  className="resize-none rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none placeholder:text-slate-700 focus:border-cyan-400/40"
                />

                <input
                  value={stack}
                  onChange={(e) => setStack(e.target.value)}
                  placeholder="Tech stack — Next.js, TypeScript, Tailwind"
                  className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none placeholder:text-slate-700 focus:border-cyan-400/40"
                />

                <input
                  value={github}
                  onChange={(e) => setGithub(e.target.value)}
                  placeholder="GitHub URL"
                  className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none placeholder:text-slate-700 focus:border-cyan-400/40"
                />

                <input
                  value={demo}
                  onChange={(e) => setDemo(e.target.value)}
                  placeholder="Live Demo URL"
                  className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none placeholder:text-slate-700 focus:border-cyan-400/40"
                />
              </div>

              <div className="mt-5 flex gap-3">
                <button
                  onClick={saveProject}
                  className="rounded-xl bg-cyan-400 px-5 py-2.5 text-xs font-semibold text-slate-950 hover:bg-cyan-300"
                >
                  Save Changes
                </button>

                <button
                  onClick={() => setEditing(false)}
                  className="rounded-xl border border-white/10 px-5 py-2.5 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
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
            </div>
          )}
        </section>

      </div>
    </main>
  );
}
