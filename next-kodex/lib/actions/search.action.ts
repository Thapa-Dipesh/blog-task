"use server";

import { searchPostsForPalette, getAllTags } from "@/lib/db/posts";

export interface SearchResultItem {
  id: string;
  title: string;
  slug: string;
  description: string;
  keywords?: string | null;
  image?: string | null;
  createdAt: Date;
  author?: {
    name: string;
  } | null;
}

export async function searchContent(query: string): Promise<{
  posts: SearchResultItem[];
  matchingTags: string[];
}> {
  const trimmed = query.trim();
  if (!trimmed) {
    return { posts: [], matchingTags: [] };
  }

  try {
    const [posts, allTags] = await Promise.all([
      searchPostsForPalette(trimmed),
      getAllTags(),
    ]);

    const matchingTags = allTags
      .filter((tag) => tag.toLowerCase().includes(trimmed.toLowerCase()))
      .slice(0, 6);

    return {
      posts,
      matchingTags,
    };
  } catch (error) {
    console.error("Error in searchContent server action:", error);
    return { posts: [], matchingTags: [] };
  }
}
