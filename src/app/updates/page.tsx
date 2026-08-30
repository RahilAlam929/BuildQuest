import { Sparkles } from "lucide-react";
import { updates } from "@/data/updates";

export default function UpdatesPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-5 py-10 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <section className="relative overflow-hidden rounded-[36px] border border-white/[0.07] bg-white/[0.02] px-5 py-10 sm:px-8 lg:px-12">
          <div className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -right-24 top-20 h-64 w-64 rounded-full bg-fuchsia-500/10 blur-3xl" />

          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-cyan-300">
              <Sparkles className="h-3.5 w-3.5" />
              Updates
            </div>

            <h1 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
              What&apos;s happening at BuildQuest
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
              Announcements, new challenges, product updates and important
              messages from BuildQuest.
            </p>

            <div className="mt-10 space-y-4">
              {updates.map((update) => (
                <article
                  key={update.id}
                  className="group relative overflow-hidden rounded-[26px] border border-white/[0.08] bg-gradient-to-br from-white/[0.05] to-white/[0.015] p-[1px] transition duration-300 hover:-translate-y-1 hover:border-cyan-400/20"
                >
                  <div className="relative rounded-[25px] bg-slate-950/90 p-5 sm:p-7">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-cyan-300">
                        {update.type}
                      </span>

                      {update.featured && (
                        <span className="rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-amber-300">
                          Featured
                        </span>
                      )}
                    </div>

                    <h2 className="mt-5 text-xl font-semibold text-white sm:text-2xl">
                      {update.title}
                    </h2>

                    <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-400 sm:text-base">
                      {update.message}
                    </p>

                    <div className="mt-6 text-xs text-slate-600">
                      {update.date}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
