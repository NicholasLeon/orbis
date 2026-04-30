import { db } from "@/db/db";
import { channels } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { channelSchema } from "@/schemas/channel.schema";
import { Channel } from "@/schemas/channel.schema";
import { memberSchema } from "@/schemas/member.schema";

export async function getChannelsByWorkspaceId(workspaceId: string) {
  const data = await db
    .select()
    .from(channels)
    .where(eq(channels.workspaceId, workspaceId));

  return channelSchema.array().parse(data);
}

export async function getChannelById(channelId: string, workspaceId: string): Promise<Channel | null> {
  const [data] = await db
    .select()
    .from(channels)
    .where(
      and(
        eq(channels.id, channelId),
        eq(channels.workspaceId, workspaceId)
      )
    );

  return (data as Channel);
}

export async function deleteChannel(channelId: string, memberId: string) {
  const member = await db.query.members.findFirst({
    where: (m, { eq }) => eq(m.id, memberId),
  });

  if (!member || member.role !== "admin") {
    throw new Error("Unauthorized");
  }

  const channel = await db.query.channels.findFirst({
    where: (c, { eq }) => eq(c.id, channelId),
  });

  if (!channel || channel.workspaceId !== member.workspaceId) {
    throw new Error("Unauthorized");
  }

  await db.delete(channels)
    .where(eq(channels.id, channelId));
}