import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'
import { getAuthSession } from '@/utils/auth.functions'
import { Sidebar } from '@/features/dashboard/components/Sidebar'

export const Route = createFileRoute('/dashboard')({
  beforeLoad: async () => {
    const user = await getAuthSession()
    if (!user) {
      throw redirect({ to: '/login' })
    }
  },
  component: DashboardLayout,
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
