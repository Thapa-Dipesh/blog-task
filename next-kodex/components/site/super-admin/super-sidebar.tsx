import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  LogOut,
  ShieldCheck,
  Globe,
  PlusCircle,
} from "lucide-react";
import { logout } from "@/lib/actions/auth.action";

export function SuperAdminSidebar({
  user,
  pendingCount = 0,
}: {
  user: { name?: string; email?: string; role?: string };
  pendingCount?: number;
}) {
  return (
    <aside className="w-64 bg-slate-950 text-slate-300 border-r border-slate-800 flex flex-col h-screen sticky top-0 shrink-0">
      {/* Brand Header */}
      <div className="p-6 border-b border-slate-800/80 flex items-center justify-between">
        <div>
          <Link
            href="/"
            className="text-xl font-black tracking-tight text-white flex items-center"
          >
            KODEX<span className="text-amber-500">.</span>
          </Link>
          <div className="flex items-center gap-1.5 mt-1 text-[10px] font-mono uppercase tracking-widest text-amber-400">
            <ShieldCheck size={11} />
            <span>Master Console</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
        <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500">
          Governance & Operations
        </div>

        <Link
          href="/kodex-admin/dashboard"
          className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-bold text-slate-300 hover:bg-slate-900 hover:text-white transition-all group"
        >
          <LayoutDashboard
            size={18}
            className="text-amber-500 group-hover:scale-110 transition-transform"
          />
          <span>Dashboard</span>
        </Link>

        <Link
          href="/kodex-admin/users"
          className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-bold text-slate-300 hover:bg-slate-900 hover:text-white transition-all group"
        >
          <div className="flex items-center gap-3">
            <Users
              size={18}
              className="text-amber-500 group-hover:scale-110 transition-transform"
            />
            <span>User Approvals</span>
          </div>
          {pendingCount > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 text-[10px] font-black">
              {pendingCount}
            </span>
          )}
        </Link>

        <Link
          href="/kodex-admin/blogs"
          className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-bold text-slate-300 hover:bg-slate-900 hover:text-white transition-all group"
        >
          <FileText
            size={18}
            className="text-slate-400 group-hover:text-amber-400 transition-colors"
          />
          <span>All Publications</span>
        </Link>

        <div className="pt-4 pb-1 px-3 text-[10px] font-bold uppercase tracking-wider text-slate-500">
          Content & System
        </div>

        <Link
          href="/admin/blogs/create"
          className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-bold text-slate-300 hover:bg-slate-900 hover:text-white transition-all group"
        >
          <PlusCircle
            size={18}
            className="text-orange-500 group-hover:scale-110 transition-transform"
          />
          <span>Write New Post</span>
        </Link>

        <Link
          href="/kodex-admin/settings"
          className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-bold text-slate-300 hover:bg-slate-900 hover:text-white transition-all group"
        >
          <Settings
            size={18}
            className="text-slate-400 group-hover:text-amber-400 transition-colors"
          />
          <span>Console Settings</span>
        </Link>

        <Link
          href="/"
          className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:bg-slate-900 hover:text-white transition-all"
        >
          <Globe size={18} className="text-slate-500" />
          <span>View Public Feed</span>
        </Link>
      </nav>

      {/* User Info & Log Out */}
      <div className="p-4 border-t border-slate-800/80 bg-slate-950/60">
        <div className="flex items-center gap-3 px-2 mb-3">
          <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center font-bold text-slate-950 text-xs shadow-sm">
            SA
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-bold text-white truncate">
              {user.name || "Super Admin"}
            </div>
            <div className="text-[10px] text-amber-400/90 font-mono truncate">
              Root Authority
            </div>
          </div>
        </div>

        <form action={logout}>
          <button
            type="submit"
            className="flex items-center gap-2.5 px-3 py-2 w-full rounded-xl text-xs font-bold text-slate-400 hover:text-red-400 hover:bg-red-950/30 transition-all cursor-pointer"
          >
            <LogOut size={15} />
            <span>Log Out Console</span>
          </button>
        </form>
      </div>
    </aside>
  );
}
