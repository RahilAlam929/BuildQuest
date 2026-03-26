import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import clientPromise from "@/lib/mongodb";

export const runtime = "nodejs";

function generateTeamId(type: string) {
  const prefix =
    type === "hackathon"
      ? "HACK"
      : type === "ideathon"
      ? "IDEA"
      : "WEEK";

  return `${prefix}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      challengeType,
      name,
      email,
      college,
      year,
      teamName,
      teamMembers,
      reason,
    } = body;

    if (!name || !email || !challengeType) {
      return NextResponse.json(
        { ok: false, error: "Required fields missing" },
        { status: 400 }
      );
    }

    const teamId = generateTeamId(challengeType);

    const doc = {
      teamId,
      challengeType,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      college: college || "",
      year: year || "",
      teamName: teamName || "",
      teamMembers: teamMembers || "",
      reason: reason || "",
      createdAt: new Date(),
    };

    const client = await clientPromise;
    const db = client.db("portfolio");

    await db.collection("challenge_registrations").insertOne(doc);

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
        subject: "Registration Successful 🚀",
        html: `
          <h2>You're Registered ✅</h2>
          <p>Hello <b>${name}</b>,</p>

          <p>Your registration is successful.</p>

          <p><b>Team ID:</b> ${teamId}</p>
          <p><b>Challenge:</b> ${challengeType}</p>

          <p>Use this Team ID while submitting.</p>
        `,
      });

      if (process.env.CONTACT_TO_EMAIL) {
        await transporter.sendMail({
          from: `"Admin Bot" <${process.env.GMAIL_USER}>`,
          to: process.env.CONTACT_TO_EMAIL,
          subject: `New Registration - ${teamId}`,
          html: `
            <h2>New Registration</h2>
            <p>Name: ${name}</p>
            <p>Email: ${email}</p>
            <p>Team ID: ${teamId}</p>
            <p>Type: ${challengeType}</p>
          `,
        });
      }
    } catch (e) {
      console.error("MAIL ERROR:", e);
    }

    return NextResponse.json({
      ok: true,
      teamId,
    });
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: 500 }
    );
  }
}