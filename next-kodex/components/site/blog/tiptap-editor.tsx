"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import CharacterCount from "@tiptap/extension-character-count";
import { useState, useEffect } from "react";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Code,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  FileCode,
  Minus,
  Link as LinkIcon,
  Unlink,
  Image as ImageIcon,
  Undo,
  Redo,
  RemoveFormatting,
} from "lucide-react";

interface TipTapEditorProps {
  name?: string;
  defaultValue?: string;
  placeholder?: string;
}

export function TipTapEditor({
  name = "description",
  defaultValue = "",
  placeholder = "Start drafting your technical article, system architecture notes, or guides...",
}: TipTapEditorProps) {
  const [content, setContent] = useState(defaultValue);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-orange-600 underline font-semibold cursor-pointer",
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: "rounded-3xl max-w-full my-6 border border-slate-200 shadow-md",
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
      CharacterCount,
    ],
    content: defaultValue,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "tiptap prose max-w-none focus:outline-none min-h-[400px] p-6 md:p-8 text-base md:text-lg leading-relaxed text-slate-800",
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setContent(html);
    },
  });

  useEffect(() => {
    if (editor && defaultValue && editor.isEmpty) {
      editor.commands.setContent(defaultValue);
      setContent(defaultValue);
    }
  }, [defaultValue, editor]);

  if (!editor) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-8 min-h-[400px] flex items-center justify-center text-slate-400">
        Loading editor...
      </div>
    );
  }

  const addLink = () => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("Enter URL (e.g. https://example.com):", previousUrl);

    if (url === null) {
      return;
    }

    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  const addImage = () => {
    const url = window.prompt("Enter image URL (e.g. https://images.unsplash.com/...):");

    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const words = editor.storage.characterCount.words();
  const characters = editor.storage.characterCount.characters();
  const readingTime = Math.max(1, Math.ceil(words / 200));

  return (
    <div className="rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-sm flex flex-col transition-all focus-within:border-orange-400 focus-within:ring-2 focus-within:ring-orange-500/10">
      {/* Editor Toolbar */}
      <div className="sticky top-0 z-20 flex flex-wrap items-center justify-between gap-1.5 p-2.5 bg-slate-50/90 backdrop-blur-md border-b border-slate-200/80">
        <div className="flex flex-wrap items-center gap-1">
          {/* History */}
          <ToolbarButton
            icon={<Undo size={15} />}
            title="Undo (Ctrl+Z)"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
          />
          <ToolbarButton
            icon={<Redo size={15} />}
            title="Redo (Ctrl+Y)"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
          />

          <div className="h-4 w-px bg-slate-300 mx-1" />

          {/* Headings */}
          <ToolbarButton
            icon={<Heading1 size={15} />}
            title="Heading 1"
            isActive={editor.isActive("heading", { level: 1 })}
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          />
          <ToolbarButton
            icon={<Heading2 size={15} />}
            title="Heading 2"
            isActive={editor.isActive("heading", { level: 2 })}
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          />
          <ToolbarButton
            icon={<Heading3 size={15} />}
            title="Heading 3"
            isActive={editor.isActive("heading", { level: 3 })}
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          />

          <div className="h-4 w-px bg-slate-300 mx-1" />

          {/* Inline Formats */}
          <ToolbarButton
            icon={<Bold size={15} />}
            title="Bold (Ctrl+B)"
            isActive={editor.isActive("bold")}
            onClick={() => editor.chain().focus().toggleBold().run()}
          />
          <ToolbarButton
            icon={<Italic size={15} />}
            title="Italic (Ctrl+I)"
            isActive={editor.isActive("italic")}
            onClick={() => editor.chain().focus().toggleItalic().run()}
          />
          <ToolbarButton
            icon={<UnderlineIcon size={15} />}
            title="Underline (Ctrl+U)"
            isActive={editor.isActive("underline")}
            onClick={() => editor.chain().focus().toggleUnderline().run()}
          />
          <ToolbarButton
            icon={<Strikethrough size={15} />}
            title="Strikethrough"
            isActive={editor.isActive("strike")}
            onClick={() => editor.chain().focus().toggleStrike().run()}
          />
          <ToolbarButton
            icon={<Code size={15} />}
            title="Inline Code"
            isActive={editor.isActive("code")}
            onClick={() => editor.chain().focus().toggleCode().run()}
          />

          <div className="h-4 w-px bg-slate-300 mx-1" />

          {/* Blocks */}
          <ToolbarButton
            icon={<Quote size={15} />}
            title="Blockquote"
            isActive={editor.isActive("blockquote")}
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
          />
          <ToolbarButton
            icon={<FileCode size={15} />}
            title="Code Block"
            isActive={editor.isActive("codeBlock")}
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          />
          <ToolbarButton
            icon={<List size={15} />}
            title="Bullet List"
            isActive={editor.isActive("bulletList")}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
          />
          <ToolbarButton
            icon={<ListOrdered size={15} />}
            title="Ordered List"
            isActive={editor.isActive("orderedList")}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
          />
          <ToolbarButton
            icon={<Minus size={15} />}
            title="Horizontal Divider"
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
          />

          <div className="h-4 w-px bg-slate-300 mx-1" />

          {/* Links & Media */}
          <ToolbarButton
            icon={<LinkIcon size={15} />}
            title="Insert Link"
            isActive={editor.isActive("link")}
            onClick={addLink}
          />
          {editor.isActive("link") && (
            <ToolbarButton
              icon={<Unlink size={15} />}
              title="Remove Link"
              onClick={() => editor.chain().focus().unsetLink().run()}
            />
          )}
          <ToolbarButton
            icon={<ImageIcon size={15} />}
            title="Insert Image by URL"
            onClick={addImage}
          />

          <div className="h-4 w-px bg-slate-300 mx-1" />

          <ToolbarButton
            icon={<RemoveFormatting size={15} />}
            title="Clear Formatting"
            onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}
          />
        </div>
      </div>

      {/* Editor Content Area */}
      <div className="min-h-[420px] bg-white cursor-text" onClick={() => editor.chain().focus().run()}>
        <EditorContent editor={editor} />
      </div>

      {/* Hidden input to pass HTML to FormData on form submit */}
      <input type="hidden" name={name} value={content} />

      {/* Stats Bar */}
      <div className="flex items-center justify-between px-6 py-2.5 bg-slate-50/80 border-t border-slate-100 text-[11px] font-mono text-slate-400">
        <div className="flex items-center gap-4">
          <span>{words} words</span>
          <span>{characters} characters</span>
          <span>~{readingTime} min read</span>
        </div>
        <div className="flex items-center gap-2 font-sans font-medium text-slate-400">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>TipTap Rich Editor</span>
        </div>
      </div>
    </div>
  );
}

function ToolbarButton({
  icon,
  title,
  onClick,
  isActive = false,
  disabled = false,
}: {
  icon: React.ReactNode;
  title: string;
  onClick: () => void;
  isActive?: boolean;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`p-2 rounded-xl transition-all cursor-pointer active:scale-95 text-xs ${
        isActive
          ? "bg-slate-900 text-white shadow-xs"
          : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/70"
      } disabled:opacity-30 disabled:cursor-not-allowed`}
      title={title}
    >
      {icon}
    </button>
  );
}
