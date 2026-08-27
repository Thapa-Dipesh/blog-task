import { getAllPosts, getPostBySlug, getUserPosts } from "@/lib/db/posts";
import { getUserById } from "@/lib/db/users";
import { verifyJWT } from "@/lib/auth";

class ApiClient {
  // Public routes
  async getPosts() {
    return getAllPosts();
  }

  async getPost(slug: string) {
    return getPostBySlug(slug);
  }

  async getAuthorPosts(authorId: string) {
    return getUserPosts(authorId);
  }

  // Auth routes
  async getMyPosts(token: string) {
    const user = await verifyJWT(token);
    if (!user) return [];
    return getUserPosts(user.id);
  }

  async getMe(token: string) {
    const session = await verifyJWT(token);
    if (!session) throw new Error("Invalid or expired session token");
    const user = await getUserById(session.id);
    if (!user) throw new Error("User not found");
    return user;
  }
}

export const api = new ApiClient();
