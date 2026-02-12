import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { registerSchema } from "@/utils/schema/authSchema";
import { createUser, generateToken } from "@/utils/auth.server";
import { COOKIE_NAME, COOKIE_OPTIONS } from "@/lib/auth-cookie";

export async function POST(request: Request) {
  try {
    const payload = registerSchema.parse(await request.json());
    const user = await createUser(payload);
    const token = generateToken(user);

    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAME, token, COOKIE_OPTIONS);

    return NextResponse.json(user);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to register account";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
