"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  ArrowRight,
  Sparkles,
  Tag,
} from "lucide-react";

interface HeroPost {
  id: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  createdAt: Date | string;
  keywords?: string | null;
  author?: {
    name: string;
  } | null;
}

export function JournalHeroSlider({ posts }: { posts: HeroPost[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const featuredPosts = posts.length > 0 ? posts.slice(0, 4) : [];

  const handleNext = useCallback(() => {
    if (featuredPosts.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % featuredPosts.length);
  }, [featuredPosts.length]);

  const handlePrev = useCallback(() => {
    if (featuredPosts.length === 0) return;
    setCurrentIndex(
      (prev) => (prev - 1 + featuredPosts.length) % featuredPosts.length
    );
  }, [featuredPosts.length]);

  // Autoplay interval
  useEffect(() => {
    if (isPaused || featuredPosts.length <= 1) return;
    const interval = setInterval(handleNext, 6500);
    return () => clearInterval(interval);
  }, [isPaused, handleNext, featuredPosts.length]);

  if (featuredPosts.length === 0) {
    return null;
  }

  const current = featuredPosts[currentIndex];
  const cleanExcerpt = (current.description || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const wordsCount = cleanExcerpt ? cleanExcerpt.split(/\s+/).length : 0;
  const readingTime = Math.max(1, Math.ceil(wordsCount / 180));
  const primaryTag = current.keywords
    ? current.keywords.split(",")[0]?.trim()
    : "Architecture";

  return (
    <section
      className="relative w-full overflow-hidden bg-slate-950 text-white min-h-[580px] lg:min-h-[660px] flex items-end justify-center"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Image Carousel with Smooth Fade Transitions */}
      {featuredPosts.map((post, idx) => {
        const isActive = idx === currentIndex;
        return (
          <div
            key={post.id || idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"
            }`}
            style={{ transitionProperty: "opacity, transform" }}
          >
            <img
              src={
                post.image ||
                "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=2000&q=80"
              }
              alt={post.title}
              className="w-full h-full object-cover object-center"
            />
            {/* Journal X Vignette Gradient Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/60 to-slate-950/20" />
            <div className="absolute inset-0 bg-linear-to-r from-slate-950/80 via-transparent to-slate-950/40" />
          </div>
        );
      })}

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 pb-16 pt-32 flex flex-col justify-end">
        <div className="max-w-3xl animate-in fade-in slide-in-from-bottom-6 duration-700 key={current.id}">
          {/* Metadata Badges Row */}
          <div className="flex items-center gap-3 mb-6 flex-wrap">
            <Link
              href={`/tag/${encodeURIComponent(primaryTag || "")}`}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-orange-600/90 hover:bg-orange-500 text-white text-xs font-black uppercase tracking-wider backdrop-blur-md shadow-md transition-all active:scale-95"
            >
              <Tag size={12} />
              <span>{primaryTag}</span>
            </Link>

            <span className="text-slate-400 text-xs font-bold font-mono">
              {new Date(current.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>

            <span className="text-slate-500">•</span>

            <div className="flex items-center gap-1.5 text-xs font-medium text-slate-300">
              <Clock size={13} className="text-orange-400" />
              <span>{readingTime} min read</span>
            </div>

            {current.author?.name && (
              <>
                <span className="text-slate-500">•</span>
                <span className="text-xs text-slate-300 font-medium">
                  by {current.author.name}
                </span>
              </>
            )}
          </div>

          {/* Big Editorial Headline */}
          <h1 className="display-hero text-white mb-6 hover:text-orange-400 transition-colors drop-shadow-md">
            <Link href={`/blog/${current.slug}`}>{current.title}</Link>
          </h1>

          {/* Excerpt */}
          <p className="text-slate-300 text-base md:text-lg leading-relaxed line-clamp-2 max-w-2xl mb-8 font-normal">
            {cleanExcerpt}
          </p>

          {/* CTA & Controls Row */}
          <div className="flex flex-wrap items-center justify-between gap-6 pt-4 border-t border-white/15">
            <Link
              href={`/blog/${current.slug}`}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-white text-slate-950 font-bold text-xs uppercase tracking-wider hover:bg-orange-500 hover:text-white transition-all shadow-xl active:scale-95 group/cta"
            >
              <span>Read Full Article</span>
              <ArrowRight
                size={14}
                className="group-hover/cta:translate-x-1 transition-transform"
              />
            </Link>

            {/* Slide Navigation Controls */}
            {featuredPosts.length > 1 && (
              <div className="flex items-center gap-3">
                <button
                  onClick={handlePrev}
                  type="button"
                  aria-label="Previous Slide"
                  className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all active:scale-90 border border-white/10 cursor-pointer"
                >
                  <ChevronLeft size={18} />
                </button>

                {/* Progress Indicators */}
                <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
                  {featuredPosts.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      type="button"
                      aria-label={`Go to slide ${idx + 1}`}
                      className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                        idx === currentIndex
                          ? "w-8 bg-orange-500"
                          : "w-2 bg-white/30 hover:bg-white/60"
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={handleNext}
                  type="button"
                  aria-label="Next Slide"
                  className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all active:scale-90 border border-white/10 cursor-pointer"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
