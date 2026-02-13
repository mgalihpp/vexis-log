import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  Calculator,
  ClipboardList,
  Tags,
  TrendingUp,
} from "lucide-react";
import { ScrollReveal } from "@/components/landing/ScrollReveal";
import { cn } from "@/lib/utils";

export function FeatureShowcase() {
  const [activeFeature, setActiveFeature] = useState(0);

  // Mock data for the features
  const features = [
    {
      id: "journal",
      title: "Structured Journal",
      description:
        "Capture every trade with a guided multi-step flow: trade info, setup plan, execution, psychology, review, and improvement.",
      icon: ClipboardList,
      color: "text-primary",
      bg: "bg-primary/10",
      visualContent: (
        <div className="w-full h-full flex flex-col justify-center gap-4 p-8">
          <div className="p-4 bg-card/80 rounded-lg border border-border/70">
            <div className="text-xs text-muted-foreground mb-2">
              Current Step
            </div>
            <div className="text-sm font-semibold text-foreground">
              Psychology
            </div>
            <div className="h-1 w-full rounded-full bg-muted mt-3">
              <div className="h-full w-[66%] rounded-full bg-primary" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {["Trade Info", "Setup & Entry", "Execution", "Review"].map(
              (item) => (
                <div
                  key={item}
                  className="p-3 rounded-lg bg-card/80 border border-border/70 text-xs text-muted-foreground"
                >
                  {item}
                </div>
              ),
            )}
          </div>
          <div className="p-3 bg-primary/10 border border-primary/25 rounded-lg text-center">
            <p className="text-sm text-primary">
              Journal fields and validation keep every entry consistent.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "risk",
      title: "Performance Metrics",
      description:
        "Monitor key numbers from your journal: win rate, net P&L, profit factor, and R:R context for each trade.",
      icon: Calculator,
      color: "text-success",
      bg: "bg-success/10",
      visualContent: (
        <div className="w-full h-full flex flex-col justify-center gap-4 p-8">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-card/80 rounded-lg border border-border/70">
              <div className="text-xs text-muted-foreground mb-1">
                Risk per Trade
              </div>
              <div className="text-xl font-bold text-foreground">1.0%</div>
            </div>
            <div className="p-4 bg-card/80 rounded-lg border border-border/70">
              <div className="text-xs text-muted-foreground mb-1">Avg R:R</div>
              <div className="text-xl font-bold text-success">2.4R</div>
            </div>
          </div>
          <div className="p-4 bg-card/80 rounded-lg border border-border/70 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-2 opacity-20 text-success">
              <TrendingUp size={48} />
            </div>
            <div className="relative z-10">
              <div className="text-sm text-muted-foreground mb-2">
                Last 10 Trades Performance
              </div>
              <div className="flex items-end gap-1 h-24">
                {[40, 60, 30, 80, 20, 90, 50, 70, 45, 85].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-success/40 rounded-t-sm hover:bg-success transition-colors"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "behavior",
      title: "Behavioral Tags",
      description:
        'Tag emotions like "FOMO" or "Revenge". Identify patterns where your psychology is leaking profits. Fix the trader, not just the trade.',
      icon: Tags,
      color: "text-warning",
      bg: "bg-warning/10",
      visualContent: (
        <div className="w-full h-full flex flex-col justify-center gap-4 p-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {[
              {
                label: "FOMO",
                color:
                  "bg-destructive/20 text-destructive border-destructive/30",
              },
              {
                label: "A+ Setup",
                color: "bg-success/20 text-success border-success/30",
              },
              {
                label: "Revenge",
                color: "bg-warning/20 text-warning border-warning/30",
              },
              {
                label: "Impulse",
                color: "bg-warning/20 text-warning border-warning/30",
              },
              {
                label: "Disciplined",
                color: "bg-primary/20 text-primary border-primary/30",
              },
            ].map((tag, i) => (
              <span
                key={i}
                className={cn(
                  "px-3 py-1 rounded-full text-xs font-medium border",
                  tag.color,
                )}
              >
                {tag.label}
              </span>
            ))}
          </div>
          <div className="p-4 bg-card/80 rounded-lg border border-border/70 flex items-start gap-3">
            <div className="mt-1 text-destructive">
              <AlertTriangle size={18} />
            </div>
            <div>
              <div className="text-sm font-medium text-foreground mb-1">
                Pattern Detected
              </div>
              <p className="text-xs text-muted-foreground">
                You lose{" "}
                <span className="text-destructive font-bold">12% more</span> on
                trades tagged "FOMO" compared to your average.
              </p>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="features-section" className="relative py-24 bg-background">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-20 text-center max-w-2xl mx-auto">
            <ScrollReveal>
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
                Built for the <span className="text-primary">serious</span>{" "}
                trader.
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p className="text-lg text-muted-foreground">
                Replace scattered notes with one journal workflow tied directly
                to dashboard and analytics insights.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start lg:items-stretch">
            {/* Left Column: Scrolling Content */}
            <div className="space-y-20 lg:space-y-0 lg:py-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0.2 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ amount: 0.55, margin: "-100px 0px -100px 0px" }}
                  onViewportEnter={() => setActiveFeature(index)}
                  className="group lg:min-h-[50vh] lg:flex lg:items-center"
                >
                  <div className="flex flex-col gap-4">
                    <div
                      className={cn(
                        "w-12 h-12 rounded-lg flex items-center justify-center mb-2 transition-colors duration-300",
                        feature.bg,
                        feature.color,
                      )}
                    >
                      <feature.icon size={24} />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>

                    {/* Mobile Only Visual (hidden on desktop) */}
                    <div className="lg:hidden mt-8 p-1 bg-card rounded-xl border border-border shadow-xl">
                      {feature.visualContent}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Right Column: Sticky Visual (Desktop Only) */}
            <div className="hidden lg:block h-full">
              <div className="sticky top-36 h-[560px] w-full bg-card/80 backdrop-blur-sm rounded-2xl border border-border shadow-xl overflow-hidden flex flex-col items-center justify-center">
                {/* Background Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

                {/* Dynamic Visual Content */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeFeature}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full"
                  >
                    {features[activeFeature].visualContent}
                  </motion.div>
                </AnimatePresence>

                {/* Overlay Text */}
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-background via-background/90 to-transparent pointer-events-none">
                  <p className="text-center text-xs text-muted-foreground uppercase tracking-widest font-medium">
                    {features[activeFeature].title} Interface
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
