"use client";

import { useState } from "react";
import { ArrowLeft, Clock, Share2, Check } from "lucide-react";
import Link from "next/link";
import { LinkedinIcon, TwitterIcon } from "@/constants/SocialIcon";

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
    <div className="bg-white min-h-screen pb-20">
      <article className="max-w-4xl mx-auto px-6 pt-12">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-colors mb-10 text-sm font-medium"
        >
          <ArrowLeft size={16} />
          Back to feed
        </Link>

        {/* Header & Meta */}
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="bg-orange-50 text-orange-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
              Engineering
            </span>
            <span className="text-slate-300">•</span>
            <div className="flex items-center gap-1 text-slate-500 text-sm">
              <Clock size={14} />
              <span>{readingTime} min read</span>
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter leading-[1.1] mb-8">
            {post.title}
          </h1>

          <div className="flex items-center justify-between border-y border-slate-100 py-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-slate-900 flex items-center justify-center text-white font-bold text-sm">
                {post.author?.name ? post.author.name[0].toUpperCase() : "A"}
              </div>
              <div>
                <div className="font-bold text-slate-900">
                  {post.author?.name || "Author"}
                </div>
                <div className="text-xs text-slate-500">
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
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}`}
                target="_blank"
                rel="noreferrer"
                className="p-2 hover:bg-slate-50 rounded-full transition-colors text-slate-400 hover:text-blue-400"
                aria-label="Share on Twitter"
              >
                <TwitterIcon size={20} />
              </a>
              <a
                href="https://www.linkedin.com/sharing/share-offsite/"
                target="_blank"
                rel="noreferrer"
                className="p-2 hover:bg-slate-50 rounded-full transition-colors text-slate-400 hover:text-blue-700"
                aria-label="Share on LinkedIn"
              >
                <LinkedinIcon size={20} />
              </a>
              <button
                onClick={handleCopyCopyLink => handleCopyLink()}
                className="p-2 hover:bg-slate-50 rounded-full transition-colors text-slate-400 hover:text-slate-900 cursor-pointer relative"
                aria-label="Copy link"
                title={copied ? "Copied!" : "Copy link"}
              >
                {copied ? <Check size={20} className="text-green-600" /> : <Share2 size={20} />}
              </button>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="mb-16">
          <img
            src={post.image || "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80"}
            alt={post.title}
            className="w-full max-h-125 object-cover rounded-4xl shadow-2xl shadow-slate-200"
          />
        </div>

        {/* Main Content */}
        <div className="max-w-2xl mx-auto">
          {post.metaDescription && (
            <p className="text-xl leading-relaxed text-slate-700 mb-8 font-medium italic border-l-4 border-orange-500 pl-6">
              {post.metaDescription}
            </p>
          )}

          <div className="whitespace-pre-line text-lg leading-relaxed text-slate-800">
            {post.description}
          </div>

          {/* Tags/Keywords */}
          {post.keywords && (
            <div className="mt-16 pt-8 border-t border-slate-100 flex flex-wrap gap-2">
              {post.keywords.split(",").map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-mono bg-slate-50 text-slate-500 px-3 py-1 rounded-md"
                >
                  #{tag.trim()}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>
    </div>
  );
}
