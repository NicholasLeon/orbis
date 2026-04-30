"use server";

import { db } from "@/db/db";
import { deleteChannel } from "@/services/channelServices";
import { getAuthSession } from "@/lib/authSession";

export async function deleteChannelAction(channelId: string) {
  const user = await getAuthSession();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const member = await db.query.members.findFirst({
    where: (m, { eq }) => eq(m.userId, user.userId),
  });

  if (!member) {
    throw new Error("Member not found");
  }

  await deleteChannel(channelId, member.id);
}