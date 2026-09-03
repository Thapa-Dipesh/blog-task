'use client';

import { useState } from 'react';
import { Save, Globe, Image as ImageIcon, Search } from 'lucide-react';
import { MarkdownEditor } from './markdown-editor';

interface PostFormProps {
  initialData?: {
    id?: string;
    title?: string;
    slug?: string;
    description?: string;
    image?: string;
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string;
  };
  onSubmit: (formData: FormData) => Promise<void>;
  isLoading: boolean;
  submitLabel: string;
}

export function PostForm({ initialData, onSubmit, isLoading, submitLabel }: PostFormProps) {
  const [preview, setPreview] = useState<string>(initialData?.image || '');
  const [title, setTitle] = useState(initialData?.title || '');
  const [slug, setSlug] = useState(initialData?.slug || '');
  const [isSlugTouched, setIsSlugTouched] = useState(!!initialData?.slug);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    if (!isSlugTouched) {
      const generatedSlug = val
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
      setSlug(generatedSlug);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await onSubmit(formData);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="mx-auto max-w-7xl px-8 py-10">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-10 lg:grid-cols-3"
        >
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title & Slug Box */}
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm space-y-6">
              <div>
                <input
                  type="text"
                  name="title"
                  value={title}
                  onChange={handleTitleChange}
                  placeholder="Article Title..."
                  required
                  className="w-full text-3xl md:text-4xl font-black tracking-tight text-slate-900 placeholder-slate-200 outline-none border-none focus:ring-0"
                />
              </div>

              <div className="flex items-center gap-2 text-slate-400 border-t border-slate-100 pt-4">
                <Globe size={14} />
                <span className="text-xs font-mono text-slate-400">kodex.com/blog/</span>
                <input
                  type="text"
                  name="slug"
                  value={slug}
                  onChange={(e) => {
                    setIsSlugTouched(true);
                    setSlug(e.target.value);
                  }}
                  placeholder="custom-url-slug"
                  required
                  className="text-xs font-mono text-orange-600 outline-none bg-transparent placeholder-orange-200 flex-1 font-semibold"
                />
              </div>
            </div>

            {/* Markdown Rich Content Editor */}
            <div>
              <div className="flex items-center justify-between mb-2 px-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Article Content (Markdown)
                </label>
              </div>
              <MarkdownEditor
                name="description"
                defaultValue={initialData?.description || ""}
                placeholder="Write your story, technical tutorial, or architecture notes using markdown..."
                rows={16}
              />
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Cover Image */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="mb-4 flex items-center gap-2 text-sm font-bold text-slate-900 uppercase tracking-wider">
                <ImageIcon size={16} /> Cover Image
              </h3>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full text-xs file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100 cursor-pointer"
              />
              {preview && (
                <div className="mt-4 overflow-hidden rounded-xl border border-slate-100">
                  <img
                    src={preview}
                    alt="Preview"
                    className="h-36 w-full object-cover"
                  />
                </div>
              )}
            </div>

            {/* SEO Settings */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="mb-4 flex items-center gap-2 text-sm font-bold text-slate-900 uppercase tracking-wider">
                <Search size={16} /> SEO Settings
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">
                    Meta Title
                  </label>
                  <input
                    type="text"
                    name="metaTitle"
                    defaultValue={initialData?.metaTitle}
                    placeholder="SEO title (optional)"
                    className="w-full border-b border-slate-100 py-1.5 text-sm outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">
                    Meta Description
                  </label>
                  <textarea
                    name="metaDescription"
                    rows={3}
                    defaultValue={initialData?.metaDescription}
                    placeholder="Short summary for search engines (optional)"
                    className="w-full border-b border-slate-100 py-1.5 text-sm outline-none focus:border-orange-500 resize-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">
                    Keywords (comma separated)
                  </label>
                  <input
                    type="text"
                    name="keywords"
                    defaultValue={initialData?.keywords}
                    placeholder="React, Next.js, TypeScript"
                    className="w-full border-b border-slate-100 py-1.5 text-sm outline-none focus:border-orange-500"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-6 py-3.5 text-base font-bold text-white hover:bg-slate-800 transition-all active:scale-95 shadow-lg shadow-slate-200 cursor-pointer disabled:opacity-50"
            >
              <Save size={16} />
              {isLoading ? 'Saving Changes...' : submitLabel}
            </button>
          </aside>
        </form>
      </main>
    </div>
  );
}