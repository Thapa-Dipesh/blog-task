import { Github, Twitter, Linkedin, ArrowUp, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-slate-50 border-t border-slate-100 pt-12 pb-6">
      <div className="max-w-6xl mx-auto px-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-10 pb-12 border-b border-slate-200">
          {/* Brand & Tagline */}
          <div className="max-w-xs">
            <Link
              to="/"
              className="text-2xl font-black tracking-tighter text-slate-900 group"
            >
              KODEX
              <span className="text-orange-500 group-hover:animate-pulse">.</span>
            </Link>
            <p className="text-slate-500 text-xs font-medium mt-3 leading-relaxed tracking-wide uppercase">
              Engineering the narrative of <br />
              future web development.
            </p>
          </div>

          {/* Minimal Links Grid */}
          <div className="grid grid-cols-2 gap-16">
            <div>
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">
                Platform
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/"
                    className="text-sm font-bold text-slate-600 hover:text-orange-500 transition-colors"
                  >
                    Posts
                  </Link>
                </li>
                <li>
                  <Link
                    to="/my-blogs"
                    className="text-sm font-bold text-slate-600 hover:text-orange-500 transition-colors"
                  >
                    Manage
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">
                Connect
              </h3>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="text-slate-400 hover:text-slate-900 transition-colors"
                >
                  <Twitter size={18} />
                </a>
                <a
                  href="#"
                  className="text-slate-400 hover:text-slate-900 transition-colors"
                >
                  <Github size={18} />
                </a>
                <a
                  href="#"
                  className="text-slate-400 hover:text-slate-900 transition-colors"
                >
                  <Linkedin size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-slate-300">
            <Zap size={12} className="fill-slate-300" />
            <p className="text-[10px] font-bold uppercase tracking-widest">
              &copy; {new Date().getFullYear()} KODEX Labs
            </p>
          </div>

          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-slate-400 hover:text-orange-500 transition-all text-[10px] font-black uppercase tracking-widest cursor-pointer"
          >
            Top
            <span className="p-1.5 bg-slate-50 rounded-md group-hover:-translate-y-1 transition-transform border border-slate-100">
              <ArrowUp size={12} />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
