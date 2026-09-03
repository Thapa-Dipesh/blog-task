"use client";

import { useActionState, useRef, useEffect } from "react";
import { changePassword } from "@/lib/actions/user.action";
import { KeyRound, Lock, CheckCircle, AlertCircle, ShieldAlert } from "lucide-react";

export function PasswordForm() {
  const [state, formAction, isPending] = useActionState(changePassword, null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.success && formRef.current) {
      formRef.current.reset();
    }
  }, [state]);

  return (
    <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm space-y-6">
      <div>
        <h3 className="text-xl font-bold text-slate-900">Security &amp; Password</h3>
        <p className="text-slate-500 text-xs mt-1">
          Ensure your account stays secure by using a strong password.
        </p>
      </div>

      {state?.success && (
        <div className="flex items-center gap-2 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
          <CheckCircle size={16} />
          <span>{state.message}</span>
        </div>
      )}

      {state?.error && (
        <div className="flex items-center gap-2 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
          <AlertCircle size={16} />
          <span>{state.error}</span>
        </div>
      )}

      <form ref={formRef} action={formAction} className="space-y-4">
        {/* Current Password */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
            Current Password
          </label>
          <div className="relative">
            <Lock
              size={17}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="password"
              name="currentPassword"
              required
              placeholder="••••••••"
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-900 outline-none focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all font-medium"
            />
          </div>
        </div>

        {/* New Password */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
            New Password (Min 6 chars)
          </label>
          <div className="relative">
            <KeyRound
              size={17}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="password"
              name="newPassword"
              required
              placeholder="••••••••"
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-900 outline-none focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all font-medium"
            />
          </div>
        </div>

        {/* Confirm New Password */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
            Confirm New Password
          </label>
          <div className="relative">
            <KeyRound
              size={17}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="password"
              name="confirmPassword"
              required
              placeholder="••••••••"
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-900 outline-none focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all font-medium"
            />
          </div>
        </div>

        <div className="pt-3 flex justify-end">
          <button
            type="submit"
            disabled={isPending}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-orange-600 text-white text-xs font-bold hover:bg-orange-700 transition-all shadow-md active:scale-95 disabled:opacity-50 cursor-pointer"
          >
            <ShieldAlert size={14} />
            <span>{isPending ? "Updating Password..." : "Update Password"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
