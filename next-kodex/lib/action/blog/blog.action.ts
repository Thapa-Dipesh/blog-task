// app/(dashboard)/actions.ts
"use server";

import { url } from "@/constants/api";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function getToken() {
  const token = (await cookies()).get("token")?.value;
  if (!token) throw new Error("Not authenticated");
  return token;
}

// Create a post
export async function createPost(formData: FormData) {
  const token = await getToken();

  const res = await fetch(`${url}/api/post/posts`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData, // FormData for file upload
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || "Failed to create post");
  }

  revalidatePath("/dashboard/posts");
  revalidatePath("/");
  redirect("/dashboard/blogs");
}

// Update a post
export async function updatePost(id: string, formData: FormData) {
  const token = await getToken();

  const res = await fetch(`${url}/api/post/posts/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || "Failed to update post");
  }

  revalidatePath("/dashboard/posts");
  revalidatePath(`/blog/${formData.get("slug")}`);
  revalidatePath("/");
  redirect("/dashboard/blogs");
}

// Delete a post
export async function deletePost(id: string) {
  const token = (await cookies()).get("token")?.value;

  if (!token) {
    throw new Error("Not authenticated");
  }

  const res = await fetch(`${url}/api/post/delete/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to delete post");
  }

  revalidatePath("/dashboard/blogs");
}
