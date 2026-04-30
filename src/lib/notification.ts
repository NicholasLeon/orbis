"use server"

import { db } from "@/db/db";
import { channelReadStatus } from "@/db/schema";
import { revalidatePath } from "next/cache";

type MarkAsReadParams = {
  memberId: string;
  workspaceId: string;
  channelId: string;
  messageId: string;
};

export async function markAsRead({
  memberId,
  channelId,
  workspaceId,
  messageId,
}: MarkAsReadParams) {
  try {
    await db
      .insert(channelReadStatus)
      .values({
        memberId,
        channelId,
        lastReadMessageId: messageId,
      })
      .onConflictDoUpdate({
        target: [
          channelReadStatus.memberId,
          channelReadStatus.channelId,
        ],
        set: {
          lastReadMessageId: messageId,
          updatedAt: new Date(),
        },
      });

    revalidatePath(`/dashboard/${workspaceId}/${channelId}`); 
    
    return { success: true };
  } catch (error) {
    console.error("❌ markAsRead error:", error);
    return { success: false };
  }
}