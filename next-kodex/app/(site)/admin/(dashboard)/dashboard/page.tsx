import { requireAuth } from "@/lib/auth";
import { getDashboardStats } from "@/lib/db/posts";
import { getSuperAdminDashboardStats } from "@/lib/db/admin";
import Link from "next/link";
import {
  FileText,
  Eye,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle,
  Users,
  ShieldCheck,
  UserCheck,
  AlertCircle,
} from "lucide-react";

export default async function DashboardPage() {
  const user = await requireAuth();
  const isSuper = user.role === "SUPER_ADMIN";

  if (isSuper) {
    const superStats = await getSuperAdminDashboardStats();

    return (
      <div className="space-y-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-black text-xs uppercase tracking-wider flex items-center gap-1 border border-amber-200">
                <ShieldCheck size={14} /> Super Admin Control Center
              </span>
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight mt-2">
              Platform Overview
            </h1>
            <p className="text-slate-500 mt-1">
              Welcome back, {user.name}. Here is the platform-wide governance and activity snapshot.
            </p>
          </div>

          <Link
            href="/admin/users"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white text-sm font-bold shadow-lg shadow-amber-200 transition-all active:scale-95 w-fit"
          >
            <Users size={18} />
            Review Pending Users ({superStats.pendingUsers})
          </Link>
        </div>

        {/* Super Admin Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Registered Users"
            value={superStats.totalUsers}
            icon={<Users size={20} />}
            trend={null}
            color="blue"
          />
          <StatCard
            title="Pending Approvals"
            value={superStats.pendingUsers}
            icon={<Clock size={20} />}
            trend={null}
            color={superStats.pendingUsers > 0 ? "amber" : "green"}
          />
          <StatCard
            title="Active Authors / Admins"
            value={superStats.approvedAdmins}
            icon={<UserCheck size={20} />}
            trend={null}
            color="green"
          />
          <StatCard
            title="Total Published Articles"
            value={superStats.totalPosts}
            icon={<FileText size={20} />}
            trend={null}
            color="orange"
          />
        </div>

        {/* Super Admin Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Pending Applications Box */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Clock size={20} className="text-amber-600" />
                Pending Verification Requests
              </h2>
              <Link
                href="/admin/users"
                className="text-sm font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1"
              >
                Manage All <ArrowUpRight size={16} />
              </Link>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
              {superStats.recentPendingUsers.length === 0 ? (
                <div className="p-12 text-center">
                  <CheckCircle size={44} className="mx-auto text-emerald-500 mb-3" />
                  <h3 className="font-bold text-slate-900">All caught up!</h3>
                  <p className="text-slate-400 text-xs mt-1">
                    There are currently no pending registration requests requiring your review.
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {superStats.recentPendingUsers.map((u: any) => (
                    <div
                      key={u.id}
                      className="p-5 flex items-center justify-between gap-4 hover:bg-slate-50/60 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-sm">
                          {u.name?.[0]?.toUpperCase() || "U"}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 text-sm">
                            {u.name}
                          </div>
                          <div className="text-xs text-slate-400">
                            {u.email} · Applied on{" "}
                            {new Date(u.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>

                      <Link
                        href="/admin/users"
                        className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-all shadow-xs"
                      >
                        Review
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Recent Publications Across Platform */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-900">
                  Recent Platform Publications
                </h2>
                <Link
                  href="/admin/blogs"
                  className="text-sm font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1"
                >
                  View All <ArrowUpRight size={16} />
                </Link>
              </div>

              <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm divide-y divide-slate-100">
                {superStats.recentPosts.map((post: any) => (
                  <div
                    key={post.id}
                    className="p-5 flex items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <img
                        src={
                          post.image ||
                          "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80"
                        }
                        alt={post.title}
                        className="w-12 h-12 rounded-xl object-cover border border-slate-100 shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="font-bold text-slate-900 truncate text-sm">
                          {post.title}
                        </div>
                        <div className="text-xs text-slate-400">
                          by {post.author?.name || "Author"} ·{" "}
                          {new Date(post.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>

                    <Link
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      className="p-2 text-slate-400 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-all shrink-0"
                      title="View Article"
                    >
                      <ArrowUpRight size={16} />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Super Admin Quick Actions */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">
                Platform Actions
              </h3>
              <div className="space-y-3">
                <Link
                  href="/admin/users"
                  className="flex items-center gap-3 p-4 rounded-2xl bg-slate-900 text-white hover:bg-slate-800 transition-colors"
                >
                  <Users size={18} className="text-amber-400" />
                  <span className="font-bold text-sm">User Approvals</span>
                </Link>
                <Link
                  href="/admin/blogs/create"
                  className="flex items-center gap-3 p-4 rounded-2xl border border-slate-100 text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <FileText size={18} className="text-orange-600" />
                  <span className="font-bold text-sm">Write Platform Article</span>
                </Link>
                <Link
                  href="/"
                  target="_blank"
                  className="flex items-center gap-3 p-4 rounded-2xl border border-slate-100 text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <TrendingUp size={18} className="text-blue-600" />
                  <span className="font-bold text-sm">View Public Blog Feed</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Regular Admin / Author View
  const stats = await getDashboardStats(user.id);
  const posts = stats.posts;

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          Author Dashboard
        </h1>
        <p className="text-slate-500 mt-1">
          Welcome back, {user.name}! Here is what is happening with your publications.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="My Articles"
          value={stats.totalPosts}
          icon={<FileText size={20} />}
          trend={null}
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
          title="Estimated Reads"
          value={stats.totalViews.toLocaleString()}
          icon={<Eye size={20} />}
          trend={+12.5}
          color="orange"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">Recent Publications</h2>
            <Link
              href="/admin/blogs"
              className="text-sm font-medium text-orange-600 hover:text-orange-700 flex items-center gap-1"
            >
              View all <ArrowUpRight size={16} />
            </Link>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
            {posts.length === 0 ? (
              <div className="p-12 text-center">
                <FileText size={48} className="mx-auto text-slate-200 mb-4" />
                <p className="text-slate-400">No posts yet</p>
                <Link
                  href="/admin/blogs/create"
                  className="text-orange-600 font-medium hover:underline mt-2 inline-block"
                >
                  Create your first post
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-slate-50">
                {posts.map((post: any) => (
                  <div
                    key={post.id}
                    className="p-6 flex items-center gap-4 hover:bg-slate-50/50 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden shrink-0 border border-slate-100">
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
                        <span className="text-green-600 font-medium">Published</span>
                      </p>
                    </div>
                    <Link
                      href={`/admin/blogs/edit/${post.slug}`}
                      className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors shrink-0"
                      title="Edit Post"
                    >
                      <ArrowUpRight size={16} />
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">
              Quick Actions
            </h3>
            <div className="space-y-3">
              <Link
                href="/admin/blogs/create"
                className="flex items-center gap-3 p-4 rounded-2xl bg-slate-900 text-white hover:bg-slate-800 transition-colors"
              >
                <FileText size={18} />
                <span className="font-bold text-sm">Draft New Article</span>
              </Link>
              <Link
                href="/admin/blogs"
                className="flex items-center gap-3 p-4 rounded-2xl border border-slate-100 text-slate-600 hover:bg-slate-50 transition-colors"
              >
                <TrendingUp size={18} />
                <span className="font-bold text-sm">Manage My Articles</span>
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
    green: "bg-emerald-50 text-emerald-600",
    amber: "bg-amber-50 text-amber-600",
    orange: "bg-orange-50 text-orange-600",
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-2xl ${colorMap[color]}`}>{icon}</div>
        {trend !== null && (
          <span
            className={`flex items-center gap-1 text-xs font-bold ${
              trend >= 0 ? "text-emerald-600" : "text-red-600"
            }`}
          >
            {trend >= 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
            {Math.abs(trend)}%
          </span>
        )}
      </div>
      <p className="text-3xl font-black text-slate-900">{value}</p>
      <p className="text-xs font-medium text-slate-400 mt-1">{title}</p>
    </div>
  );
}
