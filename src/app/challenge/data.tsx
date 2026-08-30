import type { ReactNode } from "react";
import {
  Brain,
  CalendarDays,
  CheckCircle2,
  Code2,
  Globe,
  Lightbulb,
  Rocket,
  ShieldCheck,
  Target,
  Trophy,
  Users,
  Building2,
  LayoutDashboard,
} from "lucide-react";

type Track = {
  title: string;
  text: string;
  icon: ReactNode;
};

type ProblemStatement = {
  title: string;
  overview: string;
  objectives: string[];
  deliverables: string[];
  rules: string[];
};

type ChallengeItem = {
  slug: string;
  title: string;
  subtitle: string;
  shortDescription: string;
  description: string;
  theme: string;
  softTheme: string;
  iconBg: string;
  icon: ReactNode;
  badge: string;
  duration: string;
  team: string;
  goal: string;
  benefits: string[];
  judging: string[];
  tracks: Track[];
  points: string[];
  problemStatement: ProblemStatement;
};

export const challengeData: Record<string, ChallengeItem> = {
  hackathon: {
    slug: "hackathon",
    title: "AI Hackathon",
    subtitle: "Build real-world AI products",
    shortDescription:
      "Turn ideas into working AI tools, assistants, and products.",
    description:
      "AI Hackathon is built for teams that want to move fast and create real products. The focus is on solving meaningful problems with working prototypes, strong product logic, and a compelling final demo.",
    theme: "from-sky-500 via-cyan-500 to-blue-500",
    softTheme: "from-sky-500/20 via-cyan-500/10 to-blue-500/20",
    iconBg: "bg-sky-500/10 text-sky-300 border-sky-500/20",
    icon: <Code2 className="h-6 w-6" />,
    badge: "Live",
    duration: "48–72 Hours",
    team: "2–4 Members",
    goal: "Prototype + Demo + Pitch",
    benefits: [
      "Build a real portfolio-ready product",
      "Strengthen team execution and product thinking",
      "Great for startup-style innovation",
    ],
    judging: [
      "Problem relevance",
      "Prototype quality",
      "Innovation",
      "Pitch clarity",
      "UI/UX quality",
      "Feasibility",
    ],
    tracks: [
      {
        title: "AI Productivity Tool",
        text: "Build assistants or automation tools that improve speed, focus, and execution.",
        icon: null,
      },
      {
        title: "Education / Learning",
        text: "Create AI tools that improve learning, revision planning, or doubt support.",
        icon: <Rocket className="h-4 w-4" />,
      },
      {
        title: "Social Good",
        text: "Build products that improve access, awareness, inclusion, or public support systems.",
        icon: <Globe className="h-4 w-4" />,
      },
    ],
    points: [
      "Strong real-world problem",
      "Fast and functional build",
      "Demo-ready experience",
      "Clear value proposition",
    ],
    problemStatement: {
      title: "Build an AI-Powered Solution for Real-World Impact",
      overview:
        "Participants must identify a meaningful real-world problem and develop a working AI-powered solution that improves productivity, access, education, support, or decision-making.",
      objectives: [
        "Solve a clear real-world problem",
        "Build a working prototype using AI",
        "Focus on usability and product experience",
        "Present a compelling demo and pitch",
      ],
      deliverables: [
        "Problem definition",
        "Solution overview",
        "Working prototype or MVP",
        "Short pitch / demo explanation",
        "Optional GitHub and deployment link",
      ],
      rules: [
        "Only original work is allowed",
        "Plagiarism or copied UI will be rejected",
        "The AI feature should be meaningful, not decorative",
        "Submission must be completed before the deadline",
      ],
    },
  },

  ideathon: {
    slug: "ideathon",
    title: "Ideathon",
    subtitle: "Pitch bold ideas with strong logic",
    shortDescription:
      "Present problem-first solutions with vision, clarity, and depth.",
    description:
      "Ideathon rewards strong thinking, research, and product logic. The focus is on problem framing, solution clarity, scalability, and presentation strength rather than full coding.",
    theme: "from-fuchsia-500 via-violet-500 to-sky-500",
    softTheme: "from-fuchsia-500/20 via-violet-500/10 to-sky-500/20",
    iconBg: "bg-fuchsia-500/10 text-fuchsia-300 border-fuchsia-500/20",
    icon: <Lightbulb className="h-6 w-6" />,
    badge: "Open",
    duration: "1–2 Days",
    team: "Solo / Team",
    goal: "Idea + Research + Pitch",
    benefits: [
      "Improve startup and product thinking",
      "Practice structured presentation skills",
      "Build strong innovation case studies",
    ],
    judging: [
      "Problem clarity",
      "Originality",
      "Scalability",
      "Research quality",
      "Presentation strength",
      "Practical relevance",
    ],
    tracks: [
      {
        title: "Campus Innovation",
        text: "Solve student and campus ecosystem problems with scalable ideas.",
        icon: null,
      },
      {
        title: "Startup Concepts",
        text: "Design a bold future-ready concept with clear product-market logic.",
        icon: <Rocket className="h-4 w-4" />,
      },
      {
        title: "Public Impact Ideas",
        text: "Pitch systems that improve awareness, access, or support at scale.",
        icon: <ShieldCheck className="h-4 w-4" />,
      },
    ],
    points: [
      "Strong idea framing",
      "Problem-solution fit",
      "Pitch-deck clarity",
      "Convincing execution logic",
    ],
    problemStatement: {
      title: "Design a High-Impact Scalable Idea",
      overview:
        "Participants must identify an important problem and present a clear, scalable, and innovative solution with strong research, product logic, and execution feasibility.",
      objectives: [
        "Define a meaningful and relevant problem",
        "Present an original and scalable idea",
        "Explain market, users, and impact clearly",
        "Communicate the concept with strong storytelling",
      ],
      deliverables: [
        "Problem statement",
        "Idea overview",
        "Target user definition",
        "Solution framework",
        "Pitch deck or structured presentation",
      ],
      rules: [
        "Ideas must be original",
        "Research-backed reasoning is preferred",
        "Presentation clarity matters strongly",
        "The solution should be practical enough to imagine in real use",
      ],
    },
  },

  "weekly-ai": {
    slug: "weekly-ai",
    title: "Weekly Challenge",
    subtitle: "One focused build every week",
    shortDescription:
      "A 7-day sprint to build something useful, polished, and portfolio-worthy.",
    description:
      "Weekly Challenge is for consistent builders. Every week, participants ship one focused product with strong utility, clean UI/UX, and polished execution.",
    theme: "from-emerald-500 via-green-500 to-cyan-500",
    softTheme: "from-emerald-500/20 via-green-500/10 to-cyan-500/20",
    iconBg: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
    icon: <Brain className="h-6 w-6" />,
    badge: "Featured",
    duration: "7 Days",
    team: "Solo / Duo",
    goal: "Impact + UI + Execution",
    benefits: [
      "Build consistency every week",
      "Create portfolio-ready mini products",
      "Focus on modern UI and strong utility",
    ],
    judging: [
      "Usefulness",
      "Execution speed",
      "Modern UI/UX",
      "Originality",
      "Working experience",
      "Presentation quality",
    ],
    tracks: [
      {
        title: "Accessibility Assistant",
        text: "Build an AI feature that helps users with accessibility needs interact better with digital systems.",
        icon: <ShieldCheck className="h-4 w-4" />,
      },
      {
        title: "Student Productivity Copilot",
        text: "Create a smart assistant for focus, revision planning, notes, or research workflows.",
        icon: <Rocket className="h-4 w-4" />,
      },
      {
        title: "Local Impact Tool",
        text: "Solve a real community or guidance problem using AI with strong product thinking.",
        icon: <Globe className="h-4 w-4" />,
      },
    ],
    points: [
      "Useful product thinking",
      "Clean modern interface",
      "Fast but polished execution",
      "Portfolio-worthy output",
    ],
    problemStatement: {
      title: "Build an AI Product That Solves One Meaningful Problem in 7 Days",
      overview:
        "Participants must build a focused AI-powered mini product that solves one clear problem with strong usability and practical value.",
      objectives: [
        "Pick one sharp problem only",
        "Design a polished and modern UI",
        "Use AI meaningfully in the core workflow",
        "Deliver a working solution within 7 days",
      ],
      deliverables: [
        "Problem definition",
        "Target users",
        "Feature list",
        "Working prototype or product",
        "Demo link and short project explanation",
      ],
      rules: [
        "One focused product only",
        "UI/UX should be clean and modern",
        "AI should be part of the core solution",
        "Submission should include a proper explanation",
      ],
    },
  },
};

export const challengeSteps = [
  {
    title: "Explore",
    desc: "Read the challenge details and understand the format clearly.",
    icon: <Target className="h-5 w-5" />,
  },
  {
    title: "Problem Statement",
    desc: "Open the full problem statement page and understand the expected output.",
    icon: null,
  },
  {
    title: "Register",
    desc: "Join the challenge and secure your participation.",
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: "Submit",
    desc: "Upload your final work before the deadline ends.",
    icon: <Trophy className="h-5 w-5" />,
  },
];

export const overviewStats = [
  {
    label: "Active Challenges",
    value: "03",
    icon: <CalendarDays className="h-4 w-4" />,
  },
  {
    label: "Weekly Sprint",
    value: "7 Days",
    icon: <Brain className="h-4 w-4" />,
  },
  {
    label: "Focus",
    value: "UI + Impact",
    icon: <Target className="h-4 w-4" />,
  },
  {
    label: "Ideal For",
    value: "Builders",
    icon: <Users className="h-4 w-4" />,
  },
];

export type TechEventCategory = "hackathon" | "ideathon" | "event";

export type TechEventItem = {
  id: string;
  title: string;
  category: TechEventCategory;
  city: string;
  venue: string;
  dateLabel: string;
  monthSort: string;
  short: string;
  explore: string;
  details: string[];
  sourceLabel: string;
  sourceHref: string;
  sourceType: "official" | "secondary";
  theme: string;
  iconBg: string;
  icon: ReactNode;
  featured?: boolean;
};

export const upcomingTechItems: TechEventItem[] = [
  {
    id: "codex-bengaluru-2026",
    title: "OpenAI Codex Hackathon",
    category: "hackathon",
    city: "Bengaluru",
    venue: "Bengaluru, India",
    dateLabel: "16 Apr 2026",
    monthSort: "2026-04-16",
    short: "One-day AI coding hackathon.",
    explore:
      "Best for teams who want to build fast with AI coding workflows and ship something practical in one day.",
    details: [
      "OpenAI community page lists a Bengaluru Codex Hackathon.",
      "Strong flagship event for AI-assisted coding builders.",
      "Good featured card for homepage.",
    ],
    sourceLabel: "OpenAI Community",
    sourceHref: "https://developers.openai.com/community/meetups",
    sourceType: "official",
    theme: "from-emerald-500/20 via-cyan-500/10 to-sky-500/20",
    iconBg: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
    icon: <Code2 className="h-5 w-5" />,
    featured: true,
  },
  {
    id: "global-startup-summit-delhi-ncr-2026",
    title: "Global Startup Summit Delhi NCR",
    category: "event",
    city: "Gurugram",
    venue: "Country Inn & Suites, Udyog Vihar",
    dateLabel: "11 Apr 2026",
    monthSort: "2026-04-11",
    short: "Startup and tech networking summit.",
    explore:
      "Useful for startup exposure, investor networking, founder talks, and business-tech ecosystem access in NCR.",
    details: [
      "Good event-type category entry for Delhi NCR.",
      "Best for networking and ecosystem exposure.",
      "Not a hackathon, more of a summit format.",
    ],
    sourceLabel: "10times",
    sourceHref: "https://10times.com/e1r1-x3g2-6xsp",
    sourceType: "secondary",
    theme: "from-sky-500/20 via-cyan-500/10 to-blue-500/20",
    iconBg: "bg-sky-500/10 text-sky-300 border-sky-500/20",
    icon: <Building2 className="h-5 w-5" />,
    featured: true,
  },
  {
    id: "hackverse-2-gurugram-2026",
    title: "HackVerse 2.0",
    category: "hackathon",
    city: "Gurugram",
    venue: "IILM University, Gurugram",
    dateLabel: "Apr 2026",
    monthSort: "2026-04-07",
    short: "Offline university hackathon.",
    explore:
      "Execution-focused student hackathon for prototype building, teamwork, and practical problem solving.",
    details: [
      "Good NCR college hackathon option.",
      "Useful for builder-heavy student participation.",
      "Keep as secondary-source listing.",
    ],
    sourceLabel: "Unstop",
    sourceHref: "https://unstop.com/hackathons/hack-verse-20-iilm-university-gurugram-1651641/amp",
    sourceType: "secondary",
    theme: "from-violet-500/20 via-fuchsia-500/10 to-cyan-500/20",
    iconBg: "bg-violet-500/10 text-violet-300 border-violet-500/20",
    icon: <Trophy className="h-5 w-5" />,
    featured: true,
  },
  {
    id: "nexify-26-gurugram-2026",
    title: "Nexify'26",
    category: "hackathon",
    city: "Gurugram",
    venue: "Sushant University, Gurgaon",
    dateLabel: "Apr 2026",
    monthSort: "2026-04-17",
    short: "National-level hackathon at Sushant University.",
    explore:
      "Good NCR campus hackathon option for students and early builder teams.",
    details: [
      "Treat as secondary-source listing.",
      "Good for full explore page.",
      "Not ideal as primary homepage card.",
    ],
    sourceLabel: "Unstop",
    sourceHref: "https://unstop.com/hackathons/nexify26-school-of-engineering-and-technology-sushant-university-gurgaon-1666023",
    sourceType: "secondary",
    theme: "from-fuchsia-500/20 via-violet-500/10 to-pink-500/20",
    iconBg: "bg-fuchsia-500/10 text-fuchsia-300 border-fuchsia-500/20",
    icon: <Brain className="h-5 w-5" />,
  },
  {
    id: "aws-summit-bengaluru-2026",
    title: "AWS Summit Bengaluru",
    category: "event",
    city: "Bengaluru",
    venue: "KTPO Exhibition Center, Whitefield",
    dateLabel: "22–23 Apr 2026",
    monthSort: "2026-04-22",
    short: "Cloud and AI summit.",
    explore:
      "Strong pick for cloud, AI, architecture, and networking.",
    details: [
      "Good major-tech-event entry.",
      "Better for learning and networking than competition.",
      "Useful for full events page.",
    ],
    sourceLabel: "AWS",
    sourceHref: "https://aws.amazon.com/events/summits/bengaluru/",
    sourceType: "official",
    theme: "from-orange-500/20 via-amber-500/10 to-yellow-500/20",
    iconBg: "bg-orange-500/10 text-orange-300 border-orange-500/20",
    icon: <CalendarDays className="h-5 w-5" />,
  },
  {
    id: "psb-hackathon-series-noida-2026",
    title: "PSB Hackathon Series 2026 – Suraksha Manthan",
    category: "hackathon",
    city: "Noida",
    venue: "Amity University Noida",
    dateLabel: "2026 listing",
    monthSort: "2026-04-18",
    short: "Hackathon-series item listed by Amity Noida.",
    explore:
      "Useful Noida tech-competition entry for the full explore page.",
    details: [
      "Official university listing exists.",
      "Good to include in NCR collection.",
      "Not necessary for homepage compact cards.",
    ],
    sourceLabel: "Amity University Noida",
    sourceHref: "https://auup.amity.edu/event-list.aspx?Events=Events",
    sourceType: "official",
    theme: "from-cyan-500/20 via-blue-500/10 to-indigo-500/20",
    iconBg: "bg-cyan-500/10 text-cyan-300 border-cyan-500/20",
    icon: null,
  },
  {
    id: "sharda-hackathon-greater-noida-2026",
    title: "Hackathon 2026",
    category: "hackathon",
    city: "Greater Noida",
    venue: "Sharda University",
    dateLabel: "2026 listing",
    monthSort: "2026-04-20",
    short: "Sharda event listing for a 2026 hackathon.",
    explore:
      "Good Greater Noida entry if you want more NCR campus competitions on the explore page.",
    details: [
      "Official event listing exists.",
      "Date specifics should be checked separately.",
      "Good secondary featured item for NCR listing.",
    ],
    sourceLabel: "Sharda Events",
    sourceHref: "https://shardaevents.com/events/hackathon-2026?id=2638",
    sourceType: "official",
    theme: "from-rose-500/20 via-orange-500/10 to-amber-500/20",
    iconBg: "bg-rose-500/10 text-rose-300 border-rose-500/20",
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    id: "srishti-ideathon-2026",
    title: "Srishti Ideathon",
    category: "ideathon",
    city: "Dharwad",
    venue: "SDMCET, Dharwad",
    dateLabel: "28–30 Apr 2026",
    monthSort: "2026-04-28",
    short: "Idea and pitch focused competition.",
    explore:
      "Good ideathon category entry with presentation and solution-thinking emphasis.",
    details: [
      "Useful as main ideathon card.",
      "Event spans multiple days.",
      "Good category balance for explore page.",
    ],
    sourceLabel: "Srishti",
    sourceHref: "https://srishtitech.org/",
    sourceType: "official",
    theme: "from-pink-500/20 via-fuchsia-500/10 to-violet-500/20",
    iconBg: "bg-pink-500/10 text-pink-300 border-pink-500/20",
    icon: <Lightbulb className="h-5 w-5" />,
  },
  {
    id: "nmit-hacks-2026",
    title: "NMIT Hacks 2026",
    category: "hackathon",
    city: "Bengaluru",
    venue: "Nitte University Bangalore campus",
    dateLabel: "8–10 May 2026",
    monthSort: "2026-05-08",
    short: "National-level 48-hour student hackathon.",
    explore:
      "Strong student hackathon with multiple technical tracks and longer build format.",
    details: [
      "Useful for student teams.",
      "Good secondary featured item for full page.",
      "Best fit for builders who want a campus hackathon.",
    ],
    sourceLabel: "NMIT Hacks",
    sourceHref: "https://nmithacks.com/",
    sourceType: "official",
    theme: "from-cyan-500/20 via-blue-500/10 to-indigo-500/20",
    iconBg: "bg-cyan-500/10 text-cyan-300 border-cyan-500/20",
    icon: <Brain className="h-5 w-5" />,
  },
];