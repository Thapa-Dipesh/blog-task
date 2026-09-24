"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUp, Mail, CheckCircle2, ShieldCheck, Heart } from "lucide-react";
import { LinkedinIcon, TwitterIcon } from "@/constants/SocialIcon";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 pt-16 pb-12">
      <div className="max-w-6xl mx-auto px-6">
        {/* Top 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-slate-800">
          {/* Col 1: Brand & Bio (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link
              href="/"
              className="text-2xl font-black tracking-tighter text-white flex items-center"
            >
              KODEX<span className="text-orange-500">.</span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              A specialized publication of technical insights, creative logic, and production architectures for the next generation of software engineers.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <TwitterIcon size={16} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedinIcon size={16} />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Directory (4 cols) */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4 font-mono">
                Explore
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-400 font-medium">
                <li>
                  <Link href="/#articles-feed" className="hover:text-orange-400 transition-colors">
                    Articles Feed
                  </Link>
                </li>
                <li>
                  <Link href="/tag/architecture" className="hover:text-orange-400 transition-colors">
                    Architecture
                  </Link>
                </li>
                <li>
                  <Link href="/tag/nextjs" className="hover:text-orange-400 transition-colors">
                    Next.js Deep Dives
                  </Link>
                </li>
                <li>
                  <Link href="/tag/devops" className="hover:text-orange-400 transition-colors">
                    DevOps & Cloud
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4 font-mono">
                Portals
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-400 font-medium">
                <li>
                  <Link href="/admin/login" className="hover:text-orange-400 transition-colors">
                    Author Portal
                  </Link>
                </li>
                <li>
                  <Link href="/admin/register" className="hover:text-orange-400 transition-colors">
                    Author Sign Up
                  </Link>
                </li>
                <li>
                  <Link
                    href="/kodex-admin/login"
                    className="hover:text-amber-400 text-amber-400/90 font-bold transition-colors flex items-center gap-1"
                  >
                    <ShieldCheck size={13} />
                    <span>Master Console</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Col 3: Quick Subscribe Card (4 cols) */}
          <div className="lg:col-span-4 p-6 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-orange-400 mb-2">
                <Mail size={14} />
                <span>Weekly Newsletter</span>
              </div>
              <h4 className="text-sm font-bold text-white mb-2">
                Get new articles before anyone else
              </h4>
              <p className="text-[11px] text-slate-400 leading-relaxed mb-4">
                Join our developer circle for architectural breakdowns.
              </p>
            </div>

            {subscribed ? (
              <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                <span>Subscribed! Check your inbox.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@email.com"
                  required
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 outline-none focus:border-orange-500 transition-colors"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  Subscribe Free
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <span>© {new Date().getFullYear()} KODEX. Crafted with Next.js & PostgreSQL.</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition-colors cursor-pointer group"
          >
            <span>Back to top</span>
            <span className="p-1 rounded-lg bg-slate-900 border border-slate-800 group-hover:-translate-y-0.5 transition-transform">
              <ArrowUp size={12} />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
