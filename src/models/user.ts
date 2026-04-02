import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export type TeamMember = {
  _id?: string;
  name: string;
  email: string;
  role: string;
  year: string;
  college: string;
};

export type User = {
  _id?: ObjectId;
  name: string;
  email: string;
  password: string;

  college?: string;
  year?: string;
  role?: string;
  profileImage?: string;

  teamMembers: TeamMember[];

  createdAt: Date;
  updatedAt: Date;
};

// 🔹 Get DB instance
async function getCollection() {
  const client = await clientPromise;
  const db = client.db();
  return db.collection<User>("users");
}

//
//  CORE FUNCTIONS
//

// Create User
export async function createUser(data: Partial<User>) {
  const users = await getCollection();

  const newUser: User = {
    name: data.name || "",
    email: data.email || "",
    password: data.password || "",

    college: data.college || "",
    year: data.year || "",
    role: data.role || "",
    profileImage: "",

    teamMembers: [],

    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const result = await users.insertOne(newUser);
  return result.insertedId;
}

// ✅ Get User by ID
export async function getUserById(userId: string) {
  const users = await getCollection();

  return users.findOne(
    { _id: new ObjectId(userId) },
    { projection: { password: 0 } }
  );
}

// ✅ Get User by Email
export async function getUserByEmail(email: string) {
  const users = await getCollection();

  return users.findOne({ email });
}

// Update Profile (MAIN FUNCTION)
export async function updateUserProfile(
  userId: string,
  updateData: Partial<User>
) {
  const users = await getCollection();

  const result = await users.findOneAndUpdate(
    { _id: new ObjectId(userId) },
    {
      $set: {
        ...updateData,
        updatedAt: new Date(),
      },
    },
    {
      returnDocument: "after",
      projection: { password: 0 },
    }
  );

  return result;
}