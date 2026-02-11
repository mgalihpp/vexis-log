import {
  Outlet,
  createFileRoute,
  redirect,
  useRouteContext,
} from '@tanstack/react-router'
import { Sidebar } from '@/features/dashboard/components/Sidebar'
import { Splash } from '@/components/Splash'
import { NotFound } from '@/components/NotFound'

export const Route = createFileRoute('/dashboard')({
  beforeLoad: ({ context }) => {
    if (!context.auth.user) {
      throw redirect({ to: '/login' })
    }
  },
  component: DashboardLayout,
  pendingComponent: Splash,
  notFoundComponent: NotFound,
})

function DashboardLayout() {
  return (
    <main className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 min-h-0 overflow-auto">
        <div className="container mx-auto p-4 md:p-8 max-w-7xl">
          <Outlet />
        </div>
      </div>
    </main>
  )
}
