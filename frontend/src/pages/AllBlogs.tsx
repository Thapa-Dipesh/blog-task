import { Link } from "react-router-dom";
import {
  Edit3,
  Trash2,
  Eye,
  Plus,
  Search,
  Filter,
  Loader2,
} from "lucide-react";
// import { posts } from "../mockData";
import {
  useDeletePostMutation,
  useGetUserPostsQuery,
} from "../features/api/postApi";

const AllBlogs = () => {
  const [deletePost] = useDeletePostMutation();
  const { data: posts, isLoading } = useGetUserPostsQuery();

  const handleDelete = async (id: number | string) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await deletePost(id).unwrap();
      } catch (error) {
        console.error("Failed to delete post:", error);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-slate-100 border-t-orange-600 rounded-full animate-spin"></div>
          <div className="text-slate-400 font-bold text-xs uppercase tracking-[0.3em] animate-pulse">
            Initializing Blogs
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-8">
      <title>Content Manager | KODEX</title>
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
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
            to="/create"
            className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-gray-200 active:scale-95 w-fit"
          >
            <Plus size={18} />
            Create New Post
          </Link>
        </div>

        {/* Stats & Search Bar */}
        <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search by title or slug..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
            />
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-xl transition-colors">
              <Filter size={16} /> Filter
            </button>
            <div className="h-8 w-px bg-slate-100 mx-2" />
            <span className="text-sm font-bold text-slate-900 flex items-center">
              {posts?.length} Total Posts
            </span>
          </div>
        </div>

        {/* The Table */}
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
                  SEO Score
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {posts?.map((post) => (
                <tr
                  key={post.id}
                  className="hover:bg-slate-50/50 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={post.image}
                        className="w-12 h-12 rounded-lg object-cover"
                        alt=""
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
                    <span className="px-2 py-1 bg-green-50 text-green-600 text-[10px] font-black rounded uppercase tracking-tighter border border-green-100">
                      Optimized
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        to={`/blog/${post.id}`}
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                        title="View Live"
                      >
                        <Eye size={18} />
                      </Link>
                      <Link
                        to={`/edit/${post.id}`}
                        className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-all"
                        title="Edit Post"
                      >
                        <Edit3 size={18} />
                      </Link>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all cursor-pointer"
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

          {posts?.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-slate-400">
                No blog posts found. Time to write something!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllBlogs;
