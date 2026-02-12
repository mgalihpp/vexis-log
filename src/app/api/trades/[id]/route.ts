import { NextResponse } from "next/server";
import { deleteTradeById, getTradeById } from "@/utils/dashboard.server";
import { updateTradeRecord } from "@/utils/trade-crud.server";
import { requireServerAuth } from "@/lib/auth-session";

type Params = {
  params: Promise<{ id: string }>;
};

export async function GET(_: Request, { params }: Params) {
  try {
    await requireServerAuth();
    const { id } = await params;
    const trade = await getTradeById(id);
    return NextResponse.json(trade);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Trade not found";
    const status = message === "Trade not found" ? 404 : 401;
    return NextResponse.json({ error: message }, { status });
  }
}

export async function PATCH(request: Request, { params }: Params) {
  try {
    await requireServerAuth();
    const { id } = await params;
    const payload = await request.json();
    const trade = await updateTradeRecord(id, payload);
    return NextResponse.json(trade);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to update trade";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function DELETE(_: Request, { params }: Params) {
  try {
    await requireServerAuth();
    const { id } = await params;
    const trade = await deleteTradeById(id);
    return NextResponse.json(trade);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to delete trade";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
