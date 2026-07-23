// components/dashboard/create-post-form.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PostForm } from "./post-form";
import { createPost } from "@/lib/action/blog/blog.action";

export function CreatePostForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);
    try {
      await createPost(formData);
      router.push("/dashboard/posts");
      router.refresh();
    } catch (error) {
      alert("Failed to create post");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PostForm
      onSubmit={handleSubmit}
      isLoading={isLoading}
      submitLabel="Publish Post"
    />
  );
}
