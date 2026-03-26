import Link from "next/link";
import { ArrowUpRight, BookOpen, Trophy, Images, Brain, NotebookPen } from "lucide-react";

const items = [
  {
    title: "Developer Toolkit",
    description: "Templates, APIs, starter kits, and practical resources.",
    href: "/toolkit",
    icon: BookOpen,
  },
  {
    title: "Leaderboard",
    description: "Top builders, fastest teams, and standout performers.",
    href: "/leaderboard",
    icon: Trophy,
  },
  {
    title: "Submission Gallery",
    description: "Featured community projects and challenge builds.",
    href: "/gallery",
    icon: Images,
  },
  {
    title: "Problem Bank",
    description: "Archive of real-world challenge problems and ideas.",
    href: "/problem-bank",
    icon: Brain,
  },
  {
    title: "Build Journal",
    description: "Product logs, updates, and builder journey notes.",
    href: "/journal",
    icon: NotebookPen,
  },
];

export default function PlatformLinksSection() {
  return (
    <section className="rounded-[32px] border border-slate-800/70 bg-slate-950/50 p-6 sm:p-8">
      <h2 className="text-2xl font-semibold text-white sm:text-3xl">
        Explore the platform
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-400">
        Open dedicated pages for resources, rankings, community builds, archived problems, and product updates.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.title}
              href={item.href}
              className="group rounded-3xl border border-slate-800/70 bg-slate-900/40 p-5 transition hover:border-cyan-400/30 hover:bg-slate-900/60"
            >
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-700 bg-slate-950/60 text-cyan-300">
                <Icon className="h-5 w-5" />
              </div>

              <h3 className="mt-5 text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">{item.description}</p>

              <div className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-cyan-300 transition group-hover:text-sky-300">
                Open Page
                <ArrowUpRight className="h-4 w-4" />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}