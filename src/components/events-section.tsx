"use client";

import { motion } from "framer-motion";
import { updates } from "@/data/updates";
import {
  ArrowUpRight,
  CalendarDays,
  Clock3,
  Megaphone,
  Sparkles,
  Trophy,
} from "lucide-react";

type EventItem = {
  title: string;
  date: string;
  location: string;
  timeline?: string;
  description: string;
  link?: string;
};

type UpdateItem = {
  title: string;
  description: string;
  date: string;
  category: string;
  status?: "New" | "Important" | "Coming Soon";
};

const defaultEvents: EventItem[] = [
  {
    title: "BuildQuest Challenge",
    date: "Starting Soon",
    location: "Online",
    timeline: "2 Week Challenge",
    description:
      "Build, experiment, and ship a meaningful project through a structured challenge.",
    link: "/challenge",
  },
];

const defaultUpdates: UpdateItem[] = [
  {
    title: "Challenge Hub is live",
    description:
      "Explore Hackathon, Ideathon and Weekly AI challenges from one place.",
    date: "Latest",
    category: "Platform",
    status: "New",
  },
  {
    title: "New learning resources added",
    description:
      "More curated resources for Web Development, AI, Git, Linux and Cloud.",
    date: "Latest",
    category: "Resources",
    status: "New",
  },
];

export default function EventsSection({
  events = defaultEvents,
}: {
  events?: EventItem[];
}) {
  return (
    <section
      id="events"
      className="relative overflow-hidden px-5 py-14 sm:px-8 sm:py-20 lg:px-10"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.07),transparent_30%),radial-gradient(circle_at_80%_80%,rgba(168,85,247,0.06),transparent_30%)]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.18em] text-slate-400">
              <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
              Events & Updates
            </div>

            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Stay in the loop.
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
              Challenges, announcements, platform updates and things worth
              knowing while you build.
            </p>
          </div>

          <a
            href="/challenge"
            className="inline-flex w-fit items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-xs font-medium text-slate-300 transition hover:border-cyan-400/30 hover:text-cyan-300"
          >
            Explore Challenges
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>

        {/* Events */}
        <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative overflow-hidden rounded-[28px] border border-white/[0.08] bg-white/[0.025] p-[1px]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-500/10 opacity-70" />

            <div className="relative rounded-[27px] bg-slate-950/95 p-6 sm:p-7">
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
                  <Trophy className="h-5 w-5" />
                </div>

                <span className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 text-[10px] uppercase tracking-[0.15em] text-emerald-300">
                  Featured
                </span>
              </div>

              <div className="mt-6">
                <p className="text-[10px] uppercase tracking-[0.18em] text-slate-600">
                  Featured Event
                </p>

                <h3 className="mt-2 text-xl font-semibold text-white sm:text-2xl">
                  {events[0]?.title}
                </h3>

                <p className="mt-3 max-w-xl text-sm leading-7 text-slate-400">
                  {events[0]?.description}
                </p>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-slate-400">
                  <CalendarDays className="h-3.5 w-3.5" />
                  {events[0]?.date}
                </span>

                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-slate-400">
                  <Clock3 className="h-3.5 w-3.5" />
                  {events[0]?.timeline}
                </span>
              </div>

              {events[0]?.link && (
                <a
                  href={events[0].link}
                  className="mt-7 inline-flex items-center gap-2 rounded-xl bg-cyan-400 px-4 py-2.5 text-xs font-semibold text-slate-950 transition hover:bg-cyan-300"
                >
                  View Challenge
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          </motion.div>

          {/* Updates */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-[28px] border border-white/[0.08] bg-white/[0.025] p-6 sm:p-7"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-400/10 text-violet-300">
                <Megaphone className="h-4 w-4" />
              </div>

              <div>
                <p className="text-xs font-semibold text-white">
                  Latest Updates
                </p>
                <p className="mt-0.5 text-[11px] text-slate-600">
                  What’s new on BuildQuest
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {updates.map((update) => (
                <div
                  key={update.title}
                  className="rounded-2xl border border-white/[0.07] bg-black/20 p-4 transition hover:border-cyan-400/20 hover:bg-white/[0.03]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="text-sm font-semibold text-white">
                          {update.title}
                        </h4>

                        {update.status && (
                          <span className="rounded-full border border-cyan-400/15 bg-cyan-400/10 px-2 py-0.5 text-[9px] uppercase tracking-[0.12em] text-cyan-300">
                            {update.status}
                          </span>
                        )}
                      </div>

                      <p className="mt-2 text-xs leading-6 text-slate-500">
                        {update.message}
                      </p>
                    </div>

                    <span className="shrink-0 text-[10px] text-slate-600">
                      {update.date}
                    </span>
                  </div>

                  <div className="mt-3 text-[10px] uppercase tracking-[0.14em] text-slate-600">
                    {update.type}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
