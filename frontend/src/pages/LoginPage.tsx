import React, { useState } from "react";
import { useLoginMutation } from "../features/api/authApi";
import { useNavigate, useLocation, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/app/authSlice";
import {
  Lock,
  Mail,
  Github,
  ArrowLeft,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [login, { isLoading }] = useLoginMutation();

  // Redirect logic: Go where the user intended or default to /my-blogs
  const from = location.state?.from?.pathname || "/my-blogs";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const userData = await login({ email, password }).unwrap();
      dispatch(setCredentials(userData));
      toast.success("Welcome back!");
      navigate(from, { replace: true });
    } catch (err: any) {
      toast.error(err.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-white flex max-w-5xl mx-auto">
      <title>Login | KODEX</title>
      {/* left-side */}
      <div className="hidden lg:flex w-1/2 flex-col justify-center space-y-12 p-12">
        <div className="hidden lg:flex flex-col space-y-8">
          <Link
            to="/"
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
          {/* Feature 1 */}
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

          {/* Feature 2 */}
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

        <p className="text-xs font-bold text-slate-300 uppercase tracking-[0.2em]">
          Growssence Admin Portal v2.0
        </p>
      </div>

      {/* Right Side: Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-24">
        <div className="max-w-md w-full">
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
              Sign In
            </h2>
            <p className="text-slate-500 mt-2">
              New here?{" "}
              <Link
                to="/signup"
                className="text-orange-600 font-bold hover:underline"
              >
                Create an account
              </Link>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
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
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-orange-500 focus:bg-white transition-all text-slate-900"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center py-4 px-4 rounded-2xl text-base font-bold text-white bg-slate-900 hover:bg-slate-800 transition-all duration-200 transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed shadow-xl shadow-slate-200 cursor-pointer"
            >
              {isLoading ? "Signing in..." : "Sign In"}
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
              <Github size={20} />
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
    </div>
  );
};

export default LoginPage;
