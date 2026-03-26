"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  X,
  User,
  Mail,
  Users,
  Building2,
  Sparkles,
  GraduationCap,
  Briefcase,
  CheckCircle2,
  AlertCircle,
  UserPlus,
} from "lucide-react";

type ChallengeType = "hackathon" | "ideathon" | "weekly-debugging";

const challengeMeta: Record<
  ChallengeType,
  {
    label: string;
    chipClass: string;
    accent: string;
    description: string;
  }
> = {
  hackathon: {
    label: "Hackathon",
    chipClass: "border-sky-500/20 bg-sky-500/10 text-sky-300",
    accent: "from-sky-500 via-blue-500 to-indigo-500",
    description:
      "Register your team and build a strong working solution with clear execution.",
  },
  ideathon: {
    label: "Ideathon",
    chipClass: "border-fuchsia-500/20 bg-fuchsia-500/10 text-fuchsia-300",
    accent: "from-fuchsia-500 via-purple-500 to-sky-500",
    description:
      "Register to present a strong concept, framework, and innovation-first idea.",
  },
  "weekly-debugging": {
    label: "Weekly Challenge",
    chipClass: "border-cyan-500/20 bg-cyan-500/10 text-cyan-300",
    accent: "from-sky-500 via-cyan-500 to-violet-500",
    description:
      "Join this week’s focused sprint and build a useful developer-first solution.",
  },
};

export default function ChallengeRegisterPage() {
  const searchParams = useSearchParams();

  const [form, setForm] = useState({
    challengeType: "hackathon" as ChallengeType,
    name: "",
    email: "",
    college: "",
    year: "",
    role: "",
    teamName: "",
    teamMembers: "",
    reason: "",
  });

  const [loading, setLoading] = useState(false);
  const [teamId, setTeamId] = useState("");
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

  const meta = useMemo(
    () => challengeMeta[form.challengeType],
    [form.challengeType]
  );

  const update = (key: keyof typeof form, value: string) => {
    setForm((p) => ({ ...p, [key]: value }));
  };

  const submit = async () => {
    setStatus(null);
    setTeamId("");

    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.year.trim() ||
      !form.role.trim() ||
      !form.teamName.trim() ||
      !form.teamMembers.trim()
    ) {
      setStatus({
        type: "err",
        msg: "Please fill all required fields.",
      });
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/challenge-register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        throw new Error(data.message || data.error || "Registration failed");
      }

      setTeamId(data.teamId || "");
      setStatus({
        type: "ok",
        msg:
          data.message ||
          "Registration successful. Team ID generated and email sent.",
      });

      setForm((p) => ({
        ...p,
        name: "",
        email: "",
        college: "",
        year: "",
        role: "",
        teamName: "",
        teamMembers: "",
        reason: "",
      }));
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
    <main className="mx-auto min-h-screen max-w-4xl px-4 py-12 text-white">
      <div className="rounded-[32px] border border-slate-800/80 bg-slate-950/70 p-6 shadow-[0_0_0_1px_rgba(15,23,42,0.65),0_24px_60px_rgba(2,6,23,0.46)] backdrop-blur-xl sm:p-8">
        <div className="mb-8 flex items-start justify-between gap-4">
          <div className="max-w-2xl">
            <div
              className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] uppercase tracking-[0.18em] ${meta.chipClass}`}
            >
              <UserPlus className="h-4 w-4" />
              Registration Open
            </div>

            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Join the Challenge
            </h1>

            <p className="mt-3 text-sm leading-7 text-slate-400">
              {meta.description}
            </p>
          </div>

          <Link
            href="/#challenge"
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-700 bg-slate-900/50 text-slate-300 transition hover:border-sky-400 hover:text-sky-300"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </Link>
        </div>

        <div className="rounded-[28px] border border-slate-800/80 bg-slate-900/35 p-5 sm:p-6">
          <div className="mb-5">
            <div className="text-xs uppercase tracking-[0.18em] text-slate-500">
              Registration Form
            </div>
            <h2 className="mt-2 text-2xl font-semibold text-white">
              Enter your details
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <SelectField
              label="Challenge Type"
              value={form.challengeType}
              onChange={(v) => update("challengeType", v)}
              options={[
                { label: "Hackathon", value: "hackathon" },
                { label: "Ideathon", value: "ideathon" },
                { label: "Weekly Challenge", value: "weekly-debugging" },
              ]}
              className="sm:col-span-2"
            />

            <FloatingInput
              icon={<User className="h-4 w-4" />}
              label="Full Name"
              value={form.name}
              onChange={(v) => update("name", v)}
            />

            <FloatingInput
              icon={<Mail className="h-4 w-4" />}
              label="Email"
              value={form.email}
              onChange={(v) => update("email", v)}
              type="email"
            />

            <FloatingInput
              icon={<Building2 className="h-4 w-4" />}
              label="College / Organization"
              value={form.college}
              onChange={(v) => update("college", v)}
            />

            <FloatingInput
              icon={<GraduationCap className="h-4 w-4" />}
              label="Year"
              value={form.year}
              onChange={(v) => update("year", v)}
            />

            <FloatingInput
              icon={<Briefcase className="h-4 w-4" />}
              label="Your Role"
              value={form.role}
              onChange={(v) => update("role", v)}
            />

            <FloatingInput
              icon={<Users className="h-4 w-4" />}
              label="Team Name"
              value={form.teamName}
              onChange={(v) => update("teamName", v)}
            />

            <FloatingInput
              icon={<Users className="h-4 w-4" />}
              label="Team Size"
              value={form.teamMembers}
              onChange={(v) => update("teamMembers", v)}
            />

            <TextAreaField
              label="Why do you want to participate?"
              value={form.reason}
              onChange={(v) => update("reason", v)}
              className="sm:col-span-2"
            />

            <button
              type="button"
              onClick={submit}
              disabled={loading}
              className={`sm:col-span-2 mt-2 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r ${meta.accent} px-6 py-3.5 text-sm font-semibold text-white transition hover:brightness-110 disabled:opacity-60`}
            >
              {loading ? "Registering..." : "Complete Registration"}
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {teamId && (
            <div className="mt-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm text-emerald-300">
              Team ID: <span className="font-mono font-semibold">{teamId}</span>
            </div>
          )}

          {status && (
            <div
              className={`mt-4 flex items-start gap-2 rounded-2xl border px-4 py-3 text-sm ${
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
        </div>
      </div>
    </main>
  );
}

function FloatingInput({
  icon,
  label,
  value,
  onChange,
  type = "text",
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <label className="block w-full">
      <span className="mb-2 inline-block text-sm font-medium text-slate-300">
        {label}
      </span>

      <div className="flex h-[56px] w-full items-center gap-3 rounded-2xl border border-slate-800 bg-slate-950/55 px-4 transition focus-within:border-cyan-400">
        <div className="shrink-0 text-slate-400">{icon}</div>

        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={`Enter ${label.toLowerCase()}`}
          className="w-full min-w-0 bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
        />
      </div>
    </label>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
  className = "",
}: {
  label: string;
  value: string;
  onChange: (v: ChallengeType) => void;
  options: { label: string; value: ChallengeType }[];
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-2 inline-flex items-center gap-2 text-sm font-medium text-slate-300">
        <Sparkles className="h-4 w-4" />
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as ChallengeType)}
        className="h-[52px] w-full rounded-2xl border border-slate-800 bg-slate-950/55 px-4 text-sm text-white outline-none transition focus:border-cyan-400"
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className="bg-slate-950 text-white"
          >
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function TextAreaField({
  label,
  value,
  onChange,
  className = "",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-2 inline-flex items-center gap-2 text-sm font-medium text-slate-300">
        <Sparkles className="h-4 w-4" />
        {label}
      </span>
      <textarea
        rows={5}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Tell us in a few lines why you want to join"
        className="w-full rounded-2xl border border-slate-800 bg-slate-950/55 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400"
      />
    </label>
  );
}