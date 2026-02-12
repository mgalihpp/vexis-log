import { Link } from '@tanstack/react-router'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Logo } from '@/components/ui/logo'
import { AuthComponent, UnAuthComponent } from '@/components/auth/AuthComponent'

export function LandingHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <nav className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
      <div className="glass-card rounded-full px-4 md:px-6 py-3 flex items-center justify-between w-full max-w-4xl relative overflow-visible">
        <div className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 translate-x-[-150%] animate-pulse" />

        <Link to="/" className="relative z-10 flex items-center gap-2">
          <Logo size={32} />
          <span className="font-bold text-lg tracking-tight text-foreground">
            VEXIS LOG
          </span>
        </Link>

        <div className="relative z-10 hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <a
            className="hover:text-foreground transition-colors"
            href="#features-section"
          >
            Features
          </a>
          <a className="hover:text-foreground transition-colors" href="#">
            Pricing
          </a>
        </div>

        <div className="relative z-10 flex items-center gap-3">
          <button
            className="md:hidden text-muted-foreground hover:text-foreground"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <UnAuthComponent>
            <Link
              to="/signup"
              className="bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-medium px-5 py-2 rounded-full transition-all shadow-[0_0_20px_color-mix(in_oklab,var(--color-primary)_35%,transparent)] hover:shadow-[0_0_30px_color-mix(in_oklab,var(--color-primary)_55%,transparent)]"
            >
              Launch App
            </Link>
          </UnAuthComponent>

          <AuthComponent>
            <Link
              to="/dashboard"
              className="bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-medium px-5 py-2 rounded-full transition-all shadow-[0_0_20px_color-mix(in_oklab,var(--color-primary)_35%,transparent)] hover:shadow-[0_0_30px_color-mix(in_oklab,var(--color-primary)_55%,transparent)]"
            >
              Launch App
            </Link>
          </AuthComponent>
        </div>

        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 mt-3 rounded-2xl border border-border bg-background/95 backdrop-blur-xl p-4 shadow-2xl md:hidden flex flex-col gap-3 z-20">
            <a
              href="#features-section"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Features
            </a>
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Pricing
            </a>
          </div>
        )}
      </div>
    </nav>
  )
}
