// components/dashboard/posts-table.tsx
"use client";

import { useState } from "react";
import { Edit3, Eye, Filter, Plus, Search, Trash2 } from "lucide-react";
import Link from "next/link";
import { Post } from "@/types/post";
import { useRouter } from "next/navigation";
import { deletePost } from "@/lib/action/blog/blog.action";

interface PostsTableProps {
  posts: Post[];
}

export function PostsTable({ posts }: PostsTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const router = useRouter();

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.slug.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this post?")) {
      return;
    }

    setDeletingId(id);

    try {
      await deletePost(id);
      router.refresh(); // Refresh server data without full page reload
    } catch (error) {
      alert("Failed to delete post. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Content Manager
            </h1>
            <p className="text-slate-500 mt-1">
              Manage, edit, and monitor your blog publications.
            </p>
          </div>

          <Link
            href="/dashboard/blogs/create"
            className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-gray-200 active:scale-95 w-fit"
          >
            <Plus size={18} />
            Create New Post
          </Link>
        </div>

        {/* Search & Stats */}
        <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search by title or slug..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
            />
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-xl transition-colors">
              <Filter size={16} /> Filter
            </button>
            <div className="h-8 w-px bg-slate-100 mx-2" />
            <span className="text-sm font-bold text-slate-900 flex items-center">
              {filteredPosts.length} Total Posts
            </span>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                  Article
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                  Created At
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                  Status
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredPosts.map((post) => (
                <tr
                  key={post.id}
                  className="hover:bg-slate-50/50 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={post.image}
                        className="w-12 h-12 rounded-lg object-cover"
                        alt={post.title}
                      />
                      <div>
                        <div className="font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
                          {post.title}
                        </div>
                        <div className="text-xs text-slate-400 font-mono">
                          /{post.slug}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    {post.published ? (
                      <span className="px-2 py-1 bg-green-50 text-green-600 text-[10px] font-black rounded uppercase tracking-tighter border border-green-100">
                        Published
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-amber-50 text-amber-600 text-[10px] font-black rounded uppercase tracking-tighter border border-amber-100">
                        Draft
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/blog/${post.slug}`}
                        target="_blank"
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                        title="View Live"
                      >
                        <Eye size={18} />
                      </Link>
                      <Link
                        href={`/dashboard/posts/${post.id}/edit`}
                        className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-all"
                        title="Edit Post"
                      >
                        <Edit3 size={18} />
                      </Link>
                      <button
                        onClick={() => handleDelete(post.id)}
                        disabled={deletingId === post.id}
                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all cursor-pointer disabled:opacity-50"
                        title="Delete Post"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredPosts.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-slate-400">
                {searchQuery
                  ? "No posts match your search."
                  : "No blog posts found. Time to write something!"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
