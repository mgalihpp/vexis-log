import type { LoginInput, RegisterInput } from "@/utils/schema/authSchema";
import type { SafeUser } from "@/utils/auth.server";

type ApiError = {
  error?: string;
};

async function readJson<T>(response: Response): Promise<T> {
  const body = (await response.json().catch(() => null)) as T | ApiError | null;

  if (!response.ok) {
    const message =
      body && typeof body === "object" && "error" in body && body.error
        ? body.error
        : "Request failed";
    throw new Error(message);
  }

  return body as T;
}

export async function getAuthSession(): Promise<SafeUser | null> {
  const response = await fetch("/api/auth/session", {
    method: "GET",
    credentials: "include",
    cache: "no-store",
  });

  return readJson<SafeUser | null>(response);
}

export async function register({
  data,
}: {
  data: RegisterInput;
}): Promise<SafeUser> {
  const response = await fetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });

  return readJson<SafeUser>(response);
}

export async function login({ data }: { data: LoginInput }): Promise<SafeUser> {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });

  return readJson<SafeUser>(response);
}

export async function logout(): Promise<{ success: boolean }> {
  const response = await fetch("/api/auth/logout", {
    method: "POST",
    credentials: "include",
  });

  return readJson<{ success: boolean }>(response);
}
