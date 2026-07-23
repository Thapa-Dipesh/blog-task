"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PostForm } from "./post-form";
import { Post } from "@/types/post";
import { updatePost } from "@/lib/action/blog/blog.action";

interface EditPostFormProps {
  post: Post;
}

export function EditPostForm({ post }: EditPostFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);
    try {
      await updatePost(post.id, formData);
      router.push("/dashboard/posts");
      router.refresh();
    } catch (error) {
      alert("Failed to update post");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PostForm
      initialData={post}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      submitLabel="Update Post"
    />
  );
}
