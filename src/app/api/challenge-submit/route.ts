import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import clientPromise from "@/lib/mongodb";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const teamId = String(formData.get("teamId")).toUpperCase();
    const email = String(formData.get("email")).toLowerCase();
    const name = String(formData.get("name"));
    const projectLink = String(formData.get("projectLink") || "");
    const githubLink = String(formData.get("githubLink") || "");
    const note = String(formData.get("note") || "");

    const attachment = formData.get("attachment") as File | null;

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

    if (team.email !== email) {
      return NextResponse.json(
        { ok: false, error: "Email mismatch" },
        { status: 403 }
      );
    }

    const already = await db.collection("challenge_submissions").findOne({
      teamId,
    });

    if (already) {
      return NextResponse.json(
        { ok: false, error: "Already submitted" },
        { status: 409 }
      );
    }

    let fileBuffer: Buffer | null = null;
    let fileName = "";

    if (attachment && attachment.size > 0) {
      const bytes = await attachment.arrayBuffer();
      fileBuffer = Buffer.from(bytes);
      fileName = attachment.name;
    }

    await db.collection("challenge_submissions").insertOne({
      teamId,
      name,
      email,
      projectLink,
      githubLink,
      note,
      fileName,
      createdAt: new Date(),
    });

    // MAIL
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_APP_PASSWORD,
        },
      });

      await transporter.sendMail({
        from: `"Challenge Team" <${process.env.GMAIL_USER}>`,
        to: email,
        subject: "Submission Received 🚀",
        html: `
          <h2>Submission Successful</h2>
          <p>Team ID: ${teamId}</p>
        `,
      });
    } catch (e) {
      console.log("MAIL ERROR", e);
    }

    return NextResponse.json({
      ok: true,
      message: "Submission successful",
    });
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: 500 }
    );
  }
}