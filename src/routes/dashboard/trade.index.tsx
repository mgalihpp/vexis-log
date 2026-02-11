import { Link, createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { BarChart3, Plus } from 'lucide-react'
import type { TradeEntry } from '@/types/trade'
import { TradeList } from '@/features/trade/components/TradeList'
import { TradeDetail } from '@/features/trade/components/TradeDetail'
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
  const [selectedTrade, setSelectedTrade] = useState<TradeEntry | null>(null)

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

      {/* Content */}
      {/* <div className="flex items-center gap-2 mb-2">
        <BarChart3 className="h-4 w-4 text-primary" />
        <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          Trade History
        </h2>
        <span className="text-xs text-muted-foreground ml-auto">
          {trades.length} trades
        </span>
      </div>*/}

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className={selectedTrade ? 'lg:col-span-2' : 'lg:col-span-5'}>
          <TradeList
            trades={trades}
            onSelectTrade={setSelectedTrade}
            selectedId={selectedTrade?.id}
          />
        </div>
        {selectedTrade && (
          <div className="lg:col-span-3">
            <TradeDetail
              trade={selectedTrade}
              onClose={() => setSelectedTrade(null)}
            />
          </div>
        )}
      </div>
    </div>
  )
}
