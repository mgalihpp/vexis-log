import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { COOKIE_NAME, COOKIE_OPTIONS } from "@/lib/auth-cookie";

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.delete({
    name: COOKIE_NAME,
    path: COOKIE_OPTIONS.path,
  });

  return NextResponse.json({ success: true });
}
