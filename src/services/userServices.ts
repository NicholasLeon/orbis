import { db } from "@/db/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getUserProfile(userId: string) {
  if (!userId) return null;

  const [user] = await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      image: users.image,
      createdAt: users.createdAt,
    })
    .from(users)
    .where(eq(users.id, userId));

  return user;
}