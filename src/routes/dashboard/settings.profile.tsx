import { createFileRoute } from '@tanstack/react-router'
import { ProfileSection } from '@/features/settings/components/ProfileSection'

export const Route = createFileRoute('/dashboard/settings/profile')({
  component: RouteComponent,
})

function RouteComponent() {
  return <ProfileSection />
}
