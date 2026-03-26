import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Brain,
  CalendarDays,
  CheckCircle2,
  FileText,
  Lightbulb,
  Sparkles,
  Target,
  Trophy,
  Users,
} from "lucide-react";

export default function HackathonPage() {
  return (
    <main className="min-h-screen bg-[#030712] text-white">
      {/* Top bar */}
      <div className="mx-auto max-w-6xl px-4 pt-8">
        <Link
          href="/#challenge"
          className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/50 px-4 py-2 text-sm text-slate-300 transition hover:border-cyan-400 hover:text-cyan-300"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Challenges
        </Link>
      </div>

      {/* Hero Banner */}
      <section className="mx-auto mt-6 max-w-6xl px-4">
        <div className="overflow-hidden rounded-[32px] border border-slate-800/70 bg-slate-950/80">
          <div className="relative px-6 py-10 sm:px-10 sm:py-14">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.16),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.16),transparent_35%)]" />

            <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-3 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 text-sm font-bold text-slate-950">
                    BQ
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
                    BuildQuest Hackathon
                  </span>
                </div>

                <h1 className="mt-6 text-3xl font-semibold tracking-tight sm:text-5xl">
                  AI Hackathon 2026
                </h1>

                <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                  Build a practical AI product that solves a real student or developer
                  problem. Keep it simple, useful, and demo-ready.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/challenge/register?type=hackathon"
                    className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-500 px-5 py-3 text-sm font-semibold text-white transition hover:brightness-110"
                  >
                    Register Now
                    <ArrowRight className="h-4 w-4" />
                  </Link>

                  <Link
                    href="/challenge/submit?type=hackathon"
                    className="inline-flex items-center gap-2 rounded-2xl border border-slate-700 bg-slate-900/50 px-5 py-3 text-sm font-medium text-slate-200 transition hover:border-cyan-400 hover:text-cyan-300"
                  >
                    Submit Project
                  </Link>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3 lg:w-[420px] lg:grid-cols-1">
                <HeroStat icon={<Users className="h-4 w-4" />} label="Team Size" value="1 - 4 Members" />
                <HeroStat icon={<CalendarDays className="h-4 w-4" />} label="Mode" value="Online Build Sprint" />
                <HeroStat icon={<Trophy className="h-4 w-4" />} label="Goal" value="Ship a working MVP" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="mx-auto mt-8 grid max-w-6xl gap-6 px-4 lg:grid-cols-[1.2fr_0.8fr]">
        {/* Left */}
        <div className="space-y-6">
          <InfoSection
            icon={<Lightbulb className="h-4 w-4" />}
            label="Problem Statement"
            title="AI Study Assistant"
          >
            <p className="text-sm leading-7 text-slate-300">
              Students collect lots of notes, PDFs, and study material, but they often
              struggle to revise effectively. Important concepts get missed, revision
              becomes inconsistent, and learning feels overwhelming.
            </p>

            <p className="mt-4 text-sm leading-7 text-slate-300">
              Your challenge is to build an <strong>AI Study Assistant</strong> that helps
              users understand topics faster, summarize notes clearly, and improve revision
              with useful outputs like explanations, flashcards, quizzes, or audio summaries.
            </p>
          </InfoSection>

          <InfoSection
            icon={<Target className="h-4 w-4" />}
            label="What to build"
            title="Expected solution direction"
          >
            <div className="space-y-3">
              <Bullet text="Upload notes or study content" />
              <Bullet text="Generate short summaries in simple language" />
              <Bullet text="Create quiz questions or revision prompts" />
              <Bullet text="Help students revise faster and better" />
              <Bullet text="Keep the product clean, focused, and useful" />
            </div>
          </InfoSection>

          <InfoSection
            icon={<Brain className="h-4 w-4" />}
            label="Evaluation"
            title="What will make your submission strong"
          >
            <div className="space-y-3">
              <Bullet text="Clear understanding of the problem" />
              <Bullet text="Simple and useful user experience" />
              <Bullet text="AI used meaningfully in the main flow" />
              <Bullet text="Working MVP or solid product demo" />
              <Bullet text="Good presentation and explanation" />
            </div>
          </InfoSection>
        </div>

        {/* Right */}
        <div className="space-y-6">
          <InfoSection
            icon={<FileText className="h-4 w-4" />}
            label="Rules"
            title="Participation guidelines"
          >
            <div className="space-y-3">
              <Bullet text="Team size: 1 to 4 members" />
              <Bullet text="Project should be original" />
              <Bullet text="AI must be part of the core solution" />
              <Bullet text="Submission should include demo or proof" />
            </div>
          </InfoSection>

          <InfoSection
            icon={<CalendarDays className="h-4 w-4" />}
            label="Timeline"
            title="Hackathon flow"
          >
            <div className="space-y-4">
              <TimelineItem step="01" title="Registrations Open" value="Now Live" />
              <TimelineItem step="02" title="Build Phase Starts" value="Day 1" />
              <TimelineItem step="03" title="Submission Deadline" value="Day 3" />
              <TimelineItem step="04" title="Results / Showcase" value="After Review" />
            </div>
          </InfoSection>

          <div className="rounded-[28px] border border-cyan-500/20 bg-cyan-500/5 p-6">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">
              Ready to join?
            </div>
            <h3 className="mt-3 text-xl font-semibold text-white">
              Build something students will actually use
            </h3>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              Register your team, pick this problem, and create a strong AI-powered
              solution with real value.
            </p>

            <div className="mt-5 flex flex-col gap-3">
              <Link
                href="/challenge/register?type=hackathon"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-500 px-5 py-3 text-sm font-semibold text-white transition hover:brightness-110"
              >
                Register for Hackathon
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/challenge/submit?type=hackathon"
                className="inline-flex items-center justify-center rounded-2xl border border-slate-700 bg-slate-900/50 px-5 py-3 text-sm font-medium text-slate-200 transition hover:border-cyan-400 hover:text-cyan-300"
              >
                Submit Project
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="h-12" />
    </main>
  );
}

function HeroStat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-800/70 bg-slate-900/45 p-4">
      <div className="inline-flex items-center gap-2 text-cyan-300">
        {icon}
        <span className="text-xs uppercase tracking-[0.16em]">{label}</span>
      </div>
      <div className="mt-2 text-sm font-semibold text-white">{value}</div>
    </div>
  );
}

function InfoSection({
  icon,
  label,
  title,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-[28px] border border-slate-800/70 bg-slate-950/65 p-6">
      <div className="flex items-center gap-2 text-cyan-300">
        {icon}
        <span className="text-xs uppercase tracking-[0.16em]">{label}</span>
      </div>
      <h2 className="mt-3 text-2xl font-semibold text-white">{title}</h2>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function Bullet({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3">
      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" />
      <span className="text-sm leading-6 text-slate-300">{text}</span>
    </div>
  );
}

function TimelineItem({
  step,
  title,
  value,
}: {
  step: string;
  title: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-4 rounded-2xl border border-slate-800 bg-slate-900/35 p-4">
      <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-cyan-500/10 text-sm font-semibold text-cyan-300">
        {step}
      </div>
      <div>
        <div className="text-sm font-semibold text-white">{title}</div>
        <div className="mt-1 text-sm text-slate-400">{value}</div>
      </div>
    </div>
  );
}