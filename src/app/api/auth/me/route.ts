import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { getCurrentUserFromCookie } from "@/lib/auth";

export const runtime = "nodejs";

export async function GET() {
  try {
    const authUser = await getCurrentUserFromCookie();

    if (!authUser) {
      return NextResponse.json(
        { ok: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const client = await clientPromise;
    const db = client.db("portfolio");

    const user = await db.collection("users").findOne(
      { email: authUser.email },
      { projection: { password: 0 } }
    );

    const registrations = await db
      .collection("challenge_registrations")
      .find({ email: authUser.email })
      .sort({ createdAt: -1 })
      .toArray();

    const submissions = await db
      .collection("challenge_submissions")
      .find({ email: authUser.email })
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({
      ok: true,
      user,
      registrations,
      submissions,
    });
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, message: error?.message || "Failed to fetch user" },
      { status: 500 }
    );
  }
}