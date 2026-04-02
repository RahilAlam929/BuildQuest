import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const email = String(body.email || "").trim().toLowerCase();
    const password = String(body.password || "");

    if (!email || !password) {
      return NextResponse.json(
        { ok: false, message: "Email and password are required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const dbName = process.env.MONGODB_DB_NAME || "portfolio";
    const db = client.db(dbName);
    const users = db.collection("users");

    const user = await users.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { ok: false, message: "User not found" },
        { status: 404 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json(
        { ok: false, message: "Invalid password" },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      {
        userId: String(user._id),
        email: user.email,
      },
      process.env.JWT_SECRET || "dev-secret-change-this",
      { expiresIn: "7d" }
    );

    const response = NextResponse.json({
      ok: true,
      message: "Login successful",
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
    console.error("POST /api/auth/login error:", error);
    return NextResponse.json(
      { ok: false, message: "Login failed" },
      { status: 500 }
    );
  }
}