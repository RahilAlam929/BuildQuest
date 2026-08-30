"use client";

import Link from "next/link";
import { ArrowRight, Handshake, Users } from "lucide-react";

export default function OpenCollabHomeCard() {
  return (
    <section className="section-shell p-4 sm:p-5">
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <div className="badge-pill inline-flex items-center gap-2 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-cyan-300">
            <Handshake className="h-3.5 w-3.5" />
            Open to Collaborations
          </div>

          <h2 className="mt-3 text-lg font-semibold text-white sm:text-xl">
            Build with me
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Hackathons, startup MVPs, freelance projects, AI ideas.
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            <span className="chip-soft inline-flex items-center gap-2 px-3 py-1.5 text-[11px] text-slate-300">
              <Users className="h-3.5 w-3.5 text-cyan-300" />
              Team-ups
            </span>
            <span className="chip-soft inline-flex items-center gap-2 px-3 py-1.5 text-[11px] text-slate-300">
              Serious collabs
            </span>
          </div>
        </div>

        <Link
          href="/collaboration"
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 via-cyan-500 to-violet-500 px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110"
        >
          Open
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}