"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Briefcase,
  GraduationCap,
  LockKeyhole,
  Mail,
  User,
} from "lucide-react";

export default function SignupPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    college: "",
    year: "",
    role: "",
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const submit = async () => {
    setMsg("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        throw new Error(data.message || "Signup failed");
      }

      router.push("/dashboard");
      router.refresh();
    } catch (error: any) {
      setMsg(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative mx-auto flex min-h-screen w-full max-w-7xl items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl">
        <div className="section-shell overflow-hidden p-5 sm:p-6">
          <div className="inner-shell p-5 sm:p-6">
            <div className="mb-6">
              <div className="badge-pill inline-flex items-center gap-2 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-cyan-300">
                Create Account
              </div>

              <h1 className="mt-4 text-2xl font-semibold text-white sm:text-3xl">
                Join the platform
              </h1>

              <p className="mt-2 text-sm text-slate-400">
                Create your account to manage registrations, teams, and submissions.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="text-xs font-medium uppercase tracking-[0.14em] text-slate-400"
                >
                  Full Name
                </label>
                <div className="relative">
                  <User className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                  <input
                    id="name"
                    type="text"
                    placeholder="Your full name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="input-glass h-12 w-full pl-11 pr-4 text-sm placeholder:text-slate-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-xs font-medium uppercase tracking-[0.14em] text-slate-400"
                >
                  Email
                </label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="input-glass h-12 w-full pl-11 pr-4 text-sm placeholder:text-slate-500"
                  />
                </div>
              </div>

              <div className="space-y-2 sm:col-span-2">
                <label
                  htmlFor="password"
                  className="text-xs font-medium uppercase tracking-[0.14em] text-slate-400"
                >
                  Password
                </label>
                <div className="relative">
                  <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                  <input
                    id="password"
                    type="password"
                    autoComplete="new-password"
                    placeholder="Create a secure password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="input-glass h-12 w-full pl-11 pr-4 text-sm placeholder:text-slate-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="college"
                  className="text-xs font-medium uppercase tracking-[0.14em] text-slate-400"
                >
                  College / Organization
                </label>
                <div className="relative">
                  <GraduationCap className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                  <input
                    id="college"
                    type="text"
                    placeholder="Your college or organization"
                    value={form.college}
                    onChange={(e) => setForm({ ...form, college: e.target.value })}
                    className="input-glass h-12 w-full pl-11 pr-4 text-sm placeholder:text-slate-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="year"
                  className="text-xs font-medium uppercase tracking-[0.14em] text-slate-400"
                >
                  Year
                </label>
                <input
                  id="year"
                  type="text"
                  placeholder="e.g. 2nd Year"
                  value={form.year}
                  onChange={(e) => setForm({ ...form, year: e.target.value })}
                  className="input-glass h-12 w-full px-4 text-sm placeholder:text-slate-500"
                />
              </div>

              <div className="space-y-2 sm:col-span-2">
                <label
                  htmlFor="role"
                  className="text-xs font-medium uppercase tracking-[0.14em] text-slate-400"
                >
                  Role
                </label>
                <div className="relative">
                  <Briefcase className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                  <input
                    id="role"
                    type="text"
                    placeholder="e.g. Developer, Designer, Builder"
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                    className="input-glass h-12 w-full pl-11 pr-4 text-sm placeholder:text-slate-500"
                  />
                </div>
              </div>

              <div className="sm:col-span-2 pt-1">
                <button
                  onClick={submit}
                  disabled={loading}
                  className="shadow-soft-glow inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sky-500 via-cyan-500 to-violet-500 px-6 text-sm font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading ? "Creating account..." : "Create Account"}
                  {!loading && <ArrowRight className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {msg && (
              <div className="mt-4 rounded-2xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-300">
                {msg}
              </div>
            )}

            <div className="mt-6 border-t border-white/8 pt-5 text-center text-sm text-slate-400">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="font-medium text-cyan-300 transition hover:text-cyan-200"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}