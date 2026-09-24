import Link from "next/link";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Clock,
  BookOpen,
  Tag,
  Search,
  X,
  Sparkles,
} from "lucide-react";
import { LinkedinIcon, TwitterIcon } from "@/constants/SocialIcon";

interface JournalFeedProps {
  posts: any[];
  popularPosts: any[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  search?: string;
  tag?: string;
  allTags: string[];
}

export function JournalFeed({
  posts,
  popularPosts,
  pagination,
  search = "",
  tag = "",
  allTags = [],
}: JournalFeedProps) {
  const featuredArticle = posts.length > 0 ? posts[0] : null;
  const gridArticles = posts.length > 1 ? posts.slice(1) : [];

  return (
    <section id="articles-feed" className="max-w-6xl mx-auto px-6 pb-24">
      {/* Search & Topic Filter Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 pb-8 border-b border-slate-200">
        <div>
          <h2 className="display-section text-slate-900">
            Latest articles<span className="text-orange-600">.</span>
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Deep technical investigations, performance benchmarks, and software guides.
          </p>
        </div>

        {/* Search Bar */}
        <form method="GET" action="/#articles-feed" className="relative w-full md:w-80">
          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            name="q"
            defaultValue={search}
            placeholder="Search articles & topics..."
            className="w-full pl-11 pr-10 py-3 rounded-2xl bg-slate-100/80 border border-slate-200/60 text-sm text-slate-900 placeholder-slate-400 outline-none focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
          />
          {search && (
            <Link
              href="/#articles-feed"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1"
              title="Clear search"
            >
              <X size={14} />
            </Link>
          )}
          {tag && <input type="hidden" name="tag" value={tag} />}
        </form>
      </div>

      {/* Active Filter Indicators */}
      {(search || tag) && (
        <div className="flex items-center justify-between p-4 mb-8 rounded-2xl bg-orange-50/70 border border-orange-100 text-xs">
          <div className="flex items-center gap-2 text-slate-700">
            <span>Filtering by:</span>
            {search && (
              <span className="px-2 py-0.5 rounded-md bg-white border border-orange-200 font-medium">
                Keyword: <strong>&ldquo;{search}&rdquo;</strong>
              </span>
            )}
            {tag && (
              <span className="px-2 py-0.5 rounded-md bg-white border border-orange-200 font-medium">
                Topic: <strong>#{tag}</strong>
              </span>
            )}
          </div>
          <Link
            href="/#articles-feed"
            className="font-bold text-orange-600 hover:underline"
          >
            Reset Filters
          </Link>
        </div>
      )}

      {/* Main Grid: Left Articles Feed + Right Sticky Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Articles (8 Cols) */}
        <div className="lg:col-span-8 space-y-10">
          {posts.length === 0 ? (
            <div className="text-center py-20 bg-slate-50 rounded-3xl border border-dashed border-slate-200 p-12">
              <BookOpen className="mx-auto text-slate-300 mb-4" size={48} />
              <h3 className="text-xl font-bold text-slate-800">
                {search || tag ? "No matching articles found" : "No blog posts yet"}
              </h3>
              <p className="text-slate-500 mt-2 max-w-md mx-auto text-sm">
                {search || tag
                  ? "Try adjusting your search terms or clearing topic filters."
                  : "Be the first to publish a technical guide on KODEX."}
              </p>
              <Link
                href={search || tag ? "/#articles-feed" : "/admin/blogs/create"}
                className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-all shadow-md active:scale-95"
              >
                {search || tag ? "View All Articles" : "Write First Post"}
              </Link>
            </div>
          ) : (
            <>
              {/* Featured Large Card (First Article) */}
              {featuredArticle && (
                <article className="group relative overflow-hidden rounded-3xl min-h-[420px] md:min-h-[460px] flex flex-col justify-end p-8 md:p-10 border border-slate-200 shadow-lg hover:shadow-2xl transition-all duration-500">
                  <img
                    src={
                      featuredArticle.image ||
                      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&q=80"
                    }
                    alt={featuredArticle.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Dark Vignette Overlay */}
                  <div className="absolute inset-0 card-editorial-overlay" />

                  {/* Floating Category Badge (Top Right) */}
                  {featuredArticle.keywords && (
                    <div className="absolute top-6 right-6 z-10">
                      <span className="px-3.5 py-1.5 rounded-full bg-white/90 text-slate-900 backdrop-blur-md text-xs font-black uppercase tracking-wider shadow-md">
                        #{featuredArticle.keywords.split(",")[0]?.trim()}
                      </span>
                    </div>
                  )}

                  {/* Content Overlay */}
                  <div className="relative z-10 max-w-2xl text-white">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-600/90 text-white text-[11px] font-bold uppercase tracking-wider mb-4">
                      <span>Featured Article</span>
                      <span>•</span>
                      <span className="font-mono">
                        {new Date(featuredArticle.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>

                    <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight leading-snug group-hover:text-orange-300 transition-colors">
                      <Link href={`/blog/${featuredArticle.slug}`}>
                        {featuredArticle.title}
                      </Link>
                    </h3>

                    <p className="text-slate-300 text-xs md:text-sm mt-3 line-clamp-2 leading-relaxed">
                      {featuredArticle.description?.replace(/<[^>]*>/g, " ")}
                    </p>

                    {featuredArticle.author?.name && (
                      <div className="mt-4 text-xs text-slate-400 font-medium">
                        by {featuredArticle.author.name}
                      </div>
                    )}
                  </div>
                </article>
              )}

              {/* 2-Column Grid of Regular Articles */}
              {gridArticles.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                  {gridArticles.map((post: any) => {
                    const cleanExcerpt = (post.description || "")
                      .replace(/<[^>]*>/g, " ")
                      .replace(/\s+/g, " ")
                      .trim();
                    const primaryTag = post.keywords
                      ? post.keywords.split(",")[0]?.trim()
                      : null;

                    return (
                      <article
                        key={post.id}
                        className="group flex flex-col justify-between bg-white rounded-3xl border border-slate-200 overflow-hidden hover:shadow-xl hover:border-orange-200 transition-all duration-300"
                      >
                        <div>
                          {/* Image Container with Floating Category Badge */}
                          <div className="relative aspect-16/10 overflow-hidden bg-slate-100">
                            <img
                              src={
                                post.image ||
                                "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80"
                              }
                              alt={post.title}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />

                            {primaryTag && (
                              <div className="absolute top-4 right-4">
                                <Link
                                  href={`/tag/${encodeURIComponent(primaryTag)}`}
                                  className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-slate-900 text-[10px] font-black uppercase tracking-wider shadow-sm hover:bg-orange-600 hover:text-white transition-colors"
                                >
                                  #{primaryTag}
                                </Link>
                              </div>
                            )}
                          </div>

                          {/* Body */}
                          <div className="p-6">
                            <div className="flex items-center gap-2 text-xs text-slate-400 font-mono mb-3">
                              <span>
                                {new Date(post.createdAt).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                })}
                              </span>
                              {post.author?.name && (
                                <>
                                  <span>•</span>
                                  <span className="text-slate-600 font-sans font-medium">
                                    {post.author.name}
                                  </span>
                                </>
                              )}
                            </div>

                            <h4 className="text-lg font-bold text-slate-900 group-hover:text-orange-600 transition-colors leading-snug line-clamp-2">
                              <Link href={`/blog/${post.slug}`}>
                                {post.title}
                              </Link>
                            </h4>

                            <p className="text-slate-500 text-xs mt-2.5 line-clamp-2 leading-relaxed">
                              {cleanExcerpt}
                            </p>
                          </div>
                        </div>

                        {/* Card Footer */}
                        <div className="p-6 pt-0 border-t border-slate-100 flex items-center justify-between mt-2">
                          <span className="text-[11px] text-slate-400 font-mono">
                            Technical Guide
                          </span>
                          <Link
                            href={`/blog/${post.slug}`}
                            className="inline-flex items-center gap-1 text-xs font-bold text-slate-900 group-hover:text-orange-600 transition-colors"
                          >
                            <span>Read Article</span>
                            <ArrowRight size={13} />
                          </Link>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}

              {/* Pagination Controls */}
              {pagination.totalPages > 1 && (
                <div className="mt-12 pt-8 border-t border-slate-200 flex items-center justify-between">
                  <p className="text-xs text-slate-500 font-medium">
                    Showing Page <strong>{pagination.page}</strong> of{" "}
                    <strong>{pagination.totalPages}</strong> (Total {pagination.total} articles)
                  </p>

                  <div className="flex items-center gap-2">
                    {pagination.hasPrev ? (
                      <Link
                        href={`/?page=${pagination.page - 1}${search ? `&q=${encodeURIComponent(search)}` : ""}${tag ? `&tag=${encodeURIComponent(tag)}` : ""}#articles-feed`}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 shadow-2xs"
                      >
                        <ChevronLeft size={16} />
                        <span>Previous</span>
                      </Link>
                    ) : (
                      <span className="flex items-center gap-1 px-4 py-2 rounded-xl text-xs font-bold text-slate-300 bg-slate-50 border border-slate-100 cursor-not-allowed">
                        <ChevronLeft size={16} /> Previous
                      </span>
                    )}

                    {pagination.hasNext ? (
                      <Link
                        href={`/?page=${pagination.page + 1}${search ? `&q=${encodeURIComponent(search)}` : ""}${tag ? `&tag=${encodeURIComponent(tag)}` : ""}#articles-feed`}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 shadow-2xs"
                      >
                        <span>Next</span>
                        <ChevronRight size={16} />
                      </Link>
                    ) : (
                      <span className="flex items-center gap-1 px-4 py-2 rounded-xl text-xs font-bold text-slate-300 bg-slate-50 border border-slate-100 cursor-not-allowed">
                        Next <ChevronRight size={16} />
                      </span>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Right Column: Sticky Sidebar (4 Cols) */}
        <aside className="lg:col-span-4 sticky top-24 space-y-8">
          {/* Featured Lead Author Profile Card */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-md">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-full overflow-hidden bg-slate-900 text-white font-black text-xl flex items-center justify-center border-2 border-orange-500 shadow-md">
                <span>DT</span>
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  Dipesh Thapa
                </h3>
                <p className="text-xs text-orange-600 font-bold font-mono">
                  Lead Systems Architect
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed mb-6">
              Full-stack engineer crafting high-throughput web architectures, distributed systems, and modern developer experiences on Next.js.
            </p>

            <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-slate-100 text-slate-600 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                aria-label="Twitter"
              >
                <TwitterIcon size={16} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-slate-100 text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedinIcon size={16} />
              </a>
            </div>
          </div>

          {/* Popular Articles Widget */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-md">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-400 mb-6">
              <Sparkles size={14} className="text-orange-600" />
              <span>Popular Articles</span>
            </div>

            <div className="divide-y divide-slate-100">
              {popularPosts.slice(0, 4).map((item, idx) => (
                <div key={item.id || idx} className="py-3.5 first:pt-0 last:pb-0">
                  <div className="text-[10px] text-slate-400 font-mono mb-1">
                    {new Date(item.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 hover:text-orange-600 transition-colors line-clamp-2 leading-snug">
                    <Link href={`/blog/${item.slug}`}>{item.title}</Link>
                  </h4>
                </div>
              ))}
            </div>
          </div>

          {/* Topic Cloud Widget */}
          {allTags.length > 0 && (
            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-md">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-400 mb-4">
                <Tag size={13} className="text-orange-600" />
                <span>Explore Topics</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {allTags.map((t) => (
                  <Link
                    key={t}
                    href={`/tag/${encodeURIComponent(t)}`}
                    className="text-xs font-mono px-3 py-1 rounded-xl bg-slate-100 text-slate-700 hover:bg-orange-50 hover:text-orange-600 transition-colors font-medium border border-slate-200/50"
                  >
                    #{t}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>
    </section>
  );
}
