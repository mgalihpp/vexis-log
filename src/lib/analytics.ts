import { parseISO } from "date-fns";
import type { TradeEntry } from "@/types/trade";

export interface BreakdownItem {
  name: string;
  trades: number;
  wins: number;
  losses: number;
  breakevens: number;
  winrate: number;
  totalPL: number;
  avgRR: number;
}

const createBreakdownItem = (name: string): BreakdownItem => ({
  name,
  trades: 0,
  wins: 0,
  losses: 0,
  breakevens: 0,
  winrate: 0,
  totalPL: 0,
  avgRR: 0,
});

const classifyTradeOutcome = (trade: TradeEntry) => {
  const status = trade.result ?? trade.outcome;

  if (status === "Win") {
    return "win" as const;
  }

  if (status === "Partial") {
    return "win" as const;
  }

  if (status === "Loss") {
    return "loss" as const;
  }

  if (status === "Breakeven" || status === "Pending") {
    return "neutral" as const;
  }

  return "neutral" as const;
};

const calculateBreakdownStats = (
  items: Record<string, BreakdownItem | undefined>,
) => {
  return Object.values(items)
    .filter((item): item is BreakdownItem => item !== undefined)
    .map((item) => {
      const resolvedTrades = item.wins + item.losses;
      item.winrate =
        resolvedTrades > 0 ? (item.wins / resolvedTrades) * 100 : 0;
      item.totalPL = Number(item.totalPL.toFixed(2));
      item.avgRR =
        item.trades > 0 ? Number((item.avgRR / item.trades).toFixed(2)) : 0;
      item.breakevens = Math.max(0, item.trades - (item.wins + item.losses));
      return item;
    });
};

const processTrade = (trade: TradeEntry, item: BreakdownItem) => {
  item.trades++;

  const outcomeType = classifyTradeOutcome(trade);
  if (outcomeType === "win") {
    item.wins++;
  } else if (outcomeType === "loss") {
    item.losses++;
  }

  item.totalPL += trade.profitLoss || 0;
  item.avgRR += trade.actualRR || 0;
};

const WEEKDAY_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;

const MONTH_NAMES_SHORT = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

const ONE_DAY_MS = 24 * 60 * 60 * 1000;

const toUtcDate = (value: Date | string): Date =>
  typeof value === "string" ? parseISO(value) : value;

const pad2 = (value: number): string => String(value).padStart(2, "0");

const getUtcWeekdayName = (date: Date): string =>
  WEEKDAY_NAMES[date.getUTCDay()];

const getUtcMonthLabel = (date: Date): string =>
  `${MONTH_NAMES_SHORT[date.getUTCMonth()]} ${date.getUTCFullYear()}`;

const getUtcWeekLabel = (date: Date): string => {
  const utcMidnightMs = Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
  );
  const weekStartMs = utcMidnightMs - date.getUTCDay() * ONE_DAY_MS;
  const weekStart = new Date(weekStartMs);
  const label = `${pad2(weekStart.getUTCDate())} ${MONTH_NAMES_SHORT[weekStart.getUTCMonth()]}`;

  return `Week of ${label}`;
};

const getUtcYearLabel = (date: Date): string => String(date.getUTCFullYear());

const getUtcDateKey = (date: Date): string =>
  `${date.getUTCFullYear()}-${pad2(date.getUTCMonth() + 1)}-${pad2(date.getUTCDate())}`;

const getUtcDateLabel = (date: Date): string =>
  `${pad2(date.getUTCDate())} ${MONTH_NAMES_SHORT[date.getUTCMonth()]}`;

export const getDayOfWeekBreakdown = (trades: Array<TradeEntry>) => {
  const items: Record<string, BreakdownItem | undefined> = {};

  WEEKDAY_NAMES.forEach((day) => {
    items[day] = createBreakdownItem(day);
  });

  trades.forEach((trade) => {
    const date = toUtcDate(trade.date);
    const dayName = getUtcWeekdayName(date);
    const item = items[dayName];
    if (item) {
      processTrade(trade, item);
    }
  });

  return calculateBreakdownStats(items);
};

export const getMonthlyBreakdown = (trades: Array<TradeEntry>) => {
  const items: Record<string, BreakdownItem | undefined> = {};

  trades.forEach((trade) => {
    const date = toUtcDate(trade.date);
    const monthName = getUtcMonthLabel(date);

    if (!items[monthName]) {
      items[monthName] = createBreakdownItem(monthName);
    }
    processTrade(trade, items[monthName]);
  });

  // Sort by date could be added here if needed, currently just object iteration order which might vary
  return calculateBreakdownStats(items);
};

export const getWeeklyBreakdown = (trades: Array<TradeEntry>) => {
  const items: Record<string, BreakdownItem | undefined> = {};

  trades.forEach((trade) => {
    const date = toUtcDate(trade.date);
    const weekLabel = getUtcWeekLabel(date);

    if (!items[weekLabel]) {
      items[weekLabel] = createBreakdownItem(weekLabel);
    }
    processTrade(trade, items[weekLabel]);
  });

  return calculateBreakdownStats(items);
};

export const getYearlyBreakdown = (trades: Array<TradeEntry>) => {
  const items: Record<string, BreakdownItem | undefined> = {};

  trades.forEach((trade) => {
    const date = toUtcDate(trade.date);
    const year = getUtcYearLabel(date);

    if (!items[year]) {
      items[year] = createBreakdownItem(year);
    }
    processTrade(trade, items[year]);
  });

  return calculateBreakdownStats(items);
};

export const getSymbolBreakdown = (trades: Array<TradeEntry>) => {
  const items: Record<string, BreakdownItem | undefined> = {};

  trades.forEach((trade) => {
    const symbol = trade.pair || "Unknown";

    if (!items[symbol]) {
      items[symbol] = createBreakdownItem(symbol);
    }
    processTrade(trade, items[symbol]);
  });

  return calculateBreakdownStats(items);
};

export const getDirectionBreakdown = (trades: Array<TradeEntry>) => {
  const items: Record<string, BreakdownItem | undefined> = {};

  trades.forEach((trade) => {
    const direction = trade.type || "Unknown";

    if (!items[direction]) {
      items[direction] = createBreakdownItem(direction);
    }
    processTrade(trade, items[direction]);
  });

  return calculateBreakdownStats(items);
};

export const getSessionBreakdown = (trades: Array<TradeEntry>) => {
  const items: Record<string, BreakdownItem | undefined> = {};

  trades.forEach((trade) => {
    const session = trade.session || "Unknown";

    if (!items[session]) {
      items[session] = createBreakdownItem(session);
    }
    processTrade(trade, items[session]);
  });

  return calculateBreakdownStats(items);
};

export const getMarketBreakdown = (trades: Array<TradeEntry>) => {
  const items: Record<string, BreakdownItem | undefined> = {};

  trades.forEach((trade) => {
    const market = trade.market || "Unknown";

    if (!items[market]) {
      items[market] = createBreakdownItem(market);
    }
    processTrade(trade, items[market]);
  });

  return calculateBreakdownStats(items);
};

export const getSetupBreakdown = (trades: Array<TradeEntry>) => {
  const items: Record<string, BreakdownItem | undefined> = {};

  trades.forEach((trade) => {
    const setup = trade.setup || "Unknown";

    if (!items[setup]) {
      items[setup] = createBreakdownItem(setup);
    }
    processTrade(trade, items[setup]);
  });

  return calculateBreakdownStats(items);
};

export const getTradeTypeBreakdown = (trades: Array<TradeEntry>) => {
  const items: Record<string, BreakdownItem | undefined> = {};

  trades.forEach((trade) => {
    const type = trade.tradeType || "Unknown";

    if (!items[type]) {
      items[type] = createBreakdownItem(type);
    }
    processTrade(trade, items[type]);
  });

  return calculateBreakdownStats(items);
};

export const getEmotionBreakdown = (trades: Array<TradeEntry>) => {
  const items: Record<string, BreakdownItem | undefined> = {};

  trades.forEach((trade) => {
    const emotion = trade.emotionBefore || "Neutral";

    if (!items[emotion]) {
      items[emotion] = createBreakdownItem(emotion);
    }
    processTrade(trade, items[emotion]);
  });

  return calculateBreakdownStats(items);
};

export const getEquityCurve = (trades: Array<TradeEntry>) => {
  if (trades.length === 0) return [];

  // Sort trades by date
  const sortedTrades = [...trades].sort((a, b) => {
    const dateA = toUtcDate(a.date).getTime();
    const dateB = toUtcDate(b.date).getTime();
    return dateA - dateB;
  });

  // Aggregate P&L by date
  const dailyMap = new Map<string, { dateLabel: string; pnl: number }>();

  for (const trade of sortedTrades) {
    const dateObj = toUtcDate(trade.date);
    const dateKey = getUtcDateKey(dateObj);
    const dateLabel = getUtcDateLabel(dateObj);
    const pnl = trade.profitLoss || 0;

    const current = dailyMap.get(dateKey);
    if (current) {
      current.pnl += pnl;
    } else {
      dailyMap.set(dateKey, { dateLabel, pnl });
    }
  }

  // Build cumulative equity curve
  let equity = 0;
  return Array.from(dailyMap.values()).map(({ dateLabel, pnl }) => {
    equity += pnl;
    return {
      date: dateLabel,
      equity: Number(equity.toFixed(2)),
    };
  });
};

export const calculateStats = (trades: Array<TradeEntry>) => {
  const totalTrades = trades.length;
  if (totalTrades === 0) {
    return {
      totalTrades: 0,
      winrate: 0,
      totalProfitLoss: 0,
      avgRR: 0,
    };
  }

  const decisiveTrades = trades.filter((trade) => {
    const outcomeType = classifyTradeOutcome(trade);
    return outcomeType === "win" || outcomeType === "loss";
  });
  const wins = decisiveTrades.filter(
    (trade) => classifyTradeOutcome(trade) === "win",
  ).length;
  const winrate =
    decisiveTrades.length === 0 ? 0 : (wins / decisiveTrades.length) * 100;
  const totalProfitLoss = trades.reduce(
    (acc, t) => acc + (t.profitLoss || 0),
    0,
  );
  const avgRR =
    trades.reduce((acc, t) => acc + (t.actualRR || 0), 0) / totalTrades;

  return {
    totalTrades,
    winrate,
    totalProfitLoss: Number(totalProfitLoss.toFixed(2)),
    avgRR: Number(avgRR.toFixed(2)),
  };
};
