import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password, college, year, role } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { ok: false, message: "Name, email, and password are required" },
        { status: 400 }
      );
    }

    const normalizedEmail = String(email).trim().toLowerCase();

    const client = await clientPromise;
    const db = client.db();
    const users = db.collection("users");

    const existingUser = await users.findOne({ email: normalizedEmail });

    if (existingUser) {
      return NextResponse.json(
        { ok: false, message: "User already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await users.insertOne({
      name: String(name).trim(),
      email: normalizedEmail,
      password: hashedPassword,
      college: String(college || "").trim(),
      year: String(year || "").trim(),
      role: String(role || "").trim(),
      profileImage: "",
      teamMembers: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const token = jwt.sign(
      {
        userId: String(result.insertedId),
        email: normalizedEmail,
      },
      process.env.JWT_SECRET || "dev-secret-change-this",
      { expiresIn: "7d" }
    );

    const response = NextResponse.json({
      ok: true,
      message: "Signup successful",
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error("POST /api/auth/signup error:", error);
    return NextResponse.json(
      { ok: false, message: "Signup failed" },
      { status: 500 }
    );
  }
}