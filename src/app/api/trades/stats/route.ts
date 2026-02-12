import { NextResponse } from "next/server";
import { getTradeStats } from "@/utils/dashboard.server";
import { requireServerAuth } from "@/lib/auth-session";

export async function GET() {
  try {
    const user = await requireServerAuth();
    const stats = await getTradeStats(user.id);
    return NextResponse.json(stats);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unauthorized";
    return NextResponse.json({ error: message }, { status: 401 });
  }
}
