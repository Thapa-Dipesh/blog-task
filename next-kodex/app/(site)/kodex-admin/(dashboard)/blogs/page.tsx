import { PostsTable } from "@/components/site/blog/posts-table";
import { requireSuperAdmin } from "@/lib/auth";
import { getAllPosts } from "@/lib/db/posts";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Publications | Master Console | KODEX.",
  description: "Global publication management across all authors on KODEX.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function SuperAdminBlogsPage() {
  await requireSuperAdmin();
  const posts = await getAllPosts();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            All Platform Publications
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Global moderation and editorial control across all articles published by all authors.
          </p>
        </div>
      </div>

      <PostsTable posts={posts as any} />
    </div>
  );
}
