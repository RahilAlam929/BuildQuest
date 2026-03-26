"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  FileText,
  Github,
  Link as LinkIcon,
  Search,
  ShieldCheck,
  Sparkles,
  Upload,
  X,
  Zap,
} from "lucide-react";

type ChallengeType = "hackathon" | "ideathon" | "weekly-debugging";

const challengeMeta: Record<
  ChallengeType,
  {
    label: string;
    accent: string;
    chip: string;
    description: string;
  }
> = {
  hackathon: {
    label: "Hackathon",
    accent: "from-sky-500 via-blue-500 to-indigo-500",
    chip: "border-sky-500/20 bg-sky-500/10 text-sky-300",
    description:
      "Submit your project links, repo, explanation, and optional deck or file.",
  },
  ideathon: {
    label: "Ideathon",
    accent: "from-fuchsia-500 via-purple-500 to-sky-500",
    chip: "border-fuchsia-500/20 bg-fuchsia-500/10 text-fuchsia-300",
    description:
      "Submit your idea summary, framework, documents, and optional supporting files.",
  },
  "weekly-debugging": {
    label: "Weekly Challenge",
    accent: "from-sky-500 via-cyan-500 to-violet-500",
    chip: "border-cyan-500/20 bg-cyan-500/10 text-cyan-300",
    description:
      "Submit your weekly build with the best links, summary, and proof of execution.",
  },
};

export default function ChallengeSubmitPage() {
  const searchParams = useSearchParams();

  const [form, setForm] = useState({
    teamId: "",
    challengeType: "hackathon" as ChallengeType,
    name: "",
    email: "",
    projectLink: "",
    githubLink: "",
    note: "",
  });

  const [teamInfo, setTeamInfo] = useState<{
    challengeType: ChallengeType;
    teamName: string;
    teamMembers: string;
  } | null>(null);

  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetchingTeam, setFetchingTeam] = useState(false);
  const [status, setStatus] = useState<{
    type: "ok" | "err";
    msg: string;
  } | null>(null);

  useEffect(() => {
    const type = searchParams.get("type");
    if (
      type === "hackathon" ||
      type === "ideathon" ||
      type === "weekly-debugging"
    ) {
      setForm((p) => ({ ...p, challengeType: type }));
    }
  }, [searchParams]);

  const activeChallengeType = useMemo<ChallengeType>(() => {
    return (teamInfo?.challengeType || form.challengeType) as ChallengeType;
  }, [teamInfo?.challengeType, form.challengeType]);

  const meta = challengeMeta[activeChallengeType];

  const isVerified = !!teamInfo;
  const isIdeathon = activeChallengeType === "ideathon";
  const isHackathon = activeChallengeType === "hackathon";
  const isWeekly = activeChallengeType === "weekly-debugging";

  const fetchTeam = async () => {
    setStatus(null);
    setTeamInfo(null);

    if (!form.teamId.trim()) {
      setStatus({ type: "err", msg: "Please enter Team ID first." });
      return;
    }

    setFetchingTeam(true);

    try {
      const res = await fetch(
        `/api/challenge-team?teamId=${encodeURIComponent(
          form.teamId.trim().toUpperCase()
        )}`
      );

      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const raw = await res.text();
        console.error("VERIFY TEAM NON-JSON RESPONSE:", raw);
        throw new Error("Server returned invalid response.");
      }

      const data = await res.json();

      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Invalid Team ID");
      }

      setForm((prev) => ({
        ...prev,
        teamId: data.team.teamId || prev.teamId,
        challengeType: data.team.challengeType || prev.challengeType,
        name: data.team.name || "",
        email: data.team.email || "",
      }));

      setTeamInfo({
        challengeType: data.team.challengeType || "hackathon",
        teamName: data.team.teamName || "",
        teamMembers: data.team.teamMembers || "",
      });

      setStatus({
        type: "ok",
        msg: "Team verified successfully.",
      });
    } catch (err: any) {
      setStatus({
        type: "err",
        msg: err?.message || "Could not verify Team ID.",
      });
    } finally {
      setFetchingTeam(false);
    }
  };

  const submit = async () => {
    setStatus(null);

    if (!isVerified) {
      setStatus({
        type: "err",
        msg: "Please verify your Team ID first.",
      });
      return;
    }

    if (!form.teamId || !form.name || !form.email) {
      setStatus({
        type: "err",
        msg: "Registered team details are missing. Please verify Team ID again.",
      });
      return;
    }

    if ((isHackathon || isWeekly) && !form.projectLink.trim() && !form.githubLink.trim()) {
      setStatus({
        type: "err",
        msg: "Please add at least one project link or GitHub link.",
      });
      return;
    }

    if (isIdeathon && !form.note.trim() && !file) {
      setStatus({
        type: "err",
        msg: "Please add your solution summary or upload a supporting file.",
      });
      return;
    }

    setLoading(true);

    try {
      const body = new FormData();
      body.append("teamId", form.teamId);
      body.append("challengeType", activeChallengeType);
      body.append("name", form.name);
      body.append("email", form.email);
      body.append("projectLink", form.projectLink);
      body.append("githubLink", form.githubLink);
      body.append("note", form.note);

      if (file) {
        body.append("attachment", file);
      }

      const res = await fetch("/api/challenge-submit", {
        method: "POST",
        body,
      });

      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const raw = await res.text();
        console.error("SUBMIT NON-JSON RESPONSE:", raw);
        throw new Error("Server returned invalid response.");
      }

      const data = await res.json();

      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Submission failed");
      }

      setStatus({
        type: "ok",
        msg: data.message || "Submission successful.",
      });

      setForm({
        teamId: "",
        challengeType: "hackathon",
        name: "",
        email: "",
        projectLink: "",
        githubLink: "",
        note: "",
      });

      setTeamInfo(null);
      setFile(null);
    } catch (err: any) {
      setStatus({
        type: "err",
        msg: err?.message || "Something went wrong.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto min-h-screen max-w-5xl px-4 py-12 text-white">
      <div className="rounded-[32px] border border-slate-800/80 bg-slate-950/70 p-6 shadow-[0_0_0_1px_rgba(15,23,42,0.65),0_24px_60px_rgba(2,6,23,0.46)] backdrop-blur-xl sm:p-8">
        <div className="mb-8 flex items-start justify-between gap-4">
          <div className="max-w-2xl">
            <div
              className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] uppercase tracking-[0.18em] ${meta.chip}`}
            >
              <Sparkles className="h-4 w-4" />
              Final Submission
            </div>

            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Submit your final challenge entry
            </h1>

            <p className="mt-3 text-sm leading-7 text-slate-400">
              {meta.description}
            </p>
          </div>

          <Link
            href="/#challenge"
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-700 bg-slate-900/50 text-slate-300 transition hover:border-cyan-400 hover:text-cyan-300"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.25fr]">
          {/* Left Side */}
          <div className="space-y-4">
            <div className="rounded-[28px] border border-slate-800/80 bg-slate-900/35 p-5">
              <div className="flex items-center gap-2 text-cyan-300">
                <ShieldCheck className="h-4 w-4" />
                <span className="text-xs uppercase tracking-[0.16em]">
                  Verification First
                </span>
              </div>

              <h2 className="mt-3 text-lg font-semibold text-white">
                Verify your Team ID
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Your Team ID is required before submission. Registered details will load automatically.
              </p>

              <div className="mt-5 grid gap-3">
                <input
                  className="h-[52px] w-full rounded-2xl border border-slate-800 bg-slate-950/55 px-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400"
                  placeholder="Team ID * (e.g. HACK-AB12CD)"
                  value={form.teamId}
                  onChange={(e) =>
                    setForm((p) => ({
                      ...p,
                      teamId: e.target.value.toUpperCase(),
                    }))
                  }
                />

                <button
                  type="button"
                  onClick={fetchTeam}
                  disabled={fetchingTeam}
                  className="inline-flex h-[52px] items-center justify-center gap-2 rounded-2xl border border-cyan-500/30 bg-cyan-500/10 px-5 text-sm font-semibold text-cyan-300 transition hover:bg-cyan-500/20 disabled:opacity-60"
                >
                  {fetchingTeam ? "Checking..." : "Verify Team"}
                  <Search className="h-4 w-4" />
                </button>
              </div>
            </div>

            {isVerified && (
              <div className="rounded-[28px] border border-emerald-500/20 bg-emerald-500/5 p-5">
                <div className="text-xs uppercase tracking-[0.16em] text-emerald-300">
                  Team Verified
                </div>

                <div className="mt-4 space-y-3 text-sm text-slate-200">
                  <div>
                    <span className="text-slate-500">Challenge Type:</span>{" "}
                    {teamInfo?.challengeType}
                  </div>
                  <div>
                    <span className="text-slate-500">Team Name:</span>{" "}
                    {teamInfo?.teamName}
                  </div>
                  <div>
                    <span className="text-slate-500">Total Members:</span>{" "}
                    {teamInfo?.teamMembers}
                  </div>
                </div>
              </div>
            )}

            <div className="rounded-[28px] border border-slate-800/80 bg-slate-900/35 p-5">
              <div className="flex items-center gap-2 text-violet-300">
                <Zap className="h-4 w-4" />
                <span className="text-xs uppercase tracking-[0.16em]">
                  Submission Tips
                </span>
              </div>

              <div className="mt-4 space-y-3 text-sm text-slate-400">
                <p>• Use the same Team ID you received during registration.</p>
                <p>• Add the best demo or project link available.</p>
                <p>• For ideathon, write a sharp solution summary.</p>
                <p>• Upload a PDF/PPT only if it adds useful context.</p>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="rounded-[28px] border border-slate-800/80 bg-slate-900/35 p-5 sm:p-6">
            <div className="mb-5">
              <div className="text-xs uppercase tracking-[0.18em] text-slate-500">
                Submission Form
              </div>
              <h2 className="mt-2 text-2xl font-semibold text-white">
                Final project details
              </h2>
            </div>

            {status && (
              <div
                className={`mb-5 flex items-start gap-2 rounded-2xl border px-4 py-3 text-sm ${
                  status.type === "ok"
                    ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-300"
                    : "border-rose-500/20 bg-rose-500/10 text-rose-300"
                }`}
              >
                {status.type === "ok" ? (
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                ) : (
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                )}
                <span>{status.msg}</span>
              </div>
            )}

            <div className="grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  className="h-[52px] w-full rounded-2xl border border-slate-800 bg-slate-900/50 px-4 text-sm text-slate-300 outline-none"
                  value={form.name}
                  readOnly
                  placeholder="Registered Name"
                />
                <input
                  className="h-[52px] w-full rounded-2xl border border-slate-800 bg-slate-900/50 px-4 text-sm text-slate-300 outline-none"
                  value={form.email}
                  readOnly
                  placeholder="Registered Email"
                />
              </div>

              {(isHackathon || isWeekly) && (
                <>
                  <div className="relative">
                    <LinkIcon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                    <input
                      className="h-[52px] w-full rounded-2xl border border-slate-800 bg-slate-950/55 py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400"
                      placeholder={isWeekly ? "Project / Demo Link" : "Live Project Link"}
                      value={form.projectLink}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, projectLink: e.target.value }))
                      }
                    />
                  </div>

                  <div className="relative">
                    <Github className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                    <input
                      className="h-[52px] w-full rounded-2xl border border-slate-800 bg-slate-950/55 py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400"
                      placeholder={isWeekly ? "GitHub / Source Link" : "GitHub Repo Link"}
                      value={form.githubLink}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, githubLink: e.target.value }))
                      }
                    />
                  </div>
                </>
              )}

              <textarea
                rows={5}
                className="w-full rounded-2xl border border-slate-800 bg-slate-950/55 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400"
                placeholder={
                  isIdeathon
                    ? "Write your solution summary, framework, impact, and execution thinking"
                    : isWeekly
                    ? "Write a short note about your build, debugging approach, features, or outcome"
                    : "Write a short summary of your build, features, and approach"
                }
                value={form.note}
                onChange={(e) =>
                  setForm((p) => ({ ...p, note: e.target.value }))
                }
              />

              <label className="block cursor-pointer rounded-2xl border border-dashed border-slate-700/70 bg-slate-950/40 p-4 transition hover:border-cyan-400/40">
                <div className="flex items-center gap-3">
                  <Upload className="h-5 w-5 text-cyan-300" />
                  <div>
                    <div className="text-sm font-semibold text-slate-100">
                      Upload supporting file
                    </div>
                    <div className="text-xs text-slate-500">
                      PDF / PPT / PPTX / PNG / JPG
                    </div>
                  </div>
                </div>

                <input
                  type="file"
                  accept=".pdf,.ppt,.pptx,.png,.jpg,.jpeg"
                  className="mt-4 block w-full cursor-pointer text-sm text-slate-300 file:mr-4 file:cursor-pointer file:rounded-full file:border-0 file:bg-cyan-500/15 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-cyan-300"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
              </label>

              {file && (
                <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 px-4 py-3 text-sm text-emerald-300">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Selected: {file.name}
                  </div>
                </div>
              )}

              <button
                type="button"
                onClick={submit}
                disabled={loading}
                className={`inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r ${meta.accent} px-6 py-3.5 text-sm font-semibold text-white transition hover:brightness-110 disabled:opacity-60`}
              >
                {loading
                  ? "Submitting..."
                  : isIdeathon
                  ? "Submit Solution"
                  : "Submit Project"}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}