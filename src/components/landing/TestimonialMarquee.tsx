import { Star } from 'lucide-react'

interface Testimonial {
  id: number
  quote: string
  author: string
  role: string
  rating: number
}

const testimonials: Array<Testimonial> = [
  {
    id: 1,
    quote:
      "Finally stopped bleeding money on setups that weren't in my playbook.",
    author: 'Alex M.',
    role: 'Forex Trader, London',
    rating: 5,
  },
  {
    id: 2,
    quote:
      'The step-by-step form keeps my notes complete and finally makes review sessions useful.',
    author: 'Sarah J.',
    role: 'Fund Manager, NYC',
    rating: 5,
  },
  {
    id: 3,
    quote:
      "Vexis forces you to confront your worst habits. It's painful but necessary.",
    author: 'David K.',
    role: 'Crypto Scalper, Tokyo',
    rating: 5,
  },
  {
    id: 4,
    quote: 'My R-multiple went from 1.2 to 2.4 just by cutting out the noise.',
    author: 'Michael R.',
    role: 'Day Trader, Chicago',
    rating: 5,
  },
  {
    id: 5,
    quote:
      'The only journal that actually feels like a professional tool, not a toy.',
    author: 'Elena V.',
    role: 'Prop Firm Trader',
    rating: 5,
  },
  {
    id: 6,
    quote: 'I treat my trading like a business now. Vexis is my CFO.',
    author: 'James L.',
    role: 'Futures Trader',
    rating: 5,
  },
]

export function TestimonialMarquee() {
  return (
    <section
      id="testimonials-section"
      className="py-24 bg-background border-y border-border overflow-hidden relative"
    >
      {/* Background Gradient similar to ProblemSection for consistency */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_-100px,color-mix(in_oklab,var(--color-primary)_18%,transparent),transparent)] opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 mb-12 text-center relative z-10">
        <h2 className="text-3xl font-light text-foreground mb-4">
          Trusted by <span className="text-primary">Pro Desks</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Join traders who have stopped gambling and started building a system.
        </p>
      </div>

      <div className="relative w-full overflow-hidden">
        {/* Gradient Masks for fading edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />

        <div className="flex animate-marquee min-w-full shrink-0 gap-6 items-stretch pl-6">
          {[...testimonials, ...testimonials].map((t, i) => (
            <div
              key={`${t.id}-${i}`}
              className="w-[350px] shrink-0 p-6 rounded-xl bg-card/70 border border-border backdrop-blur-sm hover:border-primary/30 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex gap-1 text-primary mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>
                <p className="text-foreground italic mb-6 leading-relaxed">
                  "{t.quote}"
                </p>
              </div>
              <div className="flex items-center gap-3 mt-auto">
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground">
                  {t.author.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">
                    {t.author}
                  </div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
