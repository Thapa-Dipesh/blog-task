import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminRootPage() {
  const session = await getSession();

  if (session) {
    if (session.role === "SUPER_ADMIN") {
      redirect("/kodex-admin/dashboard");
    }
    redirect("/admin/dashboard");
  }

  redirect("/admin/login");
}
