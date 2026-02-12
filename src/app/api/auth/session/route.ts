import { NextResponse } from "next/server";
import { getServerAuthSession } from "@/lib/auth-session";

export async function GET() {
  try {
    const user = await getServerAuthSession();
    return NextResponse.json(user);
  } catch {
    return NextResponse.json(
      { error: "Failed to read session" },
      { status: 500 },
    );
  }
}
