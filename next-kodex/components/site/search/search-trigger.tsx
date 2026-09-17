"use client";

import { Search } from "lucide-react";

interface SearchTriggerProps {
  variant?: "navbar" | "hero" | "compact";
  className?: string;
}

export default function SearchTrigger({
  variant = "navbar",
  className = "",
}: SearchTriggerProps) {
  const handleClick = () => {
    window.dispatchEvent(new CustomEvent("open-command-palette"));
  };

  if (variant === "compact") {
    return (
      <button
        onClick={handleClick}
        type="button"
        title="Search (⌘K)"
        className={`p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors cursor-pointer ${className}`}
      >
        <Search size={18} />
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      type="button"
      className={`group flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100/90 hover:bg-slate-200/90 border border-slate-200/60 text-slate-500 hover:text-slate-900 transition-all cursor-pointer ${className}`}
    >
      <Search
        size={14}
        className="text-slate-400 group-hover:text-orange-600 transition-colors"
      />
      <span className="text-xs font-medium hidden sm:inline">Search...</span>
      <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono font-bold text-slate-400 bg-white border border-slate-200 rounded-md shadow-2xs">
        ⌘K
      </kbd>
    </button>
  );
}
