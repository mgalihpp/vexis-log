import { CandlestickChart, DollarSign, LineChart, Target } from 'lucide-react'
import type { DashboardStats } from '@/features/dashboard/types'
import { StatCard } from '@/features/dashboard/components/StatCard'

type StatsOverviewProps = {
  stats: DashboardStats
}

export function StatsOverview({ stats }: StatsOverviewProps) {
  const winRate = stats.winRate
  const netPnL = stats.netPnL
  const profitFactor = stats.profitFactor
  const totalTrades = stats.totalTrades
  const trends = stats.trends

  const formatTrend = (value: number) =>
    `${value >= 0 ? '+' : ''}${value.toFixed(1)}%`

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="Win Rate"
        value={`${winRate.toFixed(1)}%`}
        icon={<Target className="w-6 h-6" />}
        trends={[
          {
            label: '1D',
            value: formatTrend(trends.day.winRate.value),
            direction: trends.day.winRate.direction,
          },
          {
            label: '1W',
            value: formatTrend(trends.week.winRate.value),
            direction: trends.week.winRate.direction,
          },
          {
            label: '1M',
            value: formatTrend(trends.month.winRate.value),
            direction: trends.month.winRate.direction,
          },
        ]}
      />
      <StatCard
        title="Net P&L"
        value={`${netPnL >= 0 ? '+' : '-'}$${Math.abs(netPnL).toFixed(2)}`}
        icon={<DollarSign className="w-6 h-6" />}
        trends={[
          {
            label: '1D',
            value: formatTrend(trends.day.netPnL.value),
            direction: trends.day.netPnL.direction,
          },
          {
            label: '1W',
            value: formatTrend(trends.week.netPnL.value),
            direction: trends.week.netPnL.direction,
          },
          {
            label: '1M',
            value: formatTrend(trends.month.netPnL.value),
            direction: trends.month.netPnL.direction,
          },
        ]}
      />
      <StatCard
        title="Profit Factor"
        value={profitFactor.toFixed(2)}
        icon={<LineChart className="w-6 h-6" />}
        trends={[
          {
            label: '1D',
            value: formatTrend(trends.day.profitFactor.value),
            direction: trends.day.profitFactor.direction,
          },
          {
            label: '1W',
            value: formatTrend(trends.week.profitFactor.value),
            direction: trends.week.profitFactor.direction,
          },
          {
            label: '1M',
            value: formatTrend(trends.month.profitFactor.value),
            direction: trends.month.profitFactor.direction,
          },
        ]}
      />
      <StatCard
        title="Total Trades"
        value={totalTrades.toString()}
        icon={<CandlestickChart className="w-6 h-6" />}
        trends={[
          {
            label: '1D',
            value: formatTrend(trends.day.totalTrades.value),
            direction: trends.day.totalTrades.direction,
          },
          {
            label: '1W',
            value: formatTrend(trends.week.totalTrades.value),
            direction: trends.week.totalTrades.direction,
          },
          {
            label: '1M',
            value: formatTrend(trends.month.totalTrades.value),
            direction: trends.month.totalTrades.direction,
          },
        ]}
      />
    </div>
  )
}
