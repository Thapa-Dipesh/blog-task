"use client";

import { useState } from "react";
import {
  Edit3,
  Eye,
  Plus,
  Search,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Filter,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { deletePost } from "@/lib/actions/post.action";

interface PostItem {
  id: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  createdAt: Date | string;
  keywords?: string | null;
}

interface PostsTableProps {
  posts: PostItem[];
}

export function PostsTable({ posts }: PostsTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const pageSize = 8;
  const router = useRouter();

  // Extract distinct tags
  const tagsSet = new Set<string>();
  posts.forEach((p) => {
    if (p.keywords) {
      p.keywords.split(",").forEach((t) => {
        const trimmed = t.trim();
        if (trimmed) tagsSet.add(trimmed);
      });
    }
  });
  const allTags = Array.from(tagsSet);

  // Filter posts
  const filteredPosts = (posts || []).filter((post) => {
    const matchesSearch =
      post.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.slug?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.keywords?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTag =
      selectedTag === "all" ||
      post.keywords?.toLowerCase().includes(selectedTag.toLowerCase());

    return matchesSearch && matchesTag;
  });

  // Paginate filtered posts
  const totalPages = Math.ceil(filteredPosts.length / pageSize) || 1;
  const validPage = Math.min(currentPage, totalPages);
  const paginatedPosts = filteredPosts.slice(
    (validPage - 1) * pageSize,
    validPage * pageSize
  );

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to permanently delete this post?")) {
      return;
    }

    setDeletingId(id);

    try {
      await deletePost(id);
      router.refresh();
    } catch (error) {
      alert("Failed to delete post. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Content Manager
          </h1>
          <p className="text-slate-500 mt-1">
            Manage, edit, publish, and monitor your technical publications.
          </p>
        </div>

        <Link
          href="/admin/blogs/create"
          className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-slate-200 active:scale-95 w-fit"
        >
          <Plus size={18} />
          Create New Post
        </Link>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-200/80 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search by title, slug, or keywords..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-between md:justify-end">
          {allTags.length > 0 && (
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <Filter size={14} className="text-slate-400" />
              <select
                value={selectedTag}
                onChange={(e) => {
                  setSelectedTag(e.target.value);
                  setCurrentPage(1);
                }}
                className="bg-slate-50 border border-slate-200 text-slate-700 text-xs rounded-xl px-3 py-2 outline-none font-semibold focus:border-orange-500 cursor-pointer"
              >
                <option value="all">All Tags ({posts.length})</option>
                {allTags.map((t) => (
                  <option key={t} value={t}>
                    #{t}
                  </option>
                ))}
              </select>
            </div>
          )}

          <span className="text-xs font-bold text-slate-600 px-3 py-1.5 bg-slate-100 rounded-xl">
            {filteredPosts.length} Publications
          </span>
        </div>
      </div>

      {/* Posts Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200/80 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                  Article
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                  Created Date
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                  Tags
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedPosts.map((post) => (
                <tr
                  key={post.id}
                  className="hover:bg-slate-50/50 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={
                          post.image ||
                          "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80"
                        }
                        className="w-12 h-12 rounded-xl object-cover border border-slate-100 shrink-0"
                        alt={post.title}
                      />
                      <div className="min-w-0">
                        <div className="font-bold text-slate-900 group-hover:text-orange-600 transition-colors truncate max-w-md">
                          {post.title}
                        </div>
                        <div className="text-xs text-slate-400 font-mono">
                          /{post.slug}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs font-medium text-slate-500 whitespace-nowrap">
                    {new Date(post.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {post.keywords ? (
                        post.keywords
                          .split(",")
                          .slice(0, 2)
                          .map((k) => (
                            <span
                              key={k}
                              className="text-[10px] font-mono px-2 py-0.5 bg-orange-50 text-orange-700 rounded-md font-medium"
                            >
                              #{k.trim()}
                            </span>
                          ))
                      ) : (
                        <span className="text-[11px] text-slate-400 italic">No tags</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-1.5">
                      <Link
                        href={`/blog/${post.slug}`}
                        target="_blank"
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                        title="View Live Article"
                      >
                        <Eye size={17} />
                      </Link>
                      <Link
                        href={`/admin/blogs/edit/${post.slug}`}
                        className="p-2 text-slate-400 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-all"
                        title="Edit Article"
                      >
                        <Edit3 size={17} />
                      </Link>
                      <button
                        onClick={() => handleDelete(post.id)}
                        disabled={deletingId === post.id}
                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all cursor-pointer disabled:opacity-50"
                        title="Delete Article"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredPosts.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-slate-400 text-sm">
              {searchQuery || selectedTag !== "all"
                ? "No articles match the current search or tag filter."
                : "No articles found. Write your first post!"}
            </p>
          </div>
        )}

        {/* Table Pagination */}
        {totalPages > 1 && (
          <div className="p-4 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>
              Showing Page <strong>{validPage}</strong> of <strong>{totalPages}</strong>
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={validPage === 1}
                className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
              >
                <ChevronLeft size={16} />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setCurrentPage(p)}
                  className={`w-7 h-7 rounded-lg font-bold transition-all cursor-pointer ${
                    p === validPage
                      ? "bg-slate-900 text-white shadow-xs"
                      : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {p}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={validPage === totalPages}
                className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
