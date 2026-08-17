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

  // Public routes (no auth)
  getPosts() {
    return this.request<Post[]>("/api/post/posts");
  }

  getPost(slug: string) {
    return this.request<Post>(`/api/post/posts/${slug}`);
  }

  getAuthorPosts(username: string) {
    return this.request<Post[]>(`/api/post/author/${username}`);
  }

  // Auth routes (need token)
  getMyPosts(token: string) {
    return this.request<Post[]>("/api/post/my-posts", {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  getMe(token: string) {
    return this.request<{
      id: string;
      name: string;
      email: string;
      role: string;
    }>("/api/user/profile", {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}

export const api = new ApiClient();
