"use client";

import { useEffect, useState, useRef, useTransition, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  FileText,
  Tag,
  ArrowRight,
  LayoutDashboard,
  PlusCircle,
  Settings,
  ShieldCheck,
  X,
  CornerDownLeft,
  BookOpen,
  Loader2,
} from "lucide-react";
import { searchContent, SearchResultItem } from "@/lib/actions/search.action";

interface QuickAction {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  icon: any;
  category: "Navigation";
}

const STATIC_ACTIONS: QuickAction[] = [
  {
    id: "feed",
    title: "Articles Feed",
    subtitle: "Browse all latest technical guides and archives",
    href: "/",
    icon: BookOpen,
    category: "Navigation",
  },
  {
    id: "write",
    title: "Write New Post",
    subtitle: "Open the TipTap rich article editor",
    href: "/admin/blogs/create",
    icon: PlusCircle,
    category: "Navigation",
  },
  {
    id: "dashboard",
    title: "Author Dashboard",
    subtitle: "View readership stats and recent publications",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
    category: "Navigation",
  },
  {
    id: "super-dashboard",
    title: "Master Console (Super Admin)",
    subtitle: "System governance & platform health metrics",
    href: "/kodex-admin/dashboard",
    icon: ShieldCheck,
    category: "Navigation",
  },
  {
    id: "approvals",
    title: "User Approvals (Super Admin)",
    subtitle: "Verify, approve, and govern author accounts",
    href: "/kodex-admin/users",
    icon: ShieldCheck,
    category: "Navigation",
  },
  {
    id: "publications",
    title: "All Publications (Super Admin)",
    subtitle: "Global moderation across all platform posts",
    href: "/kodex-admin/blogs",
    icon: BookOpen,
    category: "Navigation",
  },
  {
    id: "settings",
    title: "Account Settings",
    subtitle: "Update author profile and security passwords",
    href: "/admin/settings",
    icon: Settings,
    category: "Navigation",
  },
];

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [posts, setPosts] = useState<SearchResultItem[]>([]);
  const [matchingTags, setMatchingTags] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isPending, startTransition] = useTransition();

  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Global Keyboard Listener for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    const handleCustomOpen = () => {
      setIsOpen(true);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-command-palette", handleCustomOpen);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-command-palette", handleCustomOpen);
    };
  }, [isOpen]);

  // Focus input whenever opened
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    } else {
      document.body.style.overflow = "unset";
      setQuery("");
      setPosts([]);
      setMatchingTags([]);
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Debounced live search
  const handleQueryChange = (val: string) => {
    setQuery(val);
    setSelectedIndex(0);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    if (!val.trim()) {
      setPosts([]);
      setMatchingTags([]);
      return;
    }

    debounceRef.current = setTimeout(() => {
      startTransition(async () => {
        const results = await searchContent(val);
        setPosts(results.posts);
        setMatchingTags(results.matchingTags);
      });
    }, 150);
  };

  // Compute unified list of selectable items for keyboard navigation
  const selectableItems = [
    ...posts.map((p) => ({
      type: "post" as const,
      id: p.id,
      title: p.title,
      href: `/blog/${p.slug}`,
    })),
    ...matchingTags.map((t) => ({
      type: "tag" as const,
      id: `tag-${t}`,
      title: `#${t}`,
      href: `/tag/${encodeURIComponent(t)}`,
    })),
    ...STATIC_ACTIONS.filter(
      (a) =>
        !query.trim() ||
        a.title.toLowerCase().includes(query.toLowerCase()) ||
        a.subtitle.toLowerCase().includes(query.toLowerCase())
    ).map((a) => ({
      type: "action" as const,
      id: a.id,
      title: a.title,
      href: a.href,
    })),
  ];

  const navigateTo = useCallback(
    (href: string) => {
      setIsOpen(false);
      router.push(href);
    },
    [router]
  );

  // Keyboard navigation for arrow keys and enter
  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < selectableItems.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev > 0 ? prev - 1 : selectableItems.length - 1
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      const current = selectableItems[selectedIndex];
      if (current) {
        navigateTo(current.href);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="fixed inset-0"
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Palette Container */}
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[80vh] z-10 animate-in zoom-in-95 duration-150">
        {/* Search Header */}
        <div className="flex items-center px-5 border-b border-slate-100 h-16 shrink-0 bg-slate-50/50">
          <Search size={18} className="text-orange-600 shrink-0 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => handleQueryChange(e.target.value)}
            onKeyDown={handleInputKeyDown}
            placeholder="Search posts, topics, authors, or jump to..."
            className="flex-1 bg-transparent text-slate-900 placeholder:text-slate-400 text-sm font-medium outline-none"
          />
          {isPending && (
            <Loader2 size={16} className="text-orange-500 animate-spin mr-3" />
          )}
          {query && (
            <button
              onClick={() => handleQueryChange("")}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-lg mr-2"
            >
              <X size={15} />
            </button>
          )}
          <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 text-[10px] font-mono font-bold text-slate-400 bg-slate-100 border border-slate-200 rounded-lg">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-4 divide-y divide-slate-100/80">
          {/* Post Results */}
          {posts.length > 0 && (
            <div className="pt-2">
              <div className="px-3 py-1 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                Articles ({posts.length})
              </div>
              <div className="mt-1 space-y-1">
                {posts.map((post) => {
                  const itemIndex = selectableItems.findIndex(
                    (i) => i.id === post.id
                  );
                  const isSelected = selectedIndex === itemIndex;

                  return (
                    <button
                      key={post.id}
                      onClick={() => navigateTo(`/blog/${post.slug}`)}
                      onMouseEnter={() => setSelectedIndex(itemIndex)}
                      className={`w-full text-left flex items-start gap-3 p-3 rounded-2xl transition-all cursor-pointer ${
                        isSelected
                          ? "bg-orange-50/80 border border-orange-200/80 text-orange-950"
                          : "hover:bg-slate-50 text-slate-800"
                      }`}
                    >
                      <div
                        className={`p-2 rounded-xl mt-0.5 shrink-0 ${
                          isSelected
                            ? "bg-orange-600 text-white shadow-sm"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        <FileText size={16} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="text-sm font-bold text-slate-900 truncate">
                            {post.title}
                          </h4>
                          <span className="text-[10px] font-mono text-slate-400 shrink-0">
                            {new Date(post.createdAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                          {post.description.replace(/<[^>]*>/g, " ")}
                        </p>
                        {post.author?.name && (
                          <span className="text-[10px] font-medium text-slate-400 mt-1 inline-block">
                            by {post.author.name}
                          </span>
                        )}
                      </div>
                      {isSelected && (
                        <CornerDownLeft
                          size={14}
                          className="text-orange-600 shrink-0 mt-2"
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Tag Results */}
          {matchingTags.length > 0 && (
            <div className="pt-3">
              <div className="px-3 py-1 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                Topics & Tags
              </div>
              <div className="mt-1 flex flex-wrap gap-2 p-2">
                {matchingTags.map((tag) => {
                  const itemIndex = selectableItems.findIndex(
                    (i) => i.id === `tag-${tag}`
                  );
                  const isSelected = selectedIndex === itemIndex;

                  return (
                    <button
                      key={tag}
                      onClick={() =>
                        navigateTo(`/tag/${encodeURIComponent(tag)}`)
                      }
                      onMouseEnter={() => setSelectedIndex(itemIndex)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        isSelected
                          ? "bg-orange-600 text-white shadow-sm"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200/60"
                      }`}
                    >
                      <Tag size={12} />
                      <span>#{tag}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quick Actions / Navigation */}
          <div className="pt-3">
            <div className="px-3 py-1 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
              {query ? "Quick Navigation" : "Suggested Shortcuts"}
            </div>
            <div className="mt-1 space-y-1">
              {STATIC_ACTIONS.filter(
                (a) =>
                  !query.trim() ||
                  a.title.toLowerCase().includes(query.toLowerCase()) ||
                  a.subtitle.toLowerCase().includes(query.toLowerCase())
              ).map((action) => {
                const itemIndex = selectableItems.findIndex(
                  (i) => i.id === action.id
                );
                const isSelected = selectedIndex === itemIndex;
                const Icon = action.icon;

                return (
                  <button
                    key={action.id}
                    onClick={() => navigateTo(action.href)}
                    onMouseEnter={() => setSelectedIndex(itemIndex)}
                    className={`w-full text-left flex items-center justify-between p-3 rounded-2xl transition-all cursor-pointer ${
                      isSelected
                        ? "bg-orange-50/80 border border-orange-200/80 text-orange-950"
                        : "hover:bg-slate-50 text-slate-800"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-xl shrink-0 ${
                          isSelected
                            ? "bg-orange-600 text-white shadow-sm"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        <Icon size={16} />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900">
                          {action.title}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {action.subtitle}
                        </div>
                      </div>
                    </div>
                    {isSelected ? (
                      <CornerDownLeft
                        size={14}
                        className="text-orange-600 shrink-0"
                      />
                    ) : (
                      <ArrowRight size={13} className="text-slate-300" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* No results fallback */}
          {query.trim() &&
            posts.length === 0 &&
            matchingTags.length === 0 &&
            selectableItems.length === 0 && (
              <div className="p-8 text-center">
                <p className="text-sm font-bold text-slate-700">
                  No direct matches for &ldquo;{query}&rdquo;
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Try searching with broader terms or check your spelling.
                </p>
                <button
                  onClick={() => navigateTo(`/?q=${encodeURIComponent(query)}`)}
                  className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-all shadow-sm"
                >
                  <Search size={13} />
                  <span>Search on Full Feed</span>
                </button>
              </div>
            )}
        </div>

        {/* Footer info bar */}
        <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded font-mono text-[10px]">
                ↑
              </kbd>
              <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded font-mono text-[10px]">
                ↓
              </kbd>
              to navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded font-mono text-[10px]">
                ↵
              </kbd>
              to select
            </span>
          </div>
          <span className="font-semibold text-orange-600">KODEX. Spotlight</span>
        </div>
      </div>
    </div>
  );
}
