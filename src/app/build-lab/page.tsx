"use client";

import Link from "next/link";
import {
  Wrench,
  ArrowLeft,
  ArrowRight,
  Code2,
  ExternalLink,
  GitBranch,
  Rocket,
  Terminal,
} from "lucide-react";

const labs = [
  {
    title: "AI Project Builder",
    description:
      "Turn an idea into a clear project plan with features, architecture, and a practical build roadmap.",
    icon: Wrench,
    tag: "Plan",
    href: "/challenge",
  },
  {
    title: "Code Playground",
    description:
      "Use this space to experiment with code ideas, test approaches, and build small prototypes.",
    icon: Terminal,
    tag: "Build",
    href: "/toolkit",
  },
  {
    title: "GitHub Workflow",
    description:
      "Follow a clean flow from idea → branch → implementation → commit → pull request.",
    icon: GitBranch,
    tag: "Ship",
    href: "https://github.com/",
    external: true,
  },
  {
    title: "Project Launch",
    description:
      "Move a finished project toward deployment with resources for hosting, APIs, UI and production setup.",
    icon: Rocket,
    tag: "Launch",
    href: "/toolkit",
  },
];

const workflow = [
  ["01", "Choose an idea", "Start with a real problem worth solving."],
  ["02", "Plan the build", "Define features, stack and architecture."],
  ["03", "Build & test", "Implement, debug and improve your project."],
  ["04", "Ship it", "Deploy, document and share your work."],
];

export default function BuildLabPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-5 py-8 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-slate-300 transition hover:border-cyan-400/30 hover:text-cyan-300"
        >
          <ArrowLeft className="h-4 w-4" />
          Back Home
        </Link>

        <section className="relative mt-6 overflow-hidden rounded-[34px] border border-white/10 bg-white/[0.025] p-6 sm:p-10">
          <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" />

          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-cyan-300">
              <Wrench className="h-3.5 w-3.5" />
              Build Lab
            </div>

            <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-6xl">
              From idea to
              <span className="text-cyan-300"> working project.</span>
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
              A practical workspace for builders. Plan ideas, explore tools,
              improve your workflow and ship projects instead of leaving them
              unfinished.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/challenge"
                className="inline-flex items-center gap-2 rounded-xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
              >
                Start Building
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/toolkit"
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-medium text-slate-200 transition hover:border-cyan-400/30 hover:text-cyan-300"
              >
                Explore Toolkit
                <ExternalLink className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        <section className="mt-8">
          <div className="mb-5">
            <p className="text-[10px] uppercase tracking-[0.18em] text-slate-600">
              Builder Workspace
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
              Pick your next move
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {labs.map((lab) => {
              const Icon = lab.icon;

              const content = (
                <div className="group h-full rounded-[25px] border border-white/10 bg-white/[0.025] p-5 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/30 hover:bg-white/[0.045]">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
                      <Icon className="h-5 w-5" />
                    </div>

                    <span className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[9px] uppercase tracking-[0.14em] text-slate-500">
                      {lab.tag}
                    </span>
                  </div>

                  <h3 className="mt-5 text-lg font-semibold text-white">
                    {lab.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {lab.description}
                  </p>

                  <div className="mt-5 inline-flex items-center gap-2 text-xs font-medium text-cyan-300">
                    Open Lab
                    <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                  </div>
                </div>
              );

              return lab.external ? (
                <a
                  key={lab.title}
                  href={lab.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {content}
                </a>
              ) : (
                <Link key={lab.title} href={lab.href}>
                  {content}
                </Link>
              );
            })}
          </div>
        </section>

        <section className="mt-8 rounded-[30px] border border-white/10 bg-white/[0.025] p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-400/10 text-violet-300">
              <Code2 className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-slate-500">
                Simple workflow
              </p>
              <h2 className="mt-1 text-2xl font-semibold text-white">
                Build → Test → Ship
              </h2>
            </div>
          </div>

          <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {workflow.map(([number, title, description]) => (
              <div
                key={number}
                className="rounded-2xl border border-white/10 bg-black/20 p-4"
              >
                <div className="text-xs font-semibold text-cyan-300">
                  {number}
                </div>
                <h3 className="mt-3 text-sm font-semibold text-white">
                  {title}
                </h3>
                <p className="mt-2 text-xs leading-5 text-slate-500">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-[28px] border border-emerald-400/10 bg-emerald-400/[0.025] p-6">
          <div className="flex gap-4">
            <div>
              <h2 className="text-sm font-semibold text-white">
                Build Lab is designed for builders
              </h2>
              <p className="mt-2 text-xs leading-6 text-slate-500">
                Keep your project process simple: find a problem, make a plan,
                build something useful, test it, and ship it.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
