import Link from "next/link";
import {
  ArrowRight,
  Code2,
  GitBranch,
  Rocket,
  Terminal,
  Sparkles,
} from "lucide-react";

const labs = [
  {
    title: "Project Builder",
    description:
      "Turn an idea into a structured project with features, stack and development steps.",
    icon: Code2,
    tag: "Build",
  },
  {
    title: "Git & GitHub Lab",
    description:
      "Practice branches, commits, pull requests and real open-source workflows.",
    icon: GitBranch,
    tag: "Open Source",
  },
  {
    title: "Terminal Lab",
    description:
      "Learn practical Linux, Git, Docker and developer terminal commands.",
    icon: Terminal,
    tag: "Practice",
  },
  {
    title: "Ship Your Project",
    description:
      "Go from local development to deployment with a simple production workflow.",
    icon: Rocket,
    tag: "Deploy",
  },
];

export default function BuildLabPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-5 py-10 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-slate-300 hover:border-cyan-400/30 hover:text-cyan-300"
        >
          ← Back Home
        </Link>

        <section className="relative mt-6 overflow-hidden rounded-[36px] border border-white/10 bg-white/[0.025] p-7 sm:p-10">
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" />

          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-cyan-300">
              <Sparkles className="h-3.5 w-3.5" />
              Build Lab
            </div>

            <h1 className="mt-6 max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-6xl">
              Learn by building.
              <span className="block text-cyan-300">
                Ship something real.
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
              A practical workspace for developers to learn, experiment,
              build projects and improve their engineering workflow.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {labs.map((lab) => {
                const Icon = lab.icon;

                return (
                  <div
                    key={lab.title}
                    className="group rounded-[26px] border border-white/10 bg-slate-900/60 p-6 transition hover:-translate-y-1 hover:border-cyan-400/20 hover:bg-slate-900"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
                        <Icon className="h-5 w-5" />
                      </div>

                      <span className="rounded-full border border-white/10 px-2.5 py-1 text-[9px] uppercase tracking-wider text-slate-500">
                        {lab.tag}
                      </span>
                    </div>

                    <h2 className="mt-6 text-xl font-semibold text-white">
                      {lab.title}
                    </h2>

                    <p className="mt-3 text-sm leading-6 text-slate-400">
                      {lab.description}
                    </p>

                    <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-cyan-300">
                      Explore Lab
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
