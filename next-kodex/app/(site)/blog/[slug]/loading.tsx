export default function BlogPostLoading() {
  return (
    <div className="bg-white min-h-screen pb-24">
      <div className="max-w-4xl mx-auto px-6 pt-12 animate-pulse space-y-8">
        <div className="h-4 w-28 bg-slate-200 rounded-full mb-10" />

        <div className="space-y-4">
          <div className="flex gap-2">
            <div className="h-6 w-32 bg-slate-200 rounded-full" />
            <div className="h-6 w-24 bg-slate-100 rounded-full" />
          </div>
          <div className="h-14 w-4/5 bg-slate-200 rounded-3xl" />
        </div>

        <div className="flex items-center justify-between py-6 border-y border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-slate-200 rounded-full" />
            <div className="space-y-2">
              <div className="h-4 w-28 bg-slate-200 rounded-full" />
              <div className="h-3 w-36 bg-slate-100 rounded-full" />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="w-8 h-8 bg-slate-100 rounded-full" />
            <div className="w-8 h-8 bg-slate-100 rounded-full" />
          </div>
        </div>

        <div className="w-full h-96 bg-slate-200 rounded-4xl" />

        <div className="space-y-4 max-w-2xl mx-auto pt-8">
          <div className="h-5 w-full bg-slate-200 rounded-full" />
          <div className="h-5 w-full bg-slate-200 rounded-full" />
          <div className="h-5 w-4/5 bg-slate-100 rounded-full" />
          <div className="h-5 w-full bg-slate-100 rounded-full" />
          <div className="h-5 w-3/4 bg-slate-200 rounded-full" />
        </div>
      </div>
    </div>
  );
}
