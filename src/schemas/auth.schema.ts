import { z } from "zod";

export const jwtPayloadSchema = z.object({
  userId: z.string().uuid(),
  name: z.string(), 
  email: z.string().email(),
});

export type JWTPayload = z.infer<typeof jwtPayloadSchema>;

export interface AuthSession {
  userId: string;
  name: string;
  email: string;
  token: string;
}