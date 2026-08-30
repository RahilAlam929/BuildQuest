import TopNav from "@/components/top-nav";
import ResourcesSection from "@/components/resources-section";
import EventsSection from "@/components/events-section";

export default function Home() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-[#05070b] text-white">
      <TopNav />

      {/* Hero */}
      <section className="relative overflow-hidden pt-16">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-[-180px] h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-cyan-500/[0.08] blur-[120px]" />
          <div className="absolute left-[15%] top-[180px] h-[250px] w-[250px] rounded-full bg-blue-500/[0.05] blur-[100px]" />
          <div className="absolute right-[10%] top-[260px] h-[220px] w-[220px] rounded-full bg-fuchsia-500/[0.04] blur-[100px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 pb-12 pt-20 text-center sm:px-6 sm:pb-16 sm:pt-28 lg:px-8">
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/15 bg-cyan-400/[0.05] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-300">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.8)]" />
            Developer Resource Hub
          </div>

          <h1 className="mx-auto max-w-5xl text-4xl font-bold leading-[1.05] tracking-[-0.05em] text-white sm:text-6xl lg:text-7xl">
            Learn faster.
            <br />
            <span className="bg-gradient-to-r from-cyan-300 via-white to-blue-300 bg-clip-text text-transparent">
              Build better.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
            A curated collection of developer roadmaps, free courses,
            certifications, tools and practical resources — all in one place.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#resources"
              className="inline-flex h-11 items-center justify-center rounded-xl bg-white px-6 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
            >
              Explore Resources
            </a>

            <a
              href="#roadmaps"
              className="inline-flex h-11 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] px-6 text-sm font-medium text-slate-300 transition hover:border-white/15 hover:bg-white/[0.06] hover:text-white"
            >
              Explore Roadmaps
            </a>
          </div>

          {/* Stats */}
          <div className="mx-auto mt-14 grid max-w-2xl grid-cols-2 overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.02] sm:grid-cols-4">
            {[
              ["10+", "Career paths"],
              ["30+", "Resources"],
              ["8", "Learning tracks"],
              ["100%", "Curated"],
            ].map(([value, label]) => (
              <div
                key={label}
                className="border-white/[0.06] px-4 py-5 first:border-r last:border-l sm:border-r sm:last:border-r-0"
              >
                <div className="text-lg font-semibold text-white">
                  {value}
                </div>
                <div className="mt-1 text-[10px] uppercase tracking-[0.16em] text-slate-600">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resources */}
      <div id="roadmaps">
        <ResourcesSection />
      </div>

      {/* Events */}
      <EventsSection />

      {/* Footer */}
      <footer className="border-t border-white/[0.06]">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-8 text-center sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:text-left lg:px-8">
          <div>
            <div className="text-sm font-semibold text-white">BuildQuest</div>
            <div className="mt-1 text-xs text-slate-600">
              A better place to learn, build and ship.
            </div>
          </div>

          <div className="text-[10px] uppercase tracking-[0.18em] text-slate-700">
            Developer Resources
          </div>
        </div>
      </footer>
    </main>
  );
}
