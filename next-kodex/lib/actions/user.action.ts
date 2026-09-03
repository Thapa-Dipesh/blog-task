"use server";

import { requireAuth, verifyPassword, hashPassword, signJWT, setSessionCookie } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { updateProfileSchema, changePasswordSchema } from "@/lib/validations/user.schema";
import { revalidatePath } from "next/cache";

export interface UserActionState {
  error?: string;
  success?: boolean;
  message?: string;
}

export async function updateProfile(
  prevState: UserActionState | null,
  formData: FormData
): Promise<UserActionState> {
  const user = await requireAuth();

  const rawData = {
    name: formData.get("name"),
  };

  const validation = updateProfileSchema.safeParse(rawData);
  if (!validation.success) {
    return { error: validation.error.issues[0]?.message || "Invalid input" };
  }

  const { name } = validation.data;

  try {
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { name },
    });

    // Refresh JWT session cookie with new name
    const newToken = await signJWT({
      id: updatedUser.id,
      email: updatedUser.email,
      name: updatedUser.name,
      role: updatedUser.role,
    });
    await setSessionCookie(newToken);

    revalidatePath("/admin/settings");
    revalidatePath("/admin/dashboard");
    revalidatePath("/admin/blogs");
    revalidatePath("/");

    return {
      success: true,
      message: "Profile name updated successfully!",
    };
  } catch (error) {
    console.error("Error updating profile:", error);
    return { error: "Failed to update profile. Please try again." };
  }
}

export async function changePassword(
  prevState: UserActionState | null,
  formData: FormData
): Promise<UserActionState> {
  const user = await requireAuth();

  const rawData = {
    currentPassword: formData.get("currentPassword"),
    newPassword: formData.get("newPassword"),
    confirmPassword: formData.get("confirmPassword"),
  };

  const validation = changePasswordSchema.safeParse(rawData);
  if (!validation.success) {
    return { error: validation.error.issues[0]?.message || "Invalid input" };
  }

  const { currentPassword, newPassword } = validation.data;

  try {
    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
    });

    if (!dbUser) {
      return { error: "User not found" };
    }

    const isCurrentValid = await verifyPassword(currentPassword, dbUser.password);
    if (!isCurrentValid) {
      return { error: "Incorrect current password" };
    }

    const hashedPassword = await hashPassword(newPassword);

    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });

    return {
      success: true,
      message: "Password changed successfully!",
    };
  } catch (error) {
    console.error("Error changing password:", error);
    return { error: "Failed to change password. Please try again." };
  }
}
