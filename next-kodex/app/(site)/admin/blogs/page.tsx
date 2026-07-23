import { PostsTable } from "@/components/site/blog/posts-table";
import { api } from "@/lib/api";

export default async function BlogsPage() {
  const posts = await api.getPosts();

  return <PostsTable posts={posts} />;
}
