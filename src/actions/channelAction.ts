"use server"

import { db } from "@/db/db";
import { channels } from "@/db/schema";
import { getAuthSession } from "@/lib/authSession";
import { getMemberRole } from "@/services/memberServices";
import { revalidatePath } from "next/cache";

export async function createChannelAction(prevState: any, formData: FormData) {
  const name = formData.get("name") as string;
  const workspaceId = formData.get("workspaceId") as string;
  const session = await getAuthSession();

  if (!session) return { error: "Unauthorized" };
  const role = await getMemberRole(workspaceId, session?.userId);
  
  if (role !== "admin") {
    return { error: "Hanya Admin yang diperbolehkan membuat channel." };
  }

  if (!name || name.length < 3) {
    return { error: "Nama channel minimal 3 karakter." };
  }

  try {
    await db.insert(channels).values({
      name: name.toLowerCase().replace(/\s+/g, "-"),
      workspaceId,
      type: "text",
    });
  } catch (error) {
    return { error: "Gagal membuat channel." };
  }

  revalidatePath(`/dashboard`);
  return { success: true };
}