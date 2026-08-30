"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  BookOpen,
  Github,
  Terminal,
  FileText,
  GraduationCap,
  Cloud,
  Shield,
  Search,
  Sparkles,
} from "lucide-react";

type RoadmapKey =
  | "frontend"
  | "backend"
  | "fullstack"
  | "ai"
  | "datascience"
  | "devops"
  | "mobile"
  | "uiux"
  | "cyber"
  | "robotics";

const roadmaps: Record<
  RoadmapKey,
  { label: string; href: string; summary: string }
> = {
  frontend: {
    label: "Frontend Developer",
    href: "https://roadmap.sh/frontend",
    summary: "HTML → CSS → JavaScript → React → Next.js",
  },
  backend: {
    label: "Backend Developer",
    href: "https://roadmap.sh/backend",
    summary: "APIs → Auth → Databases → Scaling",
  },
  fullstack: {
    label: "Full Stack Developer",
    href: "https://roadmap.sh/full-stack",
    summary: "Frontend + Backend + Deployment",
  },
  ai: {
    label: "AI / ML Engineer",
    href: "https://roadmap.sh/ai-data-scientist",
    summary: "Python → ML → Deep Learning",
  },
  datascience: {
    label: "Data / Analytics",
    href: "https://roadmap.sh/data-analyst",
    summary: "SQL → Analysis → Visualization",
  },
  devops: {
    label: "DevOps Engineer",
    href: "https://roadmap.sh/devops",
    summary: "Docker → CI/CD → Cloud → Monitoring",
  },
  mobile: {
    label: "Mobile App Developer",
    href: "https://roadmap.sh/android",
    summary: "Android / Flutter / React Native",
  },
  uiux: {
    label: "UI/UX Designer",
    href: "https://roadmap.sh/ux-design",
    summary: "Figma → UX → Design Systems",
  },
  cyber: {
    label: "Cybersecurity Engineer",
    href: "https://roadmap.sh/cyber-security",
    summary: "Networking → Security → Pentesting",
  },
  robotics: {
    label: "Robotics / Embedded AI",
    href: "https://roadmap.sh",
    summary: "Hardware → Sensors → Control → AI",
  },
};

const essentialResources = [
  {
    title: "Linux Journey (Free)",
    desc: "Best beginner Linux course: terminal, filesystem, permissions.",
    icon: Terminal,
    href: "https://linuxjourney.com/",
    tag: "Free",
  },
  {
    title: "Linux Command Cheat Sheet",
    desc: "Daily-use Linux commands in one place.",
    icon: Terminal,
    href: "https://cheatography.com/davechild/cheat-sheets/linux-command-line/",
    tag: "Cheat Sheet",
  },
  {
    title: "Git Official Tutorial",
    desc: "Learn Git from official docs (beginner → pro).",
    icon: Github,
    href: "https://git-scm.com/docs/gittutorial",
    tag: "Git",
  },
  {
    title: "GitHub Skills (Free)",
    desc: "Official interactive GitHub learning labs + certificates.",
    icon: Github,
    href: "https://skills.github.com/",
    tag: "Free",
  },
  {
    title: "First Contributions",
    desc: "Make your first open-source contribution step-by-step.",
    icon: Github,
    href: "https://firstcontributions.github.io/",
    tag: "Open Source",
  },
  {
    title: "Deploy on Vercel (Docs)",
    desc: "Deployment + env setup guide (Next.js friendly).",
    icon: Cloud,
    href: "https://vercel.com/docs",
    tag: "Deploy",
  },
  {
    title: "Home LAN / Networking",
    desc: "Home networking and homelab learning resource.",
    icon: Cloud,
    href: "https://terrich-hash.github.io/homelab/",
    tag: "Networking",
  },
  {
    title: "ATS Resume Templates (Free)",
    desc: "Professional resume templates for students/devs.",
    icon: FileText,
    href: "https://www.overleaf.com/latex/templates/tagged/cv",
    tag: "Career",
  },
  {
    title: "UI Inspiration (Landingfolio)",
    desc: "Modern UI inspiration for landing pages & portfolios.",
    icon: BookOpen,
    href: "https://www.landingfolio.com/",
    tag: "Design",
  },
];

type LearnKey =
  | "web"
  | "ai"
  | "linux"
  | "git"
  | "cloud"
  | "cyber"
  | "data"
  | "networking";

const learningPacks: Record<
  LearnKey,
  {
    label: string;
    summary: string;
    items: {
      title: string;
      desc: string;
      href: string;
      icon: any;
      tag?: string;
    }[];
  }
> = {
  web: {
    label: "Web Dev",
    summary: "Best free courses to become job-ready in web development.",
    items: [
      {
        title: "Harvard CS50 (Free)",
        desc: "World-famous intro to CS (strong credibility).",
        icon: GraduationCap,
        href: "https://cs50.harvard.edu/",
        tag: "Course",
      },
      {
        title: "MDN Web Docs (Learn)",
        desc: "Best free learning for HTML/CSS/JS.",
        icon: BookOpen,
        href: "https://developer.mozilla.org/en-US/docs/Learn",
        tag: "Course",
      },
      {
        title: "Next.js Learn",
        desc: "Official Next.js guided course (free).",
        icon: BookOpen,
        href: "https://nextjs.org/learn",
        tag: "Course",
      },
      {
        title: "freeCodeCamp Certifications",
        desc: "Free certifications + projects (Web, JS, Backend, etc.).",
        icon: GraduationCap,
        href: "https://www.freecodecamp.org/learn/",
        tag: "Certificate",
      },
    ],
  },
  ai: {
    label: "AI / ML",
    summary: "Beginner-friendly AI learning + certifications.",
    items: [
      {
        title: "Kaggle Learn (Free)",
        desc: "Micro-courses: Python, Pandas, ML, SQL.",
        icon: BookOpen,
        href: "https://www.kaggle.com/learn",
        tag: "Course",
      },
      {
        title: "DeepLearning.AI Courses",
        desc: "High-quality AI courses (many have audit/free options).",
        icon: BookOpen,
        href: "https://www.deeplearning.ai/courses/",
        tag: "Course",
      },
      {
        title: "IBM SkillsBuild (Free Certificates)",
        desc: "AI + Cloud learning + badges/certs.",
        icon: GraduationCap,
        href: "https://skillsbuild.org/learners",
        tag: "Certificate",
      },
      {
        title: "Google Certificates",
        desc: "Career certificates (Data/Cyber/IT).",
        icon: GraduationCap,
        href: "https://grow.google/certificates/",
        tag: "Certificate",
      },
    ],
  },
  linux: {
    label: "Linux",
    summary: "Linux + command line learning (must-have for devs).",
    items: [
      {
        title: "Linux Journey",
        desc: "Best Linux course for beginners.",
        icon: Terminal,
        href: "https://linuxjourney.com/",
        tag: "Course",
      },
      {
        title: "OverTheWire Bandit",
        desc: "Fun way to learn Linux & security basics.",
        icon: Terminal,
        href: "https://overthewire.org/wargames/bandit/",
        tag: "Practice",
      },
      {
        title: "Linux Command Cheat Sheet",
        desc: "Most used Linux commands.",
        icon: Terminal,
        href: "https://cheatography.com/davechild/cheat-sheets/linux-command-line/",
        tag: "Cheat",
      },
    ],
  },
  git: {
    label: "Git & GitHub",
    summary: "Version control + GitHub workflow + certificates.",
    items: [
      {
        title: "Git Official Tutorial",
        desc: "Learn Git from official docs.",
        icon: Github,
        href: "https://git-scm.com/docs/gittutorial",
        tag: "Course",
      },
      {
        title: "GitHub Skills (Certificates)",
        desc: "Interactive GitHub learning modules.",
        icon: GraduationCap,
        href: "https://skills.github.com/",
        tag: "Certificate",
      },
      {
        title: "First Contributions",
        desc: "Your first open-source contribution.",
        icon: Github,
        href: "https://firstcontributions.github.io/",
        tag: "Practice",
      },
    ],
  },
  cloud: {
    label: "Cloud / Deploy",
    summary: "Hosting + deployment learning (projects go live).",
    items: [
      {
        title: "Vercel Docs",
        desc: "Deploy Next.js sites + env setup.",
        icon: Cloud,
        href: "https://vercel.com/docs",
        tag: "Docs",
      },
      {
        title: "AWS Skill Builder",
        desc: "AWS learning + some free courses.",
        icon: Cloud,
        href: "https://skillbuilder.aws/",
        tag: "Course",
      },
      {
        title: "Google Cloud Skills Boost",
        desc: "Hands-on cloud labs (often free tiers).",
        icon: Cloud,
        href: "https://www.cloudskillsboost.google/",
        tag: "Labs",
      },
    ],
  },
  cyber: {
    label: "Cybersecurity",
    summary: "Security foundations + beginner courses.",
    items: [
      {
        title: "Cisco NetAcad",
        desc: "Free networking/cyber courses.",
        icon: Shield,
        href: "https://www.netacad.com/",
        tag: "Course",
      },
      {
        title: "OverTheWire",
        desc: "Security practice wargames.",
        icon: Shield,
        href: "https://overthewire.org/wargames/",
        tag: "Practice",
      },
      {
        title: "Roadmap: Cyber Security",
        desc: "Step-by-step cybersecurity path.",
        icon: BookOpen,
        href: "https://roadmap.sh/cyber-security",
        tag: "Roadmap",
      },
    ],
  },
  data: {
    label: "Data / Analytics",
    summary: "SQL + analysis + visualization resources.",
    items: [
      {
        title: "Kaggle Learn (SQL/Pandas)",
        desc: "Fast, beginner-friendly data learning.",
        icon: BookOpen,
        href: "https://www.kaggle.com/learn",
        tag: "Course",
      },
      {
        title: "Google Certificates",
        desc: "Data Analytics certificate path.",
        icon: GraduationCap,
        href: "https://grow.google/certificates/",
        tag: "Certificate",
      },
      {
        title: "Roadmap: Data Analyst",
        desc: "Clear path for analytics career.",
        icon: BookOpen,
        href: "https://roadmap.sh/data-analyst",
        tag: "Roadmap",
      },
    ],
  },
  networking: {
    label: "Home LAN / Networking",
    summary: "Home networking and homelab learning resources.",
    items: [
      {
        title: "Homelab Docs",
        desc: "Home LAN, self-hosting, and networking resource.",
        icon: Cloud,
        href: "https://terrich-hash.github.io/homelab/",
        tag: "Docs",
      },
      {
        title: "Networking Basics",
        desc: "Good starting point for learning practical home networking.",
        icon: BookOpen,
        href: "https://terrich-hash.github.io/homelab/",
        tag: "Basics",
      },
      {
        title: "Home Lab Setup",
        desc: "Explore setup ideas for personal network and lab environment.",
        icon: Cloud,
        href: "https://terrich-hash.github.io/homelab/",
        tag: "Setup",
      },
      {
        title: "Secure Networking",
        desc: "Learn home network structure and safer access patterns.",
        icon: Shield,
        href: "https://terrich-hash.github.io/homelab/",
        tag: "Security",
      },
    ],
  },
};

const categories = [
  { key: "all", label: "All" },
  { key: "web", label: "Web Dev" },
  { key: "ai", label: "AI / ML" },
  { key: "linux", label: "Linux" },
  { key: "git", label: "Git & GitHub" },
  { key: "cloud", label: "Cloud" },
  { key: "cyber", label: "Cybersecurity" },
  { key: "data", label: "Data" },
  { key: "networking", label: "Networking" },
] as const;

function CardGrid({
  items,
  query = "",
}: {
  items: {
    title: string;
    desc: string;
    href: string;
    icon: any;
    tag?: string;
  }[];
  query?: string;
}) {
  const filtered = items.filter((resource) => {
    const text =
      `${resource.title} ${resource.desc} ${resource.tag ?? ""}`.toLowerCase();

    return text.includes(query.trim().toLowerCase());
  });

  if (filtered.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] px-6 py-12 text-center">
        <Search className="mx-auto h-6 w-6 text-slate-600" />
        <p className="mt-3 text-sm font-medium text-slate-300">
          No resources found
        </p>
        <p className="mt-1 text-xs text-slate-600">
          Try another keyword.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {filtered.map((resource, index) => {
        const Icon = resource.icon;

        return (
          <motion.a
            key={resource.title}
            href={resource.href}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 0.4,
              ease: "easeOut",
              delay: index * 0.025,
            }}
            className="group relative min-w-0 overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/25 hover:bg-white/[0.045] hover:shadow-2xl hover:shadow-cyan-950/20"
          >
            <div className="pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full bg-cyan-400/10 blur-3xl opacity-0 transition group-hover:opacity-100" />

            <div className="relative flex items-start justify-between gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-black/20">
                <Icon className="h-5 w-5 text-cyan-300" />
              </div>

              <ArrowUpRight className="h-4 w-4 text-slate-600 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan-300" />
            </div>

            <div className="relative mt-5">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-sm font-semibold leading-6 text-white transition group-hover:text-cyan-200 sm:text-base">
                  {resource.title}
                </h3>

                {resource.tag && (
                  <span className="rounded-full border border-white/[0.08] bg-white/[0.03] px-2 py-0.5 text-[9px] font-medium uppercase tracking-[0.16em] text-slate-500">
                    {resource.tag}
                  </span>
                )}
              </div>

              <p className="mt-2 text-xs leading-6 text-slate-500 sm:text-sm">
                {resource.desc}
              </p>
            </div>

            <div className="relative mt-6 flex items-center justify-between border-t border-white/[0.06] pt-4">
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-slate-600">
                Open resource
              </span>

              <span className="text-[10px] text-slate-700 transition group-hover:text-cyan-400">
                ↗
              </span>
            </div>
          </motion.a>
        );
      })}
    </div>
  );
}

export default function ResourcesSection() {
  const [selectedRoadmap, setSelectedRoadmap] =
    useState<RoadmapKey>("frontend");

  const [learnKey, setLearnKey] = useState<LearnKey>("web");

  const [search, setSearch] = useState("");

  const [activeCategory, setActiveCategory] =
    useState<(typeof categories)[number]["key"]>("all");

  // Focus search with "/" keyboard shortcut
  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if (
        event.key === "/" &&
        !["INPUT", "TEXTAREA", "SELECT"].includes(
          (event.target as HTMLElement)?.tagName
        )
      ) {
        event.preventDefault();
        document.getElementById("resource-search")?.focus();
      }
    };

    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  const roadmap = useMemo(
    () => roadmaps[selectedRoadmap],
    [selectedRoadmap]
  );

  const pack = useMemo(() => learningPacks[learnKey], [learnKey]);

  const filteredEssentialResources = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return essentialResources;

    return essentialResources.filter((resource) =>
      `${resource.title} ${resource.desc} ${resource.tag ?? ""}`
        .toLowerCase()
        .includes(query)
    );
  }, [search]);

  const activePack = activeCategory !== "all"
    ? learningPacks[activeCategory as LearnKey]
    : null;

  return (
    <section
      id="resources"
      className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
    >
      {/* Header */}
      <div className="mb-10">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/15 bg-cyan-400/[0.05] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-300">
          <Sparkles className="h-3 w-3" />
          BuildQuest Library
        </div>

        <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold tracking-[-0.04em] text-white sm:text-5xl">
              Everything you need to{" "}
              <span className="text-cyan-300">build.</span>
            </h2>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
              Curated roadmaps, courses, tools and practical learning
              resources for developers.
            </p>
          </div>

          {/* Search */}
          <div className="relative w-full lg:max-w-sm">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-600" />

            <input
              id="resource-search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search React, Python, Git, AI..."
              autoComplete="off"
              spellCheck={false}
              className="h-12 w-full rounded-xl border border-white/[0.08] bg-white/[0.035] pl-11 pr-12 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400/30 focus:bg-white/[0.05]"
            />

            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md border border-white/[0.08] px-1.5 py-0.5 text-[9px] text-slate-600">
              /
            </kbd>
          </div>
        </div>

        {/* Categories */}
        <div className="-mx-4 mt-7 overflow-hidden px-4 sm:mx-0 sm:px-0">
          <div className="flex w-max min-w-full gap-2 overflow-x-auto pb-2 pr-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {categories.map((category) => {
            const active = activeCategory === category.key;

            return (
              <button
                key={category.key}
                type="button"
                onClick={() => {
                  setActiveCategory(category.key);
                  setSearch("");
                  if (category.key !== "all") {
                    setLearnKey(category.key as LearnKey);
                  }
                }}
                className={`shrink-0 rounded-full border px-4 py-2 text-xs font-medium transition ${
                  active
                    ? "border-cyan-400/25 bg-cyan-400/10 text-cyan-300"
                    : "border-white/[0.07] bg-white/[0.025] text-slate-500 hover:border-white/15 hover:text-white"
                }`}
              >
                {category.label}
              </button>
            );
          })}
          </div>
        </div>
      </div>

      {/* Roadmaps */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.45 }}
        className="relative overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.02] p-6 sm:p-8"
      >
        <div className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-fuchsia-500/10 blur-3xl" />

        <div className="relative flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="inline-flex rounded-full border border-white/[0.08] bg-black/20 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-cyan-300">
              Career Roadmaps
            </div>

            <h3 className="mt-4 text-2xl font-semibold tracking-tight text-white">
              Choose your path.
            </h3>

            <p className="mt-2 text-sm leading-7 text-slate-500">
              {roadmap.summary}
            </p>
          </div>

          <div className="w-full lg:max-w-sm">
            <select
              value={selectedRoadmap}
              onChange={(event) =>
                setSelectedRoadmap(event.target.value as RoadmapKey)
              }
              className="h-12 w-full rounded-xl border border-white/[0.08] bg-[#080b11] px-4 text-sm text-slate-200 outline-none focus:border-cyan-400/30"
            >
              {Object.entries(roadmaps).map(([key, value]) => (
                <option key={key} value={key}>
                  {value.label}
                </option>
              ))}
            </select>

            <a
              href={roadmap.href}
              target="_blank"
              rel="noreferrer"
              className="mt-2 flex h-11 items-center justify-center gap-2 rounded-xl border border-cyan-400/20 bg-cyan-400/10 text-sm font-semibold text-cyan-300 transition hover:bg-cyan-200"
            >
              Open Full Roadmap
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Roadmap preview cards */}
        <div className="relative mt-8 grid grid-cols-2 gap-3 sm:grid-cols-5">
          {Object.entries(roadmaps)
            .slice(0, 5)
            .map(([key, value]) => {
              const active = key === selectedRoadmap;

              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setSelectedRoadmap(key as RoadmapKey)}
                  className={`rounded-xl border p-4 text-left transition ${
                    active
                      ? "border-cyan-400/25 bg-cyan-400/[0.07]"
                      : "border-white/[0.06] bg-black/10 hover:border-white/15"
                  }`}
                >
                  <div
                    className={`text-xs font-semibold ${
                      active ? "text-cyan-300" : "text-slate-400"
                    }`}
                  >
                    {value.label}
                  </div>
                </button>
              );
            })}
        </div>
      </motion.div>

      {/* Essentials */}
      <div className="mt-16">
        <div className="mb-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-400">
            Start here
          </p>

          <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white">
            Developer essentials
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            Linux, Git, deployment and other foundations every developer needs.
          </p>
        </div>

        <CardGrid
          items={filteredEssentialResources}
          query={search}
        />
      </div>

      {/* Learning */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.45 }}
        className="relative mt-16 overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.02] p-6 sm:p-8"
      >
        <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-emerald-400/10 blur-3xl" />

        <div className="relative">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/15 bg-emerald-400/[0.05] px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-emerald-300">
                <GraduationCap className="h-3 w-3" />
                Learn & Level Up
              </div>

              <h3 className="mt-4 text-2xl font-semibold tracking-tight text-white">
                Free courses & certifications.
              </h3>

              <p className="mt-2 text-sm leading-7 text-slate-500">
                {activePack?.summary ?? pack.summary}
              </p>
            </div>

            <select
              value={learnKey}
              onChange={(event) =>
                setLearnKey(event.target.value as LearnKey)
              }
              className="h-12 w-full rounded-xl border border-white/[0.08] bg-[#080b11] px-4 text-sm text-slate-200 outline-none focus:border-emerald-400/30 lg:max-w-sm"
            >
              {Object.entries(learningPacks).map(([key, value]) => (
                <option key={key} value={key}>
                  {value.label}
                </option>
              ))}
            </select>
          </div>

          <div className="relative mt-7">
            <CardGrid
              items={activePack?.items ?? pack.items}
              query={search}
            />
          </div>
        </div>
      </motion.div>

      {/* Bottom CTA */}
      <div className="mt-16 overflow-hidden rounded-3xl border border-white/[0.07] bg-gradient-to-br from-cyan-400/[0.07] via-white/[0.02] to-fuchsia-400/[0.05] p-8 text-center sm:p-12">
        <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-cyan-300">
          BuildQuest
        </p>

        <h3 className="mx-auto mt-3 max-w-xl text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Stop searching everywhere.
          <br />
          Start building.
        </h3>

        <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-slate-500">
          One curated place for the resources that actually help developers
          move forward.
        </p>
      </div>
    </section>
  );
}
