"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  FolderKanban,
  Layers3,
  Lightbulb,
  Mail,
  Sparkles,
  Target,
  Trophy,
  Users,
  UserCircle2,
} from "lucide-react";

type UserType = {
  name: string;
  email: string;
  college?: string;
  year?: string;
  role?: string;
  profileImage?: string;
};

type RegistrationType = {
  teamId: string;
  challengeType: string;
  teamName?: string;
  teamMembers?: string;
  year?: string;
  role?: string;
  createdAt?: string;
};

type SubmissionType = {
  teamId: string;
  challengeType: string;
  projectLink?: string;
  githubLink?: string;
  note?: string;
  createdAt?: string;
};

export default function DashboardPage() {
  const [data, setData] = useState<{
    user: UserType | null;
    registrations: RegistrationType[];
    submissions: SubmissionType[];
  }>({
    user: null,
    registrations: [],
    submissions: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      try {
        const res = await fetch("/api/auth/me");
        const contentType = res.headers.get("content-type");

        if (!contentType || !contentType.includes("application/json")) {
          const raw = await res.text();
          console.error("Dashboard /api/auth/me non-JSON:", raw);
          throw new Error("Server returned invalid response.");
        }

        const json = await res.json();

        if (json.ok) {
          setData({
            user: json.user || null,
            registrations: json.registrations || [],
            submissions: json.submissions || [],
          });
        }
      } catch (error) {
        console.error("Dashboard fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    run();
  }, []);

  const stats = useMemo(() => {
    const registrations = data.registrations.length;
    const submissions = data.submissions.length;
    const uniqueChallenges = new Set(
      data.registrations.map((item) => item.challengeType)
    ).size;
    const activeTeams = new Set(data.registrations.map((item) => item.teamId)).size;

    return {
      registrations,
      submissions,
      uniqueChallenges,
      activeTeams,
    };
  }, [data.registrations, data.submissions]);

  const recentActivity = useMemo(() => {
    const registrationActivity = data.registrations.map((item) => ({
      type: "registration",
      title: item.teamName || "Untitled Team",
      subtitle: item.challengeType,
      teamId: item.teamId,
      createdAt: item.createdAt || "",
    }));

    const submissionActivity = data.submissions.map((item) => ({
      type: "submission",
      title: item.teamId,
      subtitle: item.challengeType,
      teamId: item.teamId,
      createdAt: item.createdAt || "",
    }));

    return [...registrationActivity, ...submissionActivity]
      .sort((a, b) => {
        const aTime = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const bTime = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return bTime - aTime;
      })
      .slice(0, 6);
  }, [data.registrations, data.submissions]);

  if (loading) {
    return (
      <main className="mx-auto min-h-screen max-w-7xl px-4 py-12 text-white">
        <div className="rounded-[32px] border border-slate-800/70 bg-slate-950/60 p-8">
          <div className="text-lg font-semibold">Loading dashboard...</div>
          <p className="mt-2 text-sm text-slate-400">
            Fetching your profile, registrations, and submissions.
          </p>
        </div>
      </main>
    );
  }

  if (!data.user) {
    return (
      <main className="mx-auto min-h-screen max-w-5xl px-4 py-12 text-white">
        <div className="rounded-[32px] border border-slate-800/70 bg-slate-950/60 p-8 text-center">
          <h1 className="text-2xl font-semibold">Please login first</h1>
          <p className="mt-3 text-sm text-slate-400">
            Your dashboard becomes available after login.
          </p>

          <div className="mt-6 flex justify-center gap-3">
            <Link
              href="/auth/login"
              className="rounded-full border border-slate-700 bg-slate-900/50 px-5 py-2.5 text-sm text-slate-200 transition hover:border-sky-400 hover:text-sky-300"
            >
              Login
            </Link>

            <Link
              href="/auth/signup"
              className="rounded-full bg-gradient-to-r from-sky-500 via-cyan-500 to-violet-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:brightness-110"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-4 py-10 text-white">
      <div className="grid gap-6 xl:grid-cols-[340px_1fr]">
        {/* Sidebar */}
        <aside className="space-y-6">
          <section className="rounded-[32px] border border-slate-800/70 bg-slate-950/70 p-6 shadow-[0_0_0_1px_rgba(15,23,42,0.45),0_18px_40px_rgba(2,6,23,0.36)]">
            <div className="flex flex-col items-center text-center">
              {data.user.profileImage ? (
                <img
                  src={data.user.profileImage}
                  alt={data.user.name}
                  className="h-24 w-24 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-r from-sky-500 via-cyan-500 to-violet-500 text-3xl font-bold">
                  {data.user.name?.charAt(0)?.toUpperCase() || "U"}
                </div>
              )}

              <h1 className="mt-4 text-2xl font-semibold">{data.user.name}</h1>
              <div className="mt-1 inline-flex items-center gap-2 text-sm text-slate-400">
                <Mail className="h-4 w-4" />
                {data.user.email}
              </div>

              <div className="mt-5 w-full space-y-3 text-left">
                <InfoCard label="College / Organization" value={data.user.college || "-"} />
                <InfoCard label="Year" value={data.user.year || "-"} />
                <InfoCard label="Role" value={data.user.role || "-"} />
              </div>
            </div>
          </section>

          <section className="rounded-[32px] border border-slate-800/70 bg-slate-950/70 p-6">
            <div className="flex items-center gap-2 text-cyan-300">
              <Sparkles className="h-4 w-4" />
              <span className="text-xs uppercase tracking-[0.16em]">
                Quick Actions
              </span>
            </div>

            <div className="mt-5 grid gap-3">
              <Link
                href="/#challenge"
                className="inline-flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/40 px-4 py-3 text-sm text-slate-200 transition hover:border-cyan-400 hover:text-cyan-300"
              >
                Explore Challenges
                <ArrowUpRight className="h-4 w-4" />
              </Link>

              <Link
                href="/challenge/register?type=weekly-debugging"
                className="inline-flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/40 px-4 py-3 text-sm text-slate-200 transition hover:border-cyan-400 hover:text-cyan-300"
              >
                New Registration
                <ArrowUpRight className="h-4 w-4" />
              </Link>

              <Link
                href="/challenge/submit?type=weekly-debugging"
                className="inline-flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/40 px-4 py-3 text-sm text-slate-200 transition hover:border-cyan-400 hover:text-cyan-300"
              >
                Submit Solution
                <ArrowUpRight className="h-4 w-4" />
              </Link>

              <Link
                href="/idea-forge"
                className="inline-flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/40 px-4 py-3 text-sm text-slate-200 transition hover:border-cyan-400 hover:text-cyan-300"
              >
                Explore Idea Forge
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </section>
        </aside>

        {/* Main */}
        <section className="space-y-6">
          {/* Stats */}
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              icon={<Layers3 className="h-5 w-5" />}
              title="Registrations"
              value={String(stats.registrations)}
              accent="text-sky-300"
            />
            <StatCard
              icon={<FolderKanban className="h-5 w-5" />}
              title="Submissions"
              value={String(stats.submissions)}
              accent="text-violet-300"
            />
            <StatCard
              icon={<Target className="h-5 w-5" />}
              title="Challenges Joined"
              value={String(stats.uniqueChallenges)}
              accent="text-cyan-300"
            />
            <StatCard
              icon={<Users className="h-5 w-5" />}
              title="Active Teams"
              value={String(stats.activeTeams)}
              accent="text-emerald-300"
            />
          </div>

          {/* Recommended Ideas */}
          <section className="rounded-[32px] border border-slate-800/70 bg-slate-950/70 p-6">
            <div className="flex items-center gap-2 text-cyan-300">
              <Lightbulb className="h-4 w-4" />
              <span className="text-xs uppercase tracking-[0.16em]">
                Recommended Ideas
              </span>
            </div>

            <h2 className="mt-3 text-2xl font-semibold">Build next from Idea Forge</h2>

            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {[
                {
                  title: "AI Resume Reviewer",
                  category: "AI / ML",
                  level: "Intermediate",
                },
                {
                  title: "Student Club Dashboard",
                  category: "Frontend",
                  level: "Intermediate",
                },
                {
                  title: "Habit Tracker App",
                  category: "Mobile",
                  level: "Beginner",
                },
              ].map((item) => (
                <Link
                  key={item.title}
                  href="/idea-forge"
                  className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4 transition hover:border-cyan-400/30"
                >
                  <div className="text-sm font-semibold text-white">{item.title}</div>
                  <div className="mt-2 text-xs uppercase tracking-[0.16em] text-slate-500">
                    {item.category} • {item.level}
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Activity + Progress */}
          <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
            <section className="rounded-[32px] border border-slate-800/70 bg-slate-950/70 p-6">
              <div className="flex items-center gap-2 text-cyan-300">
                <CalendarDays className="h-4 w-4" />
                <span className="text-xs uppercase tracking-[0.16em]">
                  Recent Activity
                </span>
              </div>

              <h2 className="mt-3 text-2xl font-semibold">Latest updates</h2>

              <div className="mt-5 space-y-4">
                {recentActivity.length === 0 ? (
                  <EmptyState text="No activity found yet." />
                ) : (
                  recentActivity.map((item, index) => (
                    <div
                      key={`${item.type}-${item.teamId}-${index}`}
                      className="flex items-start gap-4 rounded-2xl border border-slate-800 bg-slate-900/35 p-4"
                    >
                      <div
                        className={`mt-1 inline-flex h-9 w-9 items-center justify-center rounded-full ${
                          item.type === "registration"
                            ? "bg-sky-500/10 text-sky-300"
                            : "bg-emerald-500/10 text-emerald-300"
                        }`}
                      >
                        {item.type === "registration" ? (
                          <Users className="h-4 w-4" />
                        ) : (
                          <CheckCircle2 className="h-4 w-4" />
                        )}
                      </div>

                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-white">
                          {item.type === "registration"
                            ? "New Registration"
                            : "Submission Completed"}
                        </div>
                        <div className="mt-1 text-sm text-slate-300">{item.title}</div>
                        <div className="mt-1 text-xs uppercase tracking-[0.16em] text-slate-500">
                          {item.subtitle}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>

            <section className="rounded-[32px] border border-slate-800/70 bg-slate-950/70 p-6">
              <div className="flex items-center gap-2 text-amber-300">
                <Trophy className="h-4 w-4" />
                <span className="text-xs uppercase tracking-[0.16em]">
                  Progress Snapshot
                </span>
              </div>

              <h2 className="mt-3 text-2xl font-semibold">Your build status</h2>

              <div className="mt-5 space-y-4">
                <ProgressRow
                  label="Registration Completion"
                  current={stats.registrations}
                  total={3}
                />
                <ProgressRow
                  label="Submission Completion"
                  current={stats.submissions}
                  total={3}
                />
                <ProgressRow
                  label="Challenge Participation"
                  current={stats.uniqueChallenges}
                  total={3}
                />
              </div>
            </section>
          </div>

          {/* Registrations */}
          <section className="rounded-[32px] border border-slate-800/70 bg-slate-950/70 p-6">
            <h2 className="text-2xl font-semibold">My Registrations</h2>

            <div className="mt-5 grid gap-4">
              {data.registrations.length === 0 ? (
                <EmptyState text="No registrations found." />
              ) : (
                data.registrations.map((item, index) => (
                  <div
                    key={`${item.teamId}-${index}`}
                    className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <div className="text-lg font-semibold text-white">
                          {item.teamName || "Untitled Team"}
                        </div>
                        <div className="mt-1 text-sm text-slate-400">
                          {item.challengeType}
                        </div>
                      </div>

                      <div className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs uppercase tracking-[0.16em] text-cyan-300">
                        {item.teamId}
                      </div>
                    </div>

                    <div className="mt-4 grid gap-3 sm:grid-cols-3">
                      <MiniInfo label="Members" value={item.teamMembers || "-"} />
                      <MiniInfo label="Year" value={item.year || "-"} />
                      <MiniInfo label="Role" value={item.role || "-"} />
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>

          {/* Submissions */}
          <section className="rounded-[32px] border border-slate-800/70 bg-slate-950/70 p-6">
            <h2 className="text-2xl font-semibold">My Submissions</h2>

            <div className="mt-5 grid gap-4">
              {data.submissions.length === 0 ? (
                <EmptyState text="No submissions yet." />
              ) : (
                data.submissions.map((item, index) => (
                  <div
                    key={`${item.teamId}-${index}`}
                    className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <div className="text-lg font-semibold text-white">
                          {item.challengeType}
                        </div>
                        <div className="mt-1 text-sm text-slate-400">
                          Team ID: {item.teamId}
                        </div>
                      </div>

                      <div className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs uppercase tracking-[0.16em] text-emerald-300">
                        Submitted
                      </div>
                    </div>

                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      <MiniInfo label="Project Link" value={item.projectLink || "-"} />
                      <MiniInfo label="GitHub Link" value={item.githubLink || "-"} />
                    </div>

                    {item.note && (
                      <div className="mt-4 rounded-2xl border border-slate-800 bg-slate-950/50 p-4 text-sm leading-6 text-slate-300">
                        {item.note}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </section>
        </section>
      </div>
    </main>
  );
}

function StatCard({
  icon,
  title,
  value,
  accent,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  accent: string;
}) {
  return (
    <div className="rounded-[28px] border border-slate-800/70 bg-slate-950/70 p-5">
      <div className={`inline-flex items-center gap-2 ${accent}`}>
        {icon}
        <span className="text-xs uppercase tracking-[0.16em]">{title}</span>
      </div>
      <div className="mt-3 text-3xl font-semibold text-white">{value}</div>
    </div>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
      <div className="text-xs uppercase tracking-[0.16em] text-slate-500">
        {label}
      </div>
      <div className="mt-1 break-words text-sm text-slate-200">{value}</div>
    </div>
  );
}

function MiniInfo({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950/45 p-4">
      <div className="text-xs uppercase tracking-[0.16em] text-slate-500">
        {label}
      </div>
      <div className="mt-1 break-all text-sm text-slate-200">{value}</div>
    </div>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-950/30 p-8 text-center text-slate-400">
      {text}
    </div>
  );
}

function ProgressRow({
  label,
  current,
  total,
}: {
  label: string;
  current: number;
  total: number;
}) {
  const percentage = Math.min(100, Math.round((current / total) * 100));

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/35 p-4">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm text-slate-300">{label}</span>
        <span className="text-sm font-medium text-white">{percentage}%</span>
      </div>

      <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-800">
        <div
          className="h-full rounded-full bg-gradient-to-r from-sky-500 via-cyan-500 to-violet-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}