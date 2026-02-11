import {
  Link,
  Outlet,
  createFileRoute,
  redirect,
  useLocation,
} from '@tanstack/react-router'
import { SECTIONS } from '@/features/settings/constants/section'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/dashboard/settings')({
  beforeLoad: ({ location }) => {
    if (location.pathname === '/dashboard/settings') {
      throw redirect({ to: '/dashboard/settings/profile' })
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const location = useLocation()

  const activeSection = location.pathname.split('/')[3]

  const activeObj =
    SECTIONS.find((s) => s.value === activeSection) ?? SECTIONS[0]
  const ActiveIcon = activeObj.icon

  return (
    <div className="flex gap-6">
      {/* Sidebar */}
      <nav className="hidden md:flex flex-col gap-1 w-52 shrink-0 glass-card border-border/50 p-3 rounded-lg self-start sticky top-15">
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium px-2 mb-2">
          Settings
        </span>
        {SECTIONS.map((sec) => {
          const isActive = activeSection === sec.value
          const Icon = sec.icon
          return (
            <Link key={sec.value} to={`/dashboard/settings/${sec.value}`}>
              <button
                className={cn(
                  'flex items-center gap-2 px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-200 text-left w-full',
                  isActive
                    ? 'bg-primary/15 text-primary'
                    : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground',
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {sec.label}
              </button>
            </Link>
          )
        })}
      </nav>

      {/* Mobile horizontal nav */}
      <div className="flex md:hidden gap-2 overflow-x-auto pb-3 -mx-4 px-4 scrollbar-none absolute top-[73px] left-0 right-0 bg-background/80 backdrop-blur-lg border-b border-border/30 py-3 z-40">
        {SECTIONS.map((sec) => {
          const isActive = activeSection === sec.value
          const Icon = sec.icon
          return (
            <Link
              key={sec.value}
              to={`/dashboard/settings/${sec.value}`}
              className={cn(
                'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 border shrink-0',
                isActive
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-muted/50 text-muted-foreground border-border/50',
              )}
            >
              <Icon className="h-3 w-3" />
              {sec.label}
            </Link>
          )
        })}
      </div>

      <div className="flex-1 min-w-0 space-y-4 md:mt-0 mt-14">
        <div className="flex items-center gap-2 mb-2">
          <ActiveIcon className="h-4 w-4 text-primary" />
          <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            {activeObj.label}
          </h2>
        </div>
        <Outlet />
      </div>
    </div>
  )
}
