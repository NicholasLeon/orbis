import { Elysia } from "elysia";
import { and, eq } from "drizzle-orm";
import { db } from "../db/db";
import { members, channels } from "../db/schema";
import { verifyToken } from "../lib/auth";

export const isMember = new Elysia()
  .derive(async ({ params, headers }) => {
    const { channelId } = params as { channelId: string };

    const token = headers.authorization;
    if (!token) return { user: null, member: null };

    const user = await verifyToken(token);
    if (!user) return { user: null, member: null };

    const member = await db.query.members.findFirst({
      where: eq(members.userId, user.userId),
      with: {
        workspace: {
          with: {
            channels: true,
          },
        },
      },
    });

    const hasAccess = member?.workspace.channels.some(
      (c) => c.id === channelId
    );

    return {
      user,
      member: hasAccess ? member : null,
    };
  })
  .onBeforeHandle((ctx) => {
    const { member } = ctx as any;

    if (!member) {
      return new Response("Access Denied", { status: 403 });
    }
  });