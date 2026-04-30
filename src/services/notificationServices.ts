import { db } from "@/db/db";
import { messages, channelReadStatus } from "@/db/schema";
import { eq, and, gt } from "drizzle-orm";

export async function getUnreadCount(memberId: string) {
  const reads = await db
    .select()
    .from(channelReadStatus)
    .where(eq(channelReadStatus.memberId, memberId));

  let total = 0;

  for (const r of reads) {
    const unread = await db
      .select()
      .from(messages)
      .where(
        and(
          eq(messages.channelId, r.channelId),
          gt(messages.createdAt, r.updatedAt)
        )
      );

    total += unread.length;
  }

  return total;
}