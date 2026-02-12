import { Logo } from "@/components/ui/logo";
import { cn } from "@/lib/utils";

type Props = {
  zoomIn: boolean;
};

export function Splash({ zoomIn = true }: Props) {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-background overflow-hidden relative">
      <div
        className={cn("flex flex-col items-center gap-6 relative z-10", {
          "animate-in fade-in zoom-in duration-500": zoomIn,
        })}
      >
        <div className="relative flex items-center justify-center">
          <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse" />
          <Logo size={80} className="relative z-10" />

          {/* Shine effect */}
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent z-20" />
        </div>
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-xl font-semibold tracking-tight text-foreground/80 relative overflow-hidden">
            <span className="relative z-10">Vexis Log</span>
            <span className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </h1>
        </div>
      </div>
    </div>
  );
}
