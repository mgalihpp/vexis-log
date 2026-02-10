export type TrendDirection = 'up' | 'down' | 'neutral'

export type TrendValue = {
  value: number
  direction: TrendDirection
}

export type PeriodTrend = {
  winRate: TrendValue
  totalTrades: TrendValue
  profitFactor: TrendValue
  netPnL: TrendValue
}
