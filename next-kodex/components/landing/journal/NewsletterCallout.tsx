"use client";

import { useState } from "react";
import { Mail, CheckCircle2, ArrowRight, Sparkles, ShieldCheck } from "lucide-react";

export function NewsletterCallout() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
    }
  };

  return (
    <section className="max-w-6xl mx-auto px-6 mb-24">
      <div className="relative overflow-hidden rounded-4xl bg-slate-950 text-white shadow-2xl border border-slate-800">
        {/* Glow ambient circle */}
        <div className="absolute top-0 right-0 translate-x-12 -translate-y-12 w-96 h-96 bg-orange-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-8 sm:p-12 lg:p-16 relative z-10">
          {/* Left Content (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-wider mb-6">
              <Sparkles size={13} />
              <span>Developer Dispatch</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-4">
              Subscribe to our newsletter to receive our daily news<span className="text-orange-500">.</span>
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8 max-w-xl">
              Curated technical articles, system design breakdowns, and production architectures delivered directly to your inbox every Thursday.
            </p>

            {subscribed ? (
              <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 flex items-center gap-3 text-sm font-bold">
                <CheckCircle2 size={20} className="text-emerald-400 shrink-0" />
                <span>Thanks for joining! We&apos;ve sent a confirmation to your email.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="flex flex-col sm:flex-row gap-3 max-w-lg">
                  <div className="relative flex-1">
                    <Mail
                      size={16}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      required
                      className="w-full pl-11 pr-4 py-3.5 bg-slate-900 border border-slate-700/80 rounded-2xl text-sm text-white placeholder-slate-400 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-3.5 bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold uppercase tracking-wider rounded-2xl transition-all shadow-lg active:scale-95 cursor-pointer shrink-0 flex items-center justify-center gap-2"
                  >
                    <span>Subscribe</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </form>
            )}

            {/* Social Proof */}
            <div className="flex items-center gap-3 mt-8 pt-6 border-t border-slate-800/80 text-xs text-slate-400">
              <div className="flex items-center gap-1 text-emerald-400 font-bold">
                <CheckCircle2 size={15} />
                <span>Join 10,000+ engineers</span>
              </div>
              <span className="text-slate-600">•</span>
              <span>No spam. Unsubscribe anytime.</span>
            </div>
          </div>

          {/* Right Visual Image (5 Cols) */}
          <div className="lg:col-span-5 overflow-hidden rounded-3xl border border-slate-800/80 shadow-xl relative aspect-4/3 lg:aspect-square">
            <img
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80"
              alt="Developer workspace"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-slate-950/60 via-transparent to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
