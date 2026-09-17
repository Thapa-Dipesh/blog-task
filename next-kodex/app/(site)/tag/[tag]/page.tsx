import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, BookOpen, ChevronLeft, ChevronRight, Hash, Sparkles, Tag as TagIcon } from "lucide-react";
import { getPostsByTag, getTagsWithCounts } from "@/lib/db/posts";

interface TagPageProps {
  params: Promise<{ tag: string }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({
  params,
}: TagPageProps): Promise<Metadata> {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);

  return {
    title: `Articles Tagged #${decodedTag}`,
    description: `Explore all technical articles, architecture deep dives, and tutorials categorized under #${decodedTag} on KODEX.`,
    openGraph: {
      title: `Articles Tagged #${decodedTag} | KODEX.`,
      description: `Explore all technical articles and tutorials categorized under #${decodedTag}.`,
    },
  };
}

export default async function TagArchivePage({
  params,
  searchParams,
}: TagPageProps) {
  const { tag } = await params;
  const search = await searchParams;
  const page = Math.max(1, Number(search?.page) || 1);
  const decodedTag = decodeURIComponent(tag);

  const [{ posts, pagination }, allTagsWithCounts] = await Promise.all([
    getPostsByTag(decodedTag, page, 6),
    getTagsWithCounts(),
  ]);

  if (posts.length === 0 && page > 1) {
    notFound();
  }

  const relatedTags = allTagsWithCounts
    .filter((t) => t.tag.toLowerCase() !== decodedTag.toLowerCase())
    .slice(0, 8);

  return (
    <main className="max-w-5xl mx-auto px-6 py-16">
      {/* Breadcrumb & Back Link */}
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors group"
        >
          <ArrowLeft
            size={14}
            className="transition-transform group-hover:-translate-x-1"
          />
          <span>Back to All Articles</span>
        </Link>
      </div>

      {/* Topic Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-slate-900 via-slate-900 to-orange-950 p-8 md:p-12 text-white mb-12 shadow-xl border border-slate-800">
        <div className="absolute top-0 right-0 translate-x-8 -translate-y-8 w-64 h-64 bg-orange-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Hash size={13} />
            <span>Topic Archive</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black tracking-tight flex items-center gap-2">
            <span>#{decodedTag}</span>
          </h1>

          <p className="text-slate-300 text-sm md:text-base mt-3 max-w-xl leading-relaxed">
            Curated engineering perspectives, technical guides, and architectural breakdowns tagged under <strong>#{decodedTag}</strong>.
          </p>

          <div className="flex items-center gap-6 mt-6 pt-6 border-t border-slate-800/80 text-xs font-medium text-slate-400">
            <div>
              <span className="text-white font-bold text-base block font-mono">
                {pagination.total}
              </span>
              <span>Published {pagination.total === 1 ? "Article" : "Articles"}</span>
            </div>
            <div className="h-8 w-px bg-slate-800" />
            <div>
              <span className="text-white font-bold text-base block font-mono">
                {allTagsWithCounts.length}
              </span>
              <span>Total Platform Topics</span>
            </div>
          </div>
        </div>
      </div>

      {/* Related Topics Pill Row */}
      {relatedTags.length > 0 && (
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles size={14} className="text-orange-600" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Explore Related Topics
            </span>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {relatedTags.map((item) => (
              <Link
                key={item.tag}
                href={`/tag/${encodeURIComponent(item.tag)}`}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200 border border-slate-200/60 text-xs font-bold text-slate-600 transition-all shadow-2xs"
              >
                <TagIcon size={12} className="text-slate-400" />
                <span>#{item.tag}</span>
                <span className="text-[10px] text-slate-400 font-mono">
                  ({item.count})
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Articles Feed */}
      {posts.length === 0 ? (
        <div className="text-center py-20 bg-slate-50 rounded-3xl border border-dashed border-slate-200 p-12">
          <BookOpen className="mx-auto text-slate-300 mb-4" size={48} />
          <h3 className="text-xl font-bold text-slate-800">
            No articles found for #{decodedTag}
          </h3>
          <p className="text-slate-500 mt-2 max-w-md mx-auto text-sm">
            Be the first author to publish a technical guide on this topic.
          </p>
          <Link
            href="/admin/blogs/create"
            className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-all shadow-md active:scale-95"
          >
            Create First Post
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post: any) => {
            const cleanExcerpt = (post.description || "")
              .replace(/<[^>]*>/g, " ")
              .replace(/\s+/g, " ")
              .trim();

            return (
              <article
                key={post.id}
                className="group flex flex-col justify-between bg-white rounded-3xl border border-slate-200/80 hover:border-orange-200 hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div>
                  {/* Image */}
                  <div className="overflow-hidden aspect-video bg-slate-100 relative">
                    <img
                      src={
                        post.image ||
                        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80"
                      }
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  {/* Body */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-400 mb-3">
                      <span className="font-mono">
                        {new Date(post.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                      {post.author?.name && (
                        <>
                          <span>•</span>
                          <span className="text-slate-600">
                            {post.author.name}
                          </span>
                        </>
                      )}
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-orange-600 transition-colors line-clamp-2 leading-snug">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h3>

                    <p className="text-slate-500 text-sm mt-3 line-clamp-2 leading-relaxed">
                      {cleanExcerpt}
                    </p>
                  </div>
                </div>

                {/* Footer */}
                <div className="p-6 pt-0 flex items-center justify-between border-t border-slate-100 mt-4">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {post.keywords?.split(",").slice(0, 2).map((k: string) => (
                      <span
                        key={k}
                        className="text-[10px] font-mono px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md"
                      >
                        #{k.trim()}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-orange-600 group-hover:translate-x-0.5 transition-transform"
                  >
                    <span>Read</span>
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
        <div className="mt-16 pt-8 border-t border-slate-200 flex items-center justify-between">
          <p className="text-xs text-slate-500">
            Page <strong>{pagination.page}</strong> of{" "}
            <strong>{pagination.totalPages}</strong>
          </p>

          <div className="flex items-center gap-2">
            {pagination.hasPrev ? (
              <Link
                href={`/tag/${encodeURIComponent(decodedTag)}?page=${pagination.page - 1}`}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 shadow-xs"
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
                href={`/tag/${encodeURIComponent(decodedTag)}?page=${pagination.page + 1}`}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 shadow-xs"
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
    </main>
  );
}
