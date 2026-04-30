import bcrypt from "bcryptjs";
import * as jose from "jose";
import { jwtPayloadSchema, type JWTPayload } from "../schemas/auth.schema";

const secret = process.env.JWT_SECRET;

if (!secret) {
  throw new Error("JWT_SECRET is not defined");
}

const JWT_SECRET = new TextEncoder().encode(secret);

export const hashPassword = (password: string) =>
  bcrypt.hash(password, 10);

export const comparePassword = (password: string, hash: string) =>
  bcrypt.compare(password, hash);

export const generateToken = async (payload: JWTPayload) => {
  return await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(JWT_SECRET);
};

export const verifyToken = async (token: string): Promise<JWTPayload | null> => {
  try {
    const { payload } = await jose.jwtVerify(token, JWT_SECRET);

    const result = jwtPayloadSchema.safeParse(payload);

    if (!result.success) {
      console.error("❌ [ZOD ERROR]:", result.error.format());
      return null;
    }

    return result.data;
  } catch (error) {
    return null;
  }
};
