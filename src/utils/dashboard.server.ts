import type { PeriodTrend, TrendValue } from "@/features/trade/types";
import { prisma } from "@/lib/db";

const DAY_MS = 24 * 60 * 60 * 1000;

export async function getAllTrades(userId: string) {
  return prisma.trade.findMany({
    where: {
      userId,
    },
  });
}

export async function getTradeById(id: string, userId: string) {
  const trade = await prisma.trade.findFirst({
    where: {
      id,
      userId,
    },
  });

  if (!trade) {
    throw new Error("Trade not found");
  }

  return trade;
}

export async function deleteTradeById(id: string, userId: string) {
  const trade = await prisma.trade.findFirst({
    where: {
      id,
      userId,
    },
  });

  if (!trade) {
    throw new Error("Trade not found");
  }

  const deletedTrade = await prisma.trade.delete({
    where: {
      id,
    },
  });

  return deletedTrade;
}

function calculateTrend(current: number, previous: number): TrendValue {
  if (previous === 0) {
    if (current === 0) {
      return { value: 0, direction: "neutral" };
    }

    return { value: 100, direction: "up" };
  }

  const deltaPercent = ((current - previous) / Math.abs(previous)) * 100;

  if (deltaPercent === 0) {
    return { value: 0, direction: "neutral" };
  }

  return {
    value: deltaPercent,
    direction: deltaPercent > 0 ? "up" : "down",
  };
}

async function buildStats(
  userId: string,
  where?: { date?: { gte: Date; lt: Date } },
) {
  const baseWhere = {
    userId,
    ...(where ?? {}),
  };

  const [
    totalTrades,
    winningTrades,
    losingTrades,
    netPnL,
    grossProfit,
    grossLoss,
  ] = await Promise.all([
    prisma.trade.count({ where: baseWhere }),
    prisma.trade.count({
      where: {
        ...baseWhere,
        OR: [
          {
            result: {
              in: ["Win", "Partial"],
            },
          },
          {
            result: null,
            outcome: {
              in: ["Win", "Partial"],
            },
          },
        ],
      },
    }),
    prisma.trade.count({
      where: {
        ...baseWhere,
        OR: [
          {
            result: "Loss",
          },
          {
            result: null,
            outcome: "Loss",
          },
        ],
      },
    }),
    prisma.trade.aggregate({
      _sum: {
        profitLoss: true,
      },
      where: baseWhere,
    }),
    prisma.trade.aggregate({
      _sum: {
        profitLoss: true,
      },
      where: {
        ...baseWhere,
        profitLoss: {
          gt: 0,
        },
      },
    }),
    prisma.trade.aggregate({
      _sum: {
        profitLoss: true,
      },
      where: {
        ...baseWhere,
        profitLoss: {
          lt: 0,
        },
      },
    }),
  ]);

  const netPnLValue = netPnL._sum.profitLoss ?? 0;
  const grossProfitValue = grossProfit._sum.profitLoss ?? 0;
  const grossLossValue = Math.abs(grossLoss._sum.profitLoss ?? 0);
  const resolvedTrades = winningTrades + losingTrades;
  const winRate =
    resolvedTrades === 0 ? 0 : (winningTrades / resolvedTrades) * 100;
  const profitFactor =
    grossLossValue === 0 ? 0 : grossProfitValue / grossLossValue;

  return {
    winRate,
    resolvedTrades,
    totalTrades,
    profitFactor,
    netPnL: netPnLValue,
  };
}

export async function getTradeStats(userId: string) {
  const now = new Date();
  const dayStart = new Date(now.getTime() - DAY_MS);
  const weekStart = new Date(now.getTime() - DAY_MS * 7);
  const monthStart = new Date(now.getTime() - DAY_MS * 30);

  const previousDayStart = new Date(dayStart.getTime() - DAY_MS);
  const previousWeekStart = new Date(weekStart.getTime() - DAY_MS * 7);
  const previousMonthStart = new Date(monthStart.getTime() - DAY_MS * 30);

  const [
    overall,
    dayCurrent,
    dayPrevious,
    weekCurrent,
    weekPrevious,
    monthCurrent,
    monthPrevious,
    extremes,
  ] = await Promise.all([
    buildStats(userId),
    buildStats(userId, { date: { gte: dayStart, lt: now } }),
    buildStats(userId, { date: { gte: previousDayStart, lt: dayStart } }),
    buildStats(userId, { date: { gte: weekStart, lt: now } }),
    buildStats(userId, { date: { gte: previousWeekStart, lt: weekStart } }),
    buildStats(userId, { date: { gte: monthStart, lt: now } }),
    buildStats(userId, { date: { gte: previousMonthStart, lt: monthStart } }),
    prisma.trade.aggregate({
      _max: {
        profitLoss: true,
      },
      _min: {
        profitLoss: true,
      },
      where: {
        userId,
      },
    }),
  ]);

  const trends: Record<"day" | "week" | "month", PeriodTrend> = {
    day: {
      winRate: calculateTrend(dayCurrent.winRate, dayPrevious.winRate),
      totalTrades: calculateTrend(
        dayCurrent.totalTrades,
        dayPrevious.totalTrades,
      ),
      profitFactor: calculateTrend(
        dayCurrent.profitFactor,
        dayPrevious.profitFactor,
      ),
      netPnL: calculateTrend(dayCurrent.netPnL, dayPrevious.netPnL),
    },
    week: {
      winRate: calculateTrend(weekCurrent.winRate, weekPrevious.winRate),
      totalTrades: calculateTrend(
        weekCurrent.totalTrades,
        weekPrevious.totalTrades,
      ),
      profitFactor: calculateTrend(
        weekCurrent.profitFactor,
        weekPrevious.profitFactor,
      ),
      netPnL: calculateTrend(weekCurrent.netPnL, weekPrevious.netPnL),
    },
    month: {
      winRate: calculateTrend(monthCurrent.winRate, monthPrevious.winRate),
      totalTrades: calculateTrend(
        monthCurrent.totalTrades,
        monthPrevious.totalTrades,
      ),
      profitFactor: calculateTrend(
        monthCurrent.profitFactor,
        monthPrevious.profitFactor,
      ),
      netPnL: calculateTrend(monthCurrent.netPnL, monthPrevious.netPnL),
    },
  };

  return {
    ...overall,
    bestWinTrade: Math.max(0, extremes._max.profitLoss ?? 0),
    worstLossTrade: Math.min(0, extremes._min.profitLoss ?? 0),
    trends,
  };
}
