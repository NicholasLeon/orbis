import { db } from "@/db/db";
import { members, workspaces } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Workspace } from "@/schemas/workspace.schema";

export async function getWorkspacesByUserId(userId: string): Promise<Workspace[]> {
  if (!userId) return [];

  const data = await db
    .select({
      id: workspaces.id,
      name: workspaces.name,
      slug: workspaces.slug,
      inviteCode: workspaces.inviteCode,
      createdBy: workspaces.createdBy,
      createdAt: workspaces.createdAt,
    })
    .from(workspaces)
    .innerJoin(members, eq(members.workspaceId, workspaces.id))
    .where(eq(members.userId, userId));

  return data as Workspace[];
}