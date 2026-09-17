import { requireAuth } from "@/lib/auth";
import { getDashboardStats } from "@/lib/db/posts";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  FileText,
  Eye,
  TrendingUp,
  ArrowUpRight,
  PlusCircle,
  BookOpen,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Author Dashboard | KODEX.",
  description: "Personal author publication metrics and post management.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function DashboardPage() {
  const user = await requireAuth();

  // If Super Admin visits /admin/dashboard, redirect to the Master Console
  if (user.role === "SUPER_ADMIN") {
    redirect("/kodex-admin/dashboard");
  }

  // Regular Author View
  const stats = await getDashboardStats(user.id);
  const posts = stats.posts;

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Author Dashboard
          </h1>
          <p className="text-slate-500 mt-1">
            Welcome back, <strong className="text-slate-900">{user.name}</strong>! Here is an overview of your publication activity.
          </p>
        </div>

        <Link
          href="/admin/blogs/create"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold shadow-lg shadow-slate-900/10 transition-all active:scale-95 w-fit"
        >
          <PlusCircle size={18} className="text-orange-500" />
          <span>Write New Article</span>
        </Link>
      </div>

      {/* Author Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="My Articles"
          value={stats.totalPosts}
          icon={<FileText size={20} />}
          color="blue"
        />
        <StatCard
          title="Published Articles"
          value={stats.publishedPosts}
          icon={<TrendingUp size={20} />}
          color="green"
        />
        <StatCard
          title="Estimated Views"
          value={stats.totalViews}
          icon={<Eye size={20} />}
          color="orange"
        />
        <StatCard
          title="Drafts"
          value={stats.draftPosts}
          icon={<FileText size={20} />}
          color="amber"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Posts Table */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">
              My Recent Articles
            </h2>
            <Link
              href="/admin/blogs"
              className="text-sm font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowUpRight size={16} />
            </Link>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-2xs">
            {posts.length === 0 ? (
              <div className="p-12 text-center">
                <BookOpen className="mx-auto text-slate-300 mb-3" size={40} />
                <h3 className="text-base font-bold text-slate-800">
                  No articles published yet
                </h3>
                <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                  Start drafting your first technical breakdown using the rich TipTap editor.
                </p>
                <Link
                  href="/admin/blogs/create"
                  className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-all shadow-sm"
                >
                  <PlusCircle size={14} className="text-orange-500" />
                  <span>Create Your First Post</span>
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {posts.map((post: any) => (
                  <div
                    key={post.id}
                    className="p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-slate-900 truncate">
                        <Link
                          href={`/blog/${post.slug}`}
                          className="hover:text-orange-600 transition-colors"
                        >
                          {post.title}
                        </Link>
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Published on{" "}
                        {new Date(post.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <Link
                        href={`/admin/blogs/edit/${post.slug}`}
                        className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors"
                      >
                        Edit
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">
              Author Quick Actions
            </h3>
            <div className="space-y-3">
              <Link
                href="/admin/blogs/create"
                className="flex items-center gap-3 p-4 rounded-2xl bg-slate-900 text-white hover:bg-slate-800 transition-colors"
              >
                <PlusCircle size={18} className="text-orange-500" />
                <span className="font-bold text-sm">Write New Post</span>
              </Link>
              <Link
                href="/admin/blogs"
                className="flex items-center gap-3 p-4 rounded-2xl border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <FileText size={18} className="text-orange-600" />
                <span className="font-bold text-sm">Manage My Articles</span>
              </Link>
              <Link
                href="/"
                className="flex items-center gap-3 p-4 rounded-2xl border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <TrendingUp size={18} className="text-blue-600" />
                <span className="font-bold text-sm">View Public Feed</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
  color = "blue",
}: {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  color?: "blue" | "green" | "orange" | "amber";
}) {
  const colorMap = {
    blue: "bg-blue-50 text-blue-700 border-blue-100",
    green: "bg-emerald-50 text-emerald-700 border-emerald-100",
    orange: "bg-orange-50 text-orange-700 border-orange-100",
    amber: "bg-amber-50 text-amber-700 border-amber-200",
  };

  return (
    <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
          {title}
        </span>
        <div className={`p-2.5 rounded-2xl border ${colorMap[color]}`}>
          {icon}
        </div>
      </div>
      <div className="text-3xl font-black text-slate-900 tracking-tight font-mono">
        {value}
      </div>
    </div>
  );
}
