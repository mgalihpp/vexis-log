import { cookies } from "next/headers";
import { COOKIE_NAME } from "@/lib/auth-cookie";
import { getUserFromToken } from "@/utils/auth.server";

export async function getServerAuthSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  return getUserFromToken(token);
}

export async function requireServerAuth() {
  const user = await getServerAuthSession();
  if (!user) {
    throw new Error("Not authenticated");
  }

  return user;
}
