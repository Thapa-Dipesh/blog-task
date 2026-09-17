import Link from "next/link";
import { getSession } from "@/lib/auth";
import { logout } from "@/lib/actions/auth.action";
import { PlusCircle, LayoutDashboard, LogIn, LogOut, ShieldCheck, Users } from "lucide-react";
import SearchTrigger from "@/components/site/search/search-trigger";

export default async function Navbar() {
  const user = await getSession();
  const isSuper = user?.role === "SUPER_ADMIN";

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 h-16">
        {/* Logo / Brand */}
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="text-2xl font-black tracking-tighter text-slate-900 group flex items-center"
          >
            KODEX
            <span className="text-orange-600 group-hover:scale-125 transition-transform duration-200">
              .
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors"
            >
              Feed
            </Link>

            {user && (
              <>
                <Link
                  href="/admin/blogs/create"
                  className="text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors flex items-center gap-1.5"
                >
                  <PlusCircle size={15} className="text-orange-600" />
                  Write Post
                </Link>
                <Link
                  href="/admin/blogs"
                  className="text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors"
                >
                  {isSuper ? "All Publications" : "My Articles"}
                </Link>
                {isSuper && (
                  <Link
                    href="/admin/users"
                    className="text-sm font-bold text-amber-700 hover:text-amber-900 transition-colors flex items-center gap-1"
                  >
                    <Users size={15} className="text-amber-600" />
                    User Approvals
                  </Link>
                )}
              </>
            )}
          </div>
        </div>

        {/* User / Actions */}
        <div className="flex items-center gap-3">
          <SearchTrigger />

          {user ? (
            <div className="flex items-center gap-3">
              <Link
                href="/admin/dashboard"
                className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${
                  isSuper
                    ? "bg-amber-100 text-amber-900 hover:bg-amber-200 border border-amber-200"
                    : "bg-slate-100 text-slate-800 hover:bg-slate-200"
                }`}
              >
                {isSuper ? (
                  <ShieldCheck size={14} className="text-amber-700" />
                ) : (
                  <LayoutDashboard size={14} className="text-slate-600" />
                )}
                <span>{user.name.split(" ")[0]}</span>
              </Link>

              <form action={logout}>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-slate-800 transition-all duration-200 active:scale-95 cursor-pointer"
                >
                  <LogOut size={13} />
                  <span>Log Out</span>
                </button>
              </form>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/admin/login"
                className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-5 py-2 text-xs font-bold text-white shadow-sm hover:bg-slate-800 transition-all duration-200 active:scale-95"
              >
                <LogIn size={13} />
                <span>Portal Login</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
