import { NextResponse } from "next/server";
import { getAllTrades } from "@/utils/dashboard.server";
import { createTradeRecord } from "@/utils/trade-crud.server";
import { requireServerAuth } from "@/lib/auth-session";

export async function GET() {
  try {
    await requireServerAuth();
    const trades = await getAllTrades();
    return NextResponse.json(trades);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unauthorized";
    return NextResponse.json({ error: message }, { status: 401 });
  }
}

export async function POST(request: Request) {
  try {
    await requireServerAuth();
    const payload = await request.json();
    const trade = await createTradeRecord(payload);
    return NextResponse.json(trade);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to create trade";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
