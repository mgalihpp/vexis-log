import { createFileRoute } from '@tanstack/react-router'
import Analytics from '@/features/analytics/components/Analytics'
import { getTrades } from '@/utils/dashboard.functions'

export const Route = createFileRoute('/dashboard/analytics')({
  loader: async () => {
    const trades = await getTrades()
    return { trades }
  },
  component: AnalyticsPage,
})

function AnalyticsPage() {
  const { trades } = Route.useLoaderData()
  return <Analytics trades={trades} />
}
