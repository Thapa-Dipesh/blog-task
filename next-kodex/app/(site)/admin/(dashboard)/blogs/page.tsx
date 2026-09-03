import { PostsTable } from "@/components/site/blog/posts-table";
import { requireAuth } from "@/lib/auth";
import { getUserPosts, getAllPosts } from "@/lib/db/posts";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Publications Manager | KODEX.",
};

export default async function BlogsPage() {
  const user = await requireAuth();

  // Super Admin can view/manage all platform posts; Authors/Admins manage their own
  const posts =
    user.role === "SUPER_ADMIN"
      ? await getAllPosts()
      : await getUserPosts(user.id);

  return <PostsTable posts={posts as any} />;
}
