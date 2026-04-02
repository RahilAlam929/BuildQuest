"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowUpRight,
  CalendarDays,
  Camera,
  CheckCircle2,
  FolderKanban,
  Layers3,
  Lightbulb,
  Mail,
  Pencil,
  Sparkles,
  Target,
  Trophy,
  Upload,
  Users,
  X,
  Plus,
  Trash2,
  UserRound,
  ExternalLink,
  Send,
} from "lucide-react";

type TeamMember = {
  id?: string;
  _id?: string;
  name: string;
  email: string;
  role: string;
  year: string;
  college: string;
};

type UserType = {
  _id?: string;
  name: string;
  email: string;
  college?: string;
  year?: string;
  role?: string;
  profileImage?: string;
  teamMembers?: TeamMember[];
};

type RegistrationType = {
  _id?: string;
  userId?: string;
  teamId: string;
  challengeType: string;
  teamName?: string;
  teamMembers?: string;
  year?: string;
  role?: string;
  createdAt?: string;
};

type SubmissionType = {
  _id?: string;
  userId?: string;
  teamId: string;
  challengeType: string;
  projectLink?: string;
  githubLink?: string;
  note?: string;
  createdAt?: string;
};

type CollabRequest = {
  _id?: string;
  name: string;
  email: string;
  type: string;
  idea: string;
  status?: string;
  createdAt?: string;
};

const avatarOptions = [
  "https://api.dicebear.com/7.x/bottts/svg?seed=RoboX",
  "https://api.dicebear.com/7.x/bottts/svg?seed=CyberUnit",
  "https://api.dicebear.com/7.x/bottts/svg?seed=MechaNova",
  "https://api.dicebear.com/7.x/bottts/svg?seed=AstroBot",
  "https://api.dicebear.com/7.x/adventurer/svg?seed=Rahil",
  "https://api.dicebear.com/7.x/adventurer/svg?seed=Nova",
  "https://api.dicebear.com/7.x/notionists/svg?seed=Builder",
  "https://api.dicebear.com/7.x/notionists/svg?seed=Pixel",
  "https://api.dicebear.com/7.x/micah/svg?seed=Orbit",
  "https://api.dicebear.com/7.x/micah/svg?seed=Vision",
];

function createEmptyMember(): TeamMember {
  return {
    id: Math.random().toString(36).slice(2, 10),
    name: "",
    email: "",
    role: "",
    year: "",
    college: "",
  };
}

export default function DashboardPage() {
  const [data, setData] = useState<{
    user: UserType | null;
    registrations: RegistrationType[];
    submissions: SubmissionType[];
    teamIds: string[];
    sharedTeamRegistrations: RegistrationType[];
    sharedTeamSubmissions: SubmissionType[];
    sharedTeamUsers: UserType[];
  }>({
    user: null,
    registrations: [],
    submissions: [],
    teamIds: [],
    sharedTeamRegistrations: [],
    sharedTeamSubmissions: [],
    sharedTeamUsers: [],
  });

  const [collabRequests, setCollabRequests] = useState<CollabRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [avatar, setAvatar] = useState<string>("");
  const [showProfileEditor, setShowProfileEditor] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileMsg, setProfileMsg] = useState("");
  const [inviteLoading, setInviteLoading] = useState(false);
  const [inviteMsg, setInviteMsg] = useState("");

  const [editForm, setEditForm] = useState<UserType>({
    name: "",
    email: "",
    college: "",
    year: "",
    role: "",
    profileImage: "",
    teamMembers: [],
  });

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const run = async () => {
      try {
        const res = await fetch("/api/auth/me");
        const contentType = res.headers.get("content-type");

        if (!contentType || !contentType.includes("application/json")) {
          const raw = await res.text();
          console.error("Dashboard /api/auth/me non-JSON:", raw);
          throw new Error("Server returned invalid response.");
        }

        const json = await res.json();

        if (json.ok) {
          const user = json.user || null;

          setData({
            user,
            registrations: json.registrations || [],
            submissions: json.submissions || [],
            teamIds: json.teamIds || [],
            sharedTeamRegistrations: json.sharedTeamRegistrations || [],
            sharedTeamSubmissions: json.sharedTeamSubmissions || [],
            sharedTeamUsers: json.sharedTeamUsers || [],
          });

          setEditForm({
            name: user?.name || "",
            email: user?.email || "",
            college: user?.college || "",
            year: user?.year || "",
            role: user?.role || "",
            profileImage: user?.profileImage || "",
            teamMembers: user?.teamMembers || [],
          });

          setAvatar(user?.profileImage || avatarOptions[4]);
        }
      } catch (error) {
        console.error("Dashboard fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    const loadCollabRequests = async () => {
      try {
        const res = await fetch("/api/collab/list");
        const json = await res.json();
        if (json.ok) {
          setCollabRequests(json.requests || []);
        }
      } catch (error) {
        console.error("Collab request fetch error:", error);
      }
    };

    run();
    loadCollabRequests();
  }, []);

  const stats = useMemo(() => {
    const registrations = data.registrations.length;
    const submissions = data.submissions.length;
    const uniqueChallenges = new Set(
      data.registrations.map((item) => item.challengeType)
    ).size;
    const activeTeams = new Set(data.registrations.map((item) => item.teamId)).size;

    return {
      registrations,
      submissions,
      uniqueChallenges,
      activeTeams,
    };
  }, [data.registrations, data.submissions]);

  const teamStats = useMemo(() => {
    return {
      sharedMembers: data.sharedTeamUsers.length,
      sharedRegistrations: data.sharedTeamRegistrations.length,
      sharedSubmissions: data.sharedTeamSubmissions.length,
    };
  }, [data.sharedTeamUsers, data.sharedTeamRegistrations, data.sharedTeamSubmissions]);

  const recentActivity = useMemo(() => {
    const registrationActivity = data.registrations.map((item) => ({
      type: "registration",
      title: item.teamName || "Untitled Team",
      subtitle: item.challengeType,
      teamId: item.teamId,
      createdAt: item.createdAt || "",
    }));

    const submissionActivity = data.submissions.map((item) => ({
      type: "submission",
      title: item.teamId,
      subtitle: item.challengeType,
      teamId: item.teamId,
      createdAt: item.createdAt || "",
    }));

    return [...registrationActivity, ...submissionActivity]
      .sort((a, b) => {
        const aTime = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const bTime = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return bTime - aTime;
      })
      .slice(0, 6);
  }, [data.registrations, data.submissions]);

  const handleAvatarUpload = (file: File | undefined) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result || "");
      setAvatar(result);
      setEditForm((prev) => ({ ...prev, profileImage: result }));
    };
    reader.readAsDataURL(file);
  };

  const addTeamMember = () => {
    setEditForm((prev) => ({
      ...prev,
      teamMembers: [...(prev.teamMembers || []), createEmptyMember()],
    }));
  };

  const removeTeamMember = (id: string) => {
    setEditForm((prev) => ({
      ...prev,
      teamMembers: (prev.teamMembers || []).filter(
        (member) => (member.id || member._id) !== id
      ),
    }));
  };

  const updateTeamMember = (
    id: string,
    field: keyof Omit<TeamMember, "id" | "_id">,
    value: string
  ) => {
    setEditForm((prev) => ({
      ...prev,
      teamMembers: (prev.teamMembers || []).map((member) =>
        (member.id || member._id) === id ? { ...member, [field]: value } : member
      ),
    }));
  };

  const saveProfilePermanently = async () => {
    try {
      setSavingProfile(true);
      setProfileMsg("");

      const payload = {
        ...editForm,
        profileImage: avatar || editForm.profileImage || "",
        teamMembers: (editForm.teamMembers || []).map((member) => ({
          name: member.name || "",
          email: member.email || "",
          role: member.role || "",
          year: member.year || "",
          college: member.college || "",
        })),
      };

      const res = await fetch("/api/auth/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();

      if (!res.ok || !json.ok) {
        throw new Error(json.message || "Failed to save profile");
      }

      setData((prev) => ({
        ...prev,
        user: json.user,
      }));

      setEditForm({
        name: json.user.name || "",
        email: json.user.email || "",
        college: json.user.college || "",
        year: json.user.year || "",
        role: json.user.role || "",
        profileImage: json.user.profileImage || "",
        teamMembers: json.user.teamMembers || [],
      });

      setAvatar(json.user.profileImage || avatar);
      setProfileMsg("Profile saved successfully.");
      setShowProfileEditor(false);
    } catch (error: any) {
      setProfileMsg(error.message || "Failed to save profile");
    } finally {
      setSavingProfile(false);
    }
  };

  const createInviteLink = async (teamId: string) => {
    try {
      setInviteLoading(true);
      setInviteMsg("");

      const res = await fetch("/api/team/create-invite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ teamId }),
      });

      const json = await res.json();

      if (!res.ok || !json.ok) {
        throw new Error(json.message || "Failed to create invite");
      }

      await navigator.clipboard.writeText(json.inviteUrl);
      setInviteMsg("Invite link copied successfully.");
    } catch (error: any) {
      setInviteMsg(error.message || "Failed to create invite link");
    } finally {
      setInviteLoading(false);
    }
  };

  if (loading) {
    return (
      <main className="mx-auto min-h-screen max-w-7xl px-4 py-12 text-white">
        <div className="section-shell p-8">
          <div className="text-lg font-semibold">Loading dashboard...</div>
          <p className="mt-2 text-sm text-slate-400">
            Fetching your profile, registrations, and team workspace.
          </p>
        </div>
      </main>
    );
  }

  if (!data.user) {
    return (
      <main className="mx-auto min-h-screen max-w-5xl px-4 py-12 text-white">
        <div className="section-shell p-8 text-center">
          <h1 className="text-2xl font-semibold">Please login first</h1>
          <p className="mt-3 text-sm text-slate-400">
            Your dashboard becomes available after login.
          </p>

          <div className="mt-6 flex justify-center gap-3">
            <Link
              href="/auth/login"
              className="chip-soft px-5 py-2.5 text-sm text-slate-200 transition hover:border-sky-400 hover:text-sky-300"
            >
              Login
            </Link>

            <Link
              href="/auth/signup"
              className="rounded-full bg-gradient-to-r from-sky-500 via-cyan-500 to-violet-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:brightness-110"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <>
      <main className="mx-auto min-h-screen max-w-7xl px-4 py-10 text-white">
        <div className="grid gap-6 xl:grid-cols-[360px_1fr]">
          <aside className="space-y-6">
            <section className="section-shell p-6">
              <div className="flex flex-col items-center text-center">
                <div className="relative">
                  <img
                    src={avatar || data.user.profileImage || avatarOptions[0]}
                    alt={data.user.name}
                    className="h-28 w-28 rounded-full border border-white/10 object-cover bg-slate-900"
                  />
                  <button
                    type="button"
                    onClick={() => setShowProfileEditor(true)}
                    className="absolute bottom-0 right-0 inline-flex h-10 w-10 items-center justify-center rounded-full border border-cyan-400/20 bg-cyan-500/10 text-cyan-300 transition hover:bg-cyan-500/20"
                  >
                    <Camera className="h-4 w-4" />
                  </button>
                </div>

                <h1 className="mt-4 text-2xl font-semibold">{data.user.name}</h1>
                <div className="mt-1 inline-flex items-center gap-2 text-sm text-slate-400">
                  <Mail className="h-4 w-4" />
                  {data.user.email}
                </div>

                <button
                  type="button"
                  onClick={() => setShowProfileEditor(true)}
                  className="chip-soft mt-4 inline-flex items-center gap-2 px-4 py-2 text-sm text-slate-200 hover:text-cyan-300"
                >
                  <Pencil className="h-4 w-4" />
                  Edit Profile
                </button>

                <div className="mt-5 w-full space-y-3 text-left">
                  <InfoCard label="College / Organization" value={data.user.college || "-"} />
                  <InfoCard label="Year" value={data.user.year || "-"} />
                  <InfoCard label="Role" value={data.user.role || "-"} />
                  <InfoCard
                    label="Saved Team Members"
                    value={String(data.user.teamMembers?.length || 0)}
                  />
                </div>
              </div>
            </section>

            <section className="section-shell p-6">
              <div className="flex items-center gap-2 text-cyan-300">
                <Sparkles className="h-4 w-4" />
                <span className="text-xs uppercase tracking-[0.16em]">
                  Quick Actions
                </span>
              </div>

              <div className="mt-5 grid gap-3">
                <QuickAction href="/#challenge" text="Explore Challenges" />
                <QuickAction
                  href="/challenge/register?type=weekly-debugging"
                  text="New Registration"
                />
                <QuickAction
                  href="/challenge/submit?type=weekly-debugging"
                  text="Submit Solution"
                />
                <QuickAction href="/idea-forge" text="Explore Idea Forge" />
              </div>
            </section>

            <section className="section-shell p-6">
              <div className="flex items-center gap-2 text-cyan-300">
                <Users className="h-4 w-4" />
                <span className="text-xs uppercase tracking-[0.16em]">
                  Team Members
                </span>
              </div>

              <div className="mt-4 space-y-3">
                {(data.user.teamMembers || []).length === 0 ? (
                  <EmptyState text="No team members added yet." />
                ) : (
                  (data.user.teamMembers || []).map((member, index) => (
                    <div
                      key={member.id || member._id || `${member.email}-${index}`}
                      className="card-compact rounded-2xl p-4"
                    >
                      <div className="flex items-start gap-3">
                        <div className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-slate-300">
                          <UserRound className="h-4 w-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-sm font-semibold text-white">
                            {member.name || "Unnamed Member"}
                          </div>
                          <div className="mt-1 text-xs text-slate-400">
                            {member.email || "-"}
                          </div>
                          <div className="mt-2 text-xs uppercase tracking-[0.14em] text-cyan-300">
                            {member.role || "Role not set"}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>
          </aside>

          <section className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <StatCard
                icon={<Layers3 className="h-5 w-5" />}
                title="Registrations"
                value={String(stats.registrations)}
                accent="text-sky-300"
              />
              <StatCard
                icon={<FolderKanban className="h-5 w-5" />}
                title="Submissions"
                value={String(stats.submissions)}
                accent="text-violet-300"
              />
              <StatCard
                icon={<Target className="h-5 w-5" />}
                title="Challenges Joined"
                value={String(stats.uniqueChallenges)}
                accent="text-cyan-300"
              />
              <StatCard
                icon={<Users className="h-5 w-5" />}
                title="Active Teams"
                value={String(stats.activeTeams)}
                accent="text-emerald-300"
              />
            </div>

            <section className="section-shell p-6">
              <div className="flex items-center gap-2 text-cyan-300">
                <Users className="h-4 w-4" />
                <span className="text-xs uppercase tracking-[0.16em]">
                  Team Invite System
                </span>
              </div>

              <h2 className="mt-3 text-2xl font-semibold">Invite teammates</h2>

              <div className="mt-5 grid gap-4">
                {data.teamIds.length === 0 ? (
                  <EmptyState text="No team IDs available for invite generation." />
                ) : (
                  data.teamIds.map((teamId) => (
                    <div
                      key={teamId}
                      className="card-compact flex flex-wrap items-center justify-between gap-3 rounded-2xl p-4"
                    >
                      <div>
                        <div className="text-sm font-semibold text-white">{teamId}</div>
                        <div className="mt-1 text-xs text-slate-400">
                          Share this invite with your teammates
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => createInviteLink(teamId)}
                        disabled={inviteLoading}
                        className="rounded-full bg-gradient-to-r from-sky-500 via-cyan-500 to-violet-500 px-4 py-2 text-sm font-medium text-white transition hover:brightness-110 disabled:opacity-70"
                      >
                        {inviteLoading ? "Creating..." : "Copy Invite Link"}
                      </button>
                    </div>
                  ))
                )}

                {inviteMsg && (
                  <div className="rounded-2xl border border-cyan-400/20 bg-cyan-500/10 px-4 py-3 text-sm text-cyan-300">
                    {inviteMsg}
                  </div>
                )}
              </div>
            </section>

            <section className="section-shell p-6">
              <div className="flex items-center gap-2 text-cyan-300">
                <Users className="h-4 w-4" />
                <span className="text-xs uppercase tracking-[0.16em]">
                  Team Workspace
                </span>
              </div>

              <h2 className="mt-3 text-2xl font-semibold">Shared team access</h2>

              <div className="mt-5 grid gap-4 md:grid-cols-3">
                <StatMini title="Team IDs" value={String(data.teamIds.length)} />
                <StatMini title="Shared Members" value={String(teamStats.sharedMembers)} />
                <StatMini title="Shared Submissions" value={String(teamStats.sharedSubmissions)} />
              </div>

              <div className="mt-6 grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
                <div className="space-y-3">
                  <div className="text-xs uppercase tracking-[0.16em] text-slate-500">
                    Team Profiles
                  </div>

                  {data.sharedTeamUsers.length === 0 ? (
                    <EmptyState text="No shared team members found." />
                  ) : (
                    data.sharedTeamUsers.map((member, index) => (
                      <div
                        key={member._id || member.email || `member-${index}`}
                        className="card-compact rounded-2xl p-4"
                      >
                        <div className="flex items-start gap-3">
                          <img
                            src={member.profileImage || avatarOptions[0]}
                            alt={member.name}
                            className="h-11 w-11 rounded-full border border-white/10 object-cover bg-slate-900"
                          />
                          <div className="min-w-0">
                            <div className="text-sm font-semibold text-white">
                              {member.name}
                            </div>
                            <div className="mt-1 text-xs text-slate-400">
                              {member.email}
                            </div>
                            <div className="mt-2 text-xs uppercase tracking-[0.14em] text-cyan-300">
                              {member.role || "No role set"}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <div className="space-y-3">
                  <div className="text-xs uppercase tracking-[0.16em] text-slate-500">
                    Team Activity
                  </div>

                  {data.sharedTeamRegistrations.length === 0 ? (
                    <EmptyState text="No shared team activity found." />
                  ) : (
                    data.sharedTeamRegistrations.slice(0, 6).map((item, index) => (
                      <div
                        key={`${item.teamId}-${item.challengeType}-${index}`}
                        className="card-compact rounded-2xl p-4"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <div className="text-sm font-semibold text-white">
                              {item.teamName || "Untitled Team"}
                            </div>
                            <div className="mt-1 text-xs text-slate-400">
                              {item.challengeType}
                            </div>
                          </div>

                          <div className="chip-soft px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-cyan-300">
                            {item.teamId}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </section>

            <section className="section-shell p-6">
              <div className="flex items-center gap-2 text-cyan-300">
                <Sparkles className="h-4 w-4" />
                <span className="text-xs uppercase tracking-[0.16em]">
                  Live Collaboration Requests
                </span>
              </div>

              <h2 className="mt-3 text-2xl font-semibold">Incoming requests</h2>

              <div className="mt-5 grid gap-4">
                {collabRequests.length === 0 ? (
                  <EmptyState text="No collaboration requests yet." />
                ) : (
                  collabRequests.map((item, index) => (
                    <div
                      key={item._id || index}
                      className="card-compact rounded-2xl p-4"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <div className="text-sm font-semibold text-white">{item.name}</div>
                          <div className="mt-1 text-xs text-slate-400">{item.email}</div>
                        </div>

                        <span className="chip-soft px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-cyan-300">
                          {item.type}
                        </span>
                      </div>

                      <p className="mt-3 text-sm leading-6 text-slate-300">
                        {item.idea}
                      </p>

                      <div className="mt-3 text-xs text-slate-500">
                        Status: {item.status || "new"}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>

            <section className="section-shell p-6">
              <div className="flex items-center gap-2 text-cyan-300">
                <Lightbulb className="h-4 w-4" />
                <span className="text-xs uppercase tracking-[0.16em]">
                  Recommended Ideas
                </span>
              </div>

              <h2 className="mt-3 text-2xl font-semibold">Build next from Idea Forge</h2>

              <div className="mt-5 grid gap-4 md:grid-cols-3">
                {[
                  {
                    title: "AI Resume Reviewer",
                    category: "AI / ML",
                    level: "Intermediate",
                  },
                  {
                    title: "Student Club Dashboard",
                    category: "Frontend",
                    level: "Intermediate",
                  },
                  {
                    title: "Habit Tracker App",
                    category: "Mobile",
                    level: "Beginner",
                  },
                ].map((item) => (
                  <Link
                    key={item.title}
                    href="/idea-forge"
                    className="card-compact rounded-2xl p-4"
                  >
                    <div className="text-sm font-semibold text-white">{item.title}</div>
                    <div className="mt-2 text-xs uppercase tracking-[0.16em] text-slate-500">
                      {item.category} • {item.level}
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
              <section className="section-shell p-6">
                <div className="flex items-center gap-2 text-cyan-300">
                  <CalendarDays className="h-4 w-4" />
                  <span className="text-xs uppercase tracking-[0.16em]">
                    Recent Activity
                  </span>
                </div>

                <h2 className="mt-3 text-2xl font-semibold">Latest updates</h2>

                <div className="mt-5 space-y-4">
                  {recentActivity.length === 0 ? (
                    <EmptyState text="No activity found yet." />
                  ) : (
                    recentActivity.map((item, index) => (
                      <div
                        key={`${item.type}-${item.teamId}-${index}`}
                        className="card-compact flex items-start gap-4 rounded-2xl p-4"
                      >
                        <div
                          className={`mt-1 inline-flex h-9 w-9 items-center justify-center rounded-full ${
                            item.type === "registration"
                              ? "bg-sky-500/10 text-sky-300"
                              : "bg-emerald-500/10 text-emerald-300"
                          }`}
                        >
                          {item.type === "registration" ? (
                            <Users className="h-4 w-4" />
                          ) : (
                            <CheckCircle2 className="h-4 w-4" />
                          )}
                        </div>

                        <div className="min-w-0">
                          <div className="text-sm font-semibold text-white">
                            {item.type === "registration"
                              ? "New Registration"
                              : "Submission Completed"}
                          </div>
                          <div className="mt-1 text-sm text-slate-300">{item.title}</div>
                          <div className="mt-1 text-xs uppercase tracking-[0.16em] text-slate-500">
                            {item.subtitle}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </section>

              <section className="section-shell p-6">
                <div className="flex items-center gap-2 text-amber-300">
                  <Trophy className="h-4 w-4" />
                  <span className="text-xs uppercase tracking-[0.16em]">
                    Progress Snapshot
                  </span>
                </div>

                <h2 className="mt-3 text-2xl font-semibold">Your build status</h2>

                <div className="mt-5 space-y-4">
                  <ProgressRow
                    label="Registration Completion"
                    current={stats.registrations}
                    total={3}
                  />
                  <ProgressRow
                    label="Submission Completion"
                    current={stats.submissions}
                    total={3}
                  />
                  <ProgressRow
                    label="Challenge Participation"
                    current={stats.uniqueChallenges}
                    total={3}
                  />
                </div>
              </section>
            </div>

            <section className="section-shell p-6">
              <h2 className="text-2xl font-semibold">My Registrations</h2>

              <div className="mt-5 grid gap-4">
                {data.registrations.length === 0 ? (
                  <EmptyState text="No registrations found." />
                ) : (
                  data.registrations.map((item, index) => (
                    <div
                      key={`${item.teamId}-${index}`}
                      className="card-compact rounded-2xl p-5"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <div className="text-lg font-semibold text-white">
                            {item.teamName || "Untitled Team"}
                          </div>
                          <div className="mt-1 text-sm text-slate-400">
                            {item.challengeType}
                          </div>
                        </div>

                        <div className="chip-soft px-3 py-1 text-xs uppercase tracking-[0.16em] text-cyan-300">
                          {item.teamId}
                        </div>
                      </div>

                      <div className="mt-4 grid gap-3 sm:grid-cols-3">
                        <MiniInfo label="Members" value={item.teamMembers || "-"} />
                        <MiniInfo label="Year" value={item.year || "-"} />
                        <MiniInfo label="Role" value={item.role || "-"} />
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>

            <section className="section-shell p-6">
              <h2 className="text-2xl font-semibold">My Submissions</h2>

              <div className="mt-5 grid gap-4">
                {data.submissions.length === 0 ? (
                  <EmptyState text="No submissions yet." />
                ) : (
                  data.submissions.map((item, index) => (
                    <div
                      key={`${item.teamId}-${index}`}
                      className="card-compact rounded-2xl p-5"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <div className="text-lg font-semibold text-white">
                            {item.challengeType}
                          </div>
                          <div className="mt-1 text-sm text-slate-400">
                            Team ID: {item.teamId}
                          </div>
                        </div>

                        <div className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs uppercase tracking-[0.16em] text-emerald-300">
                          Submitted
                        </div>
                      </div>

                      <div className="mt-4 grid gap-3 sm:grid-cols-2">
                        <MiniInfo label="Project Link" value={item.projectLink || "-"} />
                        <MiniInfo label="GitHub Link" value={item.githubLink || "-"} />
                      </div>

                      <div className="mt-4 flex flex-wrap gap-3">
                        {item.projectLink && (
                          <a
                            href={item.projectLink}
                            target="_blank"
                            rel="noreferrer"
                            className="chip-soft inline-flex items-center gap-2 px-4 py-2 text-sm text-cyan-300 hover:text-cyan-200"
                          >
                            Open Live Preview
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        )}

                        {item.githubLink && (
                          <a
                            href={item.githubLink}
                            target="_blank"
                            rel="noreferrer"
                            className="chip-soft inline-flex items-center gap-2 px-4 py-2 text-sm text-slate-200 hover:text-white"
                          >
                            View GitHub
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        )}
                      </div>

                      {item.note && (
                        <div className="mt-4 rounded-2xl border border-slate-800 bg-slate-950/50 p-4 text-sm leading-6 text-slate-300">
                          {item.note}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </section>

            <section className="section-shell p-6">
              <h2 className="text-2xl font-semibold">Team Submissions</h2>

              <div className="mt-5 grid gap-4">
                {data.sharedTeamSubmissions.length === 0 ? (
                  <EmptyState text="No team submissions found." />
                ) : (
                  data.sharedTeamSubmissions.map((item, index) => (
                    <div
                      key={`${item.teamId}-${item.challengeType}-${index}`}
                      className="card-compact rounded-2xl p-5"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <div className="text-lg font-semibold text-white">
                            {item.challengeType}
                          </div>
                          <div className="mt-1 text-sm text-slate-400">
                            Team ID: {item.teamId}
                          </div>
                        </div>

                        <div className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs uppercase tracking-[0.16em] text-emerald-300">
                          Team Shared
                        </div>
                      </div>

                      <div className="mt-4 grid gap-3 sm:grid-cols-2">
                        <MiniInfo label="Project Link" value={item.projectLink || "-"} />
                        <MiniInfo label="GitHub Link" value={item.githubLink || "-"} />
                      </div>

                      <div className="mt-4 flex flex-wrap gap-3">
                        {item.projectLink && (
                          <a
                            href={item.projectLink}
                            target="_blank"
                            rel="noreferrer"
                            className="chip-soft inline-flex items-center gap-2 px-4 py-2 text-sm text-cyan-300 hover:text-cyan-200"
                          >
                            Open Live Preview
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        )}

                        {item.githubLink && (
                          <a
                            href={item.githubLink}
                            target="_blank"
                            rel="noreferrer"
                            className="chip-soft inline-flex items-center gap-2 px-4 py-2 text-sm text-slate-200 hover:text-white"
                          >
                            View GitHub
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        )}
                      </div>

                      {item.note && (
                        <div className="mt-4 rounded-2xl border border-slate-800 bg-slate-950/50 p-4 text-sm leading-6 text-slate-300">
                          {item.note}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </section>
          </section>
        </div>
      </main>

      {showProfileEditor && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 px-4 py-6 backdrop-blur-sm">
          <div className="mx-auto max-w-5xl">
            <div className="section-shell max-h-[88vh] overflow-y-auto p-5 sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="badge-pill inline-flex items-center gap-2 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-cyan-300">
                    Profile Editor
                  </div>
                  <h2 className="mt-3 text-2xl font-semibold text-white">
                    Personalize your profile
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() => setShowProfileEditor(false)}
                  className="chip-soft inline-flex h-10 w-10 items-center justify-center text-slate-300 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-6 grid gap-6 lg:grid-cols-[280px_1fr]">
                <div className="inner-shell p-4">
                  <div className="flex flex-col items-center text-center">
                    <img
                      src={avatar || editForm.profileImage || avatarOptions[0]}
                      alt="Profile"
                      className="h-28 w-28 rounded-full border border-white/10 object-cover bg-slate-900"
                    />

                    <div className="mt-4 grid w-full gap-2">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="chip-soft inline-flex items-center justify-center gap-2 px-4 py-2 text-sm text-slate-200 hover:text-cyan-300"
                      >
                        <Upload className="h-4 w-4" />
                        Upload Photo
                      </button>

                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={(e) => handleAvatarUpload(e.target.files?.[0])}
                      />
                    </div>

                    <div className="mt-5 w-full">
                      <div className="text-left text-xs uppercase tracking-[0.16em] text-slate-500">
                        Choose an avatar
                      </div>

                      <div className="mt-3 grid grid-cols-4 gap-2">
                        {avatarOptions.map((item) => (
                          <button
                            key={item}
                            type="button"
                            onClick={() => setAvatar(item)}
                            className={`overflow-hidden rounded-2xl border p-1 transition ${
                              avatar === item
                                ? "border-cyan-400/40 bg-cyan-500/10"
                                : "border-white/10 bg-white/[0.03]"
                            }`}
                          >
                            <img
                              src={item}
                              alt="Avatar option"
                              className="h-14 w-14 rounded-xl object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="inner-shell p-4 sm:p-5">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field
                        label="Full Name"
                        value={editForm.name || ""}
                        onChange={(value) =>
                          setEditForm((prev) => ({ ...prev, name: value }))
                        }
                      />
                      <Field
                        label="Email"
                        value={editForm.email || ""}
                        onChange={(value) =>
                          setEditForm((prev) => ({ ...prev, email: value }))
                        }
                      />
                      <Field
                        label="College / Organization"
                        value={editForm.college || ""}
                        onChange={(value) =>
                          setEditForm((prev) => ({ ...prev, college: value }))
                        }
                      />
                      <Field
                        label="Year"
                        value={editForm.year || ""}
                        onChange={(value) =>
                          setEditForm((prev) => ({ ...prev, year: value }))
                        }
                      />
                      <div className="sm:col-span-2">
                        <Field
                          label="Role"
                          value={editForm.role || ""}
                          onChange={(value) =>
                            setEditForm((prev) => ({ ...prev, role: value }))
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div className="inner-shell p-4 sm:p-5">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="text-xs uppercase tracking-[0.16em] text-slate-500">
                          Team Members
                        </div>
                        <h3 className="mt-1 text-lg font-semibold text-white">
                          Add member details
                        </h3>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="chip-soft px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-cyan-300">
                          {editForm.teamMembers?.length || 0} Members
                        </span>

                        <button
                          type="button"
                          onClick={addTeamMember}
                          className="chip-soft inline-flex items-center gap-2 px-4 py-2 text-sm text-slate-200 hover:text-cyan-300"
                        >
                          <Plus className="h-4 w-4" />
                          Add Member
                        </button>
                      </div>
                    </div>

                    <div className="mt-4 space-y-4">
                      {(editForm.teamMembers || []).length === 0 ? (
                        <EmptyState text="No team members added yet." />
                      ) : (
                        (editForm.teamMembers || []).map((member, index) => {
                          const memberId =
                            member.id || member._id || `member-${index}`;

                          return (
                            <div
                              key={memberId}
                              className="card-compact rounded-2xl p-4"
                            >
                              <div className="mb-4 flex items-center justify-between gap-3">
                                <div className="inline-flex items-center gap-2 text-sm font-medium text-white">
                                  <UserRound className="h-4 w-4 text-cyan-300" />
                                  Member {index + 1}
                                </div>

                                <button
                                  type="button"
                                  onClick={() => removeTeamMember(memberId)}
                                  className="inline-flex items-center gap-2 rounded-full border border-rose-500/20 bg-rose-500/10 px-3 py-1.5 text-xs text-rose-300 transition hover:bg-rose-500/20"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                  Remove
                                </button>
                              </div>

                              <div className="grid gap-4 sm:grid-cols-2">
                                <Field
                                  label="Name"
                                  value={member.name}
                                  onChange={(value) =>
                                    updateTeamMember(memberId, "name", value)
                                  }
                                />
                                <Field
                                  label="Email"
                                  value={member.email}
                                  onChange={(value) =>
                                    updateTeamMember(memberId, "email", value)
                                  }
                                />
                                <Field
                                  label="Role"
                                  value={member.role}
                                  onChange={(value) =>
                                    updateTeamMember(memberId, "role", value)
                                  }
                                />
                                <Field
                                  label="Year"
                                  value={member.year}
                                  onChange={(value) =>
                                    updateTeamMember(memberId, "year", value)
                                  }
                                />
                                <div className="sm:col-span-2">
                                  <Field
                                    label="College / Organization"
                                    value={member.college}
                                    onChange={(value) =>
                                      updateTeamMember(memberId, "college", value)
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setShowProfileEditor(false)}
                      className="chip-soft px-5 py-2.5 text-sm text-slate-300 hover:text-white"
                    >
                      Cancel
                    </button>

                    <button
                      type="button"
                      onClick={saveProfilePermanently}
                      disabled={savingProfile}
                      className="rounded-full bg-gradient-to-r from-sky-500 via-cyan-500 to-violet-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {savingProfile ? "Saving..." : "Save Changes"}
                    </button>
                  </div>

                  {profileMsg && (
                    <div className="rounded-2xl border border-cyan-400/20 bg-cyan-500/10 px-4 py-3 text-sm text-cyan-300">
                      {profileMsg}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function QuickAction({ href, text }: { href: string; text: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/40 px-4 py-3 text-sm text-slate-200 transition hover:border-cyan-400 hover:text-cyan-300"
    >
      {text}
      <ArrowUpRight className="h-4 w-4" />
    </Link>
  );
}

function StatCard({
  icon,
  title,
  value,
  accent,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  accent: string;
}) {
  return (
    <div className="section-shell p-5">
      <div className={`inline-flex items-center gap-2 ${accent}`}>
        {icon}
        <span className="text-xs uppercase tracking-[0.16em]">{title}</span>
      </div>
      <div className="mt-3 text-3xl font-semibold text-white">{value}</div>
    </div>
  );
}

function StatMini({ title, value }: { title: string; value: string }) {
  return (
    <div className="card-compact rounded-2xl p-4">
      <div className="text-xs uppercase tracking-[0.16em] text-slate-500">
        {title}
      </div>
      <div className="mt-2 text-2xl font-semibold text-white">{value}</div>
    </div>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="card-compact rounded-2xl p-4">
      <div className="text-xs uppercase tracking-[0.16em] text-slate-500">
        {label}
      </div>
      <div className="mt-1 break-words text-sm text-slate-200">{value}</div>
    </div>
  );
}

function MiniInfo({ label, value }: { label: string; value: string }) {
  return (
    <div className="card-compact rounded-2xl p-4">
      <div className="text-xs uppercase tracking-[0.16em] text-slate-500">
        {label}
      </div>
      <div className="mt-1 break-all text-sm text-slate-200">{value}</div>
    </div>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-950/30 p-8 text-center text-slate-400">
      {text}
    </div>
  );
}

function ProgressRow({
  label,
  current,
  total,
}: {
  label: string;
  current: number;
  total: number;
}) {
  const percentage =
    total === 0 ? 0 : Math.min(100, Math.round((current / total) * 100));

  return (
    <div className="card-compact rounded-2xl p-4">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm text-slate-300">{label}</span>
        <span className="text-sm font-medium text-white">{percentage}%</span>
      </div>

      <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-800">
        <div
          className="h-full rounded-full bg-gradient-to-r from-sky-500 via-cyan-500 to-violet-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
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