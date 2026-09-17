import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function KodexAdminRootPage() {
  const session = await getSession();

  if (session && session.role === "SUPER_ADMIN") {
    redirect("/kodex-admin/dashboard");
  }

  redirect("/kodex-admin/login");
}
