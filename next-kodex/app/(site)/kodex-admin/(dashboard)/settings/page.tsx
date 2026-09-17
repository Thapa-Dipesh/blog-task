import { requireSuperAdmin } from "@/lib/auth";
import { ProfileForm } from "@/components/site/settings/profile-form";
import { PasswordForm } from "@/components/site/settings/password-form";
import { ShieldCheck, KeyRound } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Console Settings | Master Console | KODEX.",
  description: "Super Admin master profile and security settings.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function SuperAdminSettingsPage() {
  const user = await requireSuperAdmin();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-2 border border-amber-200">
          <KeyRound size={12} className="text-amber-700" />
          <span>Root Authority Settings</span>
        </div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          Super Admin Console Settings
        </h1>
        <p className="text-slate-500 mt-1">
          Manage master administrator profile display and root access passwords.
        </p>
      </div>

      <div className="p-5 rounded-3xl bg-amber-50/70 border border-amber-200 text-xs text-amber-950 flex items-start gap-3">
        <ShieldCheck size={18} className="text-amber-700 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">Root Configuration Notice:</span> Super Admin base credentials are primarily derived from your environment configuration (`.env`). Modifying your password here will update your database record.
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <ProfileForm user={user} />
        <PasswordForm />
      </div>
    </div>
  );
}
