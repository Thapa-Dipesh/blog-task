import { PostsTable } from "@/components/site/blog/posts-table";
import { requireAuth } from "@/lib/auth";
import { getUserPosts, getAllPosts } from "@/lib/db/posts";

export default async function BlogsPage() {
  const user = await requireAuth();
  
  // If ADMIN, can view all posts, otherwise their authored posts
  const posts = user.role === "ADMIN" 
    ? await getAllPosts() 
    : await getUserPosts(user.id);

  return <PostsTable posts={posts as any} />;
}
