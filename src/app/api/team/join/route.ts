import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { getAuthUserId } from "@/lib/auth-user";

export async function POST(req: NextRequest) {
  try {
    const userId = await getAuthUserId();

    if (!userId) {
      return NextResponse.json(
        { ok: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { inviteToken, challengeType = "team-collab" } = await req.json();

    if (!inviteToken) {
      return NextResponse.json(
        { ok: false, message: "Invite token missing" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db();

    const teams = db.collection("teams");
    const users = db.collection("users");
    const registrations = db.collection("registrations");

    const team = await teams.findOne({ inviteToken });

    if (!team) {
      return NextResponse.json(
        { ok: false, message: "Invalid invite link" },
        { status: 404 }
      );
    }

    const teamId = team.teamId;

    const existing = await registrations.findOne({ userId, teamId });

    if (!existing) {
      const user = await users.findOne({ _id: team.createdBy ? undefined : undefined });
      const currentUser = await users.findOne({ _id: new (await import("mongodb")).ObjectId(userId) }, { projection: { password: 0 } });

      await registrations.insertOne({
        userId,
        teamId,
        challengeType,
        teamName: team.teamName || "Shared Team",
        teamMembers: currentUser?.name || "",
        year: currentUser?.year || "",
        role: currentUser?.role || "",
        createdAt: new Date(),
      });
    }

    return NextResponse.json({
      ok: true,
      message: "Joined team successfully",
      teamId,
    });
  } catch (error) {
    console.error("POST /api/team/join error:", error);
    return NextResponse.json(
      { ok: false, message: "Failed to join team" },
      { status: 500 }
    );
  }
}