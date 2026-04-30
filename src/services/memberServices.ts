import { db } from "@/db/db";
import { members } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export async function getMemberRole(workspaceId: string, userId: string) {
  const [member] = await db
    .select({ role: members.role })
    .from(members)
    .where(
      and(
        eq(members.workspaceId, workspaceId),
        eq(members.userId, userId)
      )
    );

  return member?.role || null;
}