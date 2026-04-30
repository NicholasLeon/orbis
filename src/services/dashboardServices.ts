"use server";

import { db } from "@/db/db";
import { channels, members, messages } from "@/db/schema";
import { eq, count, desc, and } from "drizzle-orm";

export async function getDashboardStats(workspaceId: string) {
  const [channelRes] = await db
    .select({ value: count() })
    .from(channels)
    .where(eq(channels.workspaceId, workspaceId));

  const [memberRes] = await db
    .select({ value: count() })
    .from(members)
    .where(eq(members.workspaceId, workspaceId));

  const recentActivities = await db
    .select({
      id: messages.id,
      content: messages.content,
      createdAt: messages.createdAt,
      channelName: channels.name,
    })
    .from(messages)
    .innerJoin(channels, eq(messages.channelId, channels.id))
    .where(eq(channels.workspaceId, workspaceId))
    .orderBy(desc(messages.createdAt))
    .limit(3);

  return {
    channelCount: channelRes?.value ?? 0,
    memberCount: memberRes?.value ?? 0,
    recentActivities,
  };
}