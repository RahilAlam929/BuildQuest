import Link from "next/link";
import { ArrowLeft, Github, Globe } from "lucide-react";

const submissions = [
  {
    title: "AI Debugging Assistant",
    team: "CodeCrafters",
    type: "Weekly Challenge",
    description: "Explains stack traces and suggests fixes in developer-friendly language.",
    demo: "#",
    github: "#",
    tags: ["AI", "Developer Tools", "Next.js"],
  },
  {
    title: "GitHub Project Analyzer",
    team: "BuildSprint",
    type: "Weekly Challenge",
    description: "Analyzes README quality and project completeness.",
    demo: "#",
    github: "#",
    tags: ["GitHub", "Analytics", "Portfolio"],
  },
];

export default function GalleryPage() {
  return (
    <main className="mx-auto min-h-screen max-w-6xl px-4 py-12 text-white">
      <Link href="/" className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/50 px-4 py-2 text-sm text-slate-300">
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </Link>

      <div className="mt-6 rounded-[32px] border border-slate-800/70 bg-slate-950/60 p-6 sm:p-8">
        <div className="inline-flex rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-violet-300">
          Submission Gallery
        </div>

        <h1 className="mt-4 text-3xl font-semibold sm:text-4xl">Featured community builds</h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400">
          Showcasing submissions, ideas, and projects built through challenges.
        </p>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {submissions.map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-slate-800/70 bg-slate-900/40 p-5"
            >
              <div className="h-40 rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900" />

              <div className="mt-5 flex items-center justify-between gap-3">
                <span className="rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-violet-300">
                  {item.type}
                </span>
                <span className="text-xs text-slate-500">{item.team}</span>
              </div>

              <h2 className="mt-4 text-lg font-semibold">{item.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">{item.description}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-slate-700 bg-slate-950/60 px-3 py-1 text-[11px] text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-5 flex items-center gap-3">
                <Link href={item.demo} className="inline-flex items-center gap-2 rounded-full border border-sky-500/20 bg-sky-500/10 px-4 py-2 text-sm font-medium text-sky-300">
                  <Globe className="h-4 w-4" />
                  Demo
                </Link>

                <Link href={item.github} className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-950/60 px-4 py-2 text-sm font-medium text-slate-200">
                  <Github className="h-4 w-4" />
                  GitHub
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}