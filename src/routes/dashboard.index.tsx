import { Link, createFileRoute } from '@tanstack/react-router'
import { Plus } from 'lucide-react'
import { format } from 'date-fns'
import { useState } from 'react'
import { getStats, getTrades } from '@/utils/dashboard.functions'
import { Button } from '@/components/ui/button'
import { EquityCurveCard } from '@/features/dashboard/components/EquityCurveCard'
import { PerformanceCard } from '@/features/dashboard/components/PerformanceCard'
import { StatsOverview } from '@/features/dashboard/components/StatsOverview'
import { TradesTable } from '@/features/dashboard/components/TradesTable'

export const Route = createFileRoute('/dashboard/')({
  component: DashboardIndex,
  loader: async () => {
    const [trades, stats] = await Promise.all([getTrades(), getStats()])

    return {
      trades,
      stats,
    }
  },
})

function DashboardIndex() {
  const [search, setSearch] = useState('')
  const [filterMarket, setFilterMarket] = useState('all')

  const { trades, stats } = Route.useLoaderData()
  const hasTrades = trades.length > 0

  // Prepare chart data (cumulative PnL)

  const chartData = trades
    .slice()
    .reverse()
    .reduce(
      (acc: Array<{ date: string; value: number; daily: number }>, trade) => {
        const prevPnL = acc.length > 0 ? acc[acc.length - 1].value : 0
        const currentPnL = Number(trade.profitLoss || 0)
        acc.push({
          date: format(new Date(trade.date), 'MMM dd'),
          value: prevPnL + currentPnL,
          daily: currentPnL,
        })
        return acc
      },
      [],
    )

  const filteredTrades = trades.filter((trade) => {
    const matchesMarket =
      filterMarket === 'all' || trade.market === filterMarket
    const matchesSearch =
      search === '' ||
      trade.pair.toLowerCase().includes(search.toLowerCase()) ||
      trade.setup?.toLowerCase().includes(search.toLowerCase())
    return matchesMarket && matchesSearch
  })

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">
            Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Welcome back. Here's your trading overview.
          </p>
        </div>

        <Link to="/dashboard/trade/new">
          <Button>
            <Plus />
            Add Trade
          </Button>
        </Link>
      </div>

      <StatsOverview stats={stats} />

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <EquityCurveCard chartData={chartData} hasTrades={hasTrades} />

        <PerformanceCard
          bestWinTrade={stats.bestWinTrade}
          worstLossTrade={stats.worstLossTrade}
        />
      </div>

      {/* Trades Table */}
      <TradesTable
        trades={filteredTrades}
        search={search}
        filterMarket={filterMarket}
        onSearchChange={setSearch}
        onFilterMarketChange={setFilterMarket}
      />
    </div>
  )
}
