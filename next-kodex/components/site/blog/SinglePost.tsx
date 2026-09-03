"use client";

import { useState } from "react";
import { ArrowLeft, Clock, Share2, Check, BookOpen } from "lucide-react";
import Link from "next/link";
import { LinkedinIcon, TwitterIcon } from "@/constants/SocialIcon";
import { MarkdownRenderer } from "./markdown-renderer";

interface SinglePostProps {
  post: {
    id: string;
    title: string;
    slug: string;
    description: string;
    image: string;
    createdAt: Date | string;
    metaTitle?: string | null;
    metaDescription?: string | null;
    keywords?: string | null;
    author?: {
      id?: string;
      name: string;
      email?: string;
    } | null;
  };
}

export function SinglePost({ post }: SinglePostProps) {
  const [copied, setCopied] = useState(false);
  const wordsCount = post.description ? post.description.split(/\s+/).length : 0;
  const readingTime = Math.max(1, Math.ceil(wordsCount / 200));

  const handleCopyLink = () => {
    if (typeof window !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="bg-white min-h-screen pb-24">
      <article className="max-w-4xl mx-auto px-6 pt-12">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-colors mb-10 text-sm font-semibold group"
        >
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
          Back to feed
        </Link>

        {/* Header & Meta */}
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="bg-orange-50 text-orange-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border border-orange-100">
              Technical Guide
            </span>
            <span className="text-slate-300">•</span>
            <div className="flex items-center gap-1.5 text-slate-500 text-sm">
              <Clock size={14} />
              <span>{readingTime} min read</span>
            </div>
            <span className="text-slate-300">•</span>
            <div className="flex items-center gap-1.5 text-slate-500 text-sm">
              <BookOpen size={14} />
              <span>{wordsCount} words</span>
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.1] mb-8">
            {post.title}
          </h1>

          <div className="flex items-center justify-between border-y border-slate-100 py-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-slate-900 flex items-center justify-center text-white font-bold text-base shadow-sm">
                {post.author?.name ? post.author.name[0].toUpperCase() : "A"}
              </div>
              <div>
                <div className="font-bold text-slate-900">
                  {post.author?.name || "Author"}
                </div>
                <div className="text-xs text-slate-400">
                  Published on{" "}
                  {new Date(post.createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${typeof window !== "undefined" ? encodeURIComponent(window.location.href) : ""}`}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 hover:bg-slate-50 rounded-full transition-colors text-slate-400 hover:text-blue-400"
                aria-label="Share on Twitter"
              >
                <TwitterIcon size={18} />
              </a>
              <a
                href="https://www.linkedin.com/sharing/share-offsite/"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 hover:bg-slate-50 rounded-full transition-colors text-slate-400 hover:text-blue-700"
                aria-label="Share on LinkedIn"
              >
                <LinkedinIcon size={18} />
              </a>
              <button
                onClick={handleCopyLink}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors text-xs font-semibold cursor-pointer"
                title="Copy link"
              >
                {copied ? (
                  <>
                    <Check size={14} className="text-emerald-600" />
                    <span className="text-emerald-600">Copied!</span>
                  </>
                ) : (
                  <>
                    <Share2 size={14} />
                    <span>Share</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        {post.image && (
          <div className="mb-16 overflow-hidden rounded-4xl shadow-xl border border-slate-100">
            <img
              src={post.image}
              alt={post.title}
              className="w-full max-h-[520px] object-cover"
            />
          </div>
        )}

        {/* Meta Description Summary Callout */}
        {post.metaDescription && (
          <div className="mb-10 p-6 rounded-3xl bg-orange-50/50 border border-orange-100 text-lg leading-relaxed text-slate-700 italic">
            {post.metaDescription}
          </div>
        )}

        {/* Markdown Rendered Content */}
        <div className="mt-8">
          <MarkdownRenderer content={post.description} />
        </div>

        {/* Tags / Keywords Section */}
        {post.keywords && (
          <div className="mt-16 pt-8 border-t border-slate-100">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
              Tags &amp; Keywords
            </h4>
            <div className="flex flex-wrap gap-2">
              {post.keywords.split(",").map((tag) => {
                const cleanTag = tag.trim();
                if (!cleanTag) return null;
                return (
                  <Link
                    key={cleanTag}
                    href={`/?tag=${encodeURIComponent(cleanTag)}`}
                    className="text-xs font-mono bg-slate-100 text-slate-700 hover:bg-orange-50 hover:text-orange-600 px-3 py-1.5 rounded-xl transition-colors font-medium border border-slate-200/50"
                  >
                    #{cleanTag}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
