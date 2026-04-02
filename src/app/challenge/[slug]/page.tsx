import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  FileText,
  Trophy,
  Target,
} from "lucide-react";
import { challengeData } from "../data";

function MetaCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
      <div className="text-xs uppercase tracking-[0.16em] text-slate-400">
        {label}
      </div>
      <div className="mt-2 text-lg font-semibold text-white">{value}</div>
    </div>
  );
}

export default async function ChallengeDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const challenge = challengeData[slug as keyof typeof challengeData];

  if (!challenge) return notFound();

  return (
    <main className="min-h-screen bg-slate-950 px-5 py-8 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/challenge"
          className="inline-flex items-center gap-2 rounded-2xl border border-slate-700 bg-slate-900/60 px-4 py-2 text-sm text-slate-300 transition hover:border-cyan-400 hover:text-cyan-300"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Challenges
        </Link>

        <section
          className={`mt-6 overflow-hidden rounded-[32px] border border-slate-800/70 bg-gradient-to-br ${challenge.softTheme} p-[1px]`}
        >
          <div className="rounded-[31px] bg-slate-950/90 p-6 sm:p-8">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <div
                  className={`inline-flex items-center gap-3 rounded-2xl border ${challenge.iconBg} px-4 py-3`}
                >
                  {challenge.icon}
                  <span className="text-sm font-semibold text-white">
                    {challenge.title}
                  </span>
                </div>

                <h1 className="mt-6 text-3xl font-semibold text-white sm:text-5xl">
                  {challenge.title}
                </h1>

                <p className="mt-2 text-lg text-cyan-300">
                  {challenge.subtitle}
                </p>

                <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-400 sm:text-base">
                  {challenge.description}
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  <MetaCard label="Duration" value={challenge.duration} />
                  <MetaCard label="Team" value={challenge.team} />
                  <MetaCard label="Goal" value={challenge.goal} />
                </div>

                <div className="mt-8">
                  <div className="text-sm font-semibold text-white">
                    Why this challenge matters
                  </div>

                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    {challenge.benefits.map((item) => (
                      <div
                        key={item}
                        className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm leading-6 text-slate-300"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href={`/challenge/${challenge.slug}/problem-statement`}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-5 py-3.5 text-sm font-semibold text-emerald-300 transition hover:border-emerald-400/40 hover:bg-emerald-500/15"
                  >
                    <FileText className="h-4 w-4" />
                    Full Problem Statement
                  </Link>

                  <Link
                    href={`/challenge/register?type=${challenge.slug}`}
                    className={`inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r ${challenge.theme} px-5 py-3.5 text-sm font-semibold text-white transition duration-300 hover:brightness-110`}
                  >
                    Register Now
                    <ArrowRight className="h-4 w-4" />
                  </Link>

                  <Link
                    href={`/challenge/submit?type=${challenge.slug}`}
                    className="inline-flex items-center justify-center rounded-2xl border border-slate-700 bg-slate-900/60 px-5 py-3.5 text-sm font-medium text-slate-200 transition hover:border-cyan-400 hover:text-cyan-300"
                  >
                    Submit Project
                  </Link>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
                  <div className="flex items-center gap-2 text-sm font-semibold text-white">
                    <Target className="h-4 w-4 text-cyan-300" />
                    Suggested Tracks
                  </div>

                  <div className="mt-4 space-y-3">
                    {challenge.tracks.map((track) => (
                      <div
                        key={track.title}
                        className="rounded-2xl border border-white/10 bg-slate-900/55 p-4 transition duration-300 hover:border-cyan-400/20 hover:bg-slate-900/75"
                      >
                        <div className="flex items-center gap-2 text-cyan-300">
                          {track.icon}
                          <div className="text-sm font-medium text-white">
                            {track.title}
                          </div>
                        </div>
                        <p className="mt-2 text-sm leading-6 text-slate-400">
                          {track.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
                  <div className="flex items-center gap-2 text-sm font-semibold text-white">
                    <Trophy className="h-4 w-4 text-amber-300" />
                    Judging Focus
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    {challenge.judging.map((point) => (
                      <div
                        key={point}
                        className="rounded-2xl border border-white/10 bg-slate-900/50 px-3 py-3 text-sm text-slate-300"
                      >
                        {point}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
                  <div className="text-sm font-semibold text-white">
                    Winning mindset
                  </div>
                  <div className="mt-4 space-y-3">
                    {challenge.points.map((point) => (
                      <div
                        key={point}
                        className="rounded-2xl border border-white/10 bg-slate-900/50 px-4 py-3 text-sm text-slate-300"
                      >
                        {point}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}