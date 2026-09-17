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
        {isSuper && (
          <Link
            href="/kodex-admin/dashboard"
            className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold bg-amber-50 text-amber-900 border border-amber-200 hover:bg-amber-100 transition-colors mb-2"
          >
            <ShieldCheck size={16} className="text-amber-700 shrink-0" />
            <span>Switch to Master Console</span>
          </Link>
        )}

        <Link
          href="/admin/dashboard"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
        >
          <LayoutDashboard size={18} />
          Dashboard
        </Link>

        <Link
          href="/admin/blogs"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
        >
          <FileText size={18} />
          My Articles
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
