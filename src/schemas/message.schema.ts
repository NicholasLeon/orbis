import { z } from "zod";

export const messageSchema = z.object({
  id: z.string().uuid(),

  channelId: z.string().uuid(),
  memberId: z.string().uuid(),

  content: z.string(),

  parentId: z.string().uuid().nullable(),

  createdAt: z.string().datetime(),

  updatedAt: z.string().datetime().nullable(),
  deletedAt: z.string().datetime().nullable(),

  userName: z.string(),
});

export type Message = z.infer<typeof messageSchema>;