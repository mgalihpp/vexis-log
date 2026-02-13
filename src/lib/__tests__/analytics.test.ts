import { describe, expect, it } from "vitest";
import {
  getDayOfWeekBreakdown,
  getEquityCurve,
  getMonthlyBreakdown,
  getWeeklyBreakdown,
  getYearlyBreakdown,
} from "@/lib/analytics";
import type { TradeEntry } from "@/types/trade";

const createTrade = (overrides: Partial<TradeEntry>): TradeEntry => ({
  id: "65f1e7b1f0e4f2a9c8d7b6a5",
  userId: "65f1e7b1f0e4f2a9c8d7b6a6",
  date: new Date("2026-02-13T00:00:00.000Z"),
  time: null,
  market: "Forex",
  pair: "EURUSD",
  timeframe: "H1",
  session: null,
  tradeType: null,
  type: "Buy",
  marketCondition: null,
  marketBias: null,
  strategy: null,
  setup: null,
  technicalConfirmation: null,
  fundamentalConfirmation: null,
  entryReason: null,
  entry: null,
  entryPrice: null,
  stopLoss: null,
  takeProfit: null,
  riskPercent: null,
  accountBalance: null,
  riskRewardRatio: null,
  rrRatio: null,
  positionSize: null,
  entryValid: null,
  entryOnPlan: null,
  slippage: null,
  planChange: null,
  tradeManagement: null,
  executionNotes: null,
  managementNotes: null,
  emotionBefore: null,
  emotionalDisruption: null,
  confidenceLevel: null,
  confidence: null,
  disturbances: null,
  disciplineScore: null,
  discipline: null,
  exitPrice: null,
  fee: null,
  profitLoss: 100,
  outcome: "Win",
  result: "Win",
  actualRR: 2,
  whatWentRight: null,
  mistakes: null,
  setupValid: null,
  validSetup: null,
  timingReview: null,
  entryTiming: null,
  lessonsLearned: null,
  lesson: null,
  screenshotBefore: null,
  screenshotAfter: null,
  notes: null,
  tags: [],
  improvementPlan: null,
  improvement: null,
  rulesToTighten: null,
  actionPlan: null,
  createdAt: new Date("2026-02-13T00:00:00.000Z"),
  updatedAt: new Date("2026-02-13T00:00:00.000Z"),
  ...overrides,
});

describe("getDayOfWeekBreakdown", () => {
  it("returns all weekdays in stable order", () => {
    const items = getDayOfWeekBreakdown([]);

    expect(items.map((item) => item.name)).toEqual([
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ]);
  });

  it("classifies trades by UTC weekday for boundary timestamps", () => {
    const fridayUtcLate = createTrade({
      date: new Date("2026-02-13T23:30:00.000Z"),
      profitLoss: 50,
      actualRR: 1.5,
    });

    const items = getDayOfWeekBreakdown([fridayUtcLate]);
    const friday = items.find((item) => item.name === "Friday");
    const saturday = items.find((item) => item.name === "Saturday");

    expect(friday?.trades).toBe(1);
    expect(saturday?.trades).toBe(0);
  });

  it("treats partial results as wins for winrate", () => {
    const partialTrade = createTrade({
      date: new Date("2026-02-13T10:00:00.000Z"),
      profitLoss: 0,
      result: "Partial",
      outcome: "Partial",
    });

    const items = getDayOfWeekBreakdown([partialTrade]);
    const friday = items.find((item) => item.name === "Friday");

    expect(friday?.wins).toBe(1);
    expect(friday?.losses).toBe(0);
    expect(friday?.winrate).toBe(100);
  });

  it("excludes breakeven from winrate denominator", () => {
    const winTrade = createTrade({
      date: new Date("2026-02-13T09:00:00.000Z"),
      result: "Win",
      outcome: "Win",
      profitLoss: 120,
    });
    const breakevenTrade = createTrade({
      id: "65f1e7b1f0e4f2a9c8d7b6a8",
      date: new Date("2026-02-13T11:00:00.000Z"),
      result: "Breakeven",
      outcome: "Breakeven",
      profitLoss: 0,
    });

    const items = getDayOfWeekBreakdown([winTrade, breakevenTrade]);
    const friday = items.find((item) => item.name === "Friday");

    expect(friday?.trades).toBe(2);
    expect(friday?.wins).toBe(1);
    expect(friday?.losses).toBe(0);
    expect(friday?.winrate).toBe(100);
  });
});

describe("UTC date grouping consistency", () => {
  it("groups monthly and yearly buckets by UTC date", () => {
    const boundaryTrade = createTrade({
      date: new Date("2026-01-31T23:30:00.000Z"),
    });

    const monthly = getMonthlyBreakdown([boundaryTrade]);
    const yearly = getYearlyBreakdown([boundaryTrade]);

    expect(monthly).toHaveLength(1);
    expect(monthly[0]?.name).toBe("Jan 2026");
    expect(yearly).toHaveLength(1);
    expect(yearly[0]?.name).toBe("2026");
  });

  it("computes weekly bucket labels using UTC week starts", () => {
    const fridayTrade = createTrade({
      date: new Date("2026-02-13T23:30:00.000Z"),
    });

    const weekly = getWeeklyBreakdown([fridayTrade]);

    expect(weekly).toHaveLength(1);
    expect(weekly[0]?.name).toBe("Week of 08 Feb");
  });

  it("aggregates equity curve daily keys by UTC date", () => {
    const trades = [
      createTrade({
        date: new Date("2026-02-13T23:30:00.000Z"),
        profitLoss: 50,
      }),
      createTrade({
        id: "65f1e7b1f0e4f2a9c8d7b6a7",
        date: new Date("2026-02-14T00:15:00.000Z"),
        profitLoss: 25,
      }),
    ];

    const curve = getEquityCurve(trades);

    expect(curve).toEqual([
      { date: "13 Feb", equity: 50 },
      { date: "14 Feb", equity: 75 },
    ]);
  });
});
