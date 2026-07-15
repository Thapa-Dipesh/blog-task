import { url } from "@/constants/api";
import { Post } from "@/types/post";

class ApiClient {
  private async request<T>(
    endpoint: string,
    options?: RequestInit,
  ): Promise<T> {
    const res = await fetch(`${url}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }

    const data = await res.json();
    return data.post || data.posts || data.data || data;
  }

  getPosts() {
    return this.request<Post[]>("/api/post/posts");
  }

  getPost(slug: string) {
    return this.request<Post>(`/api/post/posts/${slug}`);
  }

  getAuthorPosts(username: string) {
    return this.request<Post[]>(`/api/post/author/${username}`);
  }
}

export const api = new ApiClient();
