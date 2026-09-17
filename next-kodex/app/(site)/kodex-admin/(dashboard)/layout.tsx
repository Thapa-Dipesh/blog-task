import { requireSuperAdmin } from "@/lib/auth";
import { getPendingUsersCount } from "@/lib/db/admin";
import { SuperAdminSidebar } from "@/components/site/super-admin/super-sidebar";

export default async function SuperAdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireSuperAdmin();
  const pendingCount = await getPendingUsersCount();

  return (
    <div className="flex min-h-screen bg-slate-900/5">
      <SuperAdminSidebar user={user} pendingCount={pendingCount} />
      <main className="flex-1 min-w-0 p-8 md:p-12 overflow-y-auto">
        <div className="max-w-6xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
