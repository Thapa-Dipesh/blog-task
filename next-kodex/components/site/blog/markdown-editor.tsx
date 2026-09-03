"use client";

import { useState, useRef } from "react";
import {
  Bold,
  Italic,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  Quote,
  Code,
  FileCode,
  List,
  ListOrdered,
  Link as LinkIcon,
  Table,
  Eye,
  Edit3,
  Columns,
} from "lucide-react";
import { MarkdownRenderer } from "./markdown-renderer";

interface MarkdownEditorProps {
  name?: string;
  defaultValue?: string;
  placeholder?: string;
  rows?: number;
}

export function MarkdownEditor({
  name = "description",
  defaultValue = "",
  placeholder = "Write your technical article, insights, or guide in markdown...",
  rows = 18,
}: MarkdownEditorProps) {
  const [content, setContent] = useState(defaultValue);
  const [mode, setMode] = useState<"write" | "preview" | "split">("write");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const wordsCount = content.trim() ? content.trim().split(/\s+/).length : 0;
  const charsCount = content.length;
  const readTime = Math.max(1, Math.ceil(wordsCount / 200));

  const insertFormat = (prefix: string, suffix: string = "", placeholderText: string = "") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = content.substring(start, end) || placeholderText;
    const replacement = `${prefix}${selected}${suffix}`;

    const newContent =
      content.substring(0, start) + replacement + content.substring(end);
    setContent(newContent);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + prefix.length,
        start + prefix.length + selected.length
      );
    }, 0);
  };

  const insertTemplate = (template: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const newContent =
      content.substring(0, start) + template + content.substring(end);
    setContent(newContent);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + template.length, start + template.length);
    }, 0);
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-sm flex flex-col">
      {/* Editor Header / Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-slate-50/80 border-b border-slate-200">
        {/* Formatting Buttons */}
        <div className="flex flex-wrap items-center gap-1">
          <ToolbarButton
            icon={<Bold size={15} />}
            title="Bold (**text**)"
            onClick={() => insertFormat("**", "**", "bold text")}
          />
          <ToolbarButton
            icon={<Italic size={15} />}
            title="Italic (*text*)"
            onClick={() => insertFormat("*", "*", "italic text")}
          />
          <ToolbarButton
            icon={<Strikethrough size={15} />}
            title="Strikethrough (~~text~~)"
            onClick={() => insertFormat("~~", "~~", "strikethrough")}
          />

          <div className="h-4 w-px bg-slate-300 mx-1" />

          <ToolbarButton
            icon={<Heading1 size={15} />}
            title="Heading 1"
            onClick={() => insertFormat("\n# ", "\n", "Heading 1")}
          />
          <ToolbarButton
            icon={<Heading2 size={15} />}
            title="Heading 2"
            onClick={() => insertFormat("\n## ", "\n", "Heading 2")}
          />
          <ToolbarButton
            icon={<Heading3 size={15} />}
            title="Heading 3"
            onClick={() => insertFormat("\n### ", "\n", "Heading 3")}
          />

          <div className="h-4 w-px bg-slate-300 mx-1" />

          <ToolbarButton
            icon={<Quote size={15} />}
            title="Blockquote"
            onClick={() => insertFormat("\n> ", "\n", "Important takeaway")}
          />
          <ToolbarButton
            icon={<Code size={15} />}
            title="Inline Code (`code`)"
            onClick={() => insertFormat("`", "`", "variableName")}
          />
          <ToolbarButton
            icon={<FileCode size={15} />}
            title="Code Block"
            onClick={() =>
              insertTemplate("\n```typescript\n// Write code here\nconsole.log('Hello World');\n```\n")
            }
          />

          <div className="h-4 w-px bg-slate-300 mx-1" />

          <ToolbarButton
            icon={<List size={15} />}
            title="Bullet List"
            onClick={() => insertFormat("\n- ", "\n", "List item")}
          />
          <ToolbarButton
            icon={<ListOrdered size={15} />}
            title="Numbered List"
            onClick={() => insertFormat("\n1. ", "\n", "First item")}
          />
          <ToolbarButton
            icon={<LinkIcon size={15} />}
            title="Link ([title](url))"
            onClick={() => insertFormat("[", "](https://example.com)", "link title")}
          />
          <ToolbarButton
            icon={<Table size={15} />}
            title="Insert Table"
            onClick={() =>
              insertTemplate(
                "\n| Feature | Status | Description |\n|---|---|---|\n| Server Actions | Supported | Fast mutations |\n| Prisma | Supported | Full type-safety |\n"
              )
            }
          />
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-1 bg-slate-200/80 p-1 rounded-xl text-xs font-semibold text-slate-700">
          <button
            type="button"
            onClick={() => setMode("write")}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              mode === "write"
                ? "bg-white text-slate-900 shadow-sm"
                : "hover:text-slate-900"
            }`}
          >
            <Edit3 size={13} />
            <span>Write</span>
          </button>
          <button
            type="button"
            onClick={() => setMode("preview")}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              mode === "preview"
                ? "bg-white text-slate-900 shadow-sm"
                : "hover:text-slate-900"
            }`}
          >
            <Eye size={13} />
            <span>Preview</span>
          </button>
          <button
            type="button"
            onClick={() => setMode("split")}
            className={`hidden md:flex items-center gap-1 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              mode === "split"
                ? "bg-white text-slate-900 shadow-sm"
                : "hover:text-slate-900"
            }`}
          >
            <Columns size={13} />
            <span>Split</span>
          </button>
        </div>
      </div>

      {/* Editor Main Content Area */}
      <div className="flex-1 min-h-[420px] relative">
        {mode === "write" && (
          <textarea
            ref={textareaRef}
            name={name}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={rows}
            placeholder={placeholder}
            required
            className="w-full h-full p-6 text-base md:text-lg leading-relaxed text-slate-800 placeholder-slate-300 font-mono resize-y outline-none border-none focus:ring-0"
          />
        )}

        {mode === "preview" && (
          <div className="p-8 max-h-[650px] overflow-y-auto bg-white">
            {content.trim() ? (
              <MarkdownRenderer content={content} />
            ) : (
              <p className="text-slate-400 italic text-sm">
                Nothing to preview. Start typing markdown to see live output here!
              </p>
            )}
            {/* Keep hidden input for form submission */}
            <input type="hidden" name={name} value={content} />
          </div>
        )}

        {mode === "split" && (
          <div className="grid grid-cols-2 divide-x divide-slate-200 h-full min-h-[500px]">
            <textarea
              ref={textareaRef}
              name={name}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={placeholder}
              required
              className="w-full h-full p-6 text-sm font-mono leading-relaxed text-slate-800 placeholder-slate-300 resize-none outline-none border-none focus:ring-0"
            />
            <div className="p-6 max-h-[550px] overflow-y-auto bg-slate-50/40">
              {content.trim() ? (
                <MarkdownRenderer content={content} />
              ) : (
                <p className="text-slate-400 italic text-xs">Live markdown preview...</p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Editor Footer / Stats Bar */}
      <div className="flex items-center justify-between px-6 py-2.5 bg-slate-50/60 border-t border-slate-100 text-[11px] font-mono text-slate-400">
        <div className="flex items-center gap-4">
          <span>{wordsCount} words</span>
          <span>{charsCount} characters</span>
          <span>~{readTime} min read</span>
        </div>
        <div className="flex items-center gap-2 text-slate-400">
          <span>Markdown Supported (GFM)</span>
        </div>
      </div>
    </div>
  );
}

function ToolbarButton({
  icon,
  title,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-200/70 transition-colors active:scale-95 cursor-pointer"
      title={title}
    >
      {icon}
    </button>
  );
}
