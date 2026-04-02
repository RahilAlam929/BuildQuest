import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { getAuthUserId } from "@/lib/auth-user";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const userId = await getAuthUserId();

    if (!userId) {
      return NextResponse.json(
        { ok: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { teamId } = await req.json();

    if (!teamId) {
      return NextResponse.json(
        { ok: false, message: "Team ID is required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db();

    const registrations = db.collection("registrations");
    const teams = db.collection("teams");

    const myRegistration = await registrations.findOne({ userId, teamId });

    if (!myRegistration) {
      return NextResponse.json(
        { ok: false, message: "You are not part of this team" },
        { status: 403 }
      );
    }

    const inviteToken = crypto.randomBytes(20).toString("hex");

    await teams.updateOne(
      { teamId },
      {
        $set: {
          teamId,
          inviteToken,
          updatedAt: new Date(),
        },
        $setOnInsert: {
          createdBy: userId,
          createdAt: new Date(),
        },
      },
      { upsert: true }
    );

    const inviteUrl = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/dashboard?invite=${inviteToken}`;

    return NextResponse.json({
      ok: true,
      inviteToken,
      inviteUrl,
    });
  } catch (error) {
    console.error("POST /api/team/create-invite error:", error);
    return NextResponse.json(
      { ok: false, message: "Failed to create invite link" },
      { status: 500 }
    );
  }
}