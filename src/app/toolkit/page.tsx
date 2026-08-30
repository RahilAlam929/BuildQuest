"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  BookOpen,
  Boxes,
  Brain,
  Code2,
  Component,
  FolderGit2,
  Globe,
  GraduationCap,
  LayoutTemplate,
  Lightbulb,
  Palette,
  Rocket,
  Search,
  ShieldCheck,
  Wrench,
  Zap,
} from "lucide-react";

type Category =
  | "All"
  | "Docs"
  | "Templates"
  | "UI"
  | "APIs"
  | "Deploy"
  | "Design"
  | "Learning";

type Resource = {
  title: string;
  href: string;
  note: string;
  tag: string;
  category: Category;
  featured?: boolean;
};

type ToolkitSection = {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  accent: string;
  items: Resource[];
};

const quickLinks = [
  {
    title: "React Learn",
    href: "https://react.dev/learn",
    icon: Code2,
    tag: "Official",
  },
  {
    title: "Next.js Docs",
    href: "https://nextjs.org/docs/app",
    icon: BookOpen,
    tag: "Docs",
  },
  {
    title: "Vercel Templates",
    href: "https://vercel.com/templates",
    icon: Boxes,
    tag: "Starters",
  },
  {
    title: "Public APIs",
    href: "https://github.com/public-apis/public-apis",
    icon: FolderGit2,
    tag: "APIs",
  },
  {
    title: "shadcn/ui",
    href: "https://ui.shadcn.com/",
    icon: Component,
    tag: "UI",
  },
  {
    title: "Lucide Icons",
    href: "https://lucide.dev/icons/",
    icon: Wrench,
    tag: "Icons",
  },
];

const toolkitSections: ToolkitSection[] = [
  {
    id: "learn",
    title: "Learn & Docs",
    description:
      "The best official places to learn frontend, React, Next.js, and web fundamentals properly.",
    icon: GraduationCap,
    accent: "from-sky-500 via-cyan-500 to-blue-500",
    items: [
      {
        title: "React Learn",
        href: "https://react.dev/learn",
        note: "Official React learning path with modern patterns.",
        tag: "Official",
        category: "Learning",
        featured: true,
      },
      {
        title: "Next.js App Router Docs",
        href: "https://nextjs.org/docs/app",
        note: "Routing, layouts, server/client components, rendering.",
        tag: "Next.js",
        category: "Docs",
        featured: true,
      },
      {
        title: "Next.js Learn Course",
        href: "https://nextjs.org/learn/dashboard-app",
        note: "Hands-on practical full-stack learning path.",
        tag: "Course",
        category: "Learning",
      },
      {
        title: "MDN Web Docs",
        href: "https://developer.mozilla.org/en-US/",
        note: "Trusted docs for HTML, CSS, JS, browser APIs.",
        tag: "Reference",
        category: "Docs",
        featured: true,
      },
      {
        title: "MDN Learn Web Development",
        href: "https://developer.mozilla.org/en-US/docs/Learn_web_development",
        note: "Structured learning path from basics to advanced.",
        tag: "Guide",
        category: "Learning",
      },
    ],
  },
  {
    id: "starters",
    title: "Templates & Starter Kits",
    description:
      "Start faster with portfolio, SaaS, dashboard, and product-ready starter structures.",
    icon: LayoutTemplate,
    accent: "from-violet-500 via-fuchsia-500 to-sky-500",
    items: [
      {
        title: "Vercel Templates",
        href: "https://vercel.com/templates",
        note: "Curated starter templates for multiple categories.",
        tag: "Templates",
        category: "Templates",
        featured: true,
      },
      {
        title: "Next.js Templates",
        href: "https://vercel.com/templates/nextjs",
        note: "Next.js-focused starters and launch-ready themes.",
        tag: "Next.js",
        category: "Templates",
      },
      {
        title: "Portfolio Templates",
        href: "https://vercel.com/templates/portfolio",
        note: "Useful portfolio references and strong starting points.",
        tag: "Portfolio",
        category: "Templates",
      },
      {
        title: "Next.js Showcase",
        href: "https://nextjs.org/showcase",
        note: "Inspiration from polished real-world products.",
        tag: "Showcase",
        category: "Design",
      },
    ],
  },
  {
    id: "ui",
    title: "UI Systems & Components",
    description:
      "Make products feel polished quickly with strong UI systems, icons, and reusable components.",
    icon: Component,
    accent: "from-cyan-500 via-blue-500 to-violet-500",
    items: [
      {
        title: "Tailwind CSS",
        href: "https://tailwindcss.com/",
        note: "Fast utility-first styling workflow.",
        tag: "Styling",
        category: "UI",
        featured: true,
      },
      {
        title: "Tailwind Plus",
        href: "https://tailwindcss.com/plus",
        note: "Premium UI blocks and application layouts.",
        tag: "Premium",
        category: "UI",
      },
      {
        title: "shadcn/ui",
        href: "https://ui.shadcn.com/",
        note: "Open-code component system with strong DX.",
        tag: "Components",
        category: "UI",
        featured: true,
      },
      {
        title: "shadcn Components",
        href: "https://ui.shadcn.com/docs/components",
        note: "Browse the full component library quickly.",
        tag: "Library",
        category: "UI",
      },
      {
        title: "Lucide Icons",
        href: "https://lucide.dev/icons/",
        note: "Modern icon system for products and dashboards.",
        tag: "Icons",
        category: "UI",
      },
    ],
  },
  {
    id: "apis",
    title: "APIs & Developer Data",
    description:
      "Useful API collections to speed up side projects, hackathons, prototypes, and experiments.",
    icon: Globe,
    accent: "from-emerald-500 via-cyan-500 to-sky-500",
    items: [
      {
        title: "Public APIs Repository",
        href: "https://github.com/public-apis/public-apis",
        note: "Large curated list of public APIs.",
        tag: "GitHub",
        category: "APIs",
        featured: true,
      },
      {
        title: "Public API Lists",
        href: "https://github.com/public-api-lists/public-api-lists",
        note: "Another strong categorized directory of APIs.",
        tag: "Collection",
        category: "APIs",
      },
    ],
  },
  {
    id: "ship",
    title: "Build, Deploy & Ship",
    description:
      "Resources that help move projects from local code to live product with fewer mistakes.",
    icon: Rocket,
    accent: "from-orange-500 via-rose-500 to-fuchsia-500",
    items: [
      {
        title: "Vercel Platform",
        href: "https://vercel.com/",
        note: "Deploy, preview, and host apps fast.",
        tag: "Deploy",
        category: "Deploy",
        featured: true,
      },
      {
        title: "Next.js Project Structure",
        href: "https://nextjs.org/docs/app/getting-started/project-structure",
        note: "Good structure for scalable codebases.",
        tag: "Architecture",
        category: "Docs",
      },
      {
        title: "Layouts & Pages",
        href: "https://nextjs.org/docs/app/getting-started/layouts-and-pages",
        note: "Understand route structure and layouts properly.",
        tag: "Routing",
        category: "Docs",
      },
    ],
  },
  {
    id: "design",
    title: "Design & Inspiration",
    description:
      "Visual references to improve product quality, component design, and overall polish.",
    icon: Palette,
    accent: "from-pink-500 via-violet-500 to-indigo-500",
    items: [
      {
        title: "Tailwind Showcase",
        href: "https://tailwindcss.com/showcase",
        note: "See polished real-world Tailwind products.",
        tag: "Inspiration",
        category: "Design",
        featured: true,
      },
      {
        title: "Tailwind UI Blocks",
        href: "https://tailwindcss.com/plus/ui-blocks",
        note: "Product-grade sections, layouts, and app blocks.",
        tag: "Blocks",
        category: "Design",
      },
      {
        title: "Lucide Categories",
        href: "https://lucide.dev/icons/categories",
        note: "Find the right icon category faster.",
        tag: "Icons",
        category: "Design",
      },
    ],
  },
];

const aiWorkflows = [
  {
    title: "Build a portfolio faster",
    steps: [
      "Pick a portfolio template",
      "Use shadcn/ui for polished sections",
      "Deploy on Vercel quickly",
    ],
  },
  {
    title: "Ship a hackathon MVP",
    steps: [
      "Find a useful public API",
      "Use a starter kit",
      "Deploy and submit fast",
    ],
  },
  {
    title: "Design a premium dashboard",
    steps: [
      "Tailwind + shadcn/ui",
      "Lucide icons and card system",
      "Clean layout + deploy",
    ],
  },
];

const featuredPicks = [
  {
    title: "Best for beginners",
    value: "MDN + React Learn + Next.js Learn",
    icon: Lightbulb,
  },
  {
    title: "Best for shipping fast",
    value: "Vercel Templates + Tailwind + shadcn/ui",
    icon: Zap,
  },
  {
    title: "Best for polished UI",
    value: "Tailwind Plus + Lucide + Showcase references",
    icon: Palette,
  },
  {
    title: "Best for hackathons",
    value: "Public APIs + Starter Kits + Quick Deploy",
    icon: ShieldCheck,
  },
];

const categories: Category[] = [
  "All",
  "Docs",
  "Templates",
  "UI",
  "APIs",
  "Deploy",
  "Design",
  "Learning",
];

export default function ToolkitPage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const allResources = useMemo(
    () =>
      toolkitSections.flatMap((section) =>
        section.items.map((item) => ({
          ...item,
          sectionTitle: section.title,
          sectionAccent: section.accent,
          sectionIcon: section.icon,
        }))
      ),
    []
  );

  const filteredResources = useMemo(() => {
    const q = query.trim().toLowerCase();

    return allResources.filter((item) => {
      const matchesCategory =
        activeCategory === "All" || item.category === activeCategory;

      const matchesQuery =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.note.toLowerCase().includes(q) ||
        item.tag.toLowerCase().includes(q) ||
        item.sectionTitle.toLowerCase().includes(q);

      return matchesCategory && matchesQuery;
    });
  }, [allResources, activeCategory, query]);

  const featuredResources = useMemo(
    () => allResources.filter((item) => item.featured).slice(0, 6),
    [allResources]
  );

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-4 py-12 text-white">
      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/50 px-4 py-2 text-sm text-slate-300 transition hover:border-cyan-400 hover:text-cyan-300"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </Link>

      <div className="mt-6 overflow-hidden rounded-[36px] border border-slate-800/70 bg-slate-950/60 p-6 shadow-[0_0_0_1px_rgba(15,23,42,0.6),0_24px_60px_rgba(2,6,23,0.46)] sm:p-8">
        {/* Hero */}
        <section className="relative overflow-hidden rounded-[32px] border border-slate-800/70 bg-slate-950/70 p-6 sm:p-8">
          <div className="pointer-events-none absolute -left-16 top-8 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="pointer-events-none absolute right-0 top-0 h-44 w-44 rounded-full bg-fuchsia-500/10 blur-3xl" />

          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-cyan-300">
              AI Builder Toolkit
            </div>

            <div className="mt-4 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <div>
                <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl">
                  Best resources for developers, builders, and creators
                </h1>
                <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-400 sm:text-base">
                  A practical toolkit with docs, UI systems, APIs, starter kits,
                  deploy workflows, and product references that help you learn faster
                  and ship smarter.
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {quickLinks.map((item) => {
                    const Icon = item.icon;
                    return (
                      <a
                        key={item.title}
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/50 px-4 py-2 text-sm text-slate-200 transition hover:border-cyan-400 hover:text-cyan-300"
                      >
                        <Icon className="h-4 w-4" />
                        {item.title}
                      </a>
                    );
                  })}
                </div>
              </div>

              <div className="rounded-[28px] border border-slate-800/70 bg-slate-900/35 p-5">
                <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-violet-300">
                  <Brain className="h-4 w-4" />
                  AI Quick Assist
                </div>

                <h2 className="mt-4 text-xl font-semibold text-white">
                  Recommended starting points
                </h2>

                <div className="mt-5 space-y-3">
                  {featuredPicks.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={item.title}
                        className="rounded-2xl border border-slate-800/70 bg-slate-950/50 p-4"
                      >
                        <div className="flex items-center gap-2 text-cyan-300">
                          <Icon className="h-4 w-4" />
                          <span className="text-xs uppercase tracking-[0.16em]">
                            {item.title}
                          </span>
                        </div>
                        <p className="mt-2 text-sm leading-6 text-slate-300">
                          {item.value}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Search + Filters */}
        <section className="mt-8 rounded-[28px] border border-slate-800/70 bg-slate-900/35 p-5 sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-white">
                Search and filter resources
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Find the exact docs, templates, APIs, or design resources you need.
              </p>
            </div>

            <div className="relative w-full max-w-xl">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search resources, tags, docs, templates..."
                className="h-[52px] w-full rounded-2xl border border-slate-800 bg-slate-950/55 py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400"
              />
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  activeCategory === category
                    ? "bg-gradient-to-r from-sky-500 via-cyan-500 to-violet-500 text-white"
                    : "border border-slate-700 bg-slate-950/55 text-slate-300 hover:border-cyan-400 hover:text-cyan-300"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="mt-5 text-sm text-slate-400">
            Showing <span className="font-semibold text-white">{filteredResources.length}</span>{" "}
            resource{filteredResources.length !== 1 ? "s" : ""}
          </div>
        </section>

        {/* Featured resources */}
        <section className="mt-8">
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-cyan-300" />
            <h2 className="text-2xl font-semibold text-white">Featured picks</h2>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {featuredResources.map((item) => (
              <a
                key={item.title}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="group rounded-[28px] border border-slate-800/70 bg-slate-900/35 p-5 transition hover:border-cyan-400/30 hover:bg-slate-900/55"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-cyan-300">
                    Featured
                  </span>
                  <span className="rounded-full border border-slate-700 bg-slate-950/60 px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-slate-400">
                    {item.tag}
                  </span>
                </div>

                <h3 className="mt-4 text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">{item.note}</p>

                <div className="mt-4 text-xs uppercase tracking-[0.16em] text-slate-500">
                  {item.sectionTitle}
                </div>

                <div className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-cyan-300 transition group-hover:text-sky-300">
                  Open Resource
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Search results */}
        <section className="mt-8">
          <div className="flex items-center gap-2">
            <Search className="h-5 w-5 text-violet-300" />
            <h2 className="text-2xl font-semibold text-white">Resource explorer</h2>
          </div>

          {filteredResources.length === 0 ? (
            <div className="mt-5 rounded-[28px] border border-dashed border-slate-700 bg-slate-950/35 p-10 text-center">
              <div className="text-lg font-semibold text-white">No resources found</div>
              <p className="mt-2 text-sm text-slate-400">
                Try a different keyword or switch the selected category.
              </p>
            </div>
          ) : (
            <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {filteredResources.map((item) => (
                <a
                  key={`${item.sectionTitle}-${item.title}`}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group rounded-[28px] border border-slate-800/70 bg-slate-900/35 p-5 transition hover:border-cyan-400/30 hover:bg-slate-900/55"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-lg font-semibold text-white">{item.title}</div>
                      <p className="mt-2 text-sm leading-6 text-slate-400">{item.note}</p>
                    </div>

                    <span className="rounded-full border border-slate-700 bg-slate-950/60 px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-slate-400">
                      {item.tag}
                    </span>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="rounded-full border border-slate-700 bg-slate-950/60 px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-slate-400">
                      {item.category}
                    </span>
                    <span className="rounded-full border border-slate-700 bg-slate-950/60 px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-slate-500">
                      {item.sectionTitle}
                    </span>
                  </div>

                  <div className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-cyan-300 transition group-hover:text-sky-300">
                    Open Resource
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </a>
              ))}
            </div>
          )}
        </section>

        {/* Workflows */}
        <section className="mt-8">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-semibold text-white">
              Smart builder workflows
            </h2>
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-3">
            {aiWorkflows.map((workflow, index) => (
              <div
                key={workflow.title}
                className="rounded-[28px] border border-slate-800/70 bg-slate-900/35 p-5"
              >
                <div className="inline-flex rounded-full border border-slate-700 bg-slate-950/60 px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-slate-400">
                  Workflow {index + 1}
                </div>

                <h3 className="mt-4 text-lg font-semibold text-white">
                  {workflow.title}
                </h3>

                <div className="mt-4 space-y-3">
                  {workflow.steps.map((step, stepIndex) => (
                    <div
                      key={step}
                      className="flex items-center gap-3 rounded-2xl border border-slate-800/70 bg-slate-950/45 px-4 py-3"
                    >
                      <div className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-cyan-500/10 text-xs font-semibold text-cyan-300">
                        {stepIndex + 1}
                      </div>
                      <span className="text-sm text-slate-300">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Main toolkit sections */}
        <section className="mt-8 grid gap-5 xl:grid-cols-2">
          {toolkitSections.map((section) => {
            const Icon = section.icon;

            return (
              <section
                key={section.id}
                className="rounded-[28px] border border-slate-800/70 bg-slate-900/35 p-5 sm:p-6"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${section.accent} text-white shadow-lg`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold text-white">
                      {section.title}
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      {section.description}
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid gap-3">
                  {section.items.map((item) => (
                    <a
                      key={item.title}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group rounded-2xl border border-slate-800/70 bg-slate-950/45 p-4 transition hover:border-cyan-400/30 hover:bg-slate-950/70"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="text-base font-semibold text-white">
                            {item.title}
                          </div>
                          <p className="mt-1 text-sm leading-6 text-slate-400">
                            {item.note}
                          </p>
                        </div>

                        <span className="rounded-full border border-slate-700 bg-slate-900/60 px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-slate-400">
                          {item.tag}
                        </span>
                      </div>

                      <div className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-cyan-300 transition group-hover:text-sky-300">
                        Open Resource
                        <ArrowUpRight className="h-4 w-4" />
                      </div>
                    </a>
                  ))}
                </div>
              </section>
            );
          })}
        </section>

        {/* Bottom advanced panels */}
        <section className="mt-8 grid gap-5 lg:grid-cols-2">
          <div className="rounded-[28px] border border-slate-800/70 bg-slate-900/35 p-5 sm:p-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-emerald-300">
              <Rocket className="h-4 w-4" />
              Recommended Stack
            </div>

            <h2 className="mt-4 text-xl font-semibold text-white">
              Best modern stack for most builders
            </h2>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {[
                "Next.js + App Router",
                "Tailwind CSS",
                "shadcn/ui",
                "Lucide Icons",
                "MongoDB / Supabase",
                "Vercel Deployment",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-slate-800/70 bg-slate-950/45 px-4 py-4 text-sm text-slate-300"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-800/70 bg-slate-900/35 p-5 sm:p-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-amber-300">
              <Lightbulb className="h-4 w-4" />
              Add Next
            </div>

            <h2 className="mt-4 text-xl font-semibold text-white">
              Expand this toolkit later
            </h2>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {[
                "Interview Prep Hub",
                "Open Source Starter Guide",
                "Freelancer Toolkit",
                "Hackathon Packs",
                "Role-based Roadmaps",
                "UI Prompt Library",
                "Backend Resource Maps",
                "AI Build Workflows",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-slate-800/70 bg-slate-950/45 px-4 py-4 text-sm text-slate-300"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}