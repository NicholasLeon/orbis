import { z } from "zod";

export const sendMessageSchema = z.object({
  content: z.string().min(1, "Message tidak boleh kosong"),
  parentId: z.string().uuid().optional(),
});

export type SendMessageInput = z.infer<typeof sendMessageSchema>;