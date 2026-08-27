"use client";

import { useActionState } from "react";
import Link from "next/link";
import { Lock, Mail, User } from "lucide-react";
import { userRegister } from "@/lib/actions/auth.action";
import { GithubIcon } from "@/constants/SocialIcon";

export function RegisterForm() {
  const [state, formAction, isPending] = useActionState(userRegister, null);

  return (
    <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-24">
      <div className="max-w-md w-full">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-slate-900">Create account</h2>
          <p className="text-slate-500 mt-2">
            Already have an account?{" "}
            <Link
              href="/admin/login"
              className="text-orange-600 font-bold hover:underline"
            >
              Login here
            </Link>
          </p>
        </div>

        <form action={formAction} className="space-y-6">
          {/* Full Name */}
          <div className="relative">
            <label className="text-xs font-bold text-slate-400 uppercase ml-1 mb-2 block">
              Full Name
            </label>
            <div className="relative group">
              <User
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-orange-500 transition-colors"
                size={20}
              />
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                required
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-orange-500 focus:bg-white transition-all text-slate-900"
              />
            </div>
          </div>

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
          <div className="relative">
            <label className="text-xs font-bold text-slate-400 uppercase ml-1 mb-2 block">
              Password
            </label>
            <div className="relative group">
              <Lock
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-orange-500 transition-colors"
                size={18}
              />
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                required
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
            className="w-full bg-slate-900 text-white font-bold py-5 rounded-2xl mt-4 hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 active:scale-[0.98] cursor-pointer"
          >
            {isPending ? "Creating..." : "Create Account"}
          </button>

          {/* Social Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-100"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-slate-400 font-bold">
                Or register with
              </span>
            </div>
          </div>

          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 border border-slate-100 py-4 rounded-2xl text-slate-600 font-semibold hover:bg-slate-50 transition-colors"
          >
            <GithubIcon size={20} /> Github
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
