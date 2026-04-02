"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Code2,
  Copy,
  Filter,
  Globe,
  Handshake,
  Lightbulb,
  MessageSquare,
  Rocket,
  Search,
  Send,
  Sparkles,
  Star,
  Users,
  X,
  Zap,
} from "lucide-react";

type TabId = "overview" | "board" | "notes" | "request" | "faq";
type CollabType = "all" | "hackathon" | "startup" | "freelance" | "research";
type RequestStatus = "new" | "saved" | "sent";

type CollaborationCard = {
  id: string;
  title: string;
  type: Exclude<CollabType, "all">;
  badge: string;
  timeline: string;
  mode: string;
  summary: string;
  skills: string[];
  cta: string;
  icon: React.ReactNode;
  accent: string;
};

type BlogPost = {
  id: string;
  title: string;
  tag: string;
  readTime: string;
  excerpt: string;
  bullets: string[];
};

type BoardPost = {
  id: string;
  title: string;
  category: Exclude<CollabType, "all">;
  mode: string;
  timeline: string;
  lookingFor: string[];
  details: string;
  status: "open" | "active";
};

type SavedRequest = {
  id: string;
  name: string;
  email: string;
  type: string;
  idea: string;
  status: RequestStatus;
  createdAt: string;
};

const filters: { id: CollabType; label: string }[] = [
  { id: "all", label: "All" },
  { id: "hackathon", label: "Hackathon" },
  { id: "startup", label: "Startup" },
  { id: "freelance", label: "Freelance" },
  { id: "research", label: "Research" },
];

const tabs: { id: TabId; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "board", label: "Board" },
  { id: "notes", label: "Builder Notes" },
  { id: "request", label: "Request" },
  { id: "faq", label: "FAQ" },
];

const collaborationCards: CollaborationCard[] = [
  {
    id: "hackathon-teamup",
    title: "Hackathon Team-Up",
    type: "hackathon",
    badge: "Fast Build",
    timeline: "1–7 days",
    mode: "Remote / Hybrid",
    summary:
      "For fast-moving teams who want polished UI, working demos, clean structure, and strong pitch execution.",
    skills: ["Next.js", "UI/UX", "Pitching", "Rapid MVP"],
    cta: "Let’s build a winning team",
    icon: <Rocket className="h-5 w-5" />,
    accent: "from-sky-500/20 via-cyan-500/10 to-blue-500/20",
  },
  {
    id: "startup-collab",
    title: "Startup / MVP Collaboration",
    type: "startup",
    badge: "Open",
    timeline: "2–12 weeks",
    mode: "Remote",
    summary:
      "Open to founder-led MVPs, startup launches, internal tools, and product collaborations with serious execution.",
    skills: ["Product Thinking", "MVP Build", "Frontend", "AI Features"],
    cta: "Build something serious together",
    icon: <Lightbulb className="h-5 w-5" />,
    accent: "from-violet-500/20 via-fuchsia-500/10 to-cyan-500/20",
  },
  {
    id: "freelance-collab",
    title: "Freelance / Client Build",
    type: "freelance",
    badge: "Available",
    timeline: "Flexible",
    mode: "Remote / On-site",
    summary:
      "Modern portfolio sites, landing pages, dashboards, web apps, premium UI and scalable frontends.",
    skills: ["Landing Pages", "Dashboards", "Portfolio", "Responsive UI"],
    cta: "Work with me on a project",
    icon: <Briefcase className="h-5 w-5" />,
    accent: "from-emerald-500/20 via-green-500/10 to-cyan-500/20",
  },
  {
    id: "research-build",
    title: "AI / Research Collaboration",
    type: "research",
    badge: "Experimental",
    timeline: "Flexible",
    mode: "Remote",
    summary:
      "Interested in AI for social good, robotics experimentation, intelligent workflows, and useful research-backed products.",
    skills: ["AI", "Robotics", "Research", "Prototyping"],
    cta: "Explore research + product build",
    icon: <Code2 className="h-5 w-5" />,
    accent: "from-orange-500/20 via-amber-500/10 to-yellow-500/20",
  },
];

const boardPostsSeed: BoardPost[] = [
  {
    id: "board-1",
    title: "Need a design + frontend partner for hackathon build",
    category: "hackathon",
    mode: "Remote",
    timeline: "This week",
    lookingFor: ["Frontend", "UI/UX", "Pitch Support"],
    details:
      "Best for a 2–4 person team trying to move fast and make the final product look polished from day one.",
    status: "open",
  },
  {
    id: "board-2",
    title: "Open to joining founder-led MVP in early stage",
    category: "startup",
    mode: "Remote",
    timeline: "2–8 weeks",
    lookingFor: ["Product", "Next.js", "AI Features"],
    details:
      "Ideal for practical startup ideas that need a fast builder mindset and a strong first product experience.",
    status: "open",
  },
  {
    id: "board-3",
    title: "Looking for AI + robotics experimentation collaborators",
    category: "research",
    mode: "Remote",
    timeline: "Flexible",
    lookingFor: ["AI", "Research", "Robotics"],
    details:
      "Open to people interested in useful, real-world, experiment-driven intelligent systems.",
    status: "active",
  },
];

const blogPosts: BlogPost[] = [
  {
    id: "note-1",
    title: "How I like to build fast without making the UI messy",
    tag: "Builder Note",
    readTime: "4 min read",
    excerpt:
      "My workflow for turning rough ideas into clean, premium interfaces without overcomplicating the stack.",
    bullets: [
      "Start with scope clarity before components.",
      "Design around one core user flow first.",
      "Keep the first version elegant, not overstuffed.",
    ],
  },
  {
    id: "note-2",
    title: "My hackathon system: idea, UI, pitch, and execution",
    tag: "Hackathon",
    readTime: "5 min read",
    excerpt:
      "The structure I use when the goal is to move fast, keep the product clear, and still make the final demo look serious.",
    bullets: [
      "Choose a crisp problem statement.",
      "Make the UI look intentional early.",
      "Pitch around clarity and usefulness.",
    ],
  },
  {
    id: "note-3",
    title: "Why I’m interested in AI + robotics + real-world systems",
    tag: "Thoughts",
    readTime: "3 min read",
    excerpt:
      "I enjoy building systems that feel practical, intelligent, and useful beyond just a cool interface.",
    bullets: [
      "Usefulness matters more than hype.",
      "Good systems should be usable by real people.",
      "Prototype fast, then refine hard.",
    ],
  },
];

const faqs = [
  {
    q: "What kind of collaborations are you open for?",
    a: "Hackathons, startup MVPs, modern websites, dashboards, AI features, and experimental builder collaborations.",
  },
  {
    q: "Do you work remotely?",
    a: "Yes. Remote first. Hybrid or in-person can work depending on the project and location.",
  },
  {
    q: "Can someone contact you for a team-up even without a full plan?",
    a: "Yes. A rough idea is enough if the intent is serious and the scope is clear enough to discuss.",
  },
  {
    q: "What do you value most in collaborators?",
    a: "Clarity, execution, communication, and the willingness to actually build instead of just talking.",
  },
];

const STORAGE_REQUESTS_KEY = "rahil_collab_requests";
const STORAGE_BOARD_KEY = "rahil_collab_board";

export default function OpenCollabSection() {
  const [tab, setTab] = useState<TabId>("overview");
  const [activeFilter, setActiveFilter] = useState<CollabType>("all");
  const [search, setSearch] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitMsg, setSubmitMsg] = useState("");
  const [copyMsg, setCopyMsg] = useState("");
  const [savedRequests, setSavedRequests] = useState<SavedRequest[]>([]);
  const [boardPosts, setBoardPosts] = useState<BoardPost[]>(boardPostsSeed);

  const [form, setForm] = useState({
    name: "",
    email: "",
    type: "",
    idea: "",
  });

  useEffect(() => {
    try {
      const rawRequests = localStorage.getItem(STORAGE_REQUESTS_KEY);
      const rawBoard = localStorage.getItem(STORAGE_BOARD_KEY);

      if (rawRequests) {
        setSavedRequests(JSON.parse(rawRequests));
      }
      if (rawBoard) {
        setBoardPosts(JSON.parse(rawBoard));
      } else {
        localStorage.setItem(STORAGE_BOARD_KEY, JSON.stringify(boardPostsSeed));
      }
    } catch {
      // ignore storage errors
    }
  }, []);

  const filteredCards = useMemo(() => {
    const base =
      activeFilter === "all"
        ? collaborationCards
        : collaborationCards.filter((item) => item.type === activeFilter);

    if (!search.trim()) return base;

    const q = search.toLowerCase();
    return base.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q) ||
        item.skills.join(" ").toLowerCase().includes(q)
    );
  }, [activeFilter, search]);

  const filteredBoardPosts = useMemo(() => {
    const base =
      activeFilter === "all"
        ? boardPosts
        : boardPosts.filter((item) => item.category === activeFilter);

    if (!search.trim()) return base;

    const q = search.toLowerCase();
    return base.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.details.toLowerCase().includes(q) ||
        item.lookingFor.join(" ").toLowerCase().includes(q)
    );
  }, [activeFilter, search, boardPosts]);

  const stats = useMemo(() => {
    return {
      tracks: collaborationCards.length,
      openPosts: boardPosts.filter((item) => item.status === "open").length,
      notes: blogPosts.length,
      requests: savedRequests.length,
    };
  }, [boardPosts, savedRequests]);

  const saveRequestLocally = (status: RequestStatus) => {
    const entry: SavedRequest = {
      id: cryptoRandomId(),
      name: form.name,
      email: form.email,
      type: form.type,
      idea: form.idea,
      status,
      createdAt: new Date().toISOString(),
    };

    const next = [entry, ...savedRequests];
    setSavedRequests(next);
    localStorage.setItem(STORAGE_REQUESTS_KEY, JSON.stringify(next));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitMsg("");
    setSubmitting(true);

    try {
      if (!form.name || !form.email || !form.type || !form.idea) {
        throw new Error("Please fill all fields.");
      }

      let backendWorked = false;

      try {
        const res = await fetch("/api/collab/request", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });

        const json = await res.json().catch(() => null);

        if (res.ok && json?.ok) {
          backendWorked = true;
        }
      } catch {
        backendWorked = false;
      }

      saveRequestLocally(backendWorked ? "sent" : "saved");
      setSubmitMsg(
        backendWorked
          ? "Request sent successfully."
          : "Request saved locally. Backend connect hote hi direct send bhi ho jayega."
      );

      setForm({
        name: "",
        email: "",
        type: "",
        idea: "",
      });
    } catch (error: any) {
      setSubmitMsg(error.message || "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCopyProfile = async () => {
    try {
      await navigator.clipboard.writeText(window.location.origin + "/#collaboration");
      setCopyMsg("Link copied");
      setTimeout(() => setCopyMsg(""), 1800);
    } catch {
      setCopyMsg("Copy failed");
      setTimeout(() => setCopyMsg(""), 1800);
    }
  };

  return (
    <section
      id="collaboration"
      className="section-shell relative overflow-hidden px-4 py-4 sm:px-5 sm:py-5"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.08),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.08),transparent_26%)]" />

      <div className="relative">
        {/* compact top bar */}
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0">
            <div className="badge-pill inline-flex items-center gap-2 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-cyan-300">
              <Handshake className="h-3.5 w-3.5" />
              Open to Collaborations
            </div>

            <h2 className="mt-2 text-lg font-semibold text-white sm:text-2xl">
              Build with me
            </h2>

            <p className="mt-1 max-w-2xl text-sm text-slate-400">
              Hackathons, startup MVPs, freelance builds, AI ideas, builder collabs.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <SmallStat icon={<Users className="h-3.5 w-3.5" />} label={`${stats.openPosts} open posts`} />
            <SmallStat icon={<BookOpen className="h-3.5 w-3.5" />} label={`${stats.notes} notes`} />
            <SmallStat icon={<Send className="h-3.5 w-3.5" />} label={`${stats.requests} saved reqs`} />

            <button
              type="button"
              onClick={handleCopyProfile}
              className="chip-soft inline-flex items-center gap-2 px-3 py-1.5 text-[11px] text-slate-300 hover:text-cyan-300"
            >
              <Copy className="h-3.5 w-3.5 text-cyan-300" />
              Share
            </button>
          </div>
        </div>

        {copyMsg && (
          <div className="mt-3 rounded-2xl border border-cyan-400/20 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300">
            {copyMsg}
          </div>
        )}

        {/* single inner container */}
        <div className="inner-shell mt-4 overflow-hidden p-3 sm:p-4">
          {/* tab row */}
          <div className="flex flex-wrap gap-2">
            {tabs.map((item) => {
              const isActive = tab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setTab(item.id)}
                  className={`rounded-full border px-3 py-1.5 text-xs transition ${
                    isActive
                      ? "border-cyan-400/25 bg-cyan-500/10 text-cyan-300"
                      : "border-white/10 bg-white/[0.03] text-slate-300 hover:border-white/20"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* controls */}
          <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap gap-2">
              {filters.map((item) => {
                const isActive = activeFilter === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveFilter(item.id)}
                    className={`rounded-full border px-3 py-1.5 text-[11px] transition ${
                      isActive
                        ? "border-cyan-400/25 bg-cyan-500/10 text-cyan-300"
                        : "border-white/10 bg-white/[0.03] text-slate-300 hover:border-white/20"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>

            <div className="relative w-full md:max-w-xs">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search collaborations"
                className="input-glass h-10 w-full pl-10 pr-4 text-sm placeholder:text-slate-500"
              />
            </div>
          </div>

          {/* OVERVIEW */}
          {tab === "overview" && (
            <div className="mt-5 space-y-5">
              <div className="grid gap-3 lg:grid-cols-2">
                {filteredCards.map((item) => (
                  <div
                    key={item.id}
                    className={`card-compact overflow-hidden rounded-[22px] bg-gradient-to-br ${item.accent} p-[1px]`}
                  >
                    <div className="h-full rounded-[21px] bg-slate-950/92 p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-cyan-300">
                            {item.icon}
                          </div>

                          <div>
                            <h3 className="text-sm font-semibold text-white sm:text-base">
                              {item.title}
                            </h3>
                            <div className="mt-1 flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.16em] text-slate-500">
                              <span>{item.timeline}</span>
                              <span>•</span>
                              <span>{item.mode}</span>
                            </div>
                          </div>
                        </div>

                        <span className="chip-soft px-2 py-1 text-[9px] uppercase tracking-[0.14em] text-cyan-300">
                          {item.badge}
                        </span>
                      </div>

                      <p className="mt-3 text-sm leading-6 text-slate-400">
                        {item.summary}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-2">
                        {item.skills.map((skill) => (
                          <span
                            key={skill}
                            className="chip-soft px-3 py-1 text-[11px] text-slate-300"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <div className="text-sm font-medium text-cyan-300">
                          {item.cta}
                        </div>
                        <ChevronRight className="h-4 w-4 text-slate-500" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid gap-3 md:grid-cols-3">
                <MiniFeature
                  icon={<Users className="h-4 w-4" />}
                  title="Team Up"
                  text="Hackathon, MVP, and rapid build collaborations."
                />
                <MiniFeature
                  icon={<Code2 className="h-4 w-4" />}
                  title="Build Fast"
                  text="Modern UI, clean execution, and strong product flow."
                />
                <MiniFeature
                  icon={<Handshake className="h-4 w-4" />}
                  title="Let’s Connect"
                  text="Open for projects, startup ideas, and serious collabs."
                />
              </div>
            </div>
          )}

          {/* BOARD */}
          {tab === "board" && (
            <div className="mt-5 grid gap-5 xl:grid-cols-[1fr_320px]">
              <div className="space-y-3">
                {filteredBoardPosts.length === 0 ? (
                  <EmptyState text="No matching collaboration posts found." />
                ) : (
                  filteredBoardPosts.map((post) => (
                    <div key={post.id} className="card-compact rounded-[20px] p-4">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <div className="text-sm font-semibold text-white sm:text-base">
                            {post.title}
                          </div>
                          <div className="mt-1 flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.16em] text-slate-500">
                            <span>{post.timeline}</span>
                            <span>•</span>
                            <span>{post.mode}</span>
                            <span>•</span>
                            <span>{post.category}</span>
                          </div>
                        </div>

                        <span
                          className={`rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.16em] ${
                            post.status === "open"
                              ? "border-emerald-400/20 bg-emerald-500/10 text-emerald-300"
                              : "border-amber-400/20 bg-amber-500/10 text-amber-300"
                          }`}
                        >
                          {post.status}
                        </span>
                      </div>

                      <p className="mt-3 text-sm leading-6 text-slate-400">
                        {post.details}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-2">
                        {post.lookingFor.map((item) => (
                          <span
                            key={item}
                            className="chip-soft px-3 py-1 text-[11px] text-slate-300"
                          >
                            {item}
                          </span>
                        ))}
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <div className="inline-flex items-center gap-2 text-sm text-cyan-300">
                          <MessageSquare className="h-4 w-4" />
                          Open for discussion
                        </div>
                        <ArrowRight className="h-4 w-4 text-slate-500" />
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="card-compact rounded-[22px] p-4">
                <div className="flex items-center gap-2 text-cyan-300">
                  <Filter className="h-4 w-4" />
                  <span className="text-xs uppercase tracking-[0.16em]">
                    Board Highlights
                  </span>
                </div>

                <h3 className="mt-3 text-lg font-semibold text-white">
                  Collaboration board
                </h3>

                <div className="mt-4 space-y-3">
                  <MiniInfo label="Open posts" value={String(stats.openPosts)} />
                  <MiniInfo label="Tracks" value={String(stats.tracks)} />
                  <MiniInfo label="Search state" value={search ? "Filtered" : "All visible"} />
                </div>

                <div className="mt-4 rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                  <div className="text-xs uppercase tracking-[0.16em] text-slate-500">
                    Best use
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    Use this tab to quickly show what kind of team-ups and projects
                    you’re actively open for.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* NOTES */}
          {tab === "notes" && (
            <div className="mt-5 grid gap-5 xl:grid-cols-[1fr_320px]">
              <div className="space-y-3">
                {blogPosts.map((post) => (
                  <div
                    key={post.id}
                    className="card-compact rounded-[22px] p-4 sm:p-5"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-[10px] uppercase tracking-[0.16em] text-cyan-300">
                        {post.tag}
                      </span>
                      <span className="text-[11px] text-slate-500">
                        {post.readTime}
                      </span>
                    </div>

                    <h3 className="mt-3 text-base font-semibold text-white">
                      {post.title}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-slate-400">
                      {post.excerpt}
                    </p>

                    <div className="mt-4 space-y-2">
                      {post.bullets.map((bullet) => (
                        <div
                          key={bullet}
                          className="rounded-xl border border-white/8 bg-white/[0.03] px-3 py-2 text-sm text-slate-300"
                        >
                          {bullet}
                        </div>
                      ))}
                    </div>

                    <button
                      type="button"
                      className="mt-4 inline-flex items-center gap-2 text-sm text-cyan-300"
                    >
                      Read more
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="card-compact rounded-[22px] p-4">
                <div className="flex items-center gap-2 text-cyan-300">
                  <BookOpen className="h-4 w-4" />
                  <span className="text-xs uppercase tracking-[0.16em]">
                    Why this helps
                  </span>
                </div>

                <h3 className="mt-3 text-lg font-semibold text-white">
                  Builder trust layer
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-400">
                  This notes section helps people understand your process, taste,
                  speed, and seriousness before they reach out.
                </p>

                <div className="mt-4 space-y-3">
                  <MiniInfo label="Notes published" value={String(blogPosts.length)} />
                  <MiniInfo label="Tone" value="Builder + product" />
                  <MiniInfo label="Best for" value="Serious collaborators" />
                </div>
              </div>
            </div>
          )}

          {/* REQUEST */}
          {tab === "request" && (
            <div className="mt-5 grid gap-5 xl:grid-cols-[1fr_320px]">
              <div className="card-compact rounded-[24px] p-4 sm:p-5">
                <div className="flex items-center gap-2 text-cyan-300">
                  <MessageSquare className="h-4 w-4" />
                  <span className="text-xs uppercase tracking-[0.16em]">
                    Work With Me
                  </span>
                </div>

                <h3 className="mt-3 text-xl font-semibold text-white">
                  Send a collaboration request
                </h3>

                <p className="mt-2 text-sm text-slate-400">
                  Tell me what you want to build, what kind of collaboration you’re
                  looking for, and I can take it forward.
                </p>

                <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field
                      label="Your Name"
                      value={form.name}
                      onChange={(value) =>
                        setForm((prev) => ({ ...prev, name: value }))
                      }
                    />
                    <Field
                      label="Email"
                      value={form.email}
                      onChange={(value) =>
                        setForm((prev) => ({ ...prev, email: value }))
                      }
                    />
                  </div>

                  <Field
                    label="Collaboration Type"
                    value={form.type}
                    onChange={(value) =>
                      setForm((prev) => ({ ...prev, type: value }))
                    }
                  />

                  <TextAreaField
                    label="Idea / Project Details"
                    value={form.idea}
                    onChange={(value) =>
                      setForm((prev) => ({ ...prev, idea: value }))
                    }
                  />

                  <button
                    type="submit"
                    disabled={submitting}
                    className="shadow-soft-glow inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sky-500 via-cyan-500 to-violet-500 px-5 py-3 text-sm font-semibold text-white transition hover:brightness-110 disabled:opacity-70"
                  >
                    {submitting ? "Sending..." : "Send Request"}
                    <Send className="h-4 w-4" />
                  </button>

                  {submitMsg && (
                    <div
                      className={`rounded-2xl px-4 py-3 text-sm ${
                        submitMsg.toLowerCase().includes("success") ||
                        submitMsg.toLowerCase().includes("saved")
                          ? "border border-emerald-400/20 bg-emerald-500/10 text-emerald-300"
                          : "border border-rose-500/20 bg-rose-500/10 text-rose-300"
                      }`}
                    >
                      {submitMsg}
                    </div>
                  )}
                </form>
              </div>

              <div className="space-y-4">
                <div className="card-compact rounded-[22px] p-4">
                  <div className="flex items-center gap-2 text-cyan-300">
                    <Clock3 className="h-4 w-4" />
                    <span className="text-xs uppercase tracking-[0.16em]">
                      Saved Requests
                    </span>
                  </div>

                  <div className="mt-4 space-y-3">
                    {savedRequests.length === 0 ? (
                      <EmptyState text="No saved requests yet." compact />
                    ) : (
                      savedRequests.slice(0, 5).map((item) => (
                        <div
                          key={item.id}
                          className="rounded-2xl border border-white/8 bg-white/[0.03] p-3"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="text-sm font-medium text-white">
                              {item.name}
                            </div>
                            <span
                              className={`rounded-full px-2 py-1 text-[10px] uppercase tracking-[0.14em] ${
                                item.status === "sent"
                                  ? "border border-emerald-400/20 bg-emerald-500/10 text-emerald-300"
                                  : "border border-amber-400/20 bg-amber-500/10 text-amber-300"
                              }`}
                            >
                              {item.status}
                            </span>
                          </div>
                          <div className="mt-1 text-[11px] text-slate-500">
                            {item.type}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                <div className="card-compact rounded-[22px] p-4">
                  <div className="flex items-center gap-2 text-cyan-300">
                    <Zap className="h-4 w-4" />
                    <span className="text-xs uppercase tracking-[0.16em]">
                      Best requests
                    </span>
                  </div>

                  <div className="mt-4 space-y-2">
                    <Tip text="Scope clear rakho." />
                    <Tip text="Timeline mention karo." />
                    <Tip text="Team size ya role batao." />
                    <Tip text="Idea practical ho to response better hota hai." />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* FAQ */}
          {tab === "faq" && (
            <div className="mt-5 grid gap-3">
              {faqs.map((item) => (
                <div key={item.q} className="card-compact rounded-[20px] p-4">
                  <div className="flex items-start gap-3">
                    <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-cyan-300">
                      <Star className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-white">{item.q}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-400">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* tiny footer row inside box */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-[18px] border border-white/8 bg-white/[0.03] px-4 py-3">
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
            <span className="inline-flex items-center gap-1">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-300" />
              Collaboration-ready
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="inline-flex items-center gap-1">
              <Globe className="h-3.5 w-3.5 text-cyan-300" />
              Remote / Hybrid
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="inline-flex items-center gap-1">
              <Users className="h-3.5 w-3.5 text-cyan-300" />
              Serious builders welcome
            </span>
          </div>

          <button
            type="button"
            onClick={() => setTab("request")}
            className="inline-flex items-center gap-2 text-sm font-medium text-cyan-300"
          >
            Start a request
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

function SmallStat({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div className="chip-soft inline-flex items-center gap-2 px-3 py-1.5 text-[11px] text-slate-300">
      <span className="text-cyan-300">{icon}</span>
      {label}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="space-y-2">
      <label className="text-xs uppercase tracking-[0.14em] text-slate-500">
        {label}
      </label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="input-glass h-11 w-full px-4 text-sm placeholder:text-slate-500"
        placeholder={label}
      />
    </div>
  );
}

function TextAreaField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="space-y-2">
      <label className="text-xs uppercase tracking-[0.14em] text-slate-500">
        {label}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="textarea-glass min-h-[150px] w-full px-4 py-3 text-sm placeholder:text-slate-500"
        placeholder="Describe the project, collaboration type, timeline, and what you expect."
      />
    </div>
  );
}

function MiniFeature({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="card-compact rounded-[20px] p-4">
      <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-cyan-300">
        {icon}
      </div>
      <h4 className="mt-3 text-sm font-semibold text-white">{title}</h4>
      <p className="mt-2 text-sm leading-6 text-slate-400">{text}</p>
    </div>
  );
}

function MiniInfo({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-3">
      <div className="text-[10px] uppercase tracking-[0.16em] text-slate-500">
        {label}
      </div>
      <div className="mt-1 text-sm font-medium text-white">{value}</div>
    </div>
  );
}

function Tip({ text }: { text: string }) {
  return (
    <div className="rounded-xl border border-white/8 bg-white/[0.03] px-3 py-2 text-sm text-slate-300">
      {text}
    </div>
  );
}

function EmptyState({
  text,
  compact = false,
}: {
  text: string;
  compact?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border border-dashed border-slate-700 bg-slate-950/30 text-center text-slate-400 ${
        compact ? "p-4 text-sm" : "p-8"
      }`}
    >
      {text}
    </div>
  );
}

function cryptoRandomId() {
  try {
    return crypto.randomUUID();
  } catch {
    return Math.random().toString(36).slice(2, 10);
  }
}