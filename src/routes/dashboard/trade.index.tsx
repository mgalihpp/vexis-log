import { Link, createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Plus } from 'lucide-react'
import { getTrades } from '@/utils/dashboard.functions'
import { TradesTable } from '@/features/dashboard/components/TradesTable'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/dashboard/trade/')({
  component: RouteComponent,
  loader: async () => {
    const trades = await getTrades()
    return { trades }
  },
})

function RouteComponent() {
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
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">
            Trades
          </h1>
          <p className="text-muted-foreground mt-1">
            Review and manage your trade journal.
          </p>
        </div>
        <Link to="/dashboard/trade/new">
          <Button>
            <Plus />
            Add Trade
          </Button>
        </Link>
      </div>

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
