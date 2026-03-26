import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const logs = [
  {
    date: "March 2026",
    title: "Built the challenge registration + submission system",
    text: "Created team registration, team ID verification, and final submission workflows.",
  },
  {
    date: "March 2026",
    title: "Launched weekly challenge concept",
    text: "Started a recurring challenge format focused on real-world problem solving.",
  },
  {
    date: "March 2026",
    title: "Added dashboard idea for user progress",
    text: "Planned a personalized user dashboard to track registrations and submissions.",
  },
];

export default function JournalPage() {
  return (
    <main className="mx-auto min-h-screen max-w-5xl px-4 py-12 text-white">
      <Link href="/" className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/50 px-4 py-2 text-sm text-slate-300">
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </Link>

      <div className="mt-6 rounded-[32px] border border-slate-800/70 bg-slate-950/60 p-6 sm:p-8">
        <div className="inline-flex rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-emerald-300">
          Build Journal
        </div>

        <h1 className="mt-4 text-3xl font-semibold sm:text-4xl">Builder logs & product journey</h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400">
          A public record of what is being built, improved, and shipped.
        </p>

        <div className="mt-8 space-y-4">
          {logs.map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-slate-800/70 bg-slate-900/35 p-5"
            >
              <div className="text-xs uppercase tracking-[0.18em] text-slate-500">
                {item.date}
              </div>
              <h2 className="mt-2 text-lg font-semibold">{item.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}