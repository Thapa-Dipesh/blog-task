"use client";

import { useActionState } from "react";
import { updateProfile } from "@/lib/actions/user.action";
import { Save, User, Mail, ShieldCheck, CheckCircle, AlertCircle } from "lucide-react";

interface ProfileFormProps {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

export function ProfileForm({ user }: ProfileFormProps) {
  const [state, formAction, isPending] = useActionState(updateProfile, null);

  return (
    <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm space-y-6">
      <div>
        <h3 className="text-xl font-bold text-slate-900">Profile Information</h3>
        <p className="text-slate-500 text-xs mt-1">
          Update your public display name and review account details.
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

      <form action={formAction} className="space-y-5">
        {/* Name Field */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
            Display Name
          </label>
          <div className="relative">
            <User
              size={17}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              name="name"
              defaultValue={user.name}
              required
              placeholder="Your full name"
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-900 outline-none focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all font-medium"
            />
          </div>
        </div>

        {/* Email Field (Read Only) */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
            Email Address (Registered)
          </label>
          <div className="relative">
            <Mail
              size={17}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="email"
              value={user.email}
              disabled
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-100 border border-slate-200 text-sm text-slate-500 cursor-not-allowed font-medium"
            />
          </div>
          <p className="text-[11px] text-slate-400 pl-1">
            Email address is tied to your account login.
          </p>
        </div>

        {/* Role Badge */}
        <div className="pt-2 flex items-center justify-between border-t border-slate-100">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
            <ShieldCheck size={16} className="text-orange-600" />
            <span>Account Role:</span>
            <span className="px-2.5 py-0.5 rounded-full bg-orange-50 text-orange-600 font-bold text-[10px] uppercase tracking-wider border border-orange-100">
              {user.role}
            </span>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-all shadow-md active:scale-95 disabled:opacity-50 cursor-pointer"
          >
            <Save size={14} />
            <span>{isPending ? "Saving..." : "Save Profile"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
