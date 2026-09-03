"use client";

import { useActionState } from "react";
import Link from "next/link";
import { Lock, Mail, Clock, AlertCircle } from "lucide-react";
import { userLogin } from "@/lib/actions/auth.action";
import { GithubIcon } from "@/constants/SocialIcon";
import { useSearchParams } from "next/navigation";

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(userLogin, null);
  const searchParams = useSearchParams();
  const isRegisteredPending = searchParams.get("registered") === "pending";

  return (
    <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-24">
      <div className="max-w-md w-full">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
            Sign In
          </h2>
          <p className="text-slate-500 mt-2">
            New author or admin?{" "}
            <Link
              href="/admin/register"
              className="text-orange-600 font-bold hover:underline"
            >
              Apply for an account
            </Link>
          </p>
        </div>

        {/* Pending Verification Notice */}
        {isRegisteredPending && (
          <div className="mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-medium space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-amber-900">
              <Clock size={16} className="text-amber-600 shrink-0" />
              <span>Application Submitted</span>
            </div>
            <p className="text-amber-700/90 leading-relaxed">
              Your account registration is currently pending review by the Super Admin. You will be able to log in once your account has been approved.
            </p>
          </div>
        )}

        {/* Action Error Message */}
        {state?.error && (
          <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium flex items-start gap-2.5">
            <AlertCircle size={16} className="text-red-500 shrink-0 mt-0.5" />
            <p className="leading-relaxed">{state.error}</p>
          </div>
        )}

        <form action={formAction} className="space-y-6">
          {/* Email Field */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
              Email Address
            </label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-orange-500 transition-colors">
                <Mail size={18} />
              </div>
              <input
                type="email"
                name="email"
                required
                placeholder="hello@example.com"
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-orange-500 focus:bg-white transition-all text-slate-900 text-sm"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <div className="flex justify-between items-end">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                Password
              </label>
            </div>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-orange-500 transition-colors">
                <Lock size={18} />
              </div>
              <input
                type="password"
                name="password"
                required
                placeholder="••••••••"
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-orange-500 focus:bg-white transition-all text-slate-900 text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full flex justify-center items-center py-4 px-4 rounded-2xl text-base font-bold text-white bg-slate-900 hover:bg-slate-800 transition-all duration-200 transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed shadow-xl shadow-slate-200 cursor-pointer"
          >
            {isPending ? "Authenticating..." : "Sign In"}
          </button>

          {/* Divider */}
          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-100"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-4 text-slate-400 font-bold tracking-widest">
                Protected Portal
              </span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center">
            <p className="text-xs text-slate-500">
              Super Admin or Approved Authors &amp; Admins only.
            </p>
          </div>
        </form>

        <p className="mt-10 text-center text-xs text-slate-400 leading-relaxed">
          KODEX Platform Governance &amp; Administration
        </p>
      </div>
    </div>
  );
}
