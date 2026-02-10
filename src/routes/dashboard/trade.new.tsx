import { createFileRoute } from '@tanstack/react-router'
import TradeForm from '@/features/trade/components/TradeForm'

export const Route = createFileRoute('/dashboard/trade/new')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="space-y-1">
        <h1 className="text-3xl font-display font-bold text-foreground">
          New Trade
        </h1>
        <p className="text-muted-foreground">
          Log a new trade and capture the full context.
        </p>
      </div>
      <TradeForm />
    </div>
  )
}
