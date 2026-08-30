"use client";

import { useState } from "react";
import Link from "next/link";

type Status = "Planning" | "Building" | "Shipped";

type Project = {
  id: number;
  name: string;
  description: string;
  status: Status;
};

const initialProjects: Project[] = [
  {
    id: 1,
    name: "My First Build",
    description: "A project I'm currently working on.",
    status: "Building",
  },
];

const statuses: Status[] = ["Planning", "Building", "Shipped"];

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  function addProject() {
    if (!name.trim()) return;

    setProjects((current) => [
      ...current,
      {
        id: Date.now(),
        name: name.trim(),
        description: description.trim() || "No description added.",
        status: "Planning",
      },
    ]);

    setName("");
    setDescription("");
  }

  function changeStatus(id: number, status: Status) {
    setProjects((current) =>
      current.map((project) =>
        project.id === id ? { ...project, status } : project
      )
    );
  }

  function deleteProject(id: number) {
    setProjects((current) => current.filter((project) => project.id !== id));
  }

  return (
    <main className="min-h-screen bg-[#020202] px-5 pb-20 pt-28 text-white sm:px-8">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/"
          className="text-xs text-slate-500 hover:text-white"
        >
          ← Back to BuildQuest
        </Link>

        <div className="mt-8">
          <p className="text-xs uppercase tracking-[0.2em] text-cyan-400">
            Project Tracker
          </p>

          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            Ship what you build.
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-500">
            Keep your ideas, active builds and shipped projects organized in
            one place.
          </p>
        </div>

        <section className="mt-10 rounded-3xl border border-white/[0.08] bg-white/[0.025] p-6 sm:p-8">
          <h2 className="text-lg font-semibold">Add a project</h2>

          <div className="mt-5 grid gap-4 md:grid-cols-[1fr_1.5fr_auto]">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Project name"
              className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-700 focus:border-cyan-400/40"
            />

            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Short description"
              className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-700 focus:border-cyan-400/40"
            />

            <button
              onClick={addProject}
              className="rounded-xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              Add Project
            </button>
          </div>
        </section>

        <section className="mt-8">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Your projects</h2>
            <span className="text-xs text-slate-600">
              {projects.length} project{projects.length !== 1 ? "s" : ""}
            </span>
          </div>

          {projects.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-white/10 p-10 text-center">
              <p className="text-sm text-slate-500">
                No projects yet. Add your first build above.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {projects.map((project) => (
                <Link
                  key={project.id}
                  href={`/projects/${project.id}`}
                  className="group block rounded-3xl border border-white/[0.08] bg-white/[0.025] p-6 transition hover:-translate-y-0.5 hover:border-cyan-400/20"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-white">
                        {project.name}
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-slate-500">
                        {project.description}
                      </p>
                    </div>

                    <button
                      onClick={() => deleteProject(project.id)}
                      className="text-xs text-slate-700 transition hover:text-red-400"
                    >
                      Delete
                    </button>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {statuses.map((status) => (
                      <button
                        key={status}
                        onClick={() => changeStatus(project.id, status)}
                        className={`rounded-full border px-3 py-1.5 text-xs transition ${
                          project.status === status
                            ? "border-cyan-400/30 bg-cyan-400/10 text-cyan-300"
                            : "border-white/10 text-slate-600 hover:text-slate-300"
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
