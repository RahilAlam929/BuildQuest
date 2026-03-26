"use client";

import Link from "next/link";
import {
  ArrowRight,
  Brain,
  Code2,
  Lightbulb,
  Sparkles,
  Trophy,
  Zap,
} from "lucide-react";

const challengeCards = [
  {
    title: "AI Hackathon",
    subtitle: "Build real-world AI solutions",
    type: "hackathon",
    description:
      "Create practical AI products, tools, or assistants that solve meaningful real-world problems.",
    highlights: [
      "Team-based innovation",
      "Product + execution focused",
      "Portfolio-worthy builds",
    ],
    accent:
      "from-sky-500/20 via-cyan-500/10 to-blue-500/20",
    iconBg: "bg-sky-500/10 text-sky-300 border-sky-500/20",
    button:
      "from-sky-500 via-cyan-500 to-blue-500",
    icon: <Code2 className="h-5 w-5" />,
    exploreHref: "/challenge/hackathon",
    registerHref: "/challenge/register?type=hackathon",
    submitHref: "/challenge/submit?type=hackathon",
  },
  {
    title: "Ideathon",
    subtitle: "Think deeply. Design boldly.",
    type: "ideathon",
    description:
      "Present strong concepts, creative product thinking, and scalable solutions for important challenges.",
    highlights: [
      "Idea-first innovation",
      "Problem solving framework",
      "Strong presentation value",
    ],
    accent:
      "from-fuchsia-500/20 via-violet-500/10 to-sky-500/20",
    iconBg: "bg-fuchsia-500/10 text-fuchsia-300 border-fuchsia-500/20",
    button:
      "from-fuchsia-500 via-violet-500 to-sky-500",
    icon: <Lightbulb className="h-5 w-5" />,
    exploreHref: "/challenge/ideathon",
    registerHref: "/challenge/register?type=ideathon",
    submitHref: "/challenge/submit?type=ideathon",
  },
  {
    title: "Weekly Challenge",
    subtitle: "One problem. One focused build.",
    type: "weekly-debugging",
    description:
      "Every week, solve a fresh builder challenge designed to sharpen execution, creativity, and consistency.",
    highlights: [
      "New challenge every week",
      "Fast execution mindset",
      "Skill-building through practice",
    ],
    accent:
      "from-cyan-500/20 via-blue-500/10 to-violet-500/20",
    iconBg: "bg-cyan-500/10 text-cyan-300 border-cyan-500/20",
    button:
      "from-cyan-500 via-sky-500 to-violet-500",
    icon: <Brain className="h-5 w-5" />,
    exploreHref: "/challenge/weekly",
    registerHref: "/challenge/register?type=weekly-debugging",
    submitHref: "/challenge/submit?type=weekly-debugging",
  },
];

export default function ChallengeSection() {
  return (
    <section className="relative overflow-hidden rounded-[32px] border border-slate-800/70 bg-slate-950/55 p-6 sm:p-8">
      <div className="pointer-events-none absolute -left-20 top-8 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-0 h-40 w-40 rounded-full bg-fuchsia-500/10 blur-3xl" />

      <div className="relative">
        {/* Header */}
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-cyan-300">
          <Sparkles className="h-4 w-4" />
          Challenge Arena
        </div>

        <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-4xl">
              Build, compete, and grow through challenges
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-400 sm:text-base">
              Explore hackathons, ideathons, and weekly build challenges designed
              to help developers and builders create stronger projects, sharper
              ideas, and real proof of execution.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-2 text-sm text-amber-300">
            <Trophy className="h-4 w-4" />
            Build like a founder
          </div>
        </div>

        {/* Cards */}
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {challengeCards.map((card) => (
            <div
              key={card.type}
              className={`group rounded-[28px] border border-slate-800/70 bg-gradient-to-br ${card.accent} p-[1px]`}
            >
              <div className="h-full rounded-[27px] bg-slate-950/90 p-5 sm:p-6">
                <div className="flex items-start justify-between gap-3">
                  <div
                    className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl border ${card.iconBg}`}
                  >
                    {card.icon}
                  </div>

                  <span className="rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-slate-400">
                    {card.type === "weekly-debugging"
                      ? "Weekly"
                      : card.type}
                  </span>
                </div>

                <h3 className="mt-5 text-xl font-semibold text-white">
                  {card.title}
                </h3>
                <p className="mt-1 text-sm font-medium text-cyan-300">
                  {card.subtitle}
                </p>

                <p className="mt-4 text-sm leading-6 text-slate-400">
                  {card.description}
                </p>

                <div className="mt-5 space-y-2">
                  {card.highlights.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2 text-sm text-slate-300"
                    >
                      <Zap className="h-4 w-4 text-cyan-300" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 grid gap-3">
                  <Link
                    href={card.exploreHref}
                    className={`inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r ${card.button} px-5 py-3 text-sm font-semibold text-white transition hover:brightness-110`}
                  >
                    Explore Challenge
                    <ArrowRight className="h-4 w-4" />
                  </Link>

                  <div className="grid grid-cols-2 gap-3">
                    <Link
                      href={card.registerHref}
                      className="inline-flex items-center justify-center rounded-2xl border border-slate-700 bg-slate-900/50 px-4 py-3 text-sm font-medium text-slate-200 transition hover:border-cyan-400 hover:text-cyan-300"
                    >
                      Register
                    </Link>

                    <Link
                      href={card.submitHref}
                      className="inline-flex items-center justify-center rounded-2xl border border-slate-700 bg-slate-900/50 px-4 py-3 text-sm font-medium text-slate-200 transition hover:border-cyan-400 hover:text-cyan-300"
                    >
                      Submit
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom helper */}
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-800/70 bg-slate-900/35 p-4">
            <div className="text-sm font-semibold text-white">Explore</div>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Open challenge details, problem statements, and format before joining.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800/70 bg-slate-900/35 p-4">
            <div className="text-sm font-semibold text-white">Register</div>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Sign up, get your Team ID, and receive confirmation on your email.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800/70 bg-slate-900/35 p-4">
            <div className="text-sm font-semibold text-white">Submit</div>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Verify your Team ID, upload your work, and complete your final submission.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}