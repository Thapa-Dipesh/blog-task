import Link from "next/link";
import { LayoutDashboard, FileText, PlusCircle, Settings, LogOut, Users, ShieldCheck } from "lucide-react";
import { logout } from "@/lib/actions/auth.action";

export function DashboardSidebar({
  user,
  pendingCount = 0,
}: {
  user: { name?: string; email?: string; role?: string };
  pendingCount?: number;
}) {
  const isSuper = user?.role === "SUPER_ADMIN";

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col h-screen sticky top-0 shrink-0">
      <div className="p-6 border-b border-slate-100 flex items-center justify-between">
        <h2 className="text-xl font-black tracking-tight text-slate-900">
          KODEX<span className="text-orange-600">.</span>
        </h2>
        {isSuper && (
          <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 text-[10px] font-black uppercase tracking-wider border border-amber-200">
            Super Admin
          </span>
        )}
      </div>

      <nav className="flex-1 p-4 space-y-1">
        <Link
          href="/admin/dashboard"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
        >
          <LayoutDashboard size={18} />
          Dashboard
        </Link>

        {isSuper && (
          <Link
            href="/admin/users"
            className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold text-slate-700 hover:bg-amber-50/70 hover:text-amber-900 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Users size={18} className="text-amber-600" />
              <span>User Approvals</span>
            </div>
            {pendingCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-amber-500 text-white text-[10px] flex items-center justify-center font-bold">
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

      <div className="p-4 border-t border-slate-100">
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
  );
}
