import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export function CTASection() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-background">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[100px] opacity-50" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8">
              <Sparkles size={16} />
              <span>Built for consistent journaling habits</span>
            </div>

            {/* Headline */}
            <h2 className="text-4xl md:text-6xl font-black text-foreground mb-6 tracking-tight leading-[1.1]">
              Stop guessing. <br className="hidden md:block" />
              Start{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-chart-3">
                journaling with intent
              </span>
              .
            </h2>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              Track your process, review outcomes, and use your own trade
              history to make better decisions on the next setup.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/signup"
                className="group w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground text-lg font-semibold px-8 py-4 rounded-lg transition-all shadow-[0_0_30px_color-mix(in_oklab,var(--color-primary)_45%,transparent)] hover:shadow-[0_0_50px_color-mix(in_oklab,var(--color-primary)_65%,transparent)] hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                Start Journaling Free
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
              <Link
                href="/dashboard"
                className="w-full sm:w-auto px-8 py-4 rounded-lg text-muted-foreground font-medium hover:text-foreground hover:bg-accent transition-colors border border-transparent hover:border-border flex items-center justify-center"
              >
                View Demo
              </Link>
            </div>

            {/* Trust/Footer Note */}
            <p className="mt-8 text-sm text-muted-foreground">
              Start with your latest trades and improve from there.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
