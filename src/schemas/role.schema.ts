import { z } from "zod";

export const userRoleSchema = z.enum([
  "admin",
  "moderator",
  "member",
]).nullable();

export type UserRole = z.infer<typeof userRoleSchema>;