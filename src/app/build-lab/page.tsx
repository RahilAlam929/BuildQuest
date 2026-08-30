"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  Check,
  Circle,
  ExternalLink,
  Github,
  Plus,
  Rocket,
  Trash2,
} from "lucide-react";

type Status = "Idea" | "Building" | "Testing" | "Shipped";

type Project = {
  id: number;
  name: string;
  description: string;
  stack: string[];
  status: Status;
  tasks: string[];
  completed: number;
  github: string;
  demo: string;
};

const initialProjects: Project[] = [
  {
    id: 1,
    name: "AI Study Assistant",
    description:
      "A focused workspace for notes, learning resources and study progress.",
    stack: ["Next.js", "TypeScript", "Supabase"],
    status: "Building",
    tasks: [
      "Create project structure",
      "Build dashboard",
      "Add authentication",
      "Connect database",
      "Deploy application",
    ],
    completed: 3,
    github: "",
    demo: "",
  },
];

export default function BuildLabPage() {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [selectedId, setSelectedId] = useState(1);
  const [showCreate, setShowCreate] = useState(false);

  const selected = projects.find((p) => p.id === selectedId);

  function toggleTask(index: number) {
    if (!selected) return;

    const completed = selected.tasks.map((_, i) =>
      i === index ? true : i < selected.completed,
    );

    const count = completed.filter(Boolean).length;

    setProjects((current) =>
      current.map((project) =>
        project.id === selected.id
          ? {
              ...project,
              completed: count,
              status:
                count === project.tasks.length
                  ? "Shipped"
                  : count >= 4
                    ? "Testing"
                    : count > 0
                      ? "Building"
                      : "Idea",
            }
          : project,
      ),
    );
  }

  function createProject(
    name: string,
    description: string,
    stack: string,
  ) {
    const id = Date.now();

    const project: Project = {
      id,
      name,
      description,
      stack: stack
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      status: "Idea",
      tasks: [
        "Define project goal",
        "Create project structure",
        "Build first feature",
        "Test the project",
        "Deploy",
      ],
      completed: 0,
      github: "",
      demo: "",
    };

    setProjects((current) => [project, ...current]);
    setSelectedId(id);
    setShowCreate(false);
  }

  function deleteProject() {
    if (!selected) return;

    const remaining = projects.filter((p) => p.id !== selected.id);

    setProjects(remaining);
    setSelectedId(remaining[0]?.id ?? 0);
  }

  const progress = selected
    ? Math.round((selected.completed / selected.tasks.length) * 100)
    : 0;

  return (
    <main className="min-h-screen bg-[#020202] px-4 pb-20 pt-24 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="border-b border-white/[0.07] pb-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-3 text-[10px] uppercase tracking-[0.2em] text-cyan-300">
                Build Lab
              </p>

              <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl">
                Build something real.
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
                Turn ideas into structured projects. Track your work,
                manage tasks and ship your builds.
              </p>
            </div>

            <button
              onClick={() => setShowCreate(true)}
              className="inline-flex w-fit items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
            >
              <Plus className="h-4 w-4" />
              New Project
            </button>
          </div>
        </header>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Stat label="Projects" value={projects.length} />
          <Stat
            label="Building"
            value={projects.filter((p) => p.status === "Building").length}
          />
          <Stat
            label="Testing"
            value={projects.filter((p) => p.status === "Testing").length}
          />
          <Stat
            label="Shipped"
            value={projects.filter((p) => p.status === "Shipped").length}
          />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[270px_1fr]">
          <aside className="rounded-3xl border border-white/[0.08] bg-white/[0.025] p-3">
            <div className="px-3 py-3">
              <p className="text-[10px] uppercase tracking-[0.18em] text-slate-600">
                Your Projects
              </p>
            </div>

            <div className="space-y-1">
              {projects.map((project) => {
                const projectProgress = Math.round(
                  (project.completed / project.tasks.length) * 100,
                );

                return (
                  <button
                    key={project.id}
                    onClick={() => setSelectedId(project.id)}
                    className={`w-full rounded-2xl p-4 text-left transition ${
                      selectedId === project.id
                        ? "bg-white/[0.07]"
                        : "hover:bg-white/[0.04]"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="truncate text-sm font-medium text-white">
                        {project.name}
                      </span>
                      <span className="text-[10px] text-slate-600">
                        {project.status}
                      </span>
                    </div>

                    <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/[0.06]">
                      <div
                        className="h-full rounded-full bg-cyan-300 transition-all"
                        style={{ width: `${projectProgress}%` }}
                      />
                    </div>

                    <p className="mt-2 text-[10px] text-slate-600">
                      {projectProgress}% complete
                    </p>
                  </button>
                );
              })}
            </div>
          </aside>

          {selected ? (
            <section className="overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.025]">
              <div className="border-b border-white/[0.07] p-6 sm:p-8">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <span className="rounded-full border border-cyan-300/15 bg-cyan-300/5 px-3 py-1 text-[10px] uppercase tracking-[0.15em] text-cyan-300">
                      {selected.status}
                    </span>

                    <h2 className="mt-4 text-2xl font-semibold sm:text-3xl">
                      {selected.name}
                    </h2>

                    <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500">
                      {selected.description}
                    </p>
                  </div>

                  <button
                    onClick={deleteProject}
                    className="inline-flex w-fit items-center gap-2 rounded-xl border border-red-400/10 px-3 py-2 text-xs text-slate-500 hover:border-red-400/30 hover:text-red-300"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Delete
                  </button>
                </div>

                <div className="mt-7">
                  <div className="mb-2 flex justify-between text-xs">
                    <span className="text-slate-500">
                      Project progress
                    </span>
                    <span className="font-semibold text-white">
                      {progress}%
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-white/[0.06]">
                    <div
                      className="h-full rounded-full bg-cyan-300 transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1fr_280px]">
                <div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold">
                        Build Checklist
                      </p>
                      <p className="mt-1 text-xs text-slate-600">
                        Complete tasks while building.
                      </p>
                    </div>

                    <span className="text-xs text-slate-500">
                      {selected.completed}/{selected.tasks.length}
                    </span>
                  </div>

                  <div className="mt-5 space-y-2">
                    {selected.tasks.map((task, index) => {
                      const done = index < selected.completed;

                      return (
                        <button
                          key={task}
                          onClick={() => toggleTask(index)}
                          className="flex w-full items-center gap-3 rounded-2xl border border-white/[0.06] bg-black/20 p-4 text-left transition hover:border-cyan-300/20"
                        >
                          <span
                            className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${
                              done
                                ? "border-cyan-300 bg-cyan-300 text-black"
                                : "border-white/10 text-slate-700"
                            }`}
                          >
                            {done ? (
                              <Check className="h-3.5 w-3.5" />
                            ) : (
                              <Circle className="h-3 w-3" />
                            )}
                          </span>

                          <span
                            className={
                              done
                                ? "text-sm text-slate-600 line-through"
                                : "text-sm text-slate-300"
                            }
                          >
                            {task}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-4">
                  <Info title="Tech Stack">
                    <div className="flex flex-wrap gap-2">
                      {selected.stack.map((item) => (
                        <span
                          key={item}
                          className="rounded-lg border border-white/[0.07] bg-white/[0.03] px-2.5 py-1.5 text-[11px] text-slate-400"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </Info>

                  <Info title="Project Links">
                    <div className="space-y-2">
                      <a
                        href={selected.github || "https://github.com/"}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-between rounded-xl border border-white/[0.06] px-3 py-2.5 text-xs text-slate-400 hover:text-white"
                      >
                        GitHub
                        <Github className="h-3.5 w-3.5" />
                      </a>

                      <a
                        href={selected.demo || "#"}
                        onClick={(event) => {
                          if (!selected.demo) event.preventDefault();
                        }}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-between rounded-xl border border-white/[0.06] px-3 py-2.5 text-xs text-slate-400 hover:text-white"
                      >
                        Live Demo
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </Info>

                  <Link
                    href="/challenge"
                    className="flex items-center justify-between rounded-2xl border border-cyan-300/15 bg-cyan-300/5 p-4 text-xs text-cyan-200 hover:bg-cyan-300/10"
                  >
                    Find a challenge
                    <ArrowRight className="h-4 w-4" />
                  </Link>

                  {progress === 100 && (
                    <div className="flex items-center gap-3 rounded-2xl border border-emerald-300/15 bg-emerald-300/5 p-4">
                      <Rocket className="h-5 w-5 text-emerald-300" />
                      <div>
                        <p className="text-xs font-semibold text-emerald-200">
                          Project shipped
                        </p>
                        <p className="mt-1 text-[10px] text-slate-600">
                          Ready to showcase.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>
          ) : (
            <div className="flex min-h-[400px] items-center justify-center rounded-3xl border border-dashed border-white/[0.1]">
              <div className="text-center">
                <p className="font-semibold">No projects yet</p>
                <button
                  onClick={() => setShowCreate(true)}
                  className="mt-4 rounded-xl bg-white px-5 py-2.5 text-xs font-semibold text-black"
                >
                  Create your first project
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {showCreate && (
        <CreateModal
          onClose={() => setShowCreate(false)}
          onCreate={createProject}
        />
      )}
    </main>
  );
}

function Stat({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5">
      <p className="text-[10px] uppercase tracking-[0.16em] text-slate-600">
        {label}
      </p>
      <p className="mt-2 text-2xl font-semibold">{value}</p>
    </div>
  );
}

function Info({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-black/20 p-4">
      <p className="mb-3 text-[10px] uppercase tracking-[0.15em] text-slate-600">
        {title}
      </p>
      {children}
    </div>
  );
}

function CreateModal({
  onClose,
  onCreate,
}: {
  onClose: () => void;
  onCreate: (name: string, description: string, stack: string) => void;
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [stack, setStack] = useState("");

  function submit(event: React.FormEvent) {
    event.preventDefault();

    if (!name.trim()) return;

    onCreate(
      name.trim(),
      description.trim() || "A new BuildQuest project.",
      stack.trim() || "Next.js, TypeScript",
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 px-4 backdrop-blur-sm">
      <form
        onSubmit={submit}
        className="w-full max-w-lg rounded-3xl border border-white/[0.1] bg-[#080a0f] p-6 sm:p-8"
      >
        <p className="text-[10px] uppercase tracking-[0.18em] text-cyan-300">
          New Project
        </p>

        <h2 className="mt-2 text-xl font-semibold">
          Start a new build
        </h2>

        <div className="mt-7 space-y-4">
          <Input
            label="Project name"
            value={name}
            onChange={setName}
            placeholder="Campus Marketplace"
          />

          <Input
            label="Description"
            value={description}
            onChange={setDescription}
            placeholder="What are you building?"
          />

          <Input
            label="Tech stack"
            value={stack}
            onChange={setStack}
            placeholder="Next.js, TypeScript, Supabase"
          />
        </div>

        <div className="mt-7 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-xl border border-white/[0.08] py-3 text-sm text-slate-400 hover:text-white"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-cyan-300 py-3 text-sm font-semibold text-black hover:bg-cyan-200"
          >
            Create
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </form>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[10px] uppercase tracking-[0.15em] text-slate-600">
        {label}
      </span>

      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-700 focus:border-cyan-300/30"
      />
    </label>
  );
}
