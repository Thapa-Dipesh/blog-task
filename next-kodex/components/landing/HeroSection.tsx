"use client";

import { ArrowDown, Code2, Cpu, Globe } from "lucide-react";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center items-center px-6 overflow-hidden border-b border-slate-200">
      <title>Home | KODEX</title>
      {/* Abstract Background Elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-50 -z-10 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-slate-50 rounded-full blur-3xl opacity-50 -z-10"></div>

      <div className="max-w-4xl text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 text-[10px] font-black uppercase tracking-[0.2em] text-white mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
          </span>
          System Status: Online
        </div>

        <h1 className="text-7xl md:text-8xl font-black tracking-[ -0.05em] text-slate-900 leading-[0.85] mb-8">
          KODEX<span className="text-orange-600">.</span> <br />
          <span className="text-slate-300">ARCHIVES</span>
        </h1>

        <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-500 font-medium leading-relaxed mb-10">
          A specialized collection of technical insights, creative logic, and
          architectural patterns for the next generation of web engineers.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/#blog-feed"
            aria-label="Click to explore the blog feed"
            className="px-8 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all active:scale-95 shadow-xl shadow-slate-200 cursor-pointer"
          >
            Explore Feed
          </Link>
          <div className="flex items-center gap-6 px-8 py-4 border border-slate-100 rounded-2xl text-slate-400">
            <Code2 size={20} />
            <Cpu size={20} />
            <Globe size={20} />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 animate-bounce text-slate-300">
        <ArrowDown size={24} />
      </div>
    </section>
  );
};

export default HeroSection;
