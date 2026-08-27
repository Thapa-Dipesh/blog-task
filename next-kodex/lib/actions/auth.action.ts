"use server";

import { loginSchema, registerSchema } from "@/lib/validations/auth.schema";
import { getUserByEmail } from "@/lib/db/users";
import { prisma } from "@/lib/prisma";
import {
  hashPassword,
  verifyPassword,
  signJWT,
  setSessionCookie,
  deleteSessionCookie,
} from "@/lib/auth";
import { redirect } from "next/navigation";

export interface AuthState {
  error?: string;
  success?: boolean;
}

export async function userLogin(
  prevState: AuthState | null,
  formData: FormData
): Promise<AuthState | never> {
  const rawData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const validation = loginSchema.safeParse(rawData);
  if (!validation.success) {
    return { error: validation.error.issues[0]?.message || "Invalid input" };
  }

  const { email, password } = validation.data;

  try {
    const user = await getUserByEmail(email);
    if (!user) {
      return { error: "Invalid email or password" };
    }

    const isValidPassword = await verifyPassword(password, user.password);
    if (!isValidPassword) {
      return { error: "Invalid email or password" };
    }

    const token = await signJWT({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });

    await setSessionCookie(token);
  } catch (error) {
    console.error("Login error:", error);
    return { error: "An unexpected error occurred. Please try again." };
  }

  redirect("/admin/dashboard");
}

export async function userRegister(
  prevState: AuthState | null,
  formData: FormData
): Promise<AuthState | never> {
  const rawData = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const validation = registerSchema.safeParse(rawData);
  if (!validation.success) {
    return { error: validation.error.issues[0]?.message || "Invalid input" };
  }

  const { name, email, password } = validation.data;

  try {
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return { error: "A user with this email already exists" };
    }

    const hashedPassword = await hashPassword(password);

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    return { error: "Failed to create account. Please try again." };
  }

  redirect("/admin/login");
}

export async function logout(): Promise<void> {
  await deleteSessionCookie();
  redirect("/admin/login");
}
