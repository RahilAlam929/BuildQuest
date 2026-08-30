"use client";

import Link from "next/link";
import { ArrowRight, CalendarDays, MapPin, Layers3 } from "lucide-react";
import { upcomingTechItems } from "@/app/challenge/data";

export default function TechEventsHomeSection() {
  const items = upcomingTechItems.slice(0, 3);

  return (
    <section className="section-shell relative overflow-hidden p-4 sm:p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <div className="badge-pill inline-flex items-center gap-2 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-cyan-300">
            Tech Events
          </div>

          <h2 className="mt-3 text-xl font-semibold tracking-tight text-white sm:text-2xl">
            Upcoming picks
          </h2>
        </div>

        <div className="inline-flex items-center gap-2">
          <div className="chip-soft inline-flex items-center gap-2 px-3 py-1.5 text-[11px] text-slate-300">
            <Layers3 className="h-3.5 w-3.5 text-cyan-300" />
            3 Picks
          </div>

          <Link
            href="/challenge/events"
            className="chip-soft inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] text-slate-300 transition hover:border-cyan-400/20 hover:text-cyan-300"
          >
            View all
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      <div className="inner-shell mt-4 p-2.5 sm:p-3">
        <div className="space-y-2">
          {items.map((item) => (
            <Link
              key={item.id}
              href={`/challenge/events#${item.id}`}
              className="card-compact group flex items-center justify-between gap-3 rounded-[18px] px-3 py-3"
            >
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-medium text-white">
                  {item.title}
                </div>

                <div className="mt-1.5 flex flex-wrap items-center gap-3 text-[10px] text-slate-400">
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {item.city}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <CalendarDays className="h-3 w-3" />
                    {item.dateLabel}
                  </span>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <span className="chip-soft px-2 py-1 text-[9px] uppercase tracking-[0.14em] text-cyan-300">
                  {item.category}
                </span>
                <ArrowRight className="h-3.5 w-3.5 text-slate-500 transition group-hover:translate-x-0.5 group-hover:text-cyan-300" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}