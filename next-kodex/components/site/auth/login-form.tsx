"use client";

import { useActionState } from "react";
import Link from "next/link";
import { Lock, Mail } from "lucide-react";
import { userLogin } from "@/lib/action/user-auth/login.action";
import { GithubIcon } from "@/constants/SocialIcon";

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(userLogin, null);

  return (
    <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-24">
      <div className="max-w-md w-full">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
            Sign In
          </h2>
          <p className="text-slate-500 mt-2">
            New here?{" "}
            <Link
              href="/admin/register"
              className="text-orange-600 font-bold hover:underline"
            >
              Create an account
            </Link>
          </p>
        </div>

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
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-orange-500 focus:bg-white transition-all text-slate-900"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <div className="flex justify-between items-end">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                Password
              </label>
              <a
                href="#"
                className="text-xs font-bold text-orange-600 hover:text-orange-700"
              >
                Forgot?
              </a>
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
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-orange-500 focus:bg-white transition-all text-slate-900"
              />
            </div>
          </div>

          {/* Error Message */}
          {state?.error && (
            <p className="text-sm text-red-600 font-medium">{state.error}</p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full flex justify-center items-center py-4 px-4 rounded-2xl text-base font-bold text-white bg-slate-900 hover:bg-slate-800 transition-all duration-200 transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed shadow-xl shadow-slate-200 cursor-pointer"
          >
            {isPending ? "Signing in..." : "Sign In"}
          </button>

          {/* Divider */}
          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-100"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-4 text-slate-400 font-bold tracking-widest">
                Or continue with
              </span>
            </div>
          </div>

          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 border border-slate-100 py-4 rounded-2xl text-slate-600 font-bold hover:bg-slate-50 transition-all active:scale-[0.99]"
          >
            <GithubIcon size={20} />
            <span>Github</span>
          </button>
        </form>

        <p className="mt-10 text-center text-xs text-slate-400 leading-relaxed">
          By signing in, you agree to our <br />
          <a href="#" className="underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="underline">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
}
