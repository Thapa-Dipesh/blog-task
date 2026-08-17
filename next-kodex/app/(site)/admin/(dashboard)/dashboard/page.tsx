import { cookies } from "next/headers";
import { api } from "@/lib/api";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  FileText,
  Eye,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle,
} from "lucide-react";

// Fetch dashboard data
async function getDashboardData(token: string) {
  const posts = await api.getMyPosts(token).catch(() => []);

  const stats = {
    totalPosts: posts.length,
    publishedPosts: posts.filter((p) => p.published).length,
    draftPosts: posts.filter((p) => !p.published).length,
    // totalViews: posts.reduce((sum, p) => sum + (p.views || 0), 0),
    totalViews: 1, // You can fetch this separately
    totalAuthors: 1, // You can fetch this separately
  };

  return { posts, stats };
}

export default async function DashboardPage() {
  const token = (await cookies()).get("token")?.value;
  if (!token) redirect("/login");

  const { posts, stats } = await getDashboardData(token);

  // Calculate trends (mock data for now, replace with real API)
  const viewsTrend = +12.5;
  const postsTrend = +3;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          Dashboard
        </h1>
        <p className="text-slate-500 mt-1">
          Welcome back! Here's what's happening with your content.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Posts"
          value={stats.totalPosts}
          icon={<FileText size={20} />}
          trend={postsTrend}
          color="blue"
        />
        <StatCard
          title="Published"
          value={stats.publishedPosts}
          icon={<CheckCircle size={20} />}
          trend={null}
          color="green"
        />
        <StatCard
          title="Drafts"
          value={stats.draftPosts}
          icon={<Clock size={20} />}
          trend={null}
          color="amber"
        />
        <StatCard
          title="Total Views"
          value={stats.totalViews.toLocaleString()}
          icon={<Eye size={20} />}
          trend={viewsTrend}
          color="orange"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Posts */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">Recent Posts</h2>
            <Link
              href="/dashboard/blogs"
              className="text-sm font-medium text-orange-600 hover:text-orange-700 flex items-center gap-1"
            >
              View all <ArrowUpRight size={16} />
            </Link>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">
            {posts.length === 0 ? (
              <div className="p-12 text-center">
                <FileText size={48} className="mx-auto text-slate-200 mb-4" />
                <p className="text-slate-400">No posts yet</p>
                <Link
                  href="/dashboard/blogs/create"
                  className="text-orange-600 font-medium hover:underline mt-2 inline-block"
                >
                  Create your first post
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-slate-50">
                {posts.slice(0, 5).map((post) => (
                  <div
                    key={post.id}
                    className="p-6 flex items-center gap-4 hover:bg-slate-50/50 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden shrink-0">
                      {post.image ? (
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-300">
                          <FileText size={20} />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-slate-900 truncate">
                        {post.title}
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {new Date(post.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                        {" · "}
                        {post.published ? (
                          <span className="text-green-600">Published</span>
                        ) : (
                          <span className="text-amber-600">Draft</span>
                        )}
                      </p>
                    </div>
                    <Link
                      href={`/dashboard/blogs/edit/${post.id}`}
                      className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors shrink-0"
                    >
                      <ArrowUpRight size={16} />
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6">
            <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-4">
              Quick Actions
            </h3>
            <div className="space-y-3">
              <Link
                href="blogs/create"
                className="flex items-center gap-3 p-4 rounded-2xl bg-slate-900 text-white hover:bg-slate-800 transition-colors"
              >
                <FileText size={18} />
                <span className="font-bold text-sm">Create New Post</span>
              </Link>
              <Link
                href="blogs"
                className="flex items-center gap-3 p-4 rounded-2xl border border-slate-100 text-slate-600 hover:bg-slate-50 transition-colors"
              >
                <TrendingUp size={18} />
                <span className="font-bold text-sm">View Analytics</span>
              </Link>
            </div>
          </div>

          {/* Content Health */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6">
            <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-4">
              Content Health
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-600">Published</span>
                  <span className="font-bold text-slate-900">
                    {stats.publishedPosts}/{stats.totalPosts}
                  </span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500 rounded-full transition-all"
                    style={{
                      width: `${stats.totalPosts ? (stats.publishedPosts / stats.totalPosts) * 100 : 0}%`,
                    }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-600">Drafts</span>
                  <span className="font-bold text-slate-900">
                    {stats.draftPosts}/{stats.totalPosts}
                  </span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-500 rounded-full transition-all"
                    style={{
                      width: `${stats.totalPosts ? (stats.draftPosts / stats.totalPosts) * 100 : 0}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6">
            <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-4">
              Recent Activity
            </h3>
            <div className="space-y-4">
              {posts.slice(0, 3).map((post, index) => (
                <div key={post.id} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                    {post.published ? (
                      <CheckCircle size={14} className="text-green-600" />
                    ) : (
                      <Clock size={14} className="text-amber-600" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm text-slate-900 line-clamp-1">
                      {post.published ? "Published" : "Created draft"}:{" "}
                      {post.title}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
              {posts.length === 0 && (
                <p className="text-sm text-slate-400">No recent activity</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Stat Card Component
function StatCard({
  title,
  value,
  icon,
  trend,
  color,
}: {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  trend: number | null;
  color: "blue" | "green" | "amber" | "orange";
}) {
  const colorMap = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    amber: "bg-amber-50 text-amber-600",
    orange: "bg-orange-50 text-orange-600",
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl ${colorMap[color]}`}>{icon}</div>
        {trend !== null && (
          <span
            className={`flex items-center gap-1 text-xs font-bold ${
              trend >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {trend >= 0 ? (
              <ArrowUpRight size={14} />
            ) : (
              <ArrowDownRight size={14} />
            )}
            {Math.abs(trend)}%
          </span>
        )}
      </div>
      <p className="text-3xl font-black text-slate-900">{value}</p>
      <p className="text-sm text-slate-400 mt-1">{title}</p>
    </div>
  );
}
