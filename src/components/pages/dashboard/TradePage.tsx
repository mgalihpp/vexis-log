"use client";

import Link from "next/link";
import { useState } from "react";
import { Plus } from "lucide-react";
import type { TradeEntry } from "@/types/trade";
import { TradeList } from "@/features/trade/components/TradeList";
import { TradeDetail } from "@/features/trade/components/TradeDetail";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";

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

      <TradeList
        trades={trades}
        onSelectTrade={(trade) => setSelectedTradeId(trade.id)}
        selectedId={selectedTradeId ?? undefined}
      />

      <Sheet
        open={Boolean(selectedTrade)}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedTradeId(null);
          }
        }}
      >
        {selectedTrade ? (
          <SheetContent
            side="right"
            showCloseButton={false}
            className="w-full sm:max-w-3xl p-0 overflow-hidden"
          >
            <TradeDetail
              trade={selectedTrade}
              onClose={() => setSelectedTradeId(null)}
            />
          </SheetContent>
        ) : null}
      </Sheet>
    </div>
  );
}
