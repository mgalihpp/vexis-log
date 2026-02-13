import { describe, expect, it } from "vitest";
import type { AnalyticsTrade } from "@/utils/dashboard.analytics";
import {
  calculateDailyPnL,
  calculateEquityCurve,
  calculateRadarMetrics,
} from "@/utils/dashboard.analytics";

describe("calculateDailyPnL", () => {
  it("returns empty array for empty trades", () => {
    expect(calculateDailyPnL([])).toEqual([]);
  });

  it("aggregates multiple trades on same day", () => {
    const trades: Array<AnalyticsTrade> = [
      { date: new Date("2023-01-01"), profitLoss: 100 },
      { date: new Date("2023-01-01"), profitLoss: -50 },
      { date: new Date("2023-01-02"), profitLoss: 200 },
    ];
    const result = calculateDailyPnL(trades);
    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({ date: "2023-01-01", pnl: 50, tradeCount: 2 });
    expect(result[1]).toEqual({ date: "2023-01-02", pnl: 200, tradeCount: 1 });
  });

  it("sorts results by date ascending", () => {
    const trades: Array<AnalyticsTrade> = [
      { date: new Date("2023-01-03"), profitLoss: 100 },
      { date: new Date("2023-01-01"), profitLoss: 50 },
    ];
    const result = calculateDailyPnL(trades);
    expect(result[0].date).toBe("2023-01-01");
    expect(result[1].date).toBe("2023-01-03");
  });

  it("handles null/undefined profitLoss as 0", () => {
    const trades: Array<AnalyticsTrade> = [
      { date: new Date("2023-01-01"), profitLoss: null },
      { date: new Date("2023-01-01"), profitLoss: undefined },
      { date: new Date("2023-01-01"), profitLoss: 50 },
    ];
    const result = calculateDailyPnL(trades);
    expect(result[0].pnl).toBe(50);
    expect(result[0].tradeCount).toBe(3);
  });
});

describe("calculateEquityCurve", () => {
  it("returns empty array for empty trades", () => {
    expect(calculateEquityCurve([])).toEqual([]);
  });

  it("calculates cumulative equity correctly", () => {
    const trades: Array<AnalyticsTrade> = [
      { date: new Date("2023-01-01"), profitLoss: 100 },
      { date: new Date("2023-01-02"), profitLoss: -50 },
      { date: new Date("2023-01-03"), profitLoss: 200 },
    ];
    const result = calculateEquityCurve(trades);
    expect(result).toHaveLength(3);
    expect(result[0]).toEqual({ date: "2023-01-01", equity: 100, daily: 100 });
    expect(result[1]).toEqual({ date: "2023-01-02", equity: 50, daily: -50 });
    expect(result[2]).toEqual({ date: "2023-01-03", equity: 250, daily: 200 });
  });

  it("handles single trade", () => {
    const trades: Array<AnalyticsTrade> = [
      { date: new Date("2023-01-01"), profitLoss: 100 },
    ];
    const result = calculateEquityCurve(trades);
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({ date: "2023-01-01", equity: 100, daily: 100 });
  });
});

describe("calculateRadarMetrics", () => {
  it("returns all zeros for empty trades", () => {
    const result = calculateRadarMetrics([]);
    expect(result).toEqual([
      { metric: "Win Rate", value: 0, fullMark: 100 },
      { metric: "Profit Factor", value: 0, fullMark: 100 },
      { metric: "Discipline", value: 0, fullMark: 100 },
      { metric: "Confidence", value: 0, fullMark: 100 },
      { metric: "Plan Adherence", value: 0, fullMark: 100 },
    ]);
  });

  it("calculates win rate correctly", () => {
    const trades: Array<AnalyticsTrade> = [
      { date: "2023-01-01", result: "Win" },
      { date: "2023-01-01", result: "Loss" },
      { date: "2023-01-01", result: "Breakeven" }, // Excluded from denominator
      { date: "2023-01-01", result: "Partial" }, // Treated as win
      { date: "2023-01-01", result: "Win" },
    ];
    // 3 Wins out of 4 resolved trades (Win, Loss, Partial, Win) -> 75
    const result = calculateRadarMetrics(trades);
    const winRate = result.find((m) => m.metric === "Win Rate")?.value;
    expect(winRate).toBeCloseTo(75, 1);
  });

  it("calculates profit factor correctly (caps at 100)", () => {
    const trades: Array<AnalyticsTrade> = [
      { date: "2023-01-01", profitLoss: 300 }, // Gross Profit: 300
      { date: "2023-01-01", profitLoss: -100 }, // Gross Loss: 100 -> PF = 3 -> mapped to 100
    ];
    const result = calculateRadarMetrics(trades);
    const pf = result.find((m) => m.metric === "Profit Factor")?.value;
    expect(pf).toBe(100);

    // Test linear scaling: PF = 1.5 -> mapped to 50
    const trades2: Array<AnalyticsTrade> = [
      { date: "2023-01-01", profitLoss: 150 },
      { date: "2023-01-01", profitLoss: -100 },
    ];
    const result2 = calculateRadarMetrics(trades2);
    const pf2 = result2.find((m) => m.metric === "Profit Factor")?.value;
    expect(pf2).toBeCloseTo(50, 0);
  });

  it("calculates discipline average", () => {
    const trades: Array<AnalyticsTrade> = [
      { date: "2023-01-01", discipline: 8 },
      { date: "2023-01-01", discipline: null }, // Ignored
      { date: "2023-01-01", discipline: 10 },
    ];
    // Avg: 9 -> Scaled to 0-100: 90
    const result = calculateRadarMetrics(trades);
    const discipline = result.find((m) => m.metric === "Discipline")?.value;
    expect(discipline).toBe(90);
  });

  it("calculates confidence average", () => {
    const trades: Array<AnalyticsTrade> = [
      { date: "2023-01-01", confidence: 5 },
      { date: "2023-01-01", confidence: 7 },
    ];
    // Avg: 6 -> Scaled to 0-100: 60
    const result = calculateRadarMetrics(trades);
    const confidence = result.find((m) => m.metric === "Confidence")?.value;
    expect(confidence).toBe(60);
  });

  it("calculates plan adherence correctly", () => {
    const trades: Array<AnalyticsTrade> = [
      { date: "2023-01-01", planChange: null }, // Adhered
      { date: "2023-01-01", planChange: "" }, // Adhered
      { date: "2023-01-01", planChange: "Panic exit" }, // Not adhered
    ];
    // 2/3 adhered -> 66.67
    const result = calculateRadarMetrics(trades);
    const adherence = result.find((m) => m.metric === "Plan Adherence")?.value;
    expect(adherence).toBeCloseTo(66.67, 1);
  });

  it("handles trades with all null optional fields", () => {
    const trades: Array<AnalyticsTrade> = [{ date: "2023-01-01" }];
    const result = calculateRadarMetrics(trades);
    expect(
      result.every((m) => m.value === 0 || m.value === 100 || !isNaN(m.value)),
    ).toBe(true);
    // Specifically check for NaN
    result.forEach((metric) => {
      expect(Number.isNaN(metric.value)).toBe(false);
    });
  });
});
