// components/dashboard/sidebar.tsx
import Link from "next/link";
import { LayoutDashboard, FileText, Settings, LogOut } from "lucide-react";
import { logout } from "@/lib/action/user-auth/login.action";

export function DashboardSidebar({ user }: { user: any }) {
  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
      <div className="p-6 border-b border-slate-100">
        <h2 className="text-xl font-black tracking-tight">KODEX.</h2>
        <p className="text-xs text-slate-400 mt-1">{user.email}</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        <Link
          href="/dashboard"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
        >
          <LayoutDashboard size={18} />
          Dashboard
        </Link>
        <Link
          href="/dashboard/posts"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
        >
          <FileText size={18} />
          Posts
        </Link>
        <Link
          href="/dashboard/settings"
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
