"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const submit = async () => {
    setMsg("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        throw new Error(data.message || "Login failed");
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
    <main className="mx-auto min-h-screen max-w-xl px-4 py-12 text-white">
      <div className="rounded-[32px] border border-slate-800 bg-slate-950/70 p-8">
        <h1 className="text-3xl font-semibold">Welcome back</h1>
        <p className="mt-2 text-sm text-slate-400">
          Login to access your dashboard.
        </p>

        <div className="mt-6 grid gap-4">
          <input className="h-12 rounded-2xl border border-slate-800 bg-slate-900/50 px-4" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <input type="password" className="h-12 rounded-2xl border border-slate-800 bg-slate-900/50 px-4" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          <button onClick={submit} disabled={loading} className="rounded-2xl bg-gradient-to-r from-sky-500 via-cyan-500 to-violet-500 px-6 py-3 font-semibold">
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>

        {msg && <div className="mt-4 rounded-2xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-300">{msg}</div>}
      </div>
    </main>
  );
}