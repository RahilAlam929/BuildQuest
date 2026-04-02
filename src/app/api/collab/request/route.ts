import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { getAuthUserId } from "@/lib/auth-user";

export async function POST(req: NextRequest) {
  try {
    const userId = await getAuthUserId();
    const body = await req.json();

    const { name, email, type, idea } = body;

    if (!name || !email || !type || !idea) {
      return NextResponse.json(
        { ok: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db();

    await db.collection("collaborationRequests").insertOne({
      userId: userId || null,
      name: String(name).trim(),
      email: String(email).trim().toLowerCase(),
      type: String(type).trim(),
      idea: String(idea).trim(),
      status: "new",
      createdAt: new Date(),
    });

    return NextResponse.json({
      ok: true,
      message: "Request submitted successfully",
    });
  } catch (error) {
    console.error("POST /api/collab/request error:", error);
    return NextResponse.json(
      { ok: false, message: "Failed to submit collaboration request" },
      { status: 500 }
    );
  }
}