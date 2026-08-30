import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { challengeData, challengeSteps, overviewStats } from "./data";

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-xl transition duration-300 hover:border-cyan-400/30 hover:bg-white/[0.05]">
      <div className="flex items-center gap-2 text-cyan-300">
        {icon}
        <span className="text-xs uppercase tracking-[0.18em] text-slate-400">
          {label}
        </span>
      </div>
      <div className="mt-3 text-xl font-semibold text-white">{value}</div>
    </div>
  );
}

export default function ChallengePage() {
  const challenges = Object.values(challengeData);

  return (
    <main className="min-h-screen bg-slate-950 px-5 py-8 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <section className="relative overflow-hidden rounded-[36px] border border-slate-800/70 bg-slate-950/70 px-5 py-6 sm:px-8 sm:py-8 lg:px-10 lg:py-10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.035)_1px,transparent_1px)] [background-size:24px_24px]" />
          <div className="pointer-events-none absolute -left-24 top-10 h-56 w-56 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="pointer-events-none absolute right-[-30px] top-0 h-52 w-52 rounded-full bg-fuchsia-500/10 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 left-1/3 h-56 w-56 rounded-full bg-emerald-500/10 blur-3xl" />

          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-cyan-300">
              Challenge Hub
            </div>

            <div className="mt-5 max-w-4xl">
              <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                Explore all challenge formats
              </h1>
              <p className="mt-4 text-sm leading-7 text-slate-400 sm:text-base">
                Pick a challenge that matches your style — build products,
                present ideas, or ship one strong project every week.
              </p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {overviewStats.map((stat) => (
                <StatCard
                  key={stat.label}
                  icon={stat.icon}
                  label={stat.label}
                  value={stat.value}
                />
              ))}
            </div>

            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {challenges.map((challenge) => (
                <Link
                  key={challenge.slug}
                  href={`/challenge/${challenge.slug}`}
                  className={`group relative z-10 block cursor-pointer overflow-hidden rounded-[28px] border border-slate-800/70 bg-gradient-to-br ${challenge.softTheme} p-[1px] transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyan-500/10`}
                >
                  <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_35%)]" />
                  <div className="relative h-full rounded-[27px] bg-slate-950/90 p-5 sm:p-6">
                    <div className="flex items-start justify-between gap-3">
                      <div
                        className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl border ${challenge.iconBg}`}
                      >
                        {challenge.icon}
                      </div>

                      <span className="rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-slate-400 transition group-hover:border-cyan-400 group-hover:text-cyan-300">
                        {challenge.badge}
                      </span>
                    </div>

                    <h3 className="mt-5 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-xl font-semibold text-transparent">
                      {challenge.title}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-cyan-300">
                      {challenge.subtitle}
                    </p>
                    <p className="mt-4 text-sm leading-6 text-slate-400">
                      {challenge.shortDescription}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-slate-300">
                        {challenge.duration}
                      </span>
                      <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-slate-300">
                        {challenge.team}
                      </span>
                    </div>

                    <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-cyan-300">
                      Open Challenge
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-10 rounded-[30px] border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl sm:p-7">
              <div className="max-w-2xl">
                <div className="text-xs uppercase tracking-[0.18em] text-slate-400">
                  Builder Flow
                </div>
                <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
                  Clean journey from idea to submission
                </h2>
              </div>

              <div className="mt-7 grid gap-4 lg:grid-cols-4">
                {challengeSteps.map((step, index) => (
                  <div
                    key={step.title}
                    className="rounded-[26px] border border-white/10 bg-slate-900/50 p-5 transition duration-300 hover:border-cyan-400/20 hover:bg-slate-900/80"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-300">
                        {step.icon}
                      </div>
                      <div className="text-xs font-semibold text-slate-500">
                        0{index + 1}
                      </div>
                    </div>

                    <div className="mt-4 text-lg font-semibold text-white">
                      {step.title}
                    </div>
                    <p className="mt-2 text-sm leading-7 text-slate-400">
                      {step.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}