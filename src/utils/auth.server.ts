import type { LoginInput, RegisterInput } from "@/utils/schema/authSchema";
import { prisma } from "@/lib/db";
import {
  comparePassword,
  hashPassword,
  signToken,
  verifyToken,
} from "@/utils/auth.utils";

const userSelect = {
  id: true,
  email: true,
  name: true,
  theme: true,
  language: true,
  createdAt: true,
} as const;

export type SafeUser = {
  id: string;
  email: string;
  name: string | null;
  theme: string | null;
  language: string | null;
  createdAt: Date;
};

export async function findUserByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } });
}

export async function findUserById(id: string): Promise<SafeUser | null> {
  return prisma.user.findUnique({
    where: { id },
    select: userSelect,
  });
}

export async function createUser(data: RegisterInput): Promise<SafeUser> {
  const existingUser = await findUserByEmail(data.email);

  if (existingUser) {
    throw new Error("An account with this email already exists");
  }

  const hashedPassword = await hashPassword(data.password);

  const user = await prisma.user.create({
    data: {
      email: data.email,
      password: hashedPassword,
      name: data.name,
    },
    select: userSelect,
  });

  return user;
}

export async function authenticateUser(data: LoginInput): Promise<SafeUser> {
  const user = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isValid = await comparePassword(data.password, user.password);

  if (!isValid) {
    throw new Error("Invalid email or password");
  }

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    theme: user.theme,
    language: user.language,
    createdAt: user.createdAt,
  };
}

export async function getUserFromToken(
  token: string,
): Promise<SafeUser | null> {
  try {
    const payload = verifyToken(token);
    return findUserById(payload.userId);
  } catch {
    return null;
  }
}

export function generateToken(user: SafeUser): string {
  return signToken({ userId: user.id, email: user.email });
}
