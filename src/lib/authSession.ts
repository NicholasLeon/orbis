import { jwtVerify } from "jose";
import { cookies } from "next/headers";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "fallback_secret_key");

export async function getAuthSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;

  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return { 
      userId: payload.userId as string, 
      name: payload.name as string,
      token: token
    }; 
  } catch (err) {
    return null;
  }
}