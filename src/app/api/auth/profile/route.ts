import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

type JwtPayload = {
  userId?: string;
  id?: string;
};

type TeamMember = {
  name?: string;
  email?: string;
  role?: string;
  year?: string;
  college?: string;
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

export async function PATCH(req: NextRequest) {
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

    const body = await req.json();

    const {
      name,
      email,
      college,
      year,
      role,
      profileImage,
      teamMembers,
    }: {
      name?: string;
      email?: string;
      college?: string;
      year?: string;
      role?: string;
      profileImage?: string;
      teamMembers?: TeamMember[];
    } = body;

    const safeTeamMembers = Array.isArray(teamMembers)
      ? teamMembers.map((member) => ({
          name: String(member.name || "").trim(),
          email: String(member.email || "").trim(),
          role: String(member.role || "").trim(),
          year: String(member.year || "").trim(),
          college: String(member.college || "").trim(),
        }))
      : [];

    const client = await clientPromise;
    const db = client.db();
    const users = db.collection("users");

    const updatePayload: Record<string, unknown> = {
      updatedAt: new Date(),
    };

    if (typeof name === "string") updatePayload.name = name.trim();
    if (typeof email === "string") updatePayload.email = email.trim().toLowerCase();
    if (typeof college === "string") updatePayload.college = college.trim();
    if (typeof year === "string") updatePayload.year = year.trim();
    if (typeof role === "string") updatePayload.role = role.trim();
    if (typeof profileImage === "string") updatePayload.profileImage = profileImage;
    updatePayload.teamMembers = safeTeamMembers;

    const result = await users.findOneAndUpdate(
      { _id: new ObjectId(userId) },
      { $set: updatePayload },
      { returnDocument: "after" }
    );

    if (!result) {
      return NextResponse.json(
        { ok: false, message: "User not found" },
        { status: 404 }
      );
    }

    const user = result;

    if (user?.password) {
      delete user.password;
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