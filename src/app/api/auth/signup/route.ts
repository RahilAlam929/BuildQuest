import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import clientPromise from "@/lib/mongodb";
import { signAuthToken } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password, college, year, role } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { ok: false, message: "Name, email, and password are required." },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("portfolio");

    const existingUser = await db.collection("users").findOne({
      email: email.toLowerCase().trim(),
    });

    if (existingUser) {
      return NextResponse.json(
        { ok: false, message: "User already exists." },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await db.collection("users").insertOne({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      college: college?.trim() || "",
      year: year?.trim() || "",
      role: role?.trim() || "",
      profileImage: "",
      createdAt: new Date(),
    });

    const token = signAuthToken({
      email: email.toLowerCase().trim(),
      userId: result.insertedId.toString(),
    });

    const response = NextResponse.json({
      ok: true,
      message: "Signup successful",
    });

    response.cookies.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, message: error?.message || "Signup failed" },
      { status: 500 }
    );
  }
}