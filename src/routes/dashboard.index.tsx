import { Link, createFileRoute } from '@tanstack/react-router'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { getStats, getTrades } from '@/utils/dashboard.functions'
import { Button } from '@/components/ui/button'
import { EquityCurveCard } from '@/features/dashboard/components/EquityCurveCard'
import { PerformanceCard } from '@/features/dashboard/components/PerformanceCard'
import { StatsOverview } from '@/features/dashboard/components/StatsOverview'
import { TradesTable } from '@/features/dashboard/components/TradesTable'
import { WinRateMeter } from '@/features/dashboard/components/WinRateMeter'
import { PnLCalendar } from '@/features/dashboard/components/PnLCalendar'
import { TraderRadar } from '@/features/dashboard/components/TraderRadar'

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

        <Link to="/dashboard/trade/quick-add">
          <Button>
            <Plus />
            Quick Add Trade
          </Button>
        </Link>
      </div>

      <StatsOverview stats={stats} />

      {/* Charts Row 1: Equity Curve + Win Rate */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <EquityCurveCard trades={trades} hasTrades={hasTrades} />
        <WinRateMeter winRate={stats.winRate} totalTrades={stats.totalTrades} />
      </div>

      {/* Charts Row 2: Radar + Calendar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TraderRadar trades={trades} />
        <PnLCalendar trades={trades} />
      </div>

      {/* Performance */}
      <PerformanceCard
        bestWinTrade={stats.bestWinTrade}
        worstLossTrade={stats.worstLossTrade}
      />

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
