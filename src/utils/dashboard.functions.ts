import type z from "zod";
import type { Trade } from "@prisma/client";
import type {
  quickAddTradeSchema,
  tradeSchema,
} from "@/utils/schema/tradeSchema";

type ApiError = {
  error?: string;
};

type TradeStats = {
  winRate: number;
  totalTrades: number;
  profitFactor: number;
  netPnL: number;
  bestWinTrade: number;
  worstLossTrade: number;
  trends: Record<
    "day" | "week" | "month",
    {
      winRate: { value: number; direction: "up" | "down" | "neutral" };
      totalTrades: { value: number; direction: "up" | "down" | "neutral" };
      profitFactor: { value: number; direction: "up" | "down" | "neutral" };
      netPnL: { value: number; direction: "up" | "down" | "neutral" };
    }
  >;
};

async function readJson<T>(response: Response): Promise<T> {
  const body = (await response.json().catch(() => null)) as T | ApiError | null;

  if (!response.ok) {
    const message =
      body && typeof body === "object" && "error" in body && body.error
        ? body.error
        : "Request failed";
    throw new Error(message);
  }

  return body as T;
}

export async function getTrades(): Promise<Array<Trade>> {
  const response = await fetch("/api/trades", {
    method: "GET",
    credentials: "include",
    cache: "no-store",
  });

  return readJson<Array<Trade>>(response);
}

export async function getTrade({
  data,
}: {
  data: { id: string };
}): Promise<Trade> {
  const response = await fetch(`/api/trades/${data.id}`, {
    method: "GET",
    credentials: "include",
    cache: "no-store",
  });

  return readJson<Trade>(response);
}

export async function createTrade({
  data,
}: {
  data: z.infer<typeof tradeSchema> | z.infer<typeof quickAddTradeSchema>;
}): Promise<Trade> {
  const response = await fetch("/api/trades", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return readJson<Trade>(response);
}

export async function updateTrade({
  data,
}: {
  data: { id: string; data: Record<string, unknown> };
}): Promise<Trade> {
  const response = await fetch(`/api/trades/${data.id}`, {
    method: "PATCH",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data.data),
  });

  return readJson<Trade>(response);
}

export async function deleteTrade({
  data,
}: {
  data: { id: string };
}): Promise<Trade> {
  const response = await fetch(`/api/trades/${data.id}`, {
    method: "DELETE",
    credentials: "include",
  });

  return readJson<Trade>(response);
}

export async function getStats(): Promise<TradeStats> {
  const response = await fetch("/api/trades/stats", {
    method: "GET",
    credentials: "include",
    cache: "no-store",
  });

  return readJson<TradeStats>(response);
}
