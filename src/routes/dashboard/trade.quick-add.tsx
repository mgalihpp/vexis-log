import { createFileRoute } from '@tanstack/react-router'
import { QuickAddTradeCard } from '@/features/dashboard/components/QuickAddTradeCard'

export const Route = createFileRoute('/dashboard/trade/quick-add')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="space-y-1">
        <h1 className="text-3xl font-display font-bold text-foreground">
          Quick Add Trade
        </h1>
        <p className="text-muted-foreground">Log the essentials fast.</p>
      </div>

      <QuickAddTradeCard />
    </div>
  )
}
