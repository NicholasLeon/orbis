"use server"

import { db } from "@/db/db";
import { messages } from "@/db/schema";
import { eq, desc, and, lt } from "drizzle-orm";
import { Message } from "@/schemas/message.schema";

export async function getMessages(
  channelId: string, 
  cursor?: string
): Promise<{ items: Message[]; nextCursor: string | null }> {
  const limit = 30;
  
  const results = await db.query.messages.findMany({
    where: cursor 
      ? and(eq(messages.channelId, channelId), lt(messages.id, cursor))
      : eq(messages.channelId, channelId),
    limit: limit + 1,
    orderBy: [desc(messages.createdAt)],
    with: {
      member: { with: { user: true } }
    }
  });

  const hasNextPage = results.length > limit;
  const items = hasNextPage ? results.slice(0, limit) : results;
  const nextCursor = hasNextPage ? items[items.length - 1].id : null;

  // Transform data ke format Message schema (konversi Date ke ISO string)
  const formattedItems: Message[] = items.map((msg) => ({
    id: msg.id,
    channelId: msg.channelId,
    memberId: msg.memberId,
    content: msg.content,
    parentId: msg.parentId,
    createdAt: msg.createdAt.toISOString(),
    updatedAt: msg.updatedAt?.toISOString() ?? null,
    deletedAt: msg.deletedAt?.toISOString() ?? null,
    userName: (msg as any).member?.user?.name || "Unknown",
  })).reverse();

  return { items: formattedItems, nextCursor };
}