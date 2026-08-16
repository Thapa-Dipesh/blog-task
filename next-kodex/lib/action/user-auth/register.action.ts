"use server";

import { url } from "@/constants/api";
import { redirect } from "next/navigation";

interface AuthState {
  error?: string;
}

export async function userRegister(
  prevState: AuthState | null,
  formData: FormData,
): Promise<AuthState | never> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!name || !email || !password) {
    return { error: "All fields are required" };
  }

  if (password.length < 6) {
    return { error: "Password must be at least 6 characters" };
  }

  try {
    const res = await fetch(`${url}/api/user/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        error: data.message || "Registration failed. Please try again.",
      };
    }
  } catch (error) {
    return { error: "Something went wrong. Please try again." };
  }

  redirect("/login");
}
