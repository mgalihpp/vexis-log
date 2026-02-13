import { motion } from "framer-motion";
import {
  BrainCircuit,
  LineChart,
  ShieldCheck,
  TrendingDown,
} from "lucide-react";
import { ScrollReveal } from "@/components/landing/ScrollReveal";

export function ProblemSection() {
  const problems = [
    {
      icon: TrendingDown,
      title: "Emotional Execution",
      description:
        "FOMO entries and panic exits destroy edge. Without a system, your PnL is just a reflection of your mood.",
    },
    {
      icon: BrainCircuit,
      title: "Cognitive Bias",
      description:
        "Recency bias makes you chase. Loss aversion makes you hold. You are wired to lose money in the markets.",
    },
    {
      icon: LineChart,
      title: "Invisible Leaks",
      description:
        "Which setups actually pay? Which times of day drain your account? Without data, you are flying blind.",
    },
  ];

  return (
    <section
      id="problem-section"
      className="relative py-24 px-6 bg-background overflow-hidden"
    >
      <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-background to-transparent pointer-events-none z-[2]" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-background pointer-events-none z-[2]" />

      {/* Background Grid Pattern - Subtle */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      {/* Radial Gradient for Focus */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_200px,color-mix(in_oklab,var(--color-primary)_22%,transparent),transparent)] opacity-40 pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-20">
          <ScrollReveal>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 tracking-tight">
              The Market depends on your{" "}
              <span className="text-destructive">indiscipline</span>.
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              90% of traders lose money not because they lack technicals, but
              because they lack a mirror. You cannot fix what you do not track.
            </p>
          </ScrollReveal>
        </div>

        {/* Problem Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          {problems.map((problem, index) => (
            <ScrollReveal
              key={index}
              delay={0.2 + index * 0.1}
              className="group p-8 rounded-2xl bg-card/70 border border-border hover:border-destructive/30 transition-all duration-300 hover:bg-card"
            >
              <div className="w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <problem.icon className="w-6 h-6 text-destructive" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {problem.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {problem.description}
              </p>
            </ScrollReveal>
          ))}
        </div>

        {/* The Pivot / Solution Hint */}
        <div className="text-center">
          <ScrollReveal delay={0.4}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8">
              <ShieldCheck size={16} />
              <span>Professional Grade Analytics</span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.5}>
            <h3 className="text-2xl md:text-4xl font-bold text-foreground mb-6">
              Turn your history into your{" "}
              <span className="text-primary">edge</span>.
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-10">
              Vexis doesn't just record trades. It analyzes your behavior,
              identifies your best setups, and forces you to confront your worst
              habits.
            </p>
          </ScrollReveal>

          {/* Decorative visual element separating sections */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6 }}
            className="h-px w-full max-w-xs mx-auto bg-gradient-to-r from-transparent via-primary/60 to-transparent"
          />
        </div>
      </div>
    </section>
  );
}
