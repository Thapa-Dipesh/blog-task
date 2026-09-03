import { requireAuth } from "@/lib/auth";
import { ProfileForm } from "@/components/site/settings/profile-form";
import { PasswordForm } from "@/components/site/settings/password-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account Settings | KODEX.",
};

export default async function SettingsPage() {
  const user = await requireAuth();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          Account Settings
        </h1>
        <p className="text-slate-500 mt-1">
          Manage your personal information, display name, and password security.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* Profile Details */}
        <ProfileForm user={user} />

        {/* Password Security */}
        <PasswordForm />
      </div>
    </div>
  );
}
