"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { useState } from "react";
import type { Trade } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { EquityCurveCard } from "@/features/dashboard/components/EquityCurveCard";
import { PerformanceCard } from "@/features/dashboard/components/PerformanceCard";
import { StatsOverview } from "@/features/dashboard/components/StatsOverview";
import { TradesTable } from "@/features/dashboard/components/TradesTable";
import { WinRateMeter } from "@/features/dashboard/components/WinRateMeter";
import { PnLCalendar } from "@/features/dashboard/components/PnLCalendar";
import { TraderRadar } from "@/features/dashboard/components/TraderRadar";
import type { DashboardStats } from "@/features/dashboard/types";

type Props = {
  trades: Array<Trade>;
  stats: DashboardStats;
};

export function DashboardHomePage({ trades, stats }: Props) {
  const [search, setSearch] = useState("");
  const [filterMarket, setFilterMarket] = useState("all");
  const hasTrades = trades.length > 0;

  const filteredTrades = trades.filter((trade) => {
    const matchesMarket =
      filterMarket === "all" || trade.market === filterMarket;
    const matchesSearch =
      search === "" ||
      trade.pair.toLowerCase().includes(search.toLowerCase()) ||
      trade.setup?.toLowerCase().includes(search.toLowerCase());
    return matchesMarket && matchesSearch;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">
            Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Welcome back. Here&apos;s your trading overview.
          </p>
        </div>

        <Link href="/dashboard/trade/quick-add">
          <Button>
            <Plus />
            Quick Add Trade
          </Button>
        </Link>
      </div>

      <StatsOverview stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
        <EquityCurveCard trades={trades} hasTrades={hasTrades} />
        <WinRateMeter
          winRate={stats.winRate}
          resolvedTrades={stats.resolvedTrades}
          totalTrades={stats.totalTrades}
        />
        <PerformanceCard
          bestWinTrade={stats.bestWinTrade}
          worstLossTrade={stats.worstLossTrade}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TraderRadar trades={trades} />
        <PnLCalendar trades={trades} />
      </div>

      <TradesTable
        trades={filteredTrades}
        search={search}
        filterMarket={filterMarket}
        onSearchChange={setSearch}
        onFilterMarketChange={setFilterMarket}
      />
    </div>
  );
}
