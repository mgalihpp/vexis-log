import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { TradesTable } from '@/features/dashboard/components/TradesTable'
import { getTrades } from '@/utils/dashboard.functions'

export const Route = createFileRoute('/dashboard/history')({
  component: HistoryPage,
  loader: async () => {
    const trades = await getTrades()
    return { trades }
  },
})

function HistoryPage() {
  const { trades } = Route.useLoaderData()
  const [search, setSearch] = useState('')
  const [filterMarket, setFilterMarket] = useState('all')

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
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-display font-bold text-foreground">
          Trade History
        </h1>
        <p className="text-muted-foreground mt-1">
          A complete history of all your trading activities.
        </p>
      </div>

      <TradesTable
        trades={filteredTrades}
        search={search}
        filterMarket={filterMarket}
        onSearchChange={setSearch}
        onFilterMarketChange={setFilterMarket}
        title="History Log"
      />
    </div>
  )
}
