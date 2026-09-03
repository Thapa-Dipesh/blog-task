import Link from "next/link";
import { ArrowRight, BookOpen, ChevronLeft, ChevronRight, Search, Tag, X } from "lucide-react";
import { getPaginatedPosts, getAllTags } from "@/lib/db/posts";

interface BlogFeedProps {
  page?: number;
  search?: string;
  tag?: string;
}

export async function BlogFeed({ page = 1, search = "", tag = "" }: BlogFeedProps) {
  const { posts, pagination } = await getPaginatedPosts({
    page,
    limit: 5,
    search,
    tag,
  });

  const allTags = await getAllTags();

  return (
    <main id="blog-feed" className="max-w-5xl mx-auto px-6 py-20">
      {/* Feed Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900">
            Writing<span className="text-orange-600">.</span>
          </h2>
          <div className="h-1 w-16 bg-orange-600 mt-3 rounded-full" />
        </div>

        {/* Search Input Bar */}
        <form method="GET" action="/" className="relative w-full md:w-80">
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
              href="/"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1"
              title="Clear search"
            >
              <X size={14} />
            </Link>
          )}
          {tag && <input type="hidden" name="tag" value={tag} />}
        </form>
      </div>

      {/* Category / Tag Pills Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-12 no-scrollbar">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1 shrink-0 mr-1">
          <Tag size={13} /> Topics:
        </span>

        <Link
          href={search ? `/?q=${encodeURIComponent(search)}` : "/"}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
            !tag || tag.toLowerCase() === "all"
              ? "bg-slate-900 text-white shadow-sm"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          All Topics
        </Link>

        {allTags.slice(0, 10).map((item: string) => {
          const isActive = tag.toLowerCase() === item.toLowerCase();
          const queryParams = new URLSearchParams();
          if (search) queryParams.set("q", search);
          queryParams.set("tag", item);

          return (
            <Link
              key={item}
              href={`/?${queryParams.toString()}#blog-feed`}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                isActive
                  ? "bg-orange-600 text-white shadow-sm font-bold"
                  : "bg-slate-100 text-slate-600 hover:bg-orange-50 hover:text-orange-600 border border-slate-200/40"
              }`}
            >
              #{item}
            </Link>
          );
        })}
      </div>

      {/* Active Filter Indicators */}
      {(search || tag) && (
        <div className="flex items-center justify-between p-4 mb-8 rounded-2xl bg-orange-50/60 border border-orange-100 text-xs">
          <div className="flex items-center gap-2 text-slate-700">
            <span>Filtering by:</span>
            {search && (
              <span className="px-2 py-0.5 rounded-md bg-white border border-orange-200 font-medium">
                Keyword: <strong>&ldquo;{search}&rdquo;</strong>
              </span>
            )}
            {tag && (
              <span className="px-2 py-0.5 rounded-md bg-white border border-orange-200 font-medium">
                Tag: <strong>#{tag}</strong>
              </span>
            )}
          </div>
          <Link
            href="/"
            className="font-bold text-orange-600 hover:underline flex items-center gap-1"
          >
            Reset Filters
          </Link>
        </div>
      )}

      {/* Blog Posts Feed */}
      {posts.length === 0 ? (
        <div className="text-center py-20 bg-slate-50 rounded-3xl border border-dashed border-slate-200 p-12">
          <BookOpen className="mx-auto text-slate-300 mb-4" size={48} />
          <h3 className="text-xl font-bold text-slate-800">
            {search || tag ? "No matching articles found" : "No blog posts yet"}
          </h3>
          <p className="text-slate-500 mt-2 max-w-md mx-auto text-sm">
            {search || tag
              ? "Try adjusting your search terms or clearing your topic filters."
              : "Be the first to publish insightful architectural patterns and technical articles."}
          </p>
          <Link
            href={search || tag ? "/" : "/admin/blogs/create"}
            className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-all shadow-md active:scale-95"
          >
            {search || tag ? "View All Articles" : "Create First Post"}
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-20">
          {posts.map((post: any, index: number) => {
            const isFeatured = index === 0 && pagination.page === 1 && !search && !tag;

            return (
              <article
                key={post.id || index}
                className={`group flex flex-col ${
                  isFeatured ? "gap-10" : "md:flex-row gap-10 items-start"
                } border-b border-slate-200 pb-20 last:border-0`}
              >
                {/* Image Container */}
                <div
                  className={`${
                    isFeatured ? "w-full" : "md:w-5/12"
                  } overflow-hidden rounded-4xl bg-slate-100 border border-slate-200/60 shrink-0`}
                >
                  <img
                    src={
                      post.image ||
                      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80"
                    }
                    alt={post.title}
                    className={`w-full ${
                      isFeatured ? "h-80 md:h-96" : "h-64 md:h-72"
                    } object-cover transition-transform duration-700 group-hover:scale-105`}
                  />
                </div>

                {/* Content Container */}
                <div className={`${isFeatured ? "max-w-3xl" : "md:w-7/12"}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 rounded-full bg-orange-50 text-[10px] font-black uppercase tracking-widest text-orange-600 border border-orange-100">
                      {isFeatured ? "Primary Entry" : "Technical Guide"}
                    </span>
                    <span className="text-slate-300">/</span>
                    <span className="text-xs font-bold text-slate-400 font-mono">
                      {new Date(post.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    {post.author?.name && (
                      <>
                        <span className="text-slate-300">/</span>
                        <span className="text-xs font-medium text-slate-500">
                          by {post.author.name}
                        </span>
                      </>
                    )}
                  </div>

                  <h3
                    className={`${
                      isFeatured ? "text-3xl md:text-4xl" : "text-2xl md:text-3xl"
                    } font-black text-slate-900 tracking-tight leading-snug group-hover:text-orange-600 transition-colors`}
                  >
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>

                  <p className="text-slate-500 mt-4 mb-6 text-base leading-relaxed line-clamp-3">
                    {post.description}
                  </p>

                  {/* Post Tags */}
                  {post.keywords && (
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {post.keywords.split(",").slice(0, 3).map((k: string) => (
                        <span
                          key={k}
                          className="text-[11px] font-mono px-2.5 py-0.5 bg-slate-100 text-slate-600 rounded-lg"
                        >
                          #{k.trim()}
                        </span>
                      ))}
                    </div>
                  )}

                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-slate-900 hover:text-orange-600 transition-all group/link"
                  >
                    Continue Reading
                    <ArrowRight
                      size={14}
                      className="transition-transform group-hover/link:translate-x-1.5"
                    />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* Pagination Controls */}
      {pagination.totalPages > 1 && (
        <div className="mt-16 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500 font-medium">
            Showing Page <strong>{pagination.page}</strong> of{" "}
            <strong>{pagination.totalPages}</strong> (Total {pagination.total} articles)
          </p>

          <div className="flex items-center gap-2">
            {/* Prev Button */}
            {pagination.hasPrev ? (
              <PaginationLink
                page={pagination.page - 1}
                search={search}
                tag={tag}
                label="Previous"
                icon={<ChevronLeft size={16} />}
              />
            ) : (
              <span className="flex items-center gap-1 px-4 py-2 rounded-xl text-xs font-bold text-slate-300 bg-slate-50 border border-slate-100 cursor-not-allowed">
                <ChevronLeft size={16} /> Previous
              </span>
            )}

            {/* Page Number Pills */}
            <div className="hidden sm:flex items-center gap-1">
              {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(
                (p: number) => {
                  const isCurrent = p === pagination.page;
                  const queryParams = new URLSearchParams();
                  if (search) queryParams.set("q", search);
                  if (tag) queryParams.set("tag", tag);
                  queryParams.set("page", String(p));

                  return (
                    <Link
                      key={p}
                      href={`/?${queryParams.toString()}#blog-feed`}
                      className={`w-9 h-9 flex items-center justify-center rounded-xl text-xs font-bold transition-all ${
                        isCurrent
                          ? "bg-slate-900 text-white shadow-sm"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {p}
                    </Link>
                  );
                }
              )}
            </div>

            {/* Next Button */}
            {pagination.hasNext ? (
              <PaginationLink
                page={pagination.page + 1}
                search={search}
                tag={tag}
                label="Next"
                iconRight={<ChevronRight size={16} />}
              />
            ) : (
              <span className="flex items-center gap-1 px-4 py-2 rounded-xl text-xs font-bold text-slate-300 bg-slate-50 border border-slate-100 cursor-not-allowed">
                Next <ChevronRight size={16} />
              </span>
            )}
          </div>
        </div>
      )}
    </main>
  );
}

function PaginationLink({
  page,
  search,
  tag,
  label,
  icon,
  iconRight,
}: {
  page: number;
  search?: string;
  tag?: string;
  label: string;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
}) {
  const queryParams = new URLSearchParams();
  if (search) queryParams.set("q", search);
  if (tag) queryParams.set("tag", tag);
  queryParams.set("page", String(page));

  return (
    <Link
      href={`/?${queryParams.toString()}#blog-feed`}
      className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 shadow-sm transition-all active:scale-95 cursor-pointer"
    >
      {icon}
      <span>{label}</span>
      {iconRight}
    </Link>
  );
}
