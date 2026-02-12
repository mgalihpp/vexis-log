"use client";

import Link from "next/link";
import { useState } from "react";
import { Plus } from "lucide-react";
import type { TradeEntry } from "@/types/trade";
import { TradeList } from "@/features/trade/components/TradeList";
import { TradeDetail } from "@/features/trade/components/TradeDetail";
import { Button } from "@/components/ui/button";

type Props = {
  trades: Array<TradeEntry>;
};

export function TradePage({ trades }: Props) {
  const [selectedTradeId, setSelectedTradeId] = useState<string | null>(null);
  const selectedTrade =
    trades.find((trade: TradeEntry) => trade.id === selectedTradeId) ?? null;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">
            Trades
          </h1>
          <p className="text-muted-foreground mt-1">
            Review and manage your trade journal.
          </p>
        </div>
        <Link href="/dashboard/trade/new">
          <Button>
            <Plus />
            Add Trade
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className={selectedTrade ? "lg:col-span-2" : "lg:col-span-5"}>
          <TradeList
            trades={trades}
            onSelectTrade={(trade) => setSelectedTradeId(trade.id)}
            selectedId={selectedTradeId ?? undefined}
          />
        </div>
        {selectedTrade && (
          <div className="lg:col-span-3">
            <TradeDetail
              trade={selectedTrade}
              onClose={() => setSelectedTradeId(null)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
