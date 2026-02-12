import { NextResponse } from "next/server";
import { changePasswordSchema } from "@/utils/schema/settingsSchema";
import { changeUserPassword } from "@/utils/settings.server";
import { requireServerAuth } from "@/lib/auth-session";

export async function POST(request: Request) {
  try {
    const user = await requireServerAuth();
    const payload = changePasswordSchema.parse(await request.json());
    const result = await changeUserPassword(user.id, payload);
    return NextResponse.json(result);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to change password";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
