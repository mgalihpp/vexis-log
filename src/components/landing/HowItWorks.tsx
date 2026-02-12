import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { Import, Search, TrendingUp } from 'lucide-react'
import { cn } from '@/lib/utils'

const steps = [
  {
    id: 1,
    title: 'Journal',
    description:
      'Record your trades with full context: setup, execution, psychology, and post-trade review.',
    icon: Import,
    color: 'text-primary',
    bg: 'bg-primary/10',
    border: 'border-primary/20',
  },
  {
    id: 2,
    title: 'Analyze',
    description:
      'Track win rate, net P&L, profit factor, equity curve, and behavior breakdowns from your data.',
    icon: Search,
    color: 'text-warning',
    bg: 'bg-warning/10',
    border: 'border-warning/20',
  },
  {
    id: 3,
    title: 'Improve',
    description:
      'Use history filters, tags, and notes to tighten rules and build a repeatable trading process.',
    icon: TrendingUp,
    color: 'text-success',
    bg: 'bg-success/10',
    border: 'border-success/20',
  },
]

export function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-20%' })
  const shouldReduceMotion = useReducedMotion()

  return (
    <section
      id="how-it-works-section"
      className="py-24 bg-background relative overflow-hidden"
      ref={containerRef}
    >
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_700px_at_50%_-10%,color-mix(in_oklab,var(--color-primary)_14%,transparent),transparent)] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-bold text-foreground mb-6"
          >
            From chaos to <span className="text-primary">clarity</span>.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-muted-foreground"
          >
            A practical loop to document decisions, measure outcomes, and
            improve execution quality.
          </motion.p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Desktop Connection Line (SVG) */}
          <div className="hidden md:block absolute top-12 left-0 w-full h-24 overflow-visible pointer-events-none">
            <svg
              className="w-full h-full"
              viewBox="0 0 1000 100"
              preserveAspectRatio="none"
            >
              <motion.path
                d="M 100 50 L 900 50"
                fill="none"
                stroke="url(#gradient-line)"
                strokeWidth="2"
                strokeDasharray="10 5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={
                  isInView
                    ? { pathLength: 1, opacity: 1 }
                    : { pathLength: 0, opacity: 0 }
                }
                transition={{
                  duration: shouldReduceMotion ? 0 : 1.5,
                  ease: 'easeInOut',
                  delay: 0.4,
                }}
              />
              <defs>
                <linearGradient id="gradient-line" x1="0" y1="0" x2="1" y2="0">
                  <stop
                    offset="0%"
                    stopColor="color-mix(in oklab, var(--color-primary) 20%, transparent)"
                  />
                  <stop
                    offset="50%"
                    stopColor="color-mix(in oklab, var(--color-primary) 65%, transparent)"
                  />
                  <stop
                    offset="100%"
                    stopColor="color-mix(in oklab, var(--color-success) 65%, transparent)"
                  />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.2 }}
                className="relative flex flex-col items-center text-center group"
              >
                {/* Step Number Background Blur */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-primary/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Icon Circle */}
                <div
                  className={cn(
                    'relative w-24 h-24 rounded-2xl flex items-center justify-center mb-8 border transition-all duration-300 shadow-lg',
                    step.bg,
                    step.border,
                    'group-hover:scale-110 group-hover:shadow-primary/20',
                  )}
                >
                  <step.icon size={40} className={step.color} />

                  {/* Step Badge */}
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-card border border-border flex items-center justify-center text-sm font-bold text-muted-foreground">
                    {step.id}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed max-w-xs">
                  {step.description}
                </p>

                {/* Mobile Connector (Vertical Line) */}
                {index < steps.length - 1 && (
                  <div className="md:hidden absolute -bottom-12 left-1/2 -translate-x-1/2 w-px h-12 bg-gradient-to-b from-border to-transparent" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
