import { NextResponse } from "next/server";
import { getTradeStats } from "@/utils/dashboard.server";
import { requireServerAuth } from "@/lib/auth-session";

export async function GET() {
  try {
    await requireServerAuth();
    const stats = await getTradeStats();
    return NextResponse.json(stats);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unauthorized";
    return NextResponse.json({ error: message }, { status: 401 });
  }
}
