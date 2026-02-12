import { Link } from '@tanstack/react-router'
import { Logo } from '@/components/ui/logo'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const productLinks = [
    { label: 'Features', to: '/#features-section' },
    { label: 'Integrations', to: '/' },
    { label: 'Pricing', to: '/' },
    { label: 'Changelog', to: '/' },
  ]

  const resourceLinks = [
    { label: 'Documentation', to: '/' },
    { label: 'API Reference', to: '/' },
    { label: 'Community', to: '/' },
    { label: 'Blog', to: '/' },
  ]

  const legalLinks = [
    { label: 'Privacy Policy', to: '/legal#privacy-policy' },
    { label: 'Terms of Service', to: '/legal#terms-of-service' },
    { label: 'Cookie Policy', to: '/legal#cookie-policy' },
  ]

  return (
    <footer className="relative z-10 border-t border-border/60 bg-background/95">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-14">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-5">
              <Logo size={24} />
              <span className="font-bold tracking-tight text-foreground">
                VEXIS LOG
              </span>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground max-w-xs">
              The atmospheric trading journal for focused traders. Capture
              context, measure discipline, and improve your edge with one
              connected workflow.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-5">
              Product
            </h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {productLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className="hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-5">
              Resources
            </h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {resourceLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className="hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-5">
              Legal
            </h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {legalLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className="hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border/60 pt-6 flex items-center justify-center">
          <p className="text-xs text-muted-foreground text-center">
            © {currentYear} Vexis Log Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
