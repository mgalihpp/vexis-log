import { createFileRoute } from '@tanstack/react-router'
import { AppearanceSection } from '@/features/settings/components/ApperanceSection'

export const Route = createFileRoute('/dashboard/settings/appearance')({
  component: RouteComponent,
})

function RouteComponent() {
  return <AppearanceSection />
}
