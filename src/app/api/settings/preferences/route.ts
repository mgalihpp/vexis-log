import { NextResponse } from "next/server";
import { updatePreferencesSchema } from "@/utils/schema/settingsSchema";
import { updateUserPreferences } from "@/utils/settings.server";
import { requireServerAuth } from "@/lib/auth-session";

export async function POST(request: Request) {
  try {
    const user = await requireServerAuth();
    const payload = updatePreferencesSchema.parse(await request.json());
    const updatedUser = await updateUserPreferences(user.id, payload);
    return NextResponse.json(updatedUser);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to update preferences";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
