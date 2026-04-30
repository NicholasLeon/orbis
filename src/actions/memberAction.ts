"use server"

import { db } from "@/db/db";
import { members, workspaces } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getAuthSession } from "@/lib/authSession";
import { revalidatePath } from "next/cache";

export async function joinWorkspaceAction(prevState: any, formData: FormData) {
  const inviteCode = formData.get("inviteCode") as string;
  const session = await getAuthSession();

  if (!session) return { error: "UNAUTHORIZED" };
  
  const { userId } = session;

  if (!inviteCode || inviteCode.length < 4) {
    return { error: "INVALID_INVITE_CODE" };
  }

  try {
    const [workspace] = await db
      .select()
      .from(workspaces)
      .where(eq(workspaces.inviteCode, inviteCode));

    if (!workspace) {
      return { error: "Invite code not found" };
    }

    await db.insert(members).values({
      userId,
      workspaceId: workspace.id,
      role: "member",
    });

    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    return { error: "ALREADY CONNECTED" };
  }
}