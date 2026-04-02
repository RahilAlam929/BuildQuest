import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  FileText,
  Flag,
  Layers3,
  Target,
} from "lucide-react";
import { challengeData } from "../../data";

function Block({
  title,
  icon,
  items,
}: {
  title: string;
  icon: React.ReactNode;
  items: string[];
}) {
  return (
    <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
      <div className="flex items-center gap-2 text-sm font-semibold text-white">
        {icon}
        {title}
      </div>

      <div className="mt-4 space-y-3">
        {items.map((item) => (
          <div
            key={item}
            className="rounded-2xl border border-white/10 bg-slate-900/55 px-4 py-3 text-sm leading-6 text-slate-300"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

export default async function ProblemStatementPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const challenge = challengeData[slug as keyof typeof challengeData];

  if (!challenge) return notFound();

  const ps = challenge.problemStatement;

  return (
    <main className="min-h-screen bg-slate-950 px-5 py-8 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <Link
          href={`/challenge/${challenge.slug}`}
          className="inline-flex items-center gap-2 rounded-2xl border border-slate-700 bg-slate-900/60 px-4 py-2 text-sm text-slate-300 transition hover:border-cyan-400 hover:text-cyan-300"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Challenge
        </Link>

        <section
          className={`mt-6 overflow-hidden rounded-[34px] border border-slate-800/70 bg-gradient-to-br ${challenge.softTheme} p-[1px]`}
        >
          <div className="rounded-[33px] bg-slate-950/90 p-6 sm:p-8">
            <div className="max-w-4xl">
              <div
                className={`inline-flex items-center gap-3 rounded-2xl border ${challenge.iconBg} px-4 py-3`}
              >
                <FileText className="h-5 w-5" />
                <span className="text-sm font-semibold text-white">
                  Problem Statement
                </span>
              </div>

              <h1 className="mt-6 text-3xl font-semibold text-white sm:text-5xl">
                {ps.title}
              </h1>

              <p className="mt-4 text-sm leading-8 text-slate-400 sm:text-base">
                {ps.overview}
              </p>
            </div>

            <div className="mt-8 grid gap-5 lg:grid-cols-2">
              <Block
                title="Objectives"
                icon={<Target className="h-4 w-4 text-cyan-300" />}
                items={ps.objectives}
              />
              <Block
                title="Deliverables"
                icon={<Layers3 className="h-4 w-4 text-emerald-300" />}
                items={ps.deliverables}
              />
              <Block
                title="Rules"
                icon={<Flag className="h-4 w-4 text-amber-300" />}
                items={ps.rules}
              />
              <Block
                title="Success Checklist"
                icon={<CheckCircle2 className="h-4 w-4 text-violet-300" />}
                items={[
                  "Problem is clearly defined",
                  "Solution has real value",
                  "UI/UX feels polished",
                  "Submission is complete and well-presented",
                ]}
              />
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href={`/challenge/register?type=${challenge.slug}`}
                className={`inline-flex items-center justify-center rounded-2xl bg-gradient-to-r ${challenge.theme} px-5 py-3.5 text-sm font-semibold text-white transition hover:brightness-110`}
              >
                Register for This Challenge
              </Link>

              <Link
                href={`/challenge/submit?type=${challenge.slug}`}
                className="inline-flex items-center justify-center rounded-2xl border border-slate-700 bg-slate-900/60 px-5 py-3.5 text-sm font-medium text-slate-200 transition hover:border-cyan-400 hover:text-cyan-300"
              >
                Submit Your Project
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}