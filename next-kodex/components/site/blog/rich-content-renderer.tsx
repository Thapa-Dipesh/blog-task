"use client";

import { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface RichContentRendererProps {
  content: string;
  className?: string;
}

export function RichContentRenderer({
  content,
  className = "",
}: RichContentRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const isHtml = /<[a-z][\s\S]*>/i.test(content || "");

  // Add Copy Button to all code blocks in rendered HTML
  useEffect(() => {
    if (!containerRef.current) return;

    const pres = containerRef.current.querySelectorAll("pre");
    pres.forEach((pre) => {
      if (pre.querySelector(".code-copy-btn")) return;

      const button = document.createElement("button");
      button.className =
        "code-copy-btn absolute top-3 right-3 px-2.5 py-1 text-xs font-mono rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-all cursor-pointer select-none shadow-sm";
      button.innerText = "Copy";

      button.addEventListener("click", () => {
        const code = pre.querySelector("code")?.innerText || pre.innerText;
        navigator.clipboard.writeText(code.replace(/Copy$/, "").trim());
        button.innerText = "Copied!";
        button.classList.add("text-emerald-400");
        setTimeout(() => {
          button.innerText = "Copy";
          button.classList.remove("text-emerald-400");
        }, 2000);
      });

      pre.style.position = "relative";
      pre.appendChild(button);
    });
  }, [content]);

  if (!content) {
    return null;
  }

  if (isHtml) {
    return (
      <div
        ref={containerRef}
        className={`rich-article-content ${className}`}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  }

  // Gracefully fallback to Markdown rendering for any markdown or plain-text posts
  return (
    <div ref={containerRef} className={`rich-article-content ${className}`}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
