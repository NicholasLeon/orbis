"use server"

import { db } from "@/db/db"
import { workspaces, members, channels } from "@/db/schema"
import { getAuthSession } from "@/lib/authSession"
import { generateInviteCode } from "@/lib/generateInvite"
import { revalidatePath } from "next/cache"

export async function createWorkspaceAction(prevState: any, formData: FormData) {
  const name = formData.get("name") as string
  const session = await getAuthSession()

  if (!session) return { error: "UNAUTHORIZED_ACCESS" }
  if (!name || name.length < 3) return { error: "NAME_TOO_SHORT" }

  const { userId } = session;

  const slug = name.toLowerCase().replace(/\s+/g, "-")
  
  const inviteCode = generateInviteCode();

  try {
    await db.transaction(async (tx) => {
      const [newWorkspace] = await tx.insert(workspaces).values({
        name,
        slug,
        inviteCode,
        createdBy: userId,
      }).returning()

      await tx.insert(members).values({
        userId,
        workspaceId: newWorkspace.id,
        role: "admin",
      })

      await tx.insert(channels).values({
        workspaceId: newWorkspace.id,
        name: "general",
        type: "text",
      })
    })

    revalidatePath("/dashboard")
    return { success: true }
  } catch (error) {
    return { error: "INITIALIZATION_FAILED: Silahkan coba lagi." }
  }
}