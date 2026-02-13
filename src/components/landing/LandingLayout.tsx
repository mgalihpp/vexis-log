import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface LandingLayoutProps {
  children: ReactNode;
}

export function LandingLayout({ children }: LandingLayoutProps) {
  return (
    <div
      className={cn(
        "min-h-screen w-full relative font-sans antialiased selection:bg-primary selection:text-primary-foreground",
        "bg-background text-foreground",
      )}
    >
      {/* Atmospheric Glow */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, color-mix(in oklab, var(--color-primary) 16%, transparent) 0%, color-mix(in oklab, var(--color-primary) 7%, transparent) 35%, transparent 70%)",
        }}
      />

      {/* Grid Pattern */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, color-mix(in oklab, var(--color-border) 45%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklab, var(--color-border) 45%, transparent) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage:
            "radial-gradient(circle at center, black 40%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(circle at center, black 40%, transparent 100%)",
        }}
      />

      {/* Subtle Noise Texture */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Main Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
