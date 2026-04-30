import { z } from "zod";
import { memberWithUserSchema } from "./member.schema";

export const channelTypeSchema = z.enum([
  "text",
  "voice",
  "announcement",
]);

export const channelSchema = z.object({
  id: z.string().uuid(),
  workspaceId: z.string().uuid(),
  name: z.string(),
  type: channelTypeSchema,
  isPrivate: z.boolean(),
  createdAt: z.coerce.date(),
});

export const channelWithMembersSchema = channelSchema.extend({
  members: z.array(memberWithUserSchema),
});

export type Channel = z.infer<typeof channelSchema>;
export type ChannelWithMembers = z.infer<typeof channelWithMembersSchema>;