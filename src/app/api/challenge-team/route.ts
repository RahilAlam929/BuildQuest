import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export const runtime = "nodejs";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const teamId = searchParams.get("teamId")?.toUpperCase();

    if (!teamId) {
      return NextResponse.json(
        { ok: false, error: "Team ID required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("portfolio");

    const team = await db.collection("challenge_registrations").findOne({
      teamId,
    });

    if (!team) {
      return NextResponse.json(
        { ok: false, error: "Invalid Team ID" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      ok: true,
      team: {
        teamId: team.teamId,
        challengeType: team.challengeType,
        name: team.name,
        email: team.email,
        teamName: team.teamName,
        teamMembers: team.teamMembers,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: 500 }
    );
  }
}