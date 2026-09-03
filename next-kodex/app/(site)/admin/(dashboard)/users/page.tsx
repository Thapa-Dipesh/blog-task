import { requireSuperAdmin } from "@/lib/auth";
import { getAllUsers } from "@/lib/db/admin";
import { UsersTable } from "@/components/site/admin/users-table";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "User Verification & Governance | Super Admin | KODEX.",
};

export default async function AdminUsersPage() {
  const superAdmin = await requireSuperAdmin();
  const users = await getAllUsers();

  return (
    <div className="max-w-7xl mx-auto">
      <UsersTable users={users as any} currentUserId={superAdmin.id} />
    </div>
  );
}
