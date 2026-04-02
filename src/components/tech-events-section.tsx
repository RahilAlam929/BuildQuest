"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  ExternalLink,
  MapPin,
  ShieldCheck,
  Sparkles,
  Layers3,
} from "lucide-react";
import {
  upcomingTechItems,
  type TechEventCategory,
} from "@/app/challenge/data";

const categories: { id: "all" | TechEventCategory; label: string }[] = [
  { id: "all", label: "All" },
  { id: "hackathon", label: "Hackathons" },
  { id: "ideathon", label: "Ideathons" },
  { id: "event", label: "Tech Events" },
];

export default function TechEventsSection() {
  const [active, setActive] = useState<"all" | TechEventCategory>("all");

  const filtered = useMemo(() => {
    const base =
      active === "all"
        ? upcomingTechItems
        : upcomingTechItems.filter((item) => item.category === active);

    return [...base].sort((a, b) => a.monthSort.localeCompare(b.monthSort));
  }, [active]);

  return (
    <section className="relative overflow-hidden rounded-[32px] border border-white/10 bg-slate-950/80 px-4 py-4 sm:px-5 sm:py-5 lg:px-6 lg:py-6">
      {/* background */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.02),transparent_22%,transparent_78%,rgba(255,255,255,0.02))]" />
      <div className="pointer-events-none absolute -left-16 top-8 h-36 w-36 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-0 h-36 w-36 rounded-full bg-violet-500/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-40 w-40 rounded-full bg-emerald-500/10 blur-3xl" />

      <div className="relative">
        {/* top bar */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-cyan-300">
              <Sparkles className="h-4 w-4" />
              Tech Events
            </div>

            <h1 className="mt-3 text-xl font-semibold tracking-tight text-white sm:text-3xl">
              Hackathons, ideathons & events
            </h1>

            <p className="mt-1.5 text-sm text-slate-400">
              Compact details with source links.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11px] text-slate-300">
              <Layers3 className="h-3.5 w-3.5 text-cyan-300" />
              <span>{filtered.length} Items</span>
            </div>
          </div>
        </div>

        {/* filters */}
        <div className="mt-5 flex flex-wrap gap-2">
          {categories.map((tab) => {
            const isActive = active === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActive(tab.id)}
                className={`rounded-full border px-3.5 py-1.5 text-sm transition ${
                  isActive
                    ? "border-cyan-400/25 bg-cyan-500/10 text-cyan-300"
                    : "border-white/10 bg-white/[0.04] text-slate-300 hover:border-white/20"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* inner premium container */}
        <div className="mt-5 rounded-[22px] border border-white/8 bg-white/[0.03] p-2.5 sm:p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
          <div className="grid gap-3 lg:grid-cols-2">
            {filtered.map((item) => (
              <div
                key={item.id}
                id={item.id}
                className={`scroll-mt-24 rounded-[22px] border border-white/8 bg-gradient-to-br ${item.theme} p-[1px]`}
              >
                <div className="h-full rounded-[21px] bg-slate-950/94 p-4">
                  {/* top */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex items-start gap-3">
                      <div
                        className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${item.iconBg}`}
                      >
                        {item.icon}
                      </div>

                      <div className="min-w-0">
                        <h3 className="truncate text-base font-semibold text-white">
                          {item.title}
                        </h3>

                        <div className="mt-1.5 flex flex-wrap gap-2 text-[11px] text-slate-400">
                          <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1">
                            <MapPin className="h-3 w-3" />
                            {item.city}
                          </span>

                          <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1">
                            <CalendarDays className="h-3 w-3" />
                            {item.dateLabel}
                          </span>
                        </div>
                      </div>
                    </div>

                    <span className="shrink-0 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[9px] uppercase tracking-[0.16em] text-slate-400">
                      {item.category}
                    </span>
                  </div>

                  {/* short */}
                  <p className="mt-3 text-sm leading-6 text-slate-400">
                    {item.short}
                  </p>

                  {/* details */}
                  <div className="mt-3 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5">
                    <div className="text-[10px] uppercase tracking-[0.16em] text-slate-500">
                      Explore details
                    </div>
                    <p className="mt-1.5 text-sm leading-6 text-slate-300 line-clamp-3">
                      {item.explore}
                    </p>
                  </div>

                  {/* points */}
                  <div className="mt-3 space-y-1.5">
                    {item.details.slice(0, 2).map((point) => (
                      <div
                        key={point}
                        className="rounded-lg border border-white/8 bg-white/[0.03] px-3 py-2 text-[13px] text-slate-300"
                      >
                        {point}
                      </div>
                    ))}
                  </div>

                  {/* footer */}
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1.5 text-[10px] ${
                          item.sourceType === "official"
                            ? "border-emerald-400/20 bg-emerald-500/10 text-emerald-300"
                            : "border-amber-400/20 bg-amber-500/10 text-amber-300"
                        }`}
                      >
                        <ShieldCheck className="h-3.5 w-3.5" />
                        {item.sourceType === "official"
                          ? "Official"
                          : "Secondary"}
                      </span>

                      <a
                        href={item.sourceHref}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[12px] text-slate-200 transition hover:border-cyan-400/30 hover:text-cyan-300"
                      >
                        {item.sourceLabel}
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </div>

                    <Link
                      href={item.sourceHref}
                      target="_blank"
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-cyan-300 transition hover:text-cyan-200"
                    >
                      Open
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}