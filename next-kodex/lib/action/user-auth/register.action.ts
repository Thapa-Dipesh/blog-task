"use server";

import { url } from "@/constants/api";
import { redirect } from "next/navigation";

export async function userRegister(prevState: unknown, formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const res = await fetch(`${url}/api/user/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        error:
          data.message ||
          "Registration failed. Please try again. Please try again.",
      };
    }
  } catch (error) {
    return { error: "Something went wrong. Please try again." };
  }

  redirect("/admin/login");
}
