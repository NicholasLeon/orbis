import { z } from "zod";

export const workspaceSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, "Nama workspace harus diisi"),
  slug: z.string(),
  inviteCode: z.string().min(1),
  createdBy: z.string().uuid().nullable(),
  createdAt: z.date(),
});

export type Workspace = z.infer<typeof workspaceSchema>;