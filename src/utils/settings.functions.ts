import type {
  ChangePasswordInput,
  UpdatePreferencesInput,
  UpdateProfileInput,
} from "@/utils/schema/settingsSchema";
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

export async function updateProfile({
  data,
}: {
  data: UpdateProfileInput;
}): Promise<SafeUser> {
  const response = await fetch("/api/settings/profile", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });

  return readJson<SafeUser>(response);
}

export async function changePassword({
  data,
}: {
  data: ChangePasswordInput;
}): Promise<{ success: boolean }> {
  const response = await fetch("/api/settings/password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });

  return readJson<{ success: boolean }>(response);
}

export async function updatePreferences({
  data,
}: {
  data: UpdatePreferencesInput;
}): Promise<SafeUser> {
  const response = await fetch("/api/settings/preferences", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });

  return readJson<SafeUser>(response);
}
