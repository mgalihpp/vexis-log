import { NextResponse } from "next/server";
import { updateProfileSchema } from "@/utils/schema/settingsSchema";
import { updateUserProfile } from "@/utils/settings.server";
import { requireServerAuth } from "@/lib/auth-session";

export async function POST(request: Request) {
  try {
    const user = await requireServerAuth();
    const payload = updateProfileSchema.parse(await request.json());
    const updatedUser = await updateUserProfile(user.id, payload);
    return NextResponse.json(updatedUser);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to update profile";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
