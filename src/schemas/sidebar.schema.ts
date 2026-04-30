import { z } from "zod";
import { workspaceSchema } from "./workspace.schema";
import { channelSchema } from "./channel.schema";
import { userRoleSchema } from "./role.schema";

export const appSidebarSchema = z.object({
  workspaces: z.array(workspaceSchema),
  channels: z.array(channelSchema),
  userRole: userRoleSchema,
});

export type AppSidebarProps = z.infer<typeof appSidebarSchema>;