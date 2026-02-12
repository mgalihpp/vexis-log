import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { loginSchema } from "@/utils/schema/authSchema";
import { authenticateUser, generateToken } from "@/utils/auth.server";
import { COOKIE_NAME, COOKIE_OPTIONS } from "@/lib/auth-cookie";

export async function POST(request: Request) {
  try {
    const payload = loginSchema.parse(await request.json());
    const user = await authenticateUser(payload);
    const token = generateToken(user);

    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAME, token, COOKIE_OPTIONS);

    return NextResponse.json(user);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to authenticate user";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
