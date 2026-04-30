import { z } from "zod";
import { workspaceSchema } from "./workspace.schema";
import { channelSchema } from "./channel.schema";
import { userSchema } from "./user.schema";

export const userRoleSchema = z.enum(["admin", "moderator", "member"]).nullable();

export const dashboardShellSchema = z.object({
  workspaces: z.array(workspaceSchema),
  user: userSchema.nullable(),
  userRole: userRoleSchema,
  children: z.any(), 
  channels: z.array(channelSchema),
});