import { z } from "zod";
import { userSchema } from "./user.schema";

export const memberRoleEnum = z.enum(["admin", "moderator", "member"]);

export const memberSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  workspaceId: z.string().uuid(),
  role: memberRoleEnum,
  joinedAt: z.date().or(z.string().datetime()),
});

export const memberWithUserSchema = memberSchema.extend({
  user: userSchema,
});

export type Member = z.infer<typeof memberSchema>;
export type MemberWithUser = z.infer<typeof memberWithUserSchema>;