import { LoginForm } from "@/components/site/auth/login-form";
import { ArrowLeft, ArrowRight, ShieldCheck } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Login | KODEX.",
  description: "Sign in to your KODEX admin panel.",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-white flex max-w-5xl mx-auto">
      {/* left-side */}
      <div className="hidden lg:flex w-1/2 flex-col justify-center space-y-12 p-12">
        <div className="flex flex-col space-y-8">
          <Link
            href="/"
            className="flex items-center gap-2 text-slate-400 hover:text-orange-600 transition-colors mb-8"
          >
            <ArrowLeft size={18} />
            <span className="text-sm font-bold uppercase tracking-wider">
              Back to site
            </span>
          </Link>

          <div>
            <h1 className="text-6xl font-black text-slate-900 tracking-tighter leading-none">
              WELCOME <br />
              <span className="text-orange-500">BACK.</span>
            </h1>
            <p className="mt-6 text-xl text-slate-500 leading-relaxed max-w-md">
              Log in to your admin panel to manage your content, view analytics,
              and grow your digital presence.
            </p>
          </div>
        </div>

        <div className="space-y-4 max-w-md">
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm">
            <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 shrink-0">
              <ShieldCheck size={20} />
            </div>
            <div>
              <p className="font-bold text-slate-800 text-sm">Secure Session</p>
              <p className="text-xs text-slate-500">
                Verified end-to-end encryption
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm">
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
              <ArrowRight size={20} />
            </div>
            <div>
              <p className="font-bold text-slate-800 text-sm">Direct Access</p>
              <p className="text-xs text-slate-500">
                Quick link to your latest drafts
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* right-side */}
      <LoginForm />
    </div>
  );
}
