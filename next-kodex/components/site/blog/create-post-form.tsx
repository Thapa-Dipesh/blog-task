"use client";

import { useState } from "react";
import { PostForm } from "./post-form";
import { createPost } from "@/lib/actions/post.action";

export function CreatePostForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);
    setError(null);
    try {
      await createPost(formData);
    } catch (err: any) {
      // If Next.js redirect was thrown, ignore as it's not an actual error
      if (err?.message?.includes("NEXT_REDIRECT")) {
        return;
      }
      setError(err?.message || "Failed to create post. Please check all fields.");
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
        onSubmit={handleSubmit}
        isLoading={isLoading}
        submitLabel="Publish Post"
      />
    </div>
  );
}
