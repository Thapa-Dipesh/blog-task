export default function SuperAdminUsersLoading() {
  return (
    <div className="space-y-6 max-w-6xl mx-auto animate-pulse">
      <div className="flex justify-between items-center">
        <div>
          <div className="h-8 w-64 bg-slate-200 rounded-2xl mb-2" />
          <div className="h-4 w-96 bg-slate-100 rounded-lg" />
        </div>
        <div className="h-10 w-36 bg-slate-200 rounded-2xl" />
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4">
        <div className="h-10 w-full bg-slate-100 rounded-xl" />
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-16 w-full bg-slate-50 rounded-2xl" />
        ))}
      </div>
    </div>
  );
}
