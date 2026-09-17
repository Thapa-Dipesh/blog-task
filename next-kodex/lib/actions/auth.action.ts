"use server";

import {
  hashPassword,
  verifyPassword,
  signJWT,
  setSessionCookie,
  clearSessionCookie,
} from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { loginSchema, registerSchema } from "@/lib/validations/auth.schema";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export interface AuthActionState {
  error?: string;
  success?: boolean;
  message?: string;
}

export async function superAdminLogin(
  prevState: AuthActionState | null,
  formData: FormData
): Promise<AuthActionState> {
  const rawData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const validation = loginSchema.safeParse(rawData);
  if (!validation.success) {
    return { error: validation.error.issues[0]?.message || "Invalid credentials" };
  }

  const { email, password } = validation.data;
  const normalizedEmail = email.toLowerCase().trim();

  const envSuperEmail = process.env.SUPER_ADMIN_EMAIL?.toLowerCase().trim();
  const envSuperPassword = process.env.SUPER_ADMIN_PASSWORD;
  const envSuperName = process.env.SUPER_ADMIN_NAME || "Super Administrator";

  if (!envSuperEmail || !envSuperPassword) {
    return { error: "Super Admin credentials are not configured in system environment." };
  }

  if (normalizedEmail !== envSuperEmail || password !== envSuperPassword) {
    return { error: "Invalid Super Admin credentials. Access denied." };
  }

  try {
    // Ensure Super Admin user exists in Database with SUPER_ADMIN role & APPROVED status
    let superUser = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (!superUser) {
      const hashedPassword = await hashPassword(password);
      superUser = await prisma.user.create({
        data: {
          email: normalizedEmail,
          name: envSuperName,
          password: hashedPassword,
          role: "SUPER_ADMIN",
          status: "APPROVED",
        },
      });
    } else if (superUser.role !== "SUPER_ADMIN" || superUser.status !== "APPROVED") {
      superUser = await prisma.user.update({
        where: { id: superUser.id },
        data: {
          role: "SUPER_ADMIN",
          status: "APPROVED",
        },
      });
    }

    const token = await signJWT({
      id: superUser.id,
      email: superUser.email,
      name: superUser.name,
      role: "SUPER_ADMIN",
      status: "APPROVED",
    });

    await setSessionCookie(token);
  } catch (error) {
    console.error("Super Admin login error:", error);
    return { error: "An unexpected error occurred during Super Admin authentication." };
  }

  redirect("/kodex-admin/dashboard");
}

export async function userLogin(
  prevState: AuthActionState | null,
  formData: FormData
): Promise<AuthActionState> {
  const rawData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const validation = loginSchema.safeParse(rawData);
  if (!validation.success) {
    return { error: validation.error.issues[0]?.message || "Invalid credentials" };
  }

  const { email, password } = validation.data;
  const normalizedEmail = email.toLowerCase().trim();

  const envSuperEmail = process.env.SUPER_ADMIN_EMAIL?.toLowerCase().trim();
  if (envSuperEmail && normalizedEmail === envSuperEmail) {
    return {
      error: "Super Admin accounts must sign in via the Master Console at /kodex-admin/login",
    };
  }

  // Regular Admin / Author Authentication via NeonDB
  try {
    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (!user) {
      return { error: "No account found with this email address" };
    }

    const isPasswordValid = await verifyPassword(password, user.password);
    if (!isPasswordValid) {
      return { error: "Incorrect password" };
    }

    // Super Admin Verification Status Check
    if (user.status === "PENDING") {
      return {
        error:
          "Your account is pending verification by the Super Admin. Please wait for approval before logging in.",
      };
    }

    if (user.status === "REJECTED" || user.status === "SUSPENDED") {
      return {
        error:
          "Your account has been deactivated or rejected by the Super Admin. Please contact support.",
      };
    }

    const token = await signJWT({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      status: user.status,
    });

    await setSessionCookie(token);
  } catch (error) {
    console.error("Login error:", error);
    return { error: "An unexpected error occurred during login. Please try again." };
  }

  redirect("/admin/dashboard");
}

export async function userRegister(
  prevState: AuthActionState | null,
  formData: FormData
): Promise<AuthActionState> {
  const rawData = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const validation = registerSchema.safeParse(rawData);
  if (!validation.success) {
    return { error: validation.error.issues[0]?.message || "Invalid input data" };
  }

  const { name, email, password } = validation.data;
  const normalizedEmail = email.toLowerCase().trim();

  // Guard against registering using super admin email
  const envSuperEmail = process.env.SUPER_ADMIN_EMAIL?.toLowerCase().trim();
  if (envSuperEmail && normalizedEmail === envSuperEmail) {
    return { error: "This email address is reserved for system administration." };
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (existingUser) {
      return { error: "An account with this email address already exists" };
    }

    const hashedPassword = await hashPassword(password);

    // Create user in PENDING state awaiting Super Admin approval
    await prisma.user.create({
      data: {
        name,
        email: normalizedEmail,
        password: hashedPassword,
        role: "ADMIN",
        status: "PENDING",
      },
    });

    revalidatePath("/admin/users");
  } catch (error) {
    console.error("Registration error:", error);
    return { error: "Failed to create account. Please try again later." };
  }

  redirect("/admin/login?registered=pending");
}

export async function logout() {
  await clearSessionCookie();
  redirect("/admin/login");
}
