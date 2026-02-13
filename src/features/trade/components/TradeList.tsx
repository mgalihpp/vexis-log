import {
  Activity,
  ChevronRight,
  ClipboardList,
  Clock,
  FilterX,
  Minus,
  Search,
  SlidersHorizontal,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { TradeEntry } from "@/types/trade";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  getTradeDateKey,
  getTradeDateLabel,
  toTradeDate,
} from "@/utils/trade-date";

interface TradeListProps {
  trades: Array<TradeEntry>;
  onSelectTrade: (trade: TradeEntry) => void;
  selectedId?: string;
}

const resultConfig = {
  Win: {
    icon: TrendingUp,
    class: "bg-success/15 text-success border-success/30",
  },
  Loss: {
    icon: TrendingDown,
    class: "bg-destructive/15 text-destructive border-destructive/30",
  },
  Pending: {
    icon: Clock,
    class: "bg-muted/15 text-muted-foreground border-muted/30",
  },
  BE: { icon: Minus, class: "bg-warning/15 text-warning border-warning/30" },
  Partial: {
    icon: Activity,
    class: "bg-info/15 text-info border-info/30",
  },
};

const marketColors: Record<string, string> = {
  Forex: "bg-primary/15 text-primary border-primary/30",
  Crypto:
    "bg-[hsl(262,60%,52%)]/15 text-[hsl(262,60%,52%)] border-[hsl(262,60%,52%)]/30",
  Stock: "bg-success/15 text-success border-success/30",
  Index: "bg-muted/15 text-muted-foreground border-muted/30",
};

export function TradeList({
  trades,
  onSelectTrade,
  selectedId,
}: TradeListProps) {
  const [search, setSearch] = useState("");
  const [marketFilter, setMarketFilter] = useState("all");
  const [directionFilter, setDirectionFilter] = useState("all");
  const [tradeTypeFilter, setTradeTypeFilter] = useState("all");
  const [sessionFilter, setSessionFilter] = useState("all");
  const [timeframeFilter, setTimeframeFilter] = useState("all");
  const [resultFilter, setResultFilter] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const filterOptions = useMemo(() => {
    const uniqueValues = (
      getValue: (trade: TradeEntry) => string | null | undefined,
    ) => {
      return Array.from(
        new Set(
          trades
            .map(getValue)
            .map((value) => value?.trim())
            .filter((value): value is string => Boolean(value)),
        ),
      ).sort((a, b) => a.localeCompare(b));
    };

    return {
      markets: uniqueValues((trade) => trade.market),
      directions: uniqueValues((trade) => trade.type),
      tradeTypes: uniqueValues((trade) => trade.tradeType),
      sessions: uniqueValues((trade) => trade.session),
      timeframes: uniqueValues((trade) => trade.timeframe),
      results: uniqueValues((trade) => trade.result ?? trade.outcome),
    };
  }, [trades]);

  const filteredTrades = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return trades.filter((trade) => {
      const result = trade.result ?? trade.outcome ?? "";
      const tradeDateKey = getTradeDateKey(trade.date);

      const matchesSearch =
        normalizedSearch.length === 0 ||
        trade.pair.toLowerCase().includes(normalizedSearch) ||
        (trade.setup ?? "").toLowerCase().includes(normalizedSearch) ||
        (trade.notes ?? "").toLowerCase().includes(normalizedSearch) ||
        trade.market.toLowerCase().includes(normalizedSearch) ||
        (trade.tradeType ?? "").toLowerCase().includes(normalizedSearch) ||
        trade.type.toLowerCase().includes(normalizedSearch) ||
        (trade.session ?? "").toLowerCase().includes(normalizedSearch) ||
        trade.timeframe.toLowerCase().includes(normalizedSearch) ||
        result.toLowerCase().includes(normalizedSearch);

      const matchesMarket =
        marketFilter === "all" || trade.market === marketFilter;
      const matchesDirection =
        directionFilter === "all" || trade.type === directionFilter;
      const matchesTradeType =
        tradeTypeFilter === "all" || trade.tradeType === tradeTypeFilter;
      const matchesSession =
        sessionFilter === "all" || trade.session === sessionFilter;
      const matchesTimeframe =
        timeframeFilter === "all" || trade.timeframe === timeframeFilter;
      const matchesResult = resultFilter === "all" || result === resultFilter;
      const matchesDateFrom = dateFrom === "" || tradeDateKey >= dateFrom;
      const matchesDateTo = dateTo === "" || tradeDateKey <= dateTo;

      return (
        matchesSearch &&
        matchesMarket &&
        matchesDirection &&
        matchesTradeType &&
        matchesSession &&
        matchesTimeframe &&
        matchesResult &&
        matchesDateFrom &&
        matchesDateTo
      );
    });
  }, [
    dateFrom,
    dateTo,
    directionFilter,
    marketFilter,
    resultFilter,
    search,
    sessionFilter,
    timeframeFilter,
    tradeTypeFilter,
    trades,
  ]);

  const groupedTrades = useMemo(() => {
    const sortedTrades = [...filteredTrades].sort(
      (a, b) => getTradeTimestamp(b) - getTradeTimestamp(a),
    );

    const grouped = new Map<
      string,
      { dateLabel: string; trades: Array<TradeEntry> }
    >();

    sortedTrades.forEach((trade) => {
      const dateKey = getTradeDateKey(trade.date);

      if (!grouped.has(dateKey)) {
        grouped.set(dateKey, {
          dateLabel: getTradeDateLabel(trade.date),
          trades: [],
        });
      }

      grouped.get(dateKey)?.trades.push(trade);
    });

    return Array.from(grouped.entries()).map(([dateKey, value]) => ({
      dateKey,
      dateLabel: value.dateLabel,
      trades: value.trades,
    }));
  }, [filteredTrades]);

  const hasActiveFilters =
    search.length > 0 ||
    marketFilter !== "all" ||
    directionFilter !== "all" ||
    tradeTypeFilter !== "all" ||
    sessionFilter !== "all" ||
    timeframeFilter !== "all" ||
    resultFilter !== "all" ||
    dateFrom !== "" ||
    dateTo !== "";

  const resetFilters = () => {
    setSearch("");
    setMarketFilter("all");
    setDirectionFilter("all");
    setTradeTypeFilter("all");
    setSessionFilter("all");
    setTimeframeFilter("all");
    setResultFilter("all");
    setDateFrom("");
    setDateTo("");
  };

  if (trades.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center border border-dashed rounded-lg border-border/50 bg-muted/5 animate-fade-in">
        <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-muted/20">
          <ClipboardList className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold font-display">
          Trade Journal Empty
        </h3>
        <p className="max-w-xs mb-6 text-sm text-muted-foreground">
          You haven&apos;t logged any trades yet. Start your journey by adding
          your first trade.
        </p>
        <Link href="/dashboard/trade/new">
          <Button>Add First Trade</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="glass-card p-3 sm:p-4 space-y-3">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search pair, setup, notes, direction..."
            className="pl-9 bg-background/50 border-border/50"
          />
        </div>

        <div className="flex items-center justify-between gap-2">
          <span className="text-xs text-muted-foreground">
            Advanced filters
          </span>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="h-8"
            onClick={() => setShowFilters((prev) => !prev)}
          >
            <SlidersHorizontal className="mr-1.5 h-3.5 w-3.5" />
            {showFilters ? "Hide Filters" : "Show Filters"}
          </Button>
        </div>

        {showFilters && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            <Select value={marketFilter} onValueChange={setMarketFilter}>
              <SelectTrigger className="bg-background/50 border-border/50">
                <SelectValue placeholder="Market" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Markets</SelectItem>
                {filterOptions.markets.map((market) => (
                  <SelectItem key={market} value={market}>
                    {market}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={directionFilter} onValueChange={setDirectionFilter}>
              <SelectTrigger className="bg-background/50 border-border/50">
                <SelectValue placeholder="Direction" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Directions</SelectItem>
                {filterOptions.directions.map((direction) => (
                  <SelectItem key={direction} value={direction}>
                    {direction}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={tradeTypeFilter} onValueChange={setTradeTypeFilter}>
              <SelectTrigger className="bg-background/50 border-border/50">
                <SelectValue placeholder="Trade Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Trade Types</SelectItem>
                {filterOptions.tradeTypes.map((tradeType) => (
                  <SelectItem key={tradeType} value={tradeType}>
                    {tradeType}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sessionFilter} onValueChange={setSessionFilter}>
              <SelectTrigger className="bg-background/50 border-border/50">
                <SelectValue placeholder="Session" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sessions</SelectItem>
                {filterOptions.sessions.map((session) => (
                  <SelectItem key={session} value={session}>
                    {session}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={timeframeFilter} onValueChange={setTimeframeFilter}>
              <SelectTrigger className="bg-background/50 border-border/50">
                <SelectValue placeholder="Timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Timeframes</SelectItem>
                {filterOptions.timeframes.map((timeframe) => (
                  <SelectItem key={timeframe} value={timeframe}>
                    {timeframe}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={resultFilter} onValueChange={setResultFilter}>
              <SelectTrigger className="bg-background/50 border-border/50">
                <SelectValue placeholder="Result" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Results</SelectItem>
                {filterOptions.results.map((result) => (
                  <SelectItem key={result} value={result}>
                    {result}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Input
              type="date"
              value={dateFrom}
              onChange={(event) => setDateFrom(event.target.value)}
              className="bg-background/50 border-border/50"
            />

            <Input
              type="date"
              value={dateTo}
              onChange={(event) => setDateTo(event.target.value)}
              className="bg-background/50 border-border/50"
            />
          </div>
        )}

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>
            Showing {filteredTrades.length} of {trades.length} trades
          </span>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              className="h-7 px-2"
              onClick={resetFilters}
            >
              <FilterX className="mr-1 h-3.5 w-3.5" />
              Reset Filters
            </Button>
          )}
        </div>
      </div>

      {filteredTrades.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-10 text-center border border-dashed rounded-lg border-border/50 bg-muted/5 animate-fade-in">
          <div className="flex items-center justify-center w-12 h-12 mb-3 rounded-full bg-muted/20">
            <Search className="w-5 h-5 text-muted-foreground" />
          </div>
          <h3 className="text-base font-semibold text-foreground">
            No matching trades
          </h3>
          <p className="mt-1 text-sm text-muted-foreground max-w-sm">
            Try changing your search or filters to find the trades you want.
          </p>
        </div>
      ) : (
        groupedTrades.map((group) => (
          <div key={group.dateKey} className="space-y-2">
            <div className="px-1 pt-1">
              <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-3 py-1 text-xs font-medium text-muted-foreground">
                <span>{group.dateLabel}</span>
                <span>•</span>
                <span>{group.trades.length} trade(s)</span>
              </div>
            </div>

            {group.trades.map((trade, i) => {
              const outcomeKey = trade.outcome ?? "BE";
              const cfg =
                outcomeKey in resultConfig
                  ? resultConfig[outcomeKey as keyof typeof resultConfig]
                  : resultConfig.BE;
              const ResultIcon = cfg.icon;
              const isSelected = trade.id === selectedId;

              const profitLossPercent =
                trade.riskPercent && trade.actualRR
                  ? Number((trade.actualRR * trade.riskPercent).toFixed(2))
                  : (trade.profitLoss ?? 0);

              return (
                <button
                  key={trade.id}
                  onClick={() => onSelectTrade(trade)}
                  className={`w-full text-left glass-card p-4 hover:bg-secondary/50 transition-all cursor-pointer animate-fade-in group ${
                    isSelected ? "ring-1 ring-primary/50 glow-primary" : ""
                  }`}
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div
                        className={`flex items-center justify-center w-9 h-9 rounded-lg ${cfg.class}`}
                      >
                        <ResultIcon className="h-4 w-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono font-semibold text-foreground">
                            {trade.pair}
                          </span>
                          <Badge
                            variant="outline"
                            className={`text-[10px] px-1.5 py-0 ${marketColors[trade.market] || ""}`}
                          >
                            {trade.market}
                          </Badge>
                          <Badge
                            variant="outline"
                            className="text-[10px] px-1.5 py-0 border-border text-muted-foreground"
                          >
                            {trade.tradeType}
                          </Badge>
                          <Badge
                            variant="outline"
                            className="text-[10px] px-1.5 py-0 bg-secondary/40 border-border text-foreground"
                          >
                            {trade.type}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span>{tradeDateLabel(trade.date)}</span>
                          <span>{trade.session}</span>
                          <span>{trade.timeframe}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div
                          className={`font-mono font-semibold text-sm ${
                            profitLossPercent > 0
                              ? "text-success"
                              : profitLossPercent < 0
                                ? "text-destructive"
                                : "text-foreground"
                          }`}
                        >
                          {profitLossPercent > 0 ? "+" : ""}
                          {profitLossPercent}%
                        </div>
                        <div className="text-xs text-muted-foreground font-mono">
                          {trade.actualRR && trade.actualRR > 0 ? "+" : ""}
                          {trade.actualRR}R
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        ))
      )}
    </div>
  );
}

function tradeDateLabel(rawDate: TradeEntry["date"]) {
  return getTradeDateLabel(rawDate);
}

function getTradeTimestamp(trade: TradeEntry) {
  const tradeDate = toTradeDate(trade.date);

  if (!tradeDate) {
    return 0;
  }

  const [hoursPart, minutesPart] = (trade.time ?? "00:00").split(":");
  const hours = Number(hoursPart);
  const minutes = Number(minutesPart);
  const normalizedHours = Number.isFinite(hours) ? hours : 0;
  const normalizedMinutes = Number.isFinite(minutes) ? minutes : 0;

  return Date.UTC(
    tradeDate.getUTCFullYear(),
    tradeDate.getUTCMonth(),
    tradeDate.getUTCDate(),
    normalizedHours,
    normalizedMinutes,
    0,
    0,
  );
}
