import React, { useState } from "react";
import { User, Mail, Lock, ArrowRight, Github } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useRegisterMutation } from "../features/api/authApi";

const RegisterUser = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(formData).unwrap();
      toast.success("User Registered Successfully!");
      navigate("/login");
    } catch (err: any) {
      toast.error(err.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <title>Register | KODEX</title>
      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Column: Visual/Marketing */}
        <div className="hidden lg:flex flex-col space-y-8">
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

        {/* Right Column: The Form */}
        <div className="bg-white lg:border border-slate-100 lg:shadow-2xl lg:shadow-slate-200/50 rounded-[2.5rem] p-8 lg:p-12">
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-3xl font-bold text-slate-900">
              Create account
            </h2>
            <p className="text-slate-500 mt-2">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-orange-600 font-bold hover:underline"
              >
                Login here
              </Link>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
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
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-orange-500 focus:bg-white transition-all text-slate-900"
                />
              </div>
            </div>

            {/* Email Address */}
            <div className="relative">
              <label className="text-xs font-bold text-slate-400 uppercase ml-1 mb-2 block">
                Email Address
              </label>
              <div className="relative group">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-orange-500 transition-colors"
                  size={20}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="hello@example.com"
                  required
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-orange-500 focus:bg-white transition-all text-slate-900"
                />
              </div>
            </div>

            {/* Password */}

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
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-orange-500 focus:bg-white transition-all text-slate-900"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-slate-900 text-white font-bold py-5 rounded-2xl mt-4 hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 active:scale-[0.98] cursor-pointer"
            >
              {isLoading ? "Creating..." : "Create Account"}
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
              <Github size={20} /> Github
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterUser;
