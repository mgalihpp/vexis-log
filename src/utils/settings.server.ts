import type {
  ChangePasswordInput,
  UpdatePreferencesInput,
  UpdateProfileInput,
} from "@/utils/schema/settingsSchema";
import { prisma } from "@/lib/db";
import { comparePassword, hashPassword } from "@/utils/auth.utils";

const settingsUserSelect = {
  id: true,
  email: true,
  name: true,
  theme: true,
  language: true,
  createdAt: true,
} as const;

export async function updateUserProfile(
  userId: string,
  data: UpdateProfileInput,
) {
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (existingUser && existingUser.id !== userId) {
    throw new Error("Email is already in use");
  }

  return prisma.user.update({
    where: { id: userId },
    data: { name: data.name, email: data.email },
    select: settingsUserSelect,
  });
}

export async function changeUserPassword(
  userId: string,
  data: ChangePasswordInput,
) {
  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user) {
    throw new Error("User not found");
  }

  const isValid = await comparePassword(data.currentPassword, user.password);

  if (!isValid) {
    throw new Error("Current password is incorrect");
  }

  const hashedPassword = await hashPassword(data.newPassword);

  await prisma.user.update({
    where: { id: userId },
    data: { password: hashedPassword },
  });

  return { success: true };
}

export async function updateUserPreferences(
  userId: string,
  data: UpdatePreferencesInput,
) {
  return prisma.user.update({
    where: { id: userId },
    data: { theme: data.theme, language: data.language },
    select: settingsUserSelect,
  });
}
