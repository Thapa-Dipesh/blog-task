import { RegisterForm } from "@/components/site/auth/register-form";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Register | KODEX.",
  description: "Register to your KODEX admin panel.",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-white flex max-w-5xl mx-auto">
      {/* left-side */}
      <div className="hidden lg:flex w-1/2 flex-col justify-center space-y-12 p-12">
        <div className="flex flex-col space-y-8">
          <Link
            href="/admin/login"
            className="flex items-center gap-2 text-slate-400 hover:text-orange-600 transition-colors mb-8"
          >
            <ArrowLeft size={18} />
            <span className="text-sm font-bold uppercase tracking-wider">
              Back to Login
            </span>
          </Link>
          <div>
            <h1 className="text-6xl font-black text-slate-900 tracking-tighter leading-none">
              JOIN THE <br />
              <span className="text-orange-500">COMMUNITY.</span>
            </h1>
            <p className="mt-6 text-xl text-slate-500 leading-relaxed max-w-md">
              Start sharing your stories, connecting with developers, and
              building your digital presence today.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
              <ArrowRight size={20} />
            </div>
            <p className="font-semibold text-slate-700">
              Access to the full dashboard
            </p>
          </div>
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              <ArrowRight size={20} />
            </div>
            <p className="font-semibold text-slate-700">
              Advanced SEO tools for every post
            </p>
          </div>
        </div>
      </div>

      {/* right-side */}
      <RegisterForm />
    </div>
  );
}
