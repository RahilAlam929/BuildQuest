import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Brain,
  Code2,
  Database,
  GitBranch,
  Globe,
  Layers3,
  Network,
  Rocket,
  ShieldCheck,
  Terminal,
  Trophy,
  Wrench,
  Cloud,
} from "lucide-react";

import ResourcesSection from "@/components/resources-section";
import EventsSection from "@/components/events-section";

const learningPaths = [
  {
    title: "Web Development",
    description: "HTML, CSS, JavaScript, React, Next.js and modern full-stack development.",
    icon: Globe,
    href: "#learning",
    meta: "Frontend → Full Stack",
  },
  {
    title: "AI & Machine Learning",
    description: "Python, machine learning, deep learning and practical AI projects.",
    icon: Brain,
    href: "#learning",
    meta: "Python → ML → AI",
  },
  {
    title: "Data Science",
    description: "SQL, Python, analytics, visualization and data-driven problem solving.",
    icon: Database,
    href: "#learning",
    meta: "SQL → Analytics",
  },
  {
    title: "DevOps & Cloud",
    description: "Linux, Docker, CI/CD, cloud infrastructure and deployment.",
    icon: Cloud,
    href: "#learning",
    meta: "Linux → Cloud",
  },
  {
    title: "Cybersecurity",
    description: "Networking, security fundamentals, systems and ethical security practice.",
    icon: ShieldCheck,
    href: "#learning",
    meta: "Network → Security",
  },
  {
    title: "Mobile Development",
    description: "Build modern Android and cross-platform applications.",
    icon: Layers3,
    href: "#learning",
    meta: "Flutter → Apps",
  },
];

const practiceAreas = [
  {
    icon: Terminal,
    title: "Linux",
    text: "Terminal, filesystem, permissions and everyday commands.",
  },
  {
    icon: GitBranch,
    title: "Git & GitHub",
    text: "Version control, branches, pull requests and open source.",
  },
  {
    icon: Network,
    title: "Networking",
    text: "Understand HTTP, DNS, TCP/IP and how systems communicate.",
  },
  {
    icon: Code2,
    title: "Coding Practice",
    text: "Turn concepts into working code through practical problems.",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-slate-950 text-white">
      {/* HERO */}
      <section className="relative border-b border-white/[0.06]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.12),transparent_35%),radial-gradient(circle_at_90%_40%,rgba(139,92,246,0.08),transparent_30%)]" />

        <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-16 sm:px-8 sm:pb-24 sm:pt-20 lg:px-10">
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/15 bg-cyan-400/[0.06] px-4 py-2 text-[10px] font-medium uppercase tracking-[0.2em] text-cyan-300">
              <Rocket className="h-3.5 w-3.5" />
              Learn • Practice • Build
            </div>

            <h1 className="mt-7 text-4xl font-semibold tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl">
              Build skills.
              <span className="block bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">
                Ship real projects.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
              BuildQuest is a practical learning hub for developers.
              Follow roadmaps, learn essential technologies, practice with
              real resources and take on challenges that turn knowledge into
              projects.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="#learning"
                className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-cyan-400 px-6 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 sm:w-auto"
              >
                Start Learning
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </Link>

              <Link
                href="/challenge"
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-6 text-sm font-medium text-slate-200 transition hover:border-cyan-400/30 hover:bg-white/[0.06] sm:w-auto"
              >
                <Trophy className="h-4 w-4 text-cyan-300" />
                Explore Challenges
              </Link>
            </div>
          </div>

          {/* HERO STATS */}
          <div className="mx-auto mt-14 grid max-w-4xl grid-cols-2 overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.025] sm:grid-cols-4">
            {[
              ["10+", "Learning Paths"],
              ["100+", "Resources"],
              ["Practical", "Learning"],
              ["Free", "To Explore"],
            ].map(([value, label]) => (
              <div
                key={label}
                className="border-b border-white/[0.06] p-5 text-center last:border-0 sm:border-b-0 sm:border-r sm:last:border-r-0"
              >
                <div className="text-lg font-semibold text-white">
                  {value}
                </div>
                <div className="mt-1 text-[10px] uppercase tracking-[0.15em] text-slate-600">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LEARNING PATHS */}
      <section
        id="learning"
        className="relative px-5 py-16 sm:px-8 sm:py-20 lg:px-10"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-9 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-cyan-400">
                Learning Paths
              </div>

              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Choose what you want to build.
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500">
                Start with a path, follow the fundamentals and gradually move
                toward real-world development.
              </p>
            </div>

            <Link
              href="#roadmaps"
              className="inline-flex items-center gap-2 text-xs font-medium text-slate-400 transition hover:text-cyan-300"
            >
              View roadmaps
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {learningPaths.map((path) => {
              const Icon = path.icon;

              return (
                <Link
                  key={path.title}
                  href={path.href}
                  className="group relative overflow-hidden rounded-[24px] border border-white/[0.07] bg-white/[0.025] p-5 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/20 hover:bg-white/[0.04]"
                >
                  <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-cyan-400/5 blur-3xl transition group-hover:bg-cyan-400/10" />

                  <div className="relative">
                    <div className="flex items-start justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-400/15 bg-cyan-400/[0.07] text-cyan-300">
                        <Icon className="h-5 w-5" />
                      </div>

                      <ArrowUpRight className="h-4 w-4 text-slate-700 transition group-hover:text-cyan-300" />
                    </div>

                    <h3 className="mt-5 text-base font-semibold text-white">
                      {path.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      {path.description}
                    </p>

                    <div className="mt-5 text-[10px] uppercase tracking-[0.16em] text-slate-600">
                      {path.meta}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* PRACTICE */}
      <section className="border-y border-white/[0.06] bg-white/[0.015] px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <div className="text-[10px] uppercase tracking-[0.2em] text-violet-400">
              Learn by doing
            </div>

            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Practice the things developers actually use.
            </h2>

            <p className="mt-3 text-sm leading-7 text-slate-500">
              Go beyond watching tutorials. Build a strong foundation in the
              tools, systems and workflows used in real projects.
            </p>
          </div>

          <div className="mt-9 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {practiceAreas.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-[22px] border border-white/[0.07] bg-slate-950/60 p-5 transition hover:border-violet-400/20"
                >
                  <Icon className="h-5 w-5 text-violet-300" />

                  <h3 className="mt-5 text-sm font-semibold text-white">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-xs leading-6 text-slate-500">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* EXISTING RESOURCES */}
      <ResourcesSection />

      {/* EVENTS + UPDATES */}
      <EventsSection />

      {/* FINAL CTA */}
      <section className="px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-[30px] border border-cyan-400/10 bg-gradient-to-br from-cyan-400/[0.08] via-white/[0.025] to-violet-400/[0.06] p-7 text-center sm:p-12">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-400/15 bg-cyan-400/10 text-cyan-300">
            <Rocket className="h-5 w-5" />
          </div>

          <h2 className="mt-6 text-2xl font-semibold text-white sm:text-3xl">
            Don't just learn. Build something.
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-500">
            Pick a roadmap, learn the fundamentals, use the right tools and
            put your skills into practice through real projects and challenges.
          </p>

          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="#learning"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-xs font-semibold text-slate-950 transition hover:bg-cyan-200"
            >
              Start Learning
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>

            <Link
              href="/toolkit"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3 text-xs font-medium text-slate-300 transition hover:border-cyan-400/20 hover:text-cyan-300"
            >
              <Wrench className="h-3.5 w-3.5" />
              Explore Toolkit
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
