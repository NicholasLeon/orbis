import { Elysia, t } from "elysia";
import { verifyToken } from "./lib/auth";
import { db } from "./db/db";
import { messages, channelReadStatus, members, channelMembers, channels } from "./db/schema";
import { eq } from "drizzle-orm";
import { sendMessageSchema } from "./schemas/index.schema";
import { cors } from '@elysiajs/cors'
import { clients } from "./websocket/client";

const app = new Elysia() .use(cors())

app.ws("/ws-notif", {
  query: t.Object({
    token: t.String(),
  }),

  async open(ws) {
    const { token } = ws.data.query as { token: string };
    const user = await verifyToken(token);

    if (!user) {
      ws.send(JSON.stringify({ error: "Unauthorized" }));
      return ws.terminate();
    }

    const member = await db.query.members.findFirst({
      where: eq(members.userId, user.userId),
    });

    if (!member) return ws.terminate();

    const data = ws.data as any;
    data.memberId = member.id;

    clients.set(member.id, ws);
  },

  close(ws) {
    const data = ws.data as any;
    if (data?.memberId) {
      clients.delete(data.memberId);
    }
  },
})

.get("/notifications/unread-count", async ({ query }) => {
  const { memberId } = query as { memberId: string };

  const userChannels = await db.query.channelMembers.findMany({
    where: eq(channelMembers.memberId, memberId),
  });

  const reads = await db.query.channelReadStatus.findMany({
    where: eq(channelReadStatus.memberId, memberId),
  });

  let total = 0;
  const unreadDetails = [];

  for (const uc of userChannels) {
    const readStatus = reads.find((r) => r.channelId === uc.channelId);
    let unreadCountForChannel = 0;

    if (readStatus) {
      const unreadMsgs = await db.query.messages.findMany({
        where: (m, { and, eq, gt, ne }) =>
          and(
            eq(m.channelId, uc.channelId),
            gt(m.createdAt, readStatus.updatedAt),
            ne(m.id, readStatus.lastReadMessageId ?? "")
          ),
      });
      unreadCountForChannel = unreadMsgs.length;
    } else {
      const unreadMsgs = await db.query.messages.findMany({
        where: eq(messages.channelId, uc.channelId),
      });
      unreadCountForChannel = unreadMsgs.length;
    }

    if (unreadCountForChannel > 0) {
      total += unreadCountForChannel;
      
      const channelInfo = await db.query.channels.findFirst({
        where: eq(channels.id, uc.channelId)
      });

      if (channelInfo) {
        unreadDetails.push({
          channelId: channelInfo.id,
          channelName: channelInfo.name,
          workspaceId: channelInfo.workspaceId,
          count: unreadCountForChannel
        });
      }
    }
  }

  return { count: total, details: unreadDetails };
})

.post("/notifications/mark-read", async ({ body }) => {
  const { memberId, channelId, messageId } = body as {
    memberId: string;
    channelId: string;
    messageId: string;
  };

  await db
    .insert(channelReadStatus)
    .values({
      memberId,
      channelId,
      lastReadMessageId: messageId,
    })
    .onConflictDoUpdate({
      target: [channelReadStatus.memberId, channelReadStatus.channelId],
      set: {
        lastReadMessageId: messageId,
        updatedAt: new Date(),
      },
    });

  sendNotification(memberId, {
    type: "CHANNEL_READ_SUCCESS",
    payload: { channelId } 
  });

  return { success: true };
});


app.ws("/ws/:channelId", {
    query: t.Object({
      token: t.String(),
    }),

  async open(ws) {
    const { token } = ws.data.query as { token: string };
    const { channelId } = ws.data.params;

    const user = await verifyToken(token);
    
    if (!user) {
    console.error("Ws Error, Unable to verify token");
    ws.send(JSON.stringify({ error: "Unauthorized" }));
    return ws.terminate();
  }

    const member = await db.query.members.findFirst({
      where: eq(members.userId, user.userId),
    });

    if (!member) return ws.terminate();

    const data = ws.data as any;
    data.userId = user.userId;
    data.memberId = member.id;
    data.userName = user.name;

    ws.subscribe(channelId);
  },

  async message(ws, rawData) {
    const { channelId } = ws.data.params;
    const { memberId, userName } = ws.data as unknown as { memberId: string; userName: string; };
    
    if (!memberId) return;
    
    try {
      const data = sendMessageSchema.parse(rawData);

      const [newMessage] = await db.insert(messages).values({
        channelId,
        memberId,
        content: data.content,
        parentId: data.parentId || null,
      }).returning();

      const stringPayload = JSON.stringify({
        type: "NEW_MESSAGE",
        payload: {
          ...newMessage,
          userName: userName,
        },
      });

      ws.publish(channelId, stringPayload);
      ws.send(stringPayload);

      await db.insert(channelReadStatus)
        .values({
          memberId,
          channelId,
          lastReadMessageId: newMessage.id,
        })
        .onConflictDoUpdate({
          target: [channelReadStatus.memberId, channelReadStatus.channelId],
          set: { lastReadMessageId: newMessage.id, updatedAt: new Date() },
        });

      const channelUsers = await db.query.channelMembers.findMany({
        where: eq(channelMembers.channelId, channelId),
        columns: { memberId: true }
      });

      for (const cu of channelUsers) {
        if (cu.memberId !== memberId) {
          sendNotification(cu.memberId, {
            type: "NEW_UNREAD",
            channelId: channelId,
          });
        }
      }
    
    } catch (err) {
      console.error("Failed To Send Messages:", err);
      ws.send(JSON.stringify({ type: "ERROR", payload: "Format pesan tidak valid" }));
    }
  },

    close(ws) {
      const { channelId } = ws.data.params as { channelId: string };
      ws.unsubscribe(channelId);
    }
  })
  .listen(3001);

  export function sendNotification(memberId: string, payload: any) {
  const client = clients.get(memberId);
  if (client) {
    client.send(JSON.stringify(payload));
  }
}

console.log(`Elysia is running at ${app.server?.port}`);