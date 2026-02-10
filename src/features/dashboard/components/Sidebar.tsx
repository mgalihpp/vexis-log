import { Link, useLocation } from '@tanstack/react-router'
import { LogOut } from 'lucide-react'
import { SIDEBAR_LINKS } from '../constants/nav'
import { cn } from '@/lib/utils'
import { Logo } from '@/components/ui/logo'

export function Sidebar() {
  const location = useLocation()

  return (
    <div className="hidden md:flex flex-col w-64 min-h-screen bg-card border-r border-border sticky top-0 h-screen">
      <div className="p-6 border-b border-border/50 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-blue-600 flex items-center justify-center shadow-lg shadow-primary/20">
          <Logo className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="font-display font-bold text-lg tracking-tight">
            Vexis Log
          </h1>
          <p className="text-xs text-muted-foreground font-medium">
            Trading Journal
          </p>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <p className="px-4 text-xs font-semibold text-muted-foreground mb-4 mt-2">
          MENU
        </p>
        {SIDEBAR_LINKS.map((link) => {
          const Icon = link.icon
          const isActive = location.pathname === link.href

          return (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group font-medium text-sm',
                isActive
                  ? 'bg-primary/10 text-primary shadow-sm'
                  : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground',
              )}
            >
              <Icon
                className={cn(
                  'w-5 h-5 transition-colors',
                  isActive
                    ? 'text-primary'
                    : 'text-muted-foreground group-hover:text-foreground',
                )}
              />
              {link.label}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-border/50">
        <button className="flex items-center gap-3 px-4 py-3 rounded-xl w-full text-left text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors duration-200 text-sm font-medium">
          <LogOut className="w-5 h-5" />
          Sign Out
        </button>
      </div>
    </div>
  )
}
