export default function TagLoading() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-16 animate-pulse">
      {/* Back button skeleton */}
      <div className="h-4 w-32 bg-slate-200 rounded-lg mb-8" />

      {/* Hero skeleton */}
      <div className="rounded-3xl bg-slate-900 p-12 mb-12">
        <div className="h-5 w-28 bg-slate-800 rounded-full mb-4" />
        <div className="h-10 w-64 bg-slate-800 rounded-2xl mb-4" />
        <div className="h-4 w-96 bg-slate-800/60 rounded-lg" />
      </div>

      {/* Grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="rounded-3xl border border-slate-200 p-6 flex flex-col gap-4"
          >
            <div className="aspect-video bg-slate-200 rounded-2xl" />
            <div className="h-4 w-24 bg-slate-200 rounded-md" />
            <div className="h-6 w-3/4 bg-slate-200 rounded-lg" />
            <div className="h-4 w-full bg-slate-100 rounded-md" />
          </div>
        ))}
      </div>
    </main>
  );
}
