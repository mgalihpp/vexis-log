export type DashboardTrendDirection = "up" | "down" | "neutral";

export type DashboardTrendValue = {
  value: number;
  direction: DashboardTrendDirection;
};

export type DashboardPeriodTrends = {
  winRate: DashboardTrendValue;
  totalTrades: DashboardTrendValue;
  profitFactor: DashboardTrendValue;
  netPnL: DashboardTrendValue;
};

export type DashboardTrends = {
  day: DashboardPeriodTrends;
  week: DashboardPeriodTrends;
  month: DashboardPeriodTrends;
};

export type DashboardStats = {
  winRate: number;
  resolvedTrades: number;
  totalTrades: number;
  profitFactor: number;
  netPnL: number;
  bestWinTrade: number;
  worstLossTrade: number;
  trends: DashboardTrends;
};

export type DashboardTrade = {
  id: string;
  date: string | Date;
  market: string;
  pair: string;
  timeframe?: string | null;
  session?: string | null;
  type: string;
  setup?: string | null;
  result?: string | null;
  profitLoss?: number | null;
};
