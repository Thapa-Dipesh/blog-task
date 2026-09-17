import { requireSuperAdmin } from "@/lib/auth";
import { getAllUsers } from "@/lib/db/admin";
import { UsersTable } from "@/components/site/admin/users-table";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "User Verification & Approvals | Master Console | KODEX.",
  description: "Review, approve, suspend, and govern platform authors and admins.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function SuperAdminUsersPage() {
  const superAdmin = await requireSuperAdmin();
  const users = await getAllUsers();

  return (
    <div className="max-w-6xl mx-auto">
      <UsersTable users={users as any} currentUserId={superAdmin.id} />
    </div>
  );
}
