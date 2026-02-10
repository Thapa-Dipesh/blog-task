import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Save,
  ChevronLeft,
  Trash2,
  History,
  AlertCircle,
  Image as ImageIcon,
} from "lucide-react";
import {
  useGetPostByIdQuery,
  useUpdatePostMutation,
  useDeletePostMutation,
} from "../features/api/postApi";
import toast from "react-hot-toast";

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // 1. RTK Query Hooks
  const { data: postData, isLoading: isFetching } = useGetPostByIdQuery(
    id as string,
  );
  const [updatePost, { isLoading: isUpdating }] = useUpdatePostMutation();
  const [deletePost] = useDeletePostMutation();

  // 2. Local State for Form
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    image: "",
    metaTitle: "",
    metaDescription: "",
    keywords: "",
  });

  // 3. Populate form when data arrives
  useEffect(() => {
    if (postData) {
      setFormData({
        title: postData.title || "",
        slug: postData.slug || "",
        description: postData.description || "",
        image: postData.image || "",
        metaTitle: postData.metaTitle || "",
        metaDescription: postData.metaDescription || "",
        keywords: postData.keywords || "",
      });
    }
  }, [postData]);

  if (isFetching)
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-slate-100 border-t-orange-600 rounded-full animate-spin"></div>
          <div className="text-slate-400 font-bold text-xs uppercase tracking-[0.3em] animate-pulse">
            Retrieving Post Data...
          </div>
        </div>
      </div>
    );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updatePost({ id, ...formData }).unwrap();
      toast.success("Post updated successfully!");
      navigate("/my-blogs");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure? This action is permanent.")) {
      try {
        await deletePost(id).unwrap();
        toast.success("Post deleted");
        navigate("/my-blogs");
      } catch (err) {
        toast.error("Delete failed");
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD]">
      <title>
        {postData ? `Editing: ${postData.title}` : "Loading Post..."}
      </title>
      {/* Action Bar */}
      <header className="sticky top-0 z-30 border-b bg-white/80 backdrop-blur-md px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500"
            >
              <ChevronLeft size={20} />
            </button>
            <div>
              <h1 className="text-sm font-bold text-slate-900 leading-none">
                Edit Post
              </h1>
              <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
                <History size={10} /> ID: {id?.slice(-6)}
              </p>
            </div>
          </div>

          <button
            onClick={handleUpdate}
            disabled={isUpdating}
            className="flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-2.5 text-sm font-bold text-white hover:bg-slate-800 transition-all active:scale-95 shadow-lg shadow-slate-200 cursor-pointer"
          >
            <Save size={16} />
            {isUpdating ? "Saving Changes..." : "Save Changes"}
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-8 py-10">
        <form
          onSubmit={handleUpdate}
          className="grid grid-cols-1 gap-10 lg:grid-cols-3"
        >
          {/* Main Editor */}
          <div className="lg:col-span-2 space-y-8">
            <section className="rounded-[2rem] border border-slate-100 bg-white p-10 shadow-sm">
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Title"
                className="w-full text-4xl font-black tracking-tighter text-slate-900 outline-none border-b border-gray-300 pb-4 focus:ring-0 mb-6"
              />
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={18}
                placeholder="Start writing..."
                className="w-full resize-none text-lg leading-relaxed text-slate-600 outline-none border-none focus:ring-0"
              />
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Image Preview */}
            <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                <ImageIcon size={14} /> Featured Image
              </h3>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="w-full text-xs p-3 bg-slate-50 rounded-xl border border-slate-100 outline-none mb-4"
                placeholder="Image URL"
              />
              {formData.image && (
                <img
                  src={formData.image}
                  alt="Preview"
                  className="w-full h-40 object-cover rounded-2xl border"
                />
              )}
            </div>

            {/* SEO Settings */}
            <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-xs font-black text-slate-900 uppercase tracking-widest">
                SEO Configuration
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 block mb-1 uppercase">
                    Slug
                  </label>
                  <input
                    name="slug"
                    value={formData.slug}
                    onChange={handleChange}
                    className="w-full text-xs p-2 bg-slate-50 rounded-lg border border-slate-100 font-mono text-blue-600 outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 block mb-1 uppercase">
                    Meta Title
                  </label>
                  <input
                    name="metaTitle"
                    value={formData.metaTitle}
                    onChange={handleChange}
                    className="w-full text-xs p-2 border border-slate-100 rounded-lg outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 block mb-1 uppercase">
                    Keywords
                  </label>
                  <input
                    name="keywords"
                    value={formData.keywords}
                    onChange={handleChange}
                    className="w-full text-xs p-2 border border-slate-100 rounded-lg outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Delete Zone */}
            <div className="rounded-3xl border border-red-50 bg-red-50/30 p-6">
              <h3 className="mb-2 text-xs font-black text-red-600 uppercase tracking-widest flex items-center gap-2">
                <AlertCircle size={14} /> Danger Zone
              </h3>
              <p className="text-[10px] text-red-400 mb-4 font-medium">
                This post will be permanently removed from the public site.
              </p>
              <button
                type="button"
                onClick={handleDelete}
                className="w-full py-3 bg-white border border-red-100 text-red-600 text-xs font-bold rounded-2xl hover:bg-red-600 hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Trash2 size={14} /> Delete Permanently
              </button>
            </div>
          </aside>
        </form>
      </main>
    </div>
  );
};

export default EditBlog;
