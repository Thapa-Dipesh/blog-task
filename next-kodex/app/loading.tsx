export default function Loading() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-20 animate-pulse space-y-16">
      {/* Hero Skeleton */}
      <div className="space-y-6 text-center max-w-3xl mx-auto py-12">
        <div className="h-6 w-36 bg-slate-200 rounded-full mx-auto" />
        <div className="h-16 w-3/4 bg-slate-200 rounded-3xl mx-auto" />
        <div className="h-4 w-1/2 bg-slate-100 rounded-full mx-auto" />
        <div className="flex justify-center gap-3 pt-4">
          <div className="h-12 w-32 bg-slate-200 rounded-2xl" />
          <div className="h-12 w-32 bg-slate-100 rounded-2xl" />
        </div>
      </div>

      {/* Feed Filter Bar Skeleton */}
      <div className="flex items-center justify-between gap-4 pt-8">
        <div className="h-8 w-28 bg-slate-200 rounded-xl" />
        <div className="h-10 w-72 bg-slate-100 rounded-2xl" />
      </div>

      {/* Article Cards Skeleton */}
      <div className="space-y-16">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex flex-col md:flex-row gap-10 items-start border-b border-slate-100 pb-16"
          >
            <div className="w-full md:w-5/12 h-64 bg-slate-200 rounded-4xl shrink-0" />
            <div className="w-full md:w-7/12 space-y-4">
              <div className="flex gap-2">
                <div className="h-5 w-24 bg-slate-200 rounded-full" />
                <div className="h-5 w-20 bg-slate-100 rounded-full" />
              </div>
              <div className="h-8 w-4/5 bg-slate-200 rounded-2xl" />
              <div className="h-4 w-full bg-slate-100 rounded-full" />
              <div className="h-4 w-5/6 bg-slate-100 rounded-full" />
              <div className="h-4 w-28 bg-slate-200 rounded-full pt-4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
