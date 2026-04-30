"use server"

import { db } from "@/db/db";
import { users, members } from "@/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { generateToken } from "./auth";
import { verifyToken } from "./auth";

export async function loginAction(prevState: any, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    
    if (!user) return { error: "User tidak ditemukan" };

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return { error: "Password salah" };

    const token = await generateToken({ 
      userId: user.id, 
      name: user.name, 
      email: user.email 
    });

    (await cookies()).set("session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
      sameSite: "lax",
    });
  } catch (e) {
    console.error("Login Error:", e);
    return { error: "Terjadi kesalahan sistem" };
  }

  redirect("/dashboard");
}

export async function registerAction(prevState: any, formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const [existingUser] = await db.select().from(users).where(eq(users.email, email));
    if (existingUser) return { error: "Email sudah terdaftar" };

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.insert(users).values({
      name,
      email,
      password: hashedPassword,
    });
  } catch (e) {
    return { error: "Gagal mendaftarkan akun" };
  }

  redirect("/login");
}

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;

  if (!token) return null;

  const payload = await verifyToken(token);
  if (!payload) return null;

  const user = await db.query.users.findFirst({
    where: eq(users.id, payload.userId),
  });

  if (!user) return null;

  const member = await db.query.members.findFirst({
    where: eq(members.userId, user.id),
  });

  if (!member) {
  throw new Error("Member not found");
}

  return {
    ...user,
    token,
    memberId: member.id,
  };
}

export async function logoutAction() {
  (await cookies()).delete("session");
  redirect("/login");
}