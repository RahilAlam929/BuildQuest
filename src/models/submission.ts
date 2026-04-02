import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export type Submission = {
  _id?: ObjectId;
  userId: string;
  teamId: string;
  challengeType: string;

  projectLink?: string;
  githubLink?: string;
  note?: string;

  createdAt: Date;
};

async function getCollection() {
  const client = await clientPromise;
  const db = client.db();
  return db.collection<Submission>("submissions");
}

//  Create Submission
export async function createSubmission(data: Partial<Submission>) {
  const col = await getCollection();

  const result = await col.insertOne({
    userId: data.userId || "",
    teamId: data.teamId || "",
    challengeType: data.challengeType || "",
    projectLink: data.projectLink || "",
    githubLink: data.githubLink || "",
    note: data.note || "",
    createdAt: new Date(),
  });

  return result.insertedId;
}

//  Get by user
export async function getUserSubmissions(userId: string) {
  const col = await getCollection();

  return col
    .find({ userId })
    .sort({ createdAt: -1 })
    .toArray();
}