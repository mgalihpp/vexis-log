import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: number | string;
}

export function Logo({ className, size = 40 }: LogoProps) {
  return (
    <img
      src="/logo.png"
      alt="Vexis Logo"
      className={cn("text-primary", className)}
      width={size}
      height={size}
    />
  );
}
