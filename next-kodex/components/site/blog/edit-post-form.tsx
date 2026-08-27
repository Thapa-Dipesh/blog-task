"use client";

import { useState } from "react";
import { PostForm } from "./post-form";
import { updatePost } from "@/lib/actions/post.action";

interface PostData {
  id: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  metaTitle?: string | null;
  metaDescription?: string | null;
  keywords?: string | null;
}

interface EditPostFormProps {
  post: PostData;
}

export function EditPostForm({ post }: EditPostFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);
    setError(null);
    try {
      await updatePost(post.id, formData);
    } catch (err: any) {
      if (err?.message?.includes("NEXT_REDIRECT")) {
        return;
      }
      setError(err?.message || "Failed to update post. Please check all fields.");
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {error && (
        <div className="max-w-7xl mx-auto px-8 pt-4">
          <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl text-sm font-medium">
            {error}
          </div>
        </div>
      )}
      <PostForm
        initialData={{
          ...post,
          metaTitle: post.metaTitle || undefined,
          metaDescription: post.metaDescription || undefined,
          keywords: post.keywords || undefined,
        }}
        onSubmit={handleSubmit}
        isLoading={isLoading}
        submitLabel="Update Post"
      />
    </div>
  );
}
