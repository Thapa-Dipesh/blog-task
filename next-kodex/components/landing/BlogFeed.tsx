import { url } from "@/constants/api";
import { api } from "@/lib/api";
import { Post } from "@/types/post";
import Link from "next/link";

export const BlogFeed = async () => {
  // const res = await fetch(`${url}/api/post/posts`, { cache: "no-store" });
  // if (!res.ok) {
  //   throw new Error("Failed to fetch data");
  // }

  // const data = await res.json();
  // const posts: Post[] = data.posts || [];

  const posts = await api.getPosts();

  return (
    <main id="blog-feed" className="max-w-5xl mx-auto px-6 py-24">
      <title>Blogs | KODEX</title>
      <header className="mb-20">
        <h2 className="text-5xl font-black tracking-tighter text-slate-900">
          Writing<span className="text-orange-600">.</span>
        </h2>
        <div className="h-1 w-20 bg-orange-600 mt-4"></div>
      </header>

      <div className="flex flex-col gap-24">
        {posts?.map((post, index) => {
          const isFeatured = index === 0;

          return (
            <article
              key={post.id || index}
              className={`group flex flex-col ${isFeatured ? "gap-10" : "md:flex-row gap-12 items-start"} border-b border-slate-200 pb-24 last:border-0`}
            >
              {/* Image Container */}
              <div
                className={`${isFeatured ? "w-full" : "md:w-5/12"} overflow-hidden rounded-4xl bg-slate-50 border border-slate-100`}
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-112.5 md:h-80 object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Content Container */}
              <div className={`${isFeatured ? "max-w-3xl" : "md:w-7/12"}`}>
                <div className="flex items-center gap-3 mb-6">
                  <span className="px-3 py-1 rounded-full bg-blue-50 text-[10px] font-black uppercase tracking-widest text-orange-600">
                    {isFeatured ? "Primary Entry" : "Documentation"}
                  </span>
                  <span className="text-slate-200">/</span>
                  <span className="text-xs font-bold text-slate-400 font-mono">
                    {new Date(post.createdAt || Date.now()).toLocaleDateString(
                      "en-US",
                      {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      },
                    )}
                  </span>
                </div>

                <h3
                  className={`${isFeatured ? "text-5xl" : "text-3xl"} font-black text-slate-900 tracking-tight leading-tight group-hover:text-orange-600 transition-colors`}
                >
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>

                <p className="text-slate-500 mt-6 mb-10 text-lg leading-relaxed line-clamp-3">
                  {post.description}
                </p>

                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-slate-900 hover:text-orange-600 transition-all"
                >
                  Continue Reading
                  <span className="transition-transform group-hover:translate-x-2">
                    →
                  </span>
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </main>
  );
};
