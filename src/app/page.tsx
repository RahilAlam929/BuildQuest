import Link from "next/link";
import { ArrowDown, ArrowUpRight, Sparkles } from "lucide-react";

import TopNav from "@/components/top-nav";
import ResourcesSection from "@/components/resources-section";
import EventsSection from "@/components/events-section";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-[#030508] text-white">
      {/* Ambient background */}
      <div
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
        aria-hidden="true"
      >
        <div className="buildquest-grid absolute inset-0" />

        <div className="absolute left-1/2 top-[-260px] h-[620px] w-[620px] -translate-x-1/2 rounded-full bg-cyan-400/[0.055] blur-[140px]" />

        <div className="absolute -left-48 top-[35%] h-[420px] w-[420px] rounded-full bg-blue-600/[0.035] blur-[130px]" />

        <div className="absolute -right-48 top-[58%] h-[460px] w-[460px] rounded-full bg-fuchsia-500/[0.035] blur-[140px]" />
      </div>

      <TopNav />

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-white/[0.055]">
        <div className="mx-auto max-w-7xl px-4 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-36 lg:px-8 lg:pb-24">
          <div className="mx-auto max-w-5xl text-center">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-cyan-300/15 bg-cyan-300/[0.045] px-3.5 py-2 text-[9px] font-semibold uppercase tracking-[0.24em] text-cyan-300">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-300 opacity-50" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan-300" />
              </span>
              The developer resource hub
            </div>

            <h1 className="text-5xl font-semibold leading-[0.98] tracking-[-0.065em] text-white sm:text-7xl lg:text-[88px]">
              Everything you need
              <br />
              <span className="bg-gradient-to-r from-cyan-300 via-white to-slate-400 bg-clip-text text-transparent">
                to build.
              </span>
            </h1>

            <p className="mx-auto mt-7 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
              Curated roadmaps, courses, documentation, tools and developer
              resources — organized so you can spend less time searching and
              more time building.
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="#resources"
                className="group inline-flex h-12 items-center gap-2 rounded-xl bg-white px-6 text-sm font-semibold text-[#030508] transition duration-300 hover:-translate-y-0.5 hover:bg-cyan-200"
              >
                Explore resources
                <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>

              <Link
                href="#events"
                className="inline-flex h-12 items-center gap-2 rounded-xl border border-white/[0.09] bg-white/[0.025] px-6 text-sm font-medium text-slate-300 transition duration-300 hover:border-cyan-300/20 hover:bg-white/[0.05] hover:text-white"
              >
                Discover events
              </Link>
            </div>
          </div>

          {/* Trust / product strip */}
          <div className="mx-auto mt-16 max-w-4xl rounded-2xl border border-white/[0.065] bg-white/[0.018] p-1 shadow-2xl shadow-black/20">
            <div className="grid grid-cols-2 divide-x divide-y divide-white/[0.06] sm:grid-cols-4 sm:divide-y-0">
              {[
                ["01", "Roadmaps", "Know what to learn"],
                ["02", "Resources", "Learn from the best"],
                ["03", "Tools", "Build & ship faster"],
                ["04", "Events", "Build with others"],
              ].map(([number, title, text]) => (
                <div
                  key={number}
                  className="group px-4 py-5 text-left transition hover:bg-white/[0.02] sm:px-5"
                >
                  <div className="text-[9px] font-mono text-slate-700">
                    {number}
                  </div>
                  <div className="mt-2 text-xs font-semibold text-slate-200">
                    {title}
                  </div>
                  <div className="mt-1 text-[10px] leading-4 text-slate-600">
                    {text}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 flex justify-center">
            <Link
              href="#resources"
              aria-label="Scroll to resources"
              className="group flex flex-col items-center gap-2 text-[9px] uppercase tracking-[0.2em] text-slate-700 transition hover:text-slate-400"
            >
              Explore
              <ArrowDown className="h-3.5 w-3.5 animate-bounce" />
            </Link>
          </div>
        </div>
      </section>

      {/* RESOURCES */}
      <section id="resources" className="relative">
        <ResourcesSection />
      </section>

      {/* EVENTS */}
      <section className="relative border-t border-white/[0.055]">
        <EventsSection />
      </section>

      {/* FINAL CTA */}
      <section className="relative border-t border-white/[0.055]">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="relative overflow-hidden rounded-[28px] border border-cyan-300/10 bg-white/[0.018] px-6 py-14 text-center sm:px-12">
            <div className="pointer-events-none absolute left-1/2 top-[-180px] h-[360px] w-[520px] -translate-x-1/2 rounded-full bg-cyan-400/[0.06] blur-[110px]" />

            <div className="relative">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-300/15 bg-cyan-300/[0.05] text-cyan-300">
                <Sparkles className="h-4 w-4" />
              </div>

              <p className="mt-5 text-[9px] font-semibold uppercase tracking-[0.25em] text-cyan-300">
                BuildQuest
              </p>

              <h2 className="mx-auto mt-3 max-w-2xl text-3xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
                Stop searching.
                <br />
                Start building.
              </h2>

              <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-slate-600">
                The right resource can save hours. BuildQuest puts the useful
                ones in one place.
              </p>

              <Link
                href="#resources"
                className="mt-7 inline-flex h-11 items-center gap-2 rounded-xl bg-white px-5 text-xs font-semibold text-[#030508] transition hover:bg-cyan-200"
              >
                Browse the library
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/[0.055]">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div>
            <div className="text-sm font-semibold tracking-tight text-white">
              BuildQuest
            </div>
            <div className="mt-1 text-[10px] text-slate-700">
              Curated resources for people who build.
            </div>
          </div>

          <div className="flex items-center gap-4 text-[9px] uppercase tracking-[0.16em] text-slate-700">
            <span>Resources</span>
            <span>Events</span>
            <span>Build</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
