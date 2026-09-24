import Link from "next/link";
import { ArrowUpRight, ArrowRight, Layers, Cpu, Server, Code, Globe, Terminal } from "lucide-react";

interface CategoryItem {
  tag: string;
  count: number;
}

const CATEGORY_VISUALS: Record<string, { image: string; description: string; icon: any }> = {
  architecture: {
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80",
    description: "System design blueprints, distributed microservices, and high-throughput infrastructure.",
    icon: Server,
  },
  nextjs: {
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80",
    description: "App Router mastery, Server Actions, Edge rendering, and performance optimization.",
    icon: Layers,
  },
  devops: {
    image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=1000&q=80",
    description: "Docker containerization, CI/CD pipelines, Kubernetes orchestration, and monitoring.",
    icon: Terminal,
  },
  fullstack: {
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1000&q=80",
    description: "End-to-end web engineering, PostgreSQL indexing, ORMs, and secure authentication.",
    icon: Code,
  },
  security: {
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1000&q=80",
    description: "Zero-trust architectures, cryptography, RBAC models, and data privacy governance.",
    icon: Globe,
  },
};

const DEFAULT_IMAGES = [
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1000&q=80",
];

export function CategorySpotlight({ tags }: { tags: CategoryItem[] }) {
  const displayTags = tags.length > 0 ? tags.slice(0, 3) : [
    { tag: "Architecture", count: 12 },
    { tag: "Next.js", count: 8 },
    { tag: "DevOps", count: 6 },
  ];

  return (
    <section className="py-20 max-w-6xl mx-auto px-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
        <div>
          <h2 className="display-section text-slate-900">
            Article categories<span className="text-orange-600">.</span>
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Browse our core technical verticals and engineering disciplines.
          </p>
        </div>

        <Link
          href="/#blog-feed"
          className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-800 transition-all active:scale-95 shrink-0 w-fit"
        >
          <span>Browse all articles</span>
          <ArrowRight size={13} />
        </Link>
      </div>

      {/* 3-Column Visual Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {displayTags.map((item, index) => {
          const key = item.tag.toLowerCase();
          const visual = CATEGORY_VISUALS[key] || {
            image: DEFAULT_IMAGES[index % DEFAULT_IMAGES.length],
            description: `Curated technical articles and guides exploring #${item.tag} patterns.`,
            icon: Cpu,
          };
          const Icon = visual.icon;

          return (
            <Link
              key={item.tag}
              href={`/tag/${encodeURIComponent(item.tag)}`}
              className="group relative overflow-hidden rounded-3xl min-h-[360px] flex flex-col justify-end p-8 border border-slate-200/80 shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer"
            >
              {/* Background Image */}
              <img
                src={visual.image}
                alt={item.tag}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 card-category-overlay" />

              {/* Floating Top Right Circular Arrow Badge */}
              <div className="absolute top-6 right-6 w-11 h-11 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all duration-300 group-hover:bg-orange-600 group-hover:scale-110 group-hover:rotate-45 shadow-lg">
                <ArrowUpRight size={20} />
              </div>

              {/* Content */}
              <div className="relative z-10 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <span className="p-1.5 rounded-lg bg-orange-600/90 text-white inline-flex">
                    <Icon size={14} />
                  </span>
                  <span className="text-xs font-mono font-bold text-orange-400">
                    {item.count} {item.count === 1 ? "Article" : "Articles"}
                  </span>
                </div>

                <h3 className="text-2xl font-black tracking-tight text-white group-hover:text-orange-300 transition-colors">
                  #{item.tag}
                </h3>

                <p className="text-xs text-slate-300 mt-2 line-clamp-2 leading-relaxed">
                  {visual.description}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
