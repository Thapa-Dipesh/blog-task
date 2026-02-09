import { Link } from "react-router-dom";
import { useGetPostsQuery } from "../features/api/postApi";
import { ArrowDown, Code2, Cpu, Globe } from "lucide-react";

const HomePage = () => {
  const { data: posts, isLoading } = useGetPostsQuery();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-slate-100 border-t-orange-600 rounded-full animate-spin"></div>
          <div className="text-slate-400 font-bold text-xs uppercase tracking-[0.3em] animate-pulse">
            Initializing KODEX
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[90vh] flex flex-col justify-center items-center px-6 overflow-hidden border-b border-slate-200">
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
            <button
              onClick={() =>
                document
                  .getElementById("blog-feed")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="px-8 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all active:scale-95 shadow-xl shadow-slate-200 cursor-pointer"
            >
              Explore Feed
            </button>
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

      {/* --- BLOG FEED VIEW (Your Original View) --- */}
      <main id="blog-feed" className="max-w-5xl mx-auto px-6 py-24">
        <header className="mb-20">
          <h2 className="text-5xl font-black tracking-tighter text-slate-900">
            Writing<span className="text-orange-600">.</span>
          </h2>
          <div className="h-1 w-20 bg-orange-600 mt-4"></div>
        </header>

        <div className="flex flex-col gap-24">
          {posts?.map((post: any, index: number) => {
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
                    className="w-full h-[450px] md:h-[320px] object-cover transition-transform duration-700 group-hover:scale-110"
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
                      {new Date(
                        post.createdAt || Date.now(),
                      ).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  <h3
                    className={`${isFeatured ? "text-5xl" : "text-3xl"} font-black text-slate-900 tracking-tight leading-tight group-hover:text-orange-600 transition-colors`}
                  >
                    <Link to={`/post/${post.id}`}>{post.title}</Link>
                  </h3>

                  <p className="text-slate-500 mt-6 mb-10 text-lg leading-relaxed line-clamp-3">
                    {post.description}
                  </p>

                  <Link
                    to={`/post/${post.id}`}
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
    </div>
  );
};

export default HomePage;
