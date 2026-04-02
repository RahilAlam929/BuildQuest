import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

type JwtPayload = {
  userId?: string;
  id?: string;
  email?: string;
};

function getUserIdFromToken(token: string): string | null {
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "dev-secret-change-this"
    ) as JwtPayload;

    return decoded.userId || decoded.id || null;
  } catch (error) {
    console.error("JWT verify error:", error);
    return null;
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { ok: false, message: "Unauthorized: token missing" },
        { status: 401 }
      );
    }

    const userId = getUserIdFromToken(token);

    if (!userId) {
      return NextResponse.json(
        { ok: false, message: "Unauthorized: invalid token" },
        { status: 401 }
      );
    }

    const body = await req.json();

    const {
      name,
      email,
      college,
      year,
      role,
      profileImage,
      teamMembers,
    } = body;

    const safeTeamMembers = Array.isArray(teamMembers)
      ? teamMembers.map((member: any) => ({
          name: String(member.name || "").trim(),
          email: String(member.email || "").trim().toLowerCase(),
          role: String(member.role || "").trim(),
          year: String(member.year || "").trim(),
          college: String(member.college || "").trim(),
        }))
      : [];

    const client = await clientPromise;
    const dbName = process.env.MONGODB_DB_NAME || "portfolio";
    const db = client.db(dbName);
    const users = db.collection("users");

    const result = await users.findOneAndUpdate(
      { _id: new ObjectId(userId) },
      {
        $set: {
          name: typeof name === "string" ? name.trim() : "",
          email: typeof email === "string" ? email.trim().toLowerCase() : "",
          college: typeof college === "string" ? college.trim() : "",
          year: typeof year === "string" ? year.trim() : "",
          role: typeof role === "string" ? role.trim() : "",
          profileImage: typeof profileImage === "string" ? profileImage : "",
          teamMembers: safeTeamMembers,
          updatedAt: new Date(),
        },
      },
      {
        returnDocument: "after",
      }
    );

    if (!result) {
      return NextResponse.json(
        { ok: false, message: "User not found" },
        { status: 404 }
      );
    }

    const user = result;
    if ((user as any)?.password) {
      delete (user as any).password;
    }

    return NextResponse.json({
      ok: true,
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    console.error("PATCH /api/auth/profile error:", error);
    return NextResponse.json(
      { ok: false, message: "Failed to update profile" },
      { status: 500 }
    );
  }
}