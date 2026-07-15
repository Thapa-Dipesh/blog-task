"use server";

import { url } from "@/constants/api";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function userlogin(prevState: unknown, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  let token: string | null = null;

  try {
    const res = await fetch(`${url}/api/user/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      return { error: data.message || "Invalid credentials" };
    }

    token = data.token;
  } catch (error) {
    return { error: "Something went wrong. Please try again." };
  }

  if (!token) {
    return { error: "Login failed. No token received." };
  }

  (await cookies()).set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 86400,
    path: "/",
  });

  redirect("/dashboard");
}
