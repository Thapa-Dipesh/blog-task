import { requireSuperAdmin } from "@/lib/auth";
import { getSuperAdminDashboardStats } from "@/lib/db/admin";
import Link from "next/link";
import {
  FileText,
  Users,
  ShieldCheck,
  UserCheck,
  Clock,
  ArrowUpRight,
  CheckCircle,
  AlertCircle,
  KeyRound,
  Sparkles,
} from "lucide-react";
import { approveUser, rejectUser } from "@/lib/actions/admin.action";

export default async function SuperAdminDashboardPage() {
  const user = await requireSuperAdmin();
  const superStats = await getSuperAdminDashboardStats();

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-black text-xs uppercase tracking-wider flex items-center gap-1.5 border border-amber-200">
              <KeyRound size={13} className="text-amber-700" />
              <span>Root Master Console</span>
            </span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight mt-2">
            Platform Governance
          </h1>
          <p className="text-slate-500 mt-1">
            Logged in as <strong className="text-slate-900">{user.name}</strong> ({user.email}). High-level system overview and author verification queue.
          </p>
        </div>

        <Link
          href="/kodex-admin/users"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white text-sm font-bold shadow-lg shadow-amber-600/20 transition-all active:scale-95 w-fit"
        >
          <Users size={18} />
          <span>Review Pending Applicants ({superStats.pendingUsers})</span>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Registered Users"
          value={superStats.totalUsers}
          icon={<Users size={20} />}
          color="blue"
        />
        <StatCard
          title="Pending Approvals"
          value={superStats.pendingUsers}
          icon={<Clock size={20} />}
          color={superStats.pendingUsers > 0 ? "amber" : "green"}
        />
        <StatCard
          title="Active Authors / Admins"
          value={superStats.approvedAdmins}
          icon={<UserCheck size={20} />}
          color="green"
        />
        <StatCard
          title="Total Published Articles"
          value={superStats.totalPosts}
          icon={<FileText size={20} />}
          color="orange"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Pending Applications Review Box */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Clock size={20} className="text-amber-600" />
              <span>Pending Author Verifications</span>
            </h2>
            <Link
              href="/kodex-admin/users"
              className="text-sm font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1"
            >
              <span>Manage All Users</span>
              <ArrowUpRight size={16} />
            </Link>
          </div>

          {superStats.recentPendingUsers.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-3xl border border-slate-200">
              <CheckCircle className="mx-auto text-emerald-500 mb-3" size={36} />
              <h3 className="text-base font-bold text-slate-800">
                All Applications Reviewed
              </h3>
              <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                There are no applicant registrations awaiting Super Admin approval at this time.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {superStats.recentPendingUsers.map((pendingUser: any) => (
                <div
                  key={pendingUser.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-white rounded-3xl border border-amber-200/80 shadow-xs hover:border-amber-300 transition-all"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-800 font-bold flex items-center justify-center text-sm">
                      {pendingUser.name[0]?.toUpperCase()}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900">
                        {pendingUser.name}
                      </div>
                      <div className="text-xs text-slate-500 font-mono">
                        {pendingUser.email}
                      </div>
                      <div className="text-[10px] text-amber-700 mt-0.5">
                        Applied on{" "}
                        {new Date(pendingUser.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <form
                      action={async () => {
                        "use server";
                        await approveUser(pendingUser.id);
                      }}
                    >
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-sm active:scale-95 cursor-pointer"
                      >
                        Approve Access
                      </button>
                    </form>
                    <form
                      action={async () => {
                        "use server";
                        await rejectUser(pendingUser.id);
                      }}
                    >
                      <button
                        type="submit"
                        className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-red-50 hover:text-red-700 text-slate-600 text-xs font-semibold transition-all cursor-pointer"
                      >
                        Reject
                      </button>
                    </form>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Quick Platform Actions */}
          <div className="pt-6">
            <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-4">
              Master Controls
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link
                href="/kodex-admin/users"
                className="p-5 rounded-3xl bg-white border border-slate-200 hover:border-amber-300 hover:shadow-md transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-amber-50 text-amber-700 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                    <Users size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">
                      User Management
                    </h4>
                    <p className="text-xs text-slate-400">
                      Approve, suspend, or delete accounts
                    </p>
                  </div>
                </div>
              </Link>

              <Link
                href="/kodex-admin/blogs"
                className="p-5 rounded-3xl bg-white border border-slate-200 hover:border-amber-300 hover:shadow-md transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-blue-50 text-blue-700 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <FileText size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">
                      All Publications
                    </h4>
                    <p className="text-xs text-slate-400">
                      Moderate and curate platform content
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* System & Super Admin Info Sidebar */}
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-linear-to-br from-slate-900 to-slate-950 text-white border border-slate-800 shadow-xl">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
              <ShieldCheck size={16} />
              <span>Authority Snapshot</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              Super Administrator
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              You are authenticated with root administrative credentials configured via environment variables. Your permissions supersede all individual author boundaries.
            </p>

            <div className="mt-6 pt-6 border-t border-slate-800/80 space-y-3 text-xs">
              <div className="flex items-center justify-between text-slate-400">
                <span>Auth Source:</span>
                <span className="font-mono text-amber-400 font-bold">.env Config</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>Database Status:</span>
                <span className="font-mono text-emerald-400 font-bold">APPROVED (Root)</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>Post Governance:</span>
                <span className="font-mono text-white font-bold">Unrestricted</span>
              </div>
            </div>
          </div>

          {/* Quick Stats Summary */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200">
            <h4 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Sparkles size={16} className="text-amber-600" />
              <span>Platform Health</span>
            </h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between text-slate-600">
                <span>Approval Rate:</span>
                <span className="font-bold text-slate-900">
                  {superStats.totalUsers > 0
                    ? `${Math.round((superStats.approvedAdmins / superStats.totalUsers) * 100)}%`
                    : "100%"}
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span>Avg Articles / Author:</span>
                <span className="font-bold text-slate-900">
                  {superStats.approvedAdmins > 0
                    ? (superStats.totalPosts / superStats.approvedAdmins).toFixed(1)
                    : "0"}
                </span>
              </div>
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
  color?: "blue" | "amber" | "green" | "orange";
}) {
  const colorMap = {
    blue: "bg-blue-50 text-blue-700 border-blue-100",
    amber: "bg-amber-50 text-amber-700 border-amber-200",
    green: "bg-emerald-50 text-emerald-700 border-emerald-100",
    orange: "bg-orange-50 text-orange-700 border-orange-100",
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
