"use client";

import { useActionState } from "react";
import { superAdminLogin } from "@/lib/actions/auth.action";
import { ShieldCheck, Lock, Mail, ArrowRight, Loader2, KeyRound } from "lucide-react";
import Link from "next/link";

export default function SuperAdminLoginForm() {
  const [state, formAction, isPending] = useActionState(superAdminLogin, null);

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Header Card */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-linear-to-tr from-amber-600 to-orange-500 text-white shadow-lg shadow-amber-500/20 mb-4">
          <ShieldCheck size={32} />
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold uppercase tracking-wider mb-2">
          <KeyRound size={12} />
          <span>Root Master Console</span>
        </div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          Super Admin Access
        </h1>
        <p className="text-sm text-slate-500 mt-2">
          Enter root system administrator credentials to govern users and platform operations.
        </p>
      </div>

      {/* Form Container */}
      <div className="bg-white rounded-3xl border border-amber-200/80 p-8 shadow-xl shadow-amber-950/5 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-linear-to-r from-amber-500 via-orange-500 to-amber-600" />

        {state?.error && (
          <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium flex items-start gap-2.5">
            <span className="font-bold shrink-0">⚠️ Error:</span>
            <span>{state.error}</span>
          </div>
        )}

        <form action={formAction} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Super Admin Email
            </label>
            <div className="relative">
              <Mail
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="email"
                name="email"
                required
                placeholder="superadmin@kodex.com"
                defaultValue={process.env.NEXT_PUBLIC_DEFAULT_SUPER_EMAIL || "superadmin@kodex.com"}
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-900 placeholder-slate-400 outline-none focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all font-mono"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Master Secret Password
              </label>
            </div>
            <div className="relative">
              <Lock
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="password"
                name="password"
                required
                placeholder="••••••••••••"
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-900 placeholder-slate-400 outline-none focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all font-mono"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full py-3.5 px-4 bg-linear-to-r from-slate-900 to-slate-800 hover:from-black hover:to-slate-900 text-white text-xs font-bold uppercase tracking-wider rounded-2xl transition-all shadow-md shadow-slate-900/10 active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed mt-2"
          >
            {isPending ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Authenticating Master Keys...</span>
              </>
            ) : (
              <>
                <span>Enter Master Console</span>
                <ArrowRight size={14} />
              </>
            )}
          </button>
        </form>

        {/* Regular author login switch */}
        <div className="mt-8 pt-6 border-t border-slate-100 text-center">
          <p className="text-xs text-slate-400">
            Are you a standard blog author or editor?
          </p>
          <Link
            href="/admin/login"
            className="mt-1.5 inline-block text-xs font-bold text-amber-700 hover:text-amber-900 hover:underline"
          >
            Go to Author Login Portal →
          </Link>
        </div>
      </div>
    </div>
  );
}
