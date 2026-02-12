import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, PlayCircle } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function HeroSection() {
  // Motion values for 3D tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring physics for smooth movement
  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

  // Transform mouse position to rotation degrees
  // Max tilt: +/- 5 degrees
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-5, 5]);

  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Handle mouse move for tilt effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseXFromCenter = e.clientX - rect.left - width / 2;
    const mouseYFromCenter = e.clientY - rect.top - height / 2;

    // Normalize to -0.5 to 0.5
    x.set(mouseXFromCenter / width);
    y.set(mouseYFromCenter / height);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  // Reduced motion check
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const handler = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // Disable tilt if reduced motion is preferred
  const style = prefersReducedMotion
    ? {}
    : {
        rotateX,
        rotateY,
        transformStyle: "preserve-3d" as const,
      };

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-32 pb-20 px-6 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-background to-transparent pointer-events-none z-[1]" />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent via-background/80 to-background pointer-events-none z-[1]" />

      {/* Background Equity Curve SVG - Decorative */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20 z-0">
        <svg
          className="w-full max-w-6xl h-full"
          preserveAspectRatio="none"
          viewBox="0 0 1000 400"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,350 C150,350 200,300 300,320 C400,340 450,200 550,220 C650,240 700,100 800,150 C900,200 950,50 1000,80"
            fill="none"
            stroke="url(#gradient-hero-line)"
            strokeWidth="2"
          />
          <defs>
            <linearGradient
              id="gradient-hero-line"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop
                offset="0%"
                stopColor="var(--color-primary)"
                stopOpacity="0"
              />
              <stop
                offset="50%"
                stopColor="var(--color-primary)"
                stopOpacity="1"
              />
              <stop
                offset="100%"
                stopColor="var(--color-chart-3)"
                stopOpacity="1"
              />
            </linearGradient>
            <linearGradient
              id="gradient-hero-fill"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop
                offset="0%"
                stopColor="var(--color-primary)"
                stopOpacity="0.2"
              />
              <stop
                offset="100%"
                stopColor="var(--color-primary)"
                stopOpacity="0"
              />
            </linearGradient>
          </defs>
          <path
            d="M0,350 C150,350 200,300 300,320 C400,340 450,200 550,220 C650,240 700,100 800,150 C900,200 950,50 1000,80 L1000,400 L0,400 Z"
            fill="url(#gradient-hero-fill)"
            opacity="0.1"
          />
        </svg>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Badge - Removed as per request */}
        {/* <motion.div ... /> */}

        {/* Headline */}
        <motion.h1
          id="hero-headline"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-6xl md:text-8xl font-black tracking-tight text-foreground mb-6 leading-[0.9] drop-shadow-[0_0_20px_color-mix(in_oklab,var(--color-primary)_25%,transparent)]"
        >
          Precision Trading.
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary to-chart-3">
            Atmospheric Clarity.
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 font-light leading-relaxed"
        >
          The trading journal that helps you log complete trade context, review
          psychology, and monitor performance with dashboard and analytics
          views.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
        >
          <Link
            href="/signup"
            className="group bg-primary hover:bg-primary/90 text-primary-foreground text-lg font-semibold px-8 py-4 rounded-lg transition-all shadow-[0_0_30px_color-mix(in_oklab,var(--color-primary)_45%,transparent)] hover:shadow-[0_0_50px_color-mix(in_oklab,var(--color-primary)_65%,transparent)] hover:-translate-y-1 flex items-center gap-2"
          >
            Start Journaling
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
          <Link
            href="/dashboard"
            className="px-8 py-4 rounded-lg text-muted-foreground font-medium hover:text-foreground hover:bg-accent/50 transition-colors border border-transparent hover:border-border flex items-center gap-2"
          >
            <PlayCircle size={18} />
            View Demo
          </Link>
        </motion.div>

        {/* 3D Tilt Dashboard Mockup */}
        <div
          className="perspective-1000 w-full max-w-4xl mx-auto"
          style={{ perspective: "1000px" }}
        >
          <motion.div
            id="hero-dashboard-mockup"
            ref={cardRef}
            style={style}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={handleMouseEnter}
            initial={{ opacity: 0, y: 40, rotateX: 10 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative glass-card rounded-xl border border-border/60 bg-card/70 p-1 shadow-2xl"
          >
            {/* Glow effect on hover */}
            <div
              className={cn(
                "absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-chart-3/20 opacity-0 transition-opacity duration-500 rounded-xl pointer-events-none",
                isHovered ? "opacity-100" : "",
              )}
            />

            {/* Mockup Content */}
            <div className="relative z-10 overflow-hidden rounded-lg border border-border/50 bg-card/85 backdrop-blur-md">
              <img
                src="/features1.png"
                alt="Feature dashboard preview"
                className="h-auto w-full object-cover"
                loading="lazy"
              />
            </div>

            {/* Reflection Shine */}
            <div
              className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-xl pointer-events-none"
              style={{ mixBlendMode: "overlay" }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
