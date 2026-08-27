'use client';

import { useState, useEffect } from 'react';
import { Save, Globe, Image as ImageIcon, Search } from 'lucide-react';

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
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="space-y-6">
                <div>
                  <input
                    type="text"
                    name="title"
                    value={title}
                    onChange={handleTitleChange}
                    placeholder="Article Title"
                    required
                    className="w-full text-4xl font-black tracking-tight text-slate-900 placeholder-slate-200 outline-none border-none focus:ring-0"
                  />
                </div>

                <div className="flex items-center gap-2 text-slate-400 border-b border-slate-100 pb-4">
                  <Globe size={14} />
                  <span className="text-xs font-mono">kodex.com/blog/</span>
                  <input
                    type="text"
                    name="slug"
                    value={slug}
                    onChange={(e) => {
                      setIsSlugTouched(true);
                      setSlug(e.target.value);
                    }}
                    placeholder="url-slug-here"
                    required
                    className="text-xs font-mono text-orange-600 outline-none bg-transparent placeholder-orange-200 flex-1"
                  />
                </div>

                <div>
                  <textarea
                    name="description"
                    rows={15}
                    defaultValue={initialData?.description}
                    placeholder="Write your article content or markdown here..."
                    required
                    className="w-full resize-none text-lg leading-relaxed text-slate-700 placeholder-slate-300 outline-none border-none focus:ring-0"
                  />
                </div>
              </div>
            </section>
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
                className="w-full text-xs file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
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
                  <label className="text-[10px] font-bold text-slate-400 uppercase">
                    Meta Title
                  </label>
                  <input
                    type="text"
                    name="metaTitle"
                    defaultValue={initialData?.metaTitle}
                    placeholder="SEO title (optional)"
                    className="w-full border-b border-slate-100 py-1 text-sm outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase">
                    Meta Description
                  </label>
                  <textarea
                    name="metaDescription"
                    rows={3}
                    defaultValue={initialData?.metaDescription}
                    placeholder="Short summary for search engines (optional)"
                    className="w-full border-b border-slate-100 py-1 text-sm outline-none focus:border-orange-500 resize-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase">
                    Keywords
                  </label>
                  <input
                    type="text"
                    name="keywords"
                    defaultValue={initialData?.keywords}
                    placeholder="Next.js, TypeScript, PostgreSQL"
                    className="w-full border-b border-slate-100 py-1 text-sm outline-none focus:border-orange-500"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-base font-bold text-white hover:bg-slate-800 transition-all active:scale-95 shadow-lg shadow-slate-200 cursor-pointer disabled:opacity-50"
            >
              <Save size={16} />
              {isLoading ? 'Saving...' : submitLabel}
            </button>
          </aside>
        </form>
      </main>
    </div>
  );
}