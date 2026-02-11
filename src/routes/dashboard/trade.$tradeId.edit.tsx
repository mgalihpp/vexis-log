import { createFileRoute } from '@tanstack/react-router'
import TradeForm from '@/features/trade/components/TradeForm'
import { getTrade } from '@/utils/dashboard.functions'
import { mapTradeToFormValues } from '@/features/trade/utils/trade-mapper'

export const Route = createFileRoute('/dashboard/trade/$tradeId/edit')({
  loader: async ({ params }) => {
    const trade = await getTrade({ data: { id: params.tradeId } })
    return { trade }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { trade } = Route.useLoaderData()
  const initialValues = mapTradeToFormValues(trade)

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="space-y-1">
        <h1 className="text-3xl font-display font-bold text-foreground">
          Edit Trade
        </h1>
        <p className="text-muted-foreground">
          Update trade details, outcome, or notes.
        </p>
      </div>
      <TradeForm tradeId={trade.id} initialValues={initialValues} />
    </div>
  )
}
