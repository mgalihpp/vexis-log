import { format } from "date-fns";

export type AnalyticsTrade = {
  date: Date | string;
  profitLoss?: number | null;
  result?: string | null;
  discipline?: number | null;
  confidence?: number | null;
  planChange?: string | null;
  riskRewardRatio?: number | null;
};

export function calculateDailyPnL(
  trades: Array<AnalyticsTrade>,
): Array<{ date: string; pnl: number; tradeCount: number }> {
  if (trades.length === 0) return [];

  const dailyMap = new Map<string, { pnl: number; count: number }>();

  for (const trade of trades) {
    const dateObj =
      typeof trade.date === "string" ? new Date(trade.date) : trade.date;
    const dateStr = format(dateObj, "yyyy-MM-dd");
    const pnl = trade.profitLoss ?? 0;

    const current = dailyMap.get(dateStr) || { pnl: 0, count: 0 };
    dailyMap.set(dateStr, {
      pnl: current.pnl + pnl,
      count: current.count + 1,
    });
  }

  return Array.from(dailyMap.entries())
    .map(([date, data]) => ({
      date,
      pnl: data.pnl,
      tradeCount: data.count,
    }))
    .sort((a, b) => a.date.localeCompare(b.date));
}

export function calculateEquityCurve(
  trades: Array<AnalyticsTrade>,
): Array<{ date: string; equity: number; daily: number }> {
  if (trades.length === 0) return [];

  const dailyData = calculateDailyPnL(trades);
  let cumulativeEquity = 0;

  return dailyData.map((day) => {
    cumulativeEquity += day.pnl;
    return {
      date: day.date,
      equity: cumulativeEquity,
      daily: day.pnl,
    };
  });
}

export function calculateRadarMetrics(
  trades: Array<AnalyticsTrade>,
): Array<{ metric: string; value: number; fullMark: 100 }> {
  const metrics = [
    { metric: "Win Rate", value: 0, fullMark: 100 as const },
    { metric: "Profit Factor", value: 0, fullMark: 100 as const },
    { metric: "Discipline", value: 0, fullMark: 100 as const },
    { metric: "Confidence", value: 0, fullMark: 100 as const },
    { metric: "Plan Adherence", value: 0, fullMark: 100 as const },
  ];

  if (trades.length === 0) return metrics;

  let wins = 0;
  let resolvedCount = 0;
  let grossProfit = 0;
  let grossLoss = 0;
  let disciplineSum = 0;
  let disciplineCount = 0;
  let confidenceSum = 0;
  let confidenceCount = 0;
  let adheredCount = 0;

  for (const trade of trades) {
    // Win Rate
    const res = trade.result?.toLowerCase();
    if (res === "win") {
      wins++;
      resolvedCount++;
    } else if (res === "loss") {
      resolvedCount++;
    }

    // Profit Factor
    const pnl = trade.profitLoss ?? 0;
    if (pnl > 0) grossProfit += pnl;
    else if (pnl < 0) grossLoss += Math.abs(pnl);

    // Discipline
    if (trade.discipline !== null && trade.discipline !== undefined) {
      disciplineSum += trade.discipline;
      disciplineCount++;
    }

    // Confidence
    if (trade.confidence !== null && trade.confidence !== undefined) {
      confidenceSum += trade.confidence;
      confidenceCount++;
    }

    // Plan Adherence
    if (!trade.planChange) {
      adheredCount++;
    }
  }

  // Calculate Metrics
  const winRate = resolvedCount > 0 ? (wins / resolvedCount) * 100 : 0;

  let profitFactor = 0;
  if (grossLoss === 0) {
    profitFactor = grossProfit > 0 ? 100 : 0;
  } else {
    const rawPF = grossProfit / grossLoss;
    profitFactor = Math.min(100, (rawPF / 3) * 100);
  }

  const disciplineScore =
    disciplineCount > 0 ? (disciplineSum / disciplineCount) * 10 : 0;

  const confidenceScore =
    confidenceCount > 0 ? (confidenceSum / confidenceCount) * 10 : 0;

  const adherenceScore = (adheredCount / trades.length) * 100;

  metrics[0].value = winRate;
  metrics[1].value = profitFactor;
  metrics[2].value = disciplineScore;
  metrics[3].value = confidenceScore;
  metrics[4].value = adherenceScore;

  return metrics;
}
