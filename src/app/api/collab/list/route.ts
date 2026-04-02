import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { getAuthUserId } from "@/lib/auth-user";

export async function GET() {
  try {
    const userId = await getAuthUserId();

    if (!userId) {
      return NextResponse.json(
        { ok: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const client = await clientPromise;
    const db = client.db();

    const requests = await db
      .collection("collaborationRequests")
      .find({})
      .sort({ createdAt: -1 })
      .limit(20)
      .toArray();

    return NextResponse.json({
      ok: true,
      requests,
    });
  } catch (error) {
    console.error("GET /api/collab/list error:", error);
    return NextResponse.json(
      { ok: false, message: "Failed to fetch collaboration requests" },
      { status: 500 }
    );
  }
}