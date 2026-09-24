import Link from "next/link";
import { TrendingUp } from "lucide-react";

interface PopularPost {
  id: string;
  title: string;
  slug: string;
  createdAt: Date | string;
  keywords?: string | null;
}

export function PopularNowBar({ posts }: { posts: PopularPost[] }) {
  const displayPosts = posts.length > 0 ? posts.slice(0, 3) : [];

  if (displayPosts.length === 0) return null;

  return (
    <section className="max-w-6xl mx-auto px-6 mb-20">
      {/* Header with Horizontal Divider */}
      <div className="flex items-center gap-6 mb-8">
        <div className="flex items-center gap-2 shrink-0 text-slate-900 font-black text-sm uppercase tracking-wider">
          <TrendingUp size={16} className="text-orange-600" />
          <span>Popular now</span>
        </div>
        <div className="h-px bg-slate-200 flex-1" />
      </div>

      {/* 3-Column Minimal Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-200">
        {displayPosts.map((post, idx) => {
          const primaryTag = post.keywords
            ? post.keywords.split(",")[0]?.trim()
            : "Engineering";

          return (
            <article
              key={post.id || idx}
              className={`group ${idx > 0 ? "md:pl-8 pt-6 md:pt-0" : ""}`}
            >
              <div className="flex items-center gap-2 mb-2 text-xs">
                <span className="font-bold text-orange-600 font-mono">
                  #{primaryTag}
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-slate-400 font-mono">
                  {new Date(post.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>

              <h4 className="text-base font-bold text-slate-900 group-hover:text-orange-600 transition-colors leading-snug line-clamp-2">
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h4>
            </article>
          );
        })}
      </div>
    </section>
  );
}
