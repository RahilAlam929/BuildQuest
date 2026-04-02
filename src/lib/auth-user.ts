import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

type JwtPayload = {
  userId?: string;
  id?: string;
  email?: string;
};

export async function getAuthUserId() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "dev-secret-change-this"
    ) as JwtPayload;

    const userId = decoded.userId || decoded.id;
    if (!userId || !ObjectId.isValid(userId)) return null;

    return userId;
  } catch {
    return null;
  }
}