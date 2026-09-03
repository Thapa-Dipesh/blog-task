export default function DashboardLoading() {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="space-y-2">
        <div className="h-8 w-44 bg-slate-200 rounded-2xl" />
        <div className="h-4 w-72 bg-slate-100 rounded-full" />
      </div>

      {/* Stats Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-white rounded-3xl border border-slate-200/80 p-6 space-y-4"
          >
            <div className="flex justify-between items-center">
              <div className="w-10 h-10 bg-slate-100 rounded-xl" />
              <div className="h-4 w-12 bg-slate-100 rounded-full" />
            </div>
            <div className="h-8 w-20 bg-slate-200 rounded-xl" />
            <div className="h-3 w-28 bg-slate-100 rounded-full" />
          </div>
        ))}
      </div>

      {/* Content Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200/80 p-6 space-y-4">
          <div className="h-6 w-36 bg-slate-200 rounded-xl" />
          <div className="space-y-3 pt-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-4 py-3 border-b border-slate-50">
                <div className="w-12 h-12 bg-slate-100 rounded-xl shrink-0" />
                <div className="space-y-2 flex-1">
                  <div className="h-4 w-3/4 bg-slate-200 rounded-full" />
                  <div className="h-3 w-1/3 bg-slate-100 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 space-y-4">
            <div className="h-4 w-28 bg-slate-200 rounded-full" />
            <div className="h-12 w-full bg-slate-100 rounded-2xl" />
            <div className="h-12 w-full bg-slate-100 rounded-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
