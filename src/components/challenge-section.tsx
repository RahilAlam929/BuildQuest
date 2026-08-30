"use client";

import Link from "next/link";
import {
  ArrowRight,
  Brain,
  Code2,
  Lightbulb,
  Layers3,
} from "lucide-react";

const challenges = [
  {
    title: "AI Hackathon",
    subtitle: "Real-world product sprint",
    slug: "hackathon",
    badge: "Live",
    meta: "48–72h",
    gradient: "from-sky-500/20 via-cyan-500/10 to-blue-500/20",
    iconBg: "bg-sky-500/10 text-sky-300 border-sky-500/20",
    icon: <Code2 className="h-5 w-5" />,
  },
  {
    title: "Ideathon",
    subtitle: "Ideas, strategy, and pitch",
    slug: "ideathon",
    badge: "Open",
    meta: "1–2 days",
    gradient: "from-fuchsia-500/20 via-violet-500/10 to-sky-500/20",
    iconBg: "bg-fuchsia-500/10 text-fuchsia-300 border-fuchsia-500/20",
    icon: <Lightbulb className="h-5 w-5" />,
  },
  {
    title: "Weekly Challenge",
    subtitle: "One sharp build every week",
    slug: "weekly-ai",
    badge: "Featured",
    meta: "7 days",
    gradient: "from-emerald-500/20 via-green-500/10 to-cyan-500/20",
    iconBg: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
    icon: <Brain className="h-5 w-5" />,
  },
];

export default function ChallengeSection() {
  return (
    <section className="section-shell relative overflow-hidden p-4 sm:p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <div className="badge-pill inline-flex items-center gap-2 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-cyan-300">
            Challenges
          </div>

          <h2 className="mt-3 text-xl font-semibold tracking-tight text-white sm:text-2xl">
            Challenge arena
          </h2>
        </div>

        <div className="inline-flex items-center gap-2">
          <div className="chip-soft inline-flex items-center gap-2 px-3 py-1.5 text-[11px] text-slate-300">
            <Layers3 className="h-3.5 w-3.5 text-cyan-300" />
            3 Formats
          </div>

          <Link
            href="/challenge"
            className="chip-soft inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] text-slate-300 transition hover:border-cyan-400/20 hover:text-cyan-300"
          >
            View all
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      <div className="inner-shell mt-4 p-2.5 sm:p-3">
        <div className="grid gap-3 lg:grid-cols-3">
          {challenges.map((item) => (
            <Link
              key={item.slug}
              href={`/challenge/${item.slug}`}
              className={`card-compact group overflow-hidden rounded-[20px] bg-gradient-to-br ${item.gradient} p-[1px]`}
            >
              <div className="h-full rounded-[19px] bg-slate-950/90 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div
                    className={`inline-flex h-10 w-10 items-center justify-center rounded-xl border ${item.iconBg}`}
                  >
                    {item.icon}
                  </div>

                  <div className="flex flex-col items-end gap-1.5">
                    <span className="chip-soft px-2 py-1 text-[9px] uppercase tracking-[0.16em] text-slate-300">
                      {item.badge}
                    </span>
                    <span className="text-[10px] text-slate-500">
                      {item.meta}
                    </span>
                  </div>
                </div>

                <div className="mt-4">
                  <h3 className="text-base font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-slate-400">
                    {item.subtitle}
                  </p>
                </div>

                <div className="mt-5 flex items-center justify-between">
                  <div className="text-sm font-medium text-cyan-300">Open</div>
                  <ArrowRight className="h-4 w-4 text-slate-500 transition group-hover:translate-x-1 group-hover:text-cyan-300" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}