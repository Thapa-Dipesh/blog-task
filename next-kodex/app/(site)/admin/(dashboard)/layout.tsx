import Link from "next/link";
import { requireAuth } from "@/lib/auth";
import {
  LayoutDashboard,
  FileText,
  PlusCircle,
  Settings,
  LogOut,
  Users,
  ShieldCheck,
} from "lucide-react";
import { logout } from "@/lib/actions/auth.action";
import { getPendingUsersCount } from "@/lib/db/admin";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireAuth();
  const isSuper = user.role === "SUPER_ADMIN";
  const pendingCount = isSuper ? await getPendingUsersCount() : 0;

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col sticky top-0 h-screen shrink-0">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <Link
            href="/"
            className="text-xl font-black tracking-tight text-slate-900"
          >
            KODEX<span className="text-orange-600">.</span>
          </Link>
          {isSuper && (
            <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 text-[10px] font-black uppercase tracking-wider border border-amber-200">
              Super Admin
            </span>
          )}
        </div>

        <div className="p-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-white font-bold text-sm shadow-xs ${
              isSuper ? "bg-amber-600" : "bg-slate-900"
            }`}>
              {user.name?.[0]?.toUpperCase() || "U"}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-slate-900 truncate">
                {user.name}
              </p>
              <p className="text-xs text-slate-400 truncate">{user.email}</p>
            </div>
          </div>
          <div className="mt-2.5 flex items-center gap-2">
            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
              isSuper
                ? "bg-amber-50 text-amber-700 border border-amber-200/60"
                : "bg-orange-50 text-orange-600 border border-orange-100"
            }`}>
              {isSuper && <ShieldCheck size={11} />}
              {user.role}
            </span>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          <Link
            href="/admin/dashboard"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
          >
            <LayoutDashboard size={18} />
            Dashboard
          </Link>

          {/* Super Admin Exclusive Tab */}
          {isSuper && (
            <Link
              href="/admin/users"
              className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold text-slate-700 hover:bg-amber-50/70 hover:text-amber-900 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <Users size={18} className="text-amber-600" />
                <span>User Approvals</span>
              </div>
              {pendingCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-amber-500 text-white text-[10px] flex items-center justify-center font-bold animate-pulse">
                  {pendingCount}
                </span>
              )}
            </Link>
          )}

          <Link
            href="/admin/blogs"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
          >
            <FileText size={18} />
            {isSuper ? "All Publications" : "My Posts"}
          </Link>

          <Link
            href="/admin/blogs/create"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
          >
            <PlusCircle size={18} className="text-orange-600" />
            Write Post
          </Link>

          <Link
            href="/admin/settings"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
          >
            <Settings size={18} />
            Settings
          </Link>
        </nav>

        <div className="p-3 border-t border-slate-100">
          <form action={logout}>
            <button
              type="submit"
              className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-sm font-medium text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
            >
              <LogOut size={18} />
              Log Out
            </button>
          </form>
        </div>
      </aside>

      <main className="flex-1 p-8 overflow-x-auto">{children}</main>
    </div>
  );
}
