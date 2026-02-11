import { useParams, Link } from "react-router-dom";
import { Clock, ArrowLeft, Share2, Twitter, Linkedin } from "lucide-react";
import { useGetPostBySlugQuery } from "../features/api/postApi";

const SinglePost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data, isLoading } = useGetPostBySlugQuery(slug || "");

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-slate-100 border-t-orange-600 rounded-full animate-spin"></div>
          <div className="text-slate-400 font-bold text-xs uppercase tracking-[0.3em] animate-pulse">
            Retrieving Post Data...
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Post not found</h2>
          <Link to="/" className="text-blue-600 hover:underline mt-4 block">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pb-20">
      <article className="max-w-4xl mx-auto px-6 pt-12">
        <title>{`${data.title} | KODEX`}</title>
        {/* 2. Back Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-colors mb-10 text-sm font-medium"
        >
          <ArrowLeft size={16} />
          Back to feed
        </Link>

        {/* 3. Header & Meta */}
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="bg-orange-50 text-orange-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
              Engineering
            </span>
            <span className="text-slate-300">•</span>
            <div className="flex items-center gap-1 text-slate-500 text-sm">
              <Clock size={14} />
              <span>5 min read</span>
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter leading-[1.1] mb-8">
            {data?.title}
          </h1>

          <div className="flex items-center justify-between border-y border-slate-100 py-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-slate-200 overflow-hidden">
                <img
                  src="https://ui-avatars.com/api/?name=Admin&background=random"
                  alt="Author"
                />
              </div>
              <div>
                <div className="font-bold text-slate-900">
                  {data?.author?.name}
                </div>
                <div className="text-xs text-slate-500">
                  Published on{" "}
                  {data?.createdAt
                    ? new Date(data.createdAt).toLocaleDateString()
                    : "Loading..."}
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="p-2 hover:bg-slate-50 rounded-full transition-colors text-slate-400 hover:text-blue-400">
                <Twitter size={20} />
              </button>
              <button className="p-2 hover:bg-slate-50 rounded-full transition-colors text-slate-400 hover:text-blue-700">
                <Linkedin size={20} />
              </button>
              <button className="p-2 hover:bg-slate-50 rounded-full transition-colors text-slate-400 hover:text-slate-900">
                <Share2 size={20} />
              </button>
            </div>
          </div>
        </header>

        {/* 4. Featured Image */}
        <div className="mb-16">
          <img
            src={data?.image}
            alt={data?.title}
            className="w-full h-[500px] object-cover rounded-[2rem] shadow-2xl shadow-slate-200"
          />
        </div>

        {/* 5. Main Content Area */}
        <div className="max-w-2xl mx-auto">
          <div className="prose prose-lg prose-slate prose-headings:font-black prose-headings:tracking-tighter prose-orange">
            {/* In a real app, you'd use something like 'react-markdown' or 'dangerouslySetInnerHTML' 
               to render the HTML content from your DB.
            */}
            <p className="text-xl leading-relaxed text-slate-700 mb-8 font-medium italic border-l-4 border-orange-500 pl-6">
              {data?.metaDescription}
            </p>

            <div className="whitespace-pre-line text-lg leading-relaxed text-slate-800">
              {data?.description}
            </div>
          </div>

          {/* 6. Tags/Keywords Section */}
          <div className="mt-16 pt-8 border-t border-slate-100 flex flex-wrap gap-2">
            {data?.keywords?.split(",").map((tag) => (
              <span
                key={tag}
                className="text-xs font-mono bg-slate-50 text-slate-500 px-3 py-1 rounded-md"
              >
                #{tag.trim()}
              </span>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
};

export default SinglePost;
