import { getAllPosts } from "@/lib/db/posts";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";

export const BlogFeed = async () => {
  const posts = await getAllPosts();

  return (
    <main id="blog-feed" className="max-w-5xl mx-auto px-6 py-24">
      <header className="mb-20">
        <h2 className="text-5xl font-black tracking-tighter text-slate-900">
          Writing<span className="text-orange-600">.</span>
        </h2>
        <div className="h-1 w-20 bg-orange-600 mt-4"></div>
      </header>

      {posts.length === 0 ? (
        <div className="text-center py-20 bg-slate-50 rounded-3xl border border-dashed border-slate-200 p-12">
          <BookOpen className="mx-auto text-slate-300 mb-4" size={48} />
          <h3 className="text-xl font-bold text-slate-800">No blog posts yet</h3>
          <p className="text-slate-500 mt-2 max-w-md mx-auto text-sm">
            Be the first to publish insightful architectural patterns and technical articles.
          </p>
          <Link
            href="/admin/blogs/create"
            className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-all shadow-md active:scale-95"
          >
            Create First Post
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-24">
          {posts.map((post, index) => {
            const isFeatured = index === 0;

            return (
              <article
                key={post.id || index}
                className={`group flex flex-col ${
                  isFeatured ? "gap-10" : "md:flex-row gap-12 items-start"
                } border-b border-slate-200 pb-24 last:border-0`}
              >
                {/* Image Container */}
                <div
                  className={`${
                    isFeatured ? "w-full" : "md:w-5/12"
                  } overflow-hidden rounded-4xl bg-slate-50 border border-slate-100 shrink-0`}
                >
                  <img
                    src={post.image || "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80"}
                    alt={post.title}
                    className="w-full h-80 md:h-80 object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                {/* Content Container */}
                <div className={`${isFeatured ? "max-w-3xl" : "md:w-7/12"}`}>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="px-3 py-1 rounded-full bg-orange-50 text-[10px] font-black uppercase tracking-widest text-orange-600">
                      {isFeatured ? "Primary Entry" : "Technical Guide"}
                    </span>
                    <span className="text-slate-200">/</span>
                    <span className="text-xs font-bold text-slate-400 font-mono">
                      {new Date(post.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    {post.author?.name && (
                      <>
                        <span className="text-slate-200">/</span>
                        <span className="text-xs font-medium text-slate-500">
                          by {post.author.name}
                        </span>
                      </>
                    )}
                  </div>

                  <h3
                    className={`${
                      isFeatured ? "text-4xl md:text-5xl" : "text-2xl md:text-3xl"
                    } font-black text-slate-900 tracking-tight leading-tight group-hover:text-orange-600 transition-colors`}
                  >
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>

                  <p className="text-slate-500 mt-6 mb-10 text-base md:text-lg leading-relaxed line-clamp-3">
                    {post.description}
                  </p>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-slate-900 hover:text-orange-600 transition-all"
                  >
                    Continue Reading
                    <ArrowRight
                      size={14}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </main>
  );
};
