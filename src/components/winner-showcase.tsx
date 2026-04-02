"use client";

import Link from "next/link";
import { ArrowRight, Award, Sparkles, Trophy, Layers3 } from "lucide-react";

const winners = [
  {
    title: "AI Build Sprint",
    subtitle: "Winner — Team Nova",
    meta: "Best Product Execution",
  },
  {
    title: "Campus Ideathon",
    subtitle: "Winner — Team VisionX",
    meta: "Best Pitch & Clarity",
  },
  {
    title: "Weekly Challenge",
    subtitle: "Winner — Team Orbit",
    meta: "Best UI + Utility",
  },
];

export default function WinnerShowcase() {
  return (
    <section className="section-shell relative overflow-hidden p-4 sm:p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <div className="badge-pill inline-flex items-center gap-2 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-cyan-300">
            <Sparkles className="h-3.5 w-3.5" />
            Winners
          </div>

          <h2 className="mt-3 text-xl font-semibold tracking-tight text-white sm:text-2xl">
            Showcase
          </h2>
        </div>

        <div className="inline-flex items-center gap-2">
          <div className="chip-soft inline-flex items-center gap-2 px-3 py-1.5 text-[11px] text-slate-300">
            <Layers3 className="h-3.5 w-3.5 text-cyan-300" />
            Highlights
          </div>

          <Link
            href="/challenge"
            className="chip-soft inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] text-slate-300 transition hover:border-cyan-400/20 hover:text-cyan-300"
          >
            Explore
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      <div className="inner-shell mt-4 p-2.5 sm:p-3">
        <div className="grid gap-3 lg:grid-cols-3">
          {winners.map((item) => (
            <div key={item.title} className="card-compact rounded-[20px] p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-amber-400/20 bg-amber-500/10 text-amber-300">
                  <Award className="h-5 w-5" />
                </div>

                <span className="chip-soft px-2 py-1 text-[9px] uppercase tracking-[0.16em] text-slate-300">
                  Winner
                </span>
              </div>

              <div className="mt-4">
                <h3 className="text-base font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-sm text-cyan-300">{item.subtitle}</p>
                <p className="mt-2 text-sm text-slate-400">{item.meta}</p>
              </div>

              <div className="mt-5 flex items-center justify-between">
                <div className="inline-flex items-center gap-2 text-sm font-medium text-amber-300">
                  <Trophy className="h-4 w-4" />
                  Highlight
                </div>
                <ArrowRight className="h-4 w-4 text-slate-500" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}