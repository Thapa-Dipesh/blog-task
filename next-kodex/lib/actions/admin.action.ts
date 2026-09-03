"use server";

import { requireSuperAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function approveUser(userId: string) {
  await requireSuperAdmin();

  try {
    await prisma.user.update({
      where: { id: userId },
      data: { status: "APPROVED" },
    });

    revalidatePath("/admin/users");
    revalidatePath("/admin/dashboard");
    return { success: true, message: "User account approved successfully" };
  } catch (error) {
    console.error("Error approving user:", error);
    return { error: "Failed to approve user" };
  }
}

export async function rejectUser(userId: string) {
  await requireSuperAdmin();

  try {
    await prisma.user.update({
      where: { id: userId },
      data: { status: "REJECTED" },
    });

    revalidatePath("/admin/users");
    revalidatePath("/admin/dashboard");
    return { success: true, message: "User application rejected" };
  } catch (error) {
    console.error("Error rejecting user:", error);
    return { error: "Failed to reject user" };
  }
}

export async function suspendUser(userId: string) {
  await requireSuperAdmin();

  try {
    await prisma.user.update({
      where: { id: userId },
      data: { status: "SUSPENDED" },
    });

    revalidatePath("/admin/users");
    revalidatePath("/admin/dashboard");
    return { success: true, message: "User account suspended" };
  } catch (error) {
    console.error("Error suspending user:", error);
    return { error: "Failed to suspend user" };
  }
}

export async function deleteUser(userId: string) {
  const currentAdmin = await requireSuperAdmin();

  if (userId === currentAdmin.id) {
    return { error: "Super Admin cannot delete their own account." };
  }

  try {
    await prisma.user.delete({
      where: { id: userId },
    });

    revalidatePath("/admin/users");
    revalidatePath("/admin/dashboard");
    revalidatePath("/");
    return { success: true, message: "User and associated content removed" };
  } catch (error) {
    console.error("Error deleting user:", error);
    return { error: "Failed to delete user" };
  }
}

export async function updateUserRole(userId: string, newRole: "ADMIN" | "AUTHOR") {
  await requireSuperAdmin();

  try {
    await prisma.user.update({
      where: { id: userId },
      data: { role: newRole },
    });

    revalidatePath("/admin/users");
    revalidatePath("/admin/dashboard");
    return { success: true, message: `User role updated to ${newRole}` };
  } catch (error) {
    console.error("Error updating user role:", error);
    return { error: "Failed to update user role" };
  }
}
