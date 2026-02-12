import { Link } from '@tanstack/react-router'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface SubSidebarItem {
  id: string
  label: string
  icon: LucideIcon
  to?: string
  onClick?: () => void
  isActive?: boolean
}

export interface SubSidebarProps {
  title: string
  items: Array<SubSidebarItem>
  className?: string
  mobileClassName?: string
}

export function SubSidebar({
  title,
  items,
  className,
  mobileClassName,
}: SubSidebarProps) {
  return (
    <>
      {/* Desktop Sidebar */}
      <nav
        className={cn(
          'hidden md:flex flex-col gap-1 w-52 shrink-0 glass-card border-border/50 p-3 rounded-lg self-start sticky top-20',
          className,
        )}
      >
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium px-2 mb-2">
          {title}
        </span>
        {items.map((item) => {
          const Icon = item.icon
          const content = (
            <>
              <Icon className="h-4 w-4 shrink-0" />
              {item.label}
            </>
          )

          const commonClasses = cn(
            'flex items-center gap-2 px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-200 text-left w-full',
            item.isActive
              ? 'bg-primary/15 text-primary'
              : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground',
          )

          if (item.to) {
            return (
              <Link key={item.id} to={item.to} className={commonClasses}>
                {content}
              </Link>
            )
          }

          return (
            <button
              key={item.id}
              onClick={item.onClick}
              className={commonClasses}
            >
              {content}
            </button>
          )
        })}
      </nav>

      {/* Mobile Horizontal Nav */}
      <div
        className={cn(
          'flex md:hidden gap-2 overflow-x-auto pb-3 -mx-4 px-4 scrollbar-none sticky top-14 bg-background/80 backdrop-blur-lg z-40 py-2 border-b border-border/30',
          mobileClassName,
        )}
      >
        {items.map((item) => {
          const Icon = item.icon
          const content = (
            <>
              <Icon className="h-3 w-3" />
              {item.label}
            </>
          )

          const commonClasses = cn(
            'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 border shrink-0',
            item.isActive
              ? 'bg-primary text-primary-foreground border-primary'
              : 'bg-muted/50 text-muted-foreground border-border/50',
          )

          if (item.to) {
            return (
              <Link key={item.id} to={item.to} className={commonClasses}>
                {content}
              </Link>
            )
          }

          return (
            <button
              key={item.id}
              onClick={item.onClick}
              className={commonClasses}
            >
              {content}
            </button>
          )
        })}
      </div>
    </>
  )
}
