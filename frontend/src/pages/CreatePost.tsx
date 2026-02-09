import React, { useState } from "react";
import { Save, Globe, Image as ImageIcon, Search } from "lucide-react";
import { useCreatePostMutation } from "../features/api/postApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    metaTitle: "",
    metaDescription: "",
    keywords: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null); // State for the actual file
  const [preview, setPreview] = useState<string>(""); // State for local preview

  const navigate = useNavigate();
  const [createPost, { isLoading }] = useCreatePostMutation();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file)); // Create a temporary URL for preview
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Create a Multi-part Form Data object
    const data = new FormData();
    data.append("title", formData.title);
    data.append("slug", formData.slug);
    data.append("description", formData.description);
    data.append("metaTitle", formData.metaTitle);
    data.append("metaDescription", formData.metaDescription);
    data.append("keywords", formData.keywords);

    if (imageFile) {
      data.append("image", imageFile); // 'image' must match your Multer .single('image') name
    }

    try {
      await createPost(data).unwrap(); // Send the FormData object
      toast.success("Post published!");
      navigate("/my-blogs");
    } catch (error: any) {
      toast.error(error.data?.message || "Something went wrong");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="mx-auto max-w-7xl px-8 py-10">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-10 lg:grid-cols-3"
        >
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="space-y-6">
                <div>
                  <input
                    type="text"
                    name="title"
                    placeholder="Article Title"
                    required
                    className="w-full text-4xl font-black tracking-tight text-slate-900 placeholder-slate-200 outline-none border-none focus:ring-0"
                    onChange={handleChange}
                  />
                </div>

                <div className="flex items-center gap-2 text-slate-400 border-b border-slate-100 pb-4">
                  <Globe size={14} />
                  <span className="text-xs font-mono">
                    growssence.com/blog/
                  </span>
                  <input
                    type="text"
                    name="slug"
                    placeholder="url-slug-here"
                    required
                    className="text-xs font-mono text-orange-600 outline-none bg-transparent placeholder-orange-200"
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <textarea
                    name="description"
                    rows={15}
                    placeholder="Write your story here..."
                    className="w-full resize-none text-lg leading-relaxed text-slate-700 placeholder-slate-300 outline-none border-none focus:ring-0"
                    onChange={handleChange}
                  />
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar - SEO & Settings */}
          <aside className="space-y-6">
            {/* Featured Image Section */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="mb-4 flex items-center gap-2 text-sm font-bold text-slate-900 uppercase tracking-wider">
                <ImageIcon size={16} /> Cover Image
              </h3>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full text-xs file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
              />
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="mt-4 h-32 w-full rounded-xl object-cover"
                />
              )}
            </div>

            {/* SEO Settings Section */}
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
                    className="w-full border-b border-slate-100 py-1 text-sm outline-none focus:border-orange-500"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase">
                    Meta Description
                  </label>
                  <textarea
                    name="metaDescription"
                    rows={3}
                    className="w-full border-b border-slate-100 py-1 text-sm outline-none focus:border-orange-500 resize-none"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase">
                    Keywords
                  </label>
                  <input
                    type="text"
                    name="keywords"
                    placeholder="React, Tech, 2026"
                    className="w-full border-b border-slate-100 py-1 text-sm outline-none focus:border-orange-500"
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-base font-bold text-white hover:bg-slate-800 transition-all active:scale-95 shadow-lg shadow-slate-200 cursor-pointer"
            >
              <Save size={16} />
              {isLoading ? "Publishing..." : "Publish Post"}
            </button>
          </aside>
        </form>
      </main>
    </div>
  );
};

export default CreatePost;
