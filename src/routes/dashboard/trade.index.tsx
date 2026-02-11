import { Link, createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Plus } from 'lucide-react'
import type { TradeEntry } from '@/types/trade'
import { TradeList } from '@/features/trade/components/TradeList'
import { TradeDetail } from '@/features/trade/components/TradeDetail'
import { getTrades } from '@/utils/dashboard.functions'

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
  const [selectedTrade, setSelectedTrade] = useState<TradeEntry | null>(null)

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
