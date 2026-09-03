export default function UsersLoading() {
  return (
    <div className="space-y-8 animate-pulse max-w-7xl mx-auto">
      <div className="space-y-2">
        <div className="h-8 w-64 bg-slate-200 rounded-2xl" />
        <div className="h-4 w-96 bg-slate-100 rounded-full" />
      </div>

      <div className="h-16 bg-white rounded-3xl border border-slate-200/80" />

      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex items-center justify-between py-4 border-b border-slate-50">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-slate-100 rounded-2xl" />
              <div className="space-y-2">
                <div className="h-4 w-44 bg-slate-200 rounded-full" />
                <div className="h-3 w-32 bg-slate-100 rounded-full" />
              </div>
            </div>
            <div className="h-6 w-24 bg-slate-100 rounded-full" />
            <div className="h-6 w-20 bg-slate-100 rounded-full" />
            <div className="h-8 w-28 bg-slate-100 rounded-xl" />
          </div>
        ))}
      </div>
    </div>
  );
}
