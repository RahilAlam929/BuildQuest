import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

type JwtPayload = {
  userId?: string;
  id?: string;
};

function getUserIdFromToken(token: string): string | null {
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "dev-secret-change-this"
    ) as JwtPayload;

    return decoded.userId || decoded.id || null;
  } catch {
    return null;
  }
}

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { ok: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const userId = getUserIdFromToken(token);

    if (!userId) {
      return NextResponse.json(
        { ok: false, message: "Invalid token" },
        { status: 401 }
      );
    }

    const client = await clientPromise;
    const db = client.db();

    const users = db.collection("users");
    const registrationsCollection = db.collection("registrations");
    const submissionsCollection = db.collection("submissions");

    const user = await users.findOne(
      { _id: new ObjectId(userId) },
      { projection: { password: 0 } }
    );

    if (!user) {
      return NextResponse.json(
        { ok: false, message: "User not found" },
        { status: 404 }
      );
    }

    const registrations = await registrationsCollection
      .find({ userId })
      .sort({ createdAt: -1 })
      .toArray();

    const submissions = await submissionsCollection
      .find({ userId })
      .sort({ createdAt: -1 })
      .toArray();

    const teamIds = [...new Set(registrations.map((item) => item.teamId).filter(Boolean))];

    let sharedTeamRegistrations: any[] = [];
    let sharedTeamSubmissions: any[] = [];
    let sharedTeamUsers: any[] = [];

    if (teamIds.length > 0) {
      sharedTeamRegistrations = await registrationsCollection
        .find({ teamId: { $in: teamIds } })
        .sort({ createdAt: -1 })
        .toArray();

      sharedTeamSubmissions = await submissionsCollection
        .find({ teamId: { $in: teamIds } })
        .sort({ createdAt: -1 })
        .toArray();

      const sharedUserIds = [
        ...new Set(sharedTeamRegistrations.map((item) => item.userId).filter(Boolean)),
      ]
        .filter((id) => ObjectId.isValid(id))
        .map((id) => new ObjectId(id));

      if (sharedUserIds.length > 0) {
        sharedTeamUsers = await users
          .find(
            { _id: { $in: sharedUserIds } },
            {
              projection: {
                password: 0,
                name: 1,
                email: 1,
                college: 1,
                year: 1,
                role: 1,
                profileImage: 1,
              },
            }
          )
          .toArray();
      }
    }

    return NextResponse.json({
      ok: true,
      user,
      registrations,
      submissions,
      teamIds,
      sharedTeamRegistrations,
      sharedTeamSubmissions,
      sharedTeamUsers,
    });
  } catch (error) {
    console.error("GET /api/auth/me error:", error);
    return NextResponse.json(
      { ok: false, message: "Failed to fetch dashboard data" },
      { status: 500 }
    );
  }
}