"use server";

import { url } from "@/constants/api";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface AuthState {
  error?: string;
}

export async function userLogin(
  prevState: AuthState | null,
  formData: FormData,
): Promise<AuthState | never> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

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

  redirect("/admin/dashboard");
}

// ========== LOGOUT ==========
export async function logout() {
  const token = (await cookies()).get("token")?.value;

  if (token) {
    // Optional: Call API to invalidate token on server
    try {
      await fetch(`${url}/api/user/logout`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error) {
      console.error("Error logging out:", error);
    }
  }

  (await cookies()).delete("token");
  redirect("/admin/login");
}
