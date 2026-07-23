"use server";

import { url } from "@/constants/api";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function getMyPosts() {
  const token = (await cookies()).get("token")?.value;

  if (!token) {
    throw new Error("Not authenticated");
  }

  const res = await fetch(`${url}/api/post/my-posts`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  const data = await res.json();
  return data.posts || [];
}

// Create a new post
export async function createPost(formData: FormData) {
  const token = (await cookies()).get("token")?.value;

  if (!token) {
    throw new Error("Not authenticated");
  }

  const res = await fetch(`${url}/api/post/create`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title: formData.get("title") as string }),
  });

  if (!res.ok) {
    throw new Error("Failed to create post");
  }

  const data = await res.json();
  return data.post || data.posts || data.data || data;
}

// Update a post
export async function updatePost(formData: FormData) {
  const token = (await cookies()).get("token")?.value;

  if (!token) {
    throw new Error("Not authenticated");
  }

  const res = await fetch(`${url}/api/post/update`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title: formData.get("title") as string }),
  });

  if (!res.ok) {
    throw new Error("Failed to update post");
  }

  const data = await res.json();
  return data.post || data.posts || data.data || data;
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

  revalidatePath("/dashboard/posts");
}
