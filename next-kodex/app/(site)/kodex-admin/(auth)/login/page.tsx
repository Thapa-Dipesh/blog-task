import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import SuperAdminLoginForm from "@/components/site/auth/super-admin-login-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Super Admin Master Login | KODEX.",
  description: "Secure root access portal for KODEX platform administrators.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function SuperAdminLoginPage() {
  const user = await getSession();

  if (user?.role === "SUPER_ADMIN") {
    redirect("/kodex-admin/dashboard");
  }

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-6 py-16 bg-radial from-amber-50/40 via-background to-background">
      <SuperAdminLoginForm />
    </div>
  );
}
