import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2, Code2, Rocket } from "lucide-react";
import { projectIdeas } from "@/data/projects";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = projectIdeas.find((item) => item.id === id);

  if (!project) notFound();

  return (
    <main className="min-h-screen bg-slate-950 px-5 py-8 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/build-lab"
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-slate-300 hover:text-cyan-300"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Build Lab
        </Link>

        <section className="mt-6 rounded-[32px] border border-white/10 bg-white/[0.025] p-6 sm:p-10">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
            <Code2 className="h-6 w-6" />
          </div>

          <div className="mt-6 text-xs uppercase tracking-[0.18em] text-cyan-300">
            {project.category}
          </div>

          <h1 className="mt-3 text-4xl font-semibold text-white sm:text-5xl">
            {project.title}
          </h1>

          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-400">
            {project.description}
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
              <p className="text-xs text-slate-500">Difficulty</p>
              <p className="mt-2 font-semibold text-white">
                {project.difficulty}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
              <p className="text-xs text-slate-500">Estimated Time</p>
              <p className="mt-2 font-semibold text-white">{project.time}</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
              <p className="text-xs text-slate-500">Category</p>
              <p className="mt-2 font-semibold text-white">
                {project.category}
              </p>
            </div>
          </div>

          <div className="mt-10">
            <h2 className="flex items-center gap-2 text-xl font-semibold text-white">
              <Rocket className="h-5 w-5 text-cyan-300" />
              Build Checklist
            </h2>

            <div className="mt-5 space-y-3">
              {[
                "Define the problem and target user",
                "Design the first usable version",
                "Build the core functionality",
                "Test the product with real users",
                "Deploy and document your project",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-sm text-slate-300"
                >
                  <CheckCircle2 className="h-4 w-4 text-cyan-300" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10">
            <h2 className="text-xl font-semibold text-white">Recommended Stack</h2>

            <div className="mt-4 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-slate-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
